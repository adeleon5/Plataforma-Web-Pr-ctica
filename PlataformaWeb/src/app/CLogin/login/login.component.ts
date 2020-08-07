import { Component, OnInit } from '@angular/core';
import { ApiRestSBService } from 'src/app/Sapirest/api-rest-sb.service';
import { Router } from '@angular/router';

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
    let resp = this.service.login(this.username, this.password);
    resp.subscribe(data => this.data = data)
    console.log(this.data);
    
  }

}
