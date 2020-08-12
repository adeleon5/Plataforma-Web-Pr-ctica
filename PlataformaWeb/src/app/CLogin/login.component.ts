import { Component, OnInit } from '@angular/core';
import { ApiRestSBService } from 'src/app/Sapirest/api-rest-sb.service';
import { LocalstorageService } from 'src/app/Sapirest/localstorageservice.service';
import { Router } from '@angular/router';
import { ConstantPool } from '@angular/compiler';
import { map } from 'rxjs/operators';
import { Usuario } from '../modelos/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  usrvalid:boolean = false
  passvalid:boolean = false
  message: any;
  data:any = [];
  user: Usuario;

  constructor(private service:ApiRestSBService, private router:Router, private storage:LocalstorageService ) { }

  ngOnInit(): void {
    this.storage.clear();
    this.storage.set("AUTENTICATE",false);
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

  autentication(){
    this.service.GetInfoAllUser().pipe(map(data=> data as any)).subscribe(data=>{
      
      this.user = data
      for(let item of data){
        console.log(item.correo)
        if(this.username == item.correo && this.password == item.clave)
        {
          this.usrvalid = true;
          this.passvalid = true;   
        }
      }

      if(this.usrvalid && this.passvalid){
          this.service.SetUsername(this.username);
          this.service.SetPassword(this.password);
          this.storage.set("AUTENTICATE",true);
          this.storage.set("USER_MAIL",this.username);
          this.router.navigate(["/home"])
        }else{
          alert("Datos de autenticación invalidos intente de nuevo");
        }
    }),(error)=>{console.log("ErroAutentication: ", error)};
  }
}
