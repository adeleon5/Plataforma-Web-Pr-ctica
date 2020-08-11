import { Component, OnInit } from '@angular/core';
import { ApiRestSBService } from 'src/app/Sapirest/api-rest-sb.service';
import { Router } from '@angular/router';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  message: any;
  data:any = [];

  constructor(private service:ApiRestSBService, private router:Router) { }

  ngOnInit(): void {
  }

  doLogin(){
    this.service.SetUsername(this.username);
    this.service.SetPassword(this.password);

    let resp = this.service.login();
    
    resp.subscribe(data=>{
      console.log("logincomponent ", data)
      if(data=="true"){
        this.router.navigate(["/home"])
      }
    },(error)=>{
      console.log('errorcomponent: ',error.status);
      if(error.status==401){
        alert("Usuario o contraseña invalida, intente de nuevo");
      }
    });
  }
}
