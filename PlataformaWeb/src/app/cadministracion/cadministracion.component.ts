import { Component, OnInit } from '@angular/core';
import {Rol} from  '../modelos/rol'
import {Usuario} from  '../modelos/usuario'
import {RolList} from  '../modelos/rollist'
import {Menu} from  '../modelos/menu'
import {Estatus} from '../modelos/estatus'
import { ApiRestSBService } from '../Sapirest/api-rest-sb.service';
import { map } from 'rxjs/operators';
import { formatNumber } from '@angular/common';
import { UrlSegment } from '@angular/router';

@Component({
  selector: 'app-cadministracion',
  templateUrl: './cadministracion.component.html',
  styleUrls: ['./cadministracion.component.css']
})
export class CAdministracionComponent implements OnInit {

  public lista:RolList[]=[];
  public estatus:Estatus[]=[];
  public menu:Array<any>;
  public usr : Usuario;
  public rl : Rol[]=[];
  public mn : Menu[]=[];


  public usuario = {
    activo: "",
    clave: "",
    correo: "",
    id: 0,
    nombre: "",
    roles :[{id:0,descripcion:"",menus:[]}]
  }


  constructor(private service: ApiRestSBService) { }

  ngOnInit(): void {
    this.lista.push(new RolList(1,"SUPER USUARIO"));
    this.lista.push(new RolList(2,"VENTAS"));
    this.estatus.push(new Estatus("S","ACTIVO"));
    this.estatus.push(new Estatus("N","INACTIVO"));
    console.log("contraseña: ", this.service.GetPassword())
  }

  AgregarUsuario(){
    this. rl.push(new Rol(this.usuario.roles[0].id,this.usuario.roles[0].descripcion,this.mn))
    this.usr = (new Usuario(this.usuario.activo,this.usuario.clave,this.usuario.correo,this.usuario.id,this.usuario.nombre,this.rl))
    this.service.AddNewUser(this.usr).pipe(map(data => data as any)).subscribe(data =>{
      console.log(data);
    }),(error:any)=>{console.log("errorAgregarUsuario: "+error)};
    console.log(this.usr)
    
  }

  selectRol($event) {
    this.usuario.roles[0].descripcion = this.lista[$event-1 ].descripcion;
    let id:number = $event;
    console.log(this.lista[$event-1].descripcion);
    this.GetRolMenu(id);
  }

  GetRolMenu(rol:number){
    this.service.SetUsername("mperalta@gmail.com");
    this.service.SetPassword("12345");
    this.service.GetRolMenu(rol).pipe(map(data =>data as any)).subscribe(data=>{
      this.menu = data.value.menus; 
      console.log(this.menu)   
      for(let i: number=0; i<=this.menu.length-1; i++){
        //console.log(this.menu[i].Descripcion)
        //console.log(this.usuario.roles)
        this.mn.push(new Menu(this.menu[i].Id, this.menu[i].Icono, this.menu[i].Ruta, this.menu[i].Raiz, this.menu[i].Descripcion));
      }
      console.log("GetRolMenuCOmponent: ", this.menu);
    },(error)=>{
          console.log('errorcomponentadministracion: ',error.status);
        });
  }
}
