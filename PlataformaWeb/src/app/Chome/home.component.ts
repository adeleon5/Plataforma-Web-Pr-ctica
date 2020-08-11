import { Component, OnInit } from '@angular/core';
import { ApiRestSBService } from '../Sapirest/api-rest-sb.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Rol } from '../modelos/rol';
import {Usuario} from '../modelos/usuario';
import {Menu} from '../modelos/menu';


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
  
  constructor(private service: ApiRestSBService, private router:Router) { }

  ngOnInit(): void {
    this.GetInfoUser()
  }

  GetInfoUser(){
    this.service.GetInfoUser().pipe(map(data =>data as any)).subscribe(data=>{
      this.usuario=data
      this.nombre = data[0].Nombre;
      this.correo = data[0].Correo;
      this.rol = data[0].roles[0].Descripcion;
      this.menu = data[0].roles[0].menus
      console.log("GetInfoUser: ", data[0].roles[0].menus);
    } 
    );
  }

  GetUser(){
    this.service.GetUserTest().pipe(map(data =>data as any)).subscribe(data=>{
      this.test = data
      console.log(this.test);
    } 
    );
  }
}