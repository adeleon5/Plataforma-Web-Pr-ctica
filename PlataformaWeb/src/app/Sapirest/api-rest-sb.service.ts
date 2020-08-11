import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Usuario} from  '../modelos/usuario'
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiRestSBService {

  private username:string
  private password:string

  constructor(private http:HttpClient) { }

  public login(){
    return this.http.get("http://localhost:8080/usuario/login",{responseType:'text' as 'json'});
  }

  public GetInfoUser(){
    return this.http.get("http://localhost:8080/usuario/get?correo="+this.username,{responseType:'json' as 'text'});
  }

  public GetRolMenu(rol:number){
    return this.http.get("http://localhost:8080/rol/get/"+rol.toString(),{responseType:'json' as 'text'});
  }

  public GetInfoAllUser(){
    return this.http.get("http://localhost:8080/usuario");
  }

  public AddNewUser(usuario:Usuario){
    return this,this.http.post<Usuario>("http://localhost:8080/usuario/add",usuario);
  }

  public GetUserTest(){
    return this.http.get("http://jsonplaceholder.typicode.com/users");
  }

  public SetUsername(username:string){
    this.username = username;
  }

  public SetPassword(password:string){
    this.password = password;
  }

  public GetUsername(){
    return this.username
  }

  public GetPassword(){
    return this.password
  }

}
