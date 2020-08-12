import { Component, OnInit } from '@angular/core';
import { ApiRestSBService } from '../Sapirest/api-rest-sb.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Rol } from '../modelos/rol';
import {Usuario} from '../modelos/usuario';
import {Menu} from '../modelos/menu';
import { LocalstorageService } from '../Sapirest/localstorageservice.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public usuario: Array<Usuario>;
  public roles: Array<Rol>
  public menu: Array<Menu>
  public _usuario: string;
  public test: Array<any>;
  public nombre:String="";
  public correo:String ="";
  public rol:String = "";
  
  constructor(private service: ApiRestSBService, private router:Router, private storage: LocalstorageService) { }

  ngOnInit(): void {
    if(!this.storage.get("AUTENTICATE")){
      this.router.navigate(["/login"])
    }
    this.GetInfoUser()
  }

  GetInfoUser(){
    console.log("prueba de localstorage ", this.storage.get("USER_MAIL"))
    this.service.GetInfoUser().pipe(map(data =>data as any)).subscribe(data=>{
      this.usuario=data
      this.nombre = data[0].nombre;
      this.correo = data[0].correo;
      this.rol = data[0].roles[0].descripcion;
      this.menu = data[0].roles[0].menus
      console.log("GetInfoUser: ", data[0].roles[0].menus);
    }),(error:any)=>{console.log("errorAgregarUsuario: "+error)};
  }

  GetUser(){
    this.service.GetUserTest().pipe(map(data =>data as any)).subscribe(data=>{
      this.test = data
      console.log(this.test);
    } 
    );
  }

  CloseSession(){
    this.storage.clear();
  }

}
