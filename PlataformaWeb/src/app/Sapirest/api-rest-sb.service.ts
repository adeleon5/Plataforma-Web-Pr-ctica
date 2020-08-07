import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRestSBService {

  constructor(private http:HttpClient) { }

  public login(username:string, password:string){
    const headers= new HttpHeaders({Authorization: 'Basic '+btoa(username+':'+password)})
    return this.http.get("http://localhost:8080/usuario/login",{headers, responseType:'text' as 'json'})
    
  }
}
