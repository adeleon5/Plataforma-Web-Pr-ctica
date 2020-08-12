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
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-cadministracion',
  templateUrl: './cadministracion.component.html',
  styleUrls: ['./cadministracion.component.css']
})
export class CAdministracionComponent implements OnInit {

  public lista:RolList[]=[];
  public estatus:Estatus[]=[];
  public menu:Array<any>;
  public rl : Rol[];
  public mn : Menu[];
  public usr : Usuario = new Usuario();
  public listaUsuario: Usuario;
  public IdRol:number;
  public habilitarbotonEdit:boolean = false;


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
    this.GetInfoAllUser();
  }

  AgregarUsuario(){
    //this.usr = (new Usuario())
    this.usr.id = 0
    this.usr.nombre = this.usuario.nombre
    this.usr.clave = this.usuario.clave
    this.usr.correo = this.usuario.correo
    this.usr.activo = this.usuario.activo
    this.usr.roles = this.rl
    //console.log(this.usr)
    this.service.SetUsername("adeleon@gmail.com");
    this.service.SetPassword("12345");
    this.service.AddNewUser(this.usr).pipe(map(data => data as any)).subscribe(data =>{
      //console.log(data);
      this.GetInfoAllUser();
    }),(error:any)=>{console.log("errorAgregarUsuario: "+error)};
    //console.log(this.usr)
    //console.log(this.usuario);
    this.Clean();
  }

  EditarUsuario(){
    //this.usr = (new Usuario())
    console.log("EditaUsuario: ",this.usuario.roles)
    this.usr.id = this.usuario.id
    this.usr.nombre = this.usuario.nombre
    this.usr.clave = this.usuario.clave
    this.usr.correo = this.usuario.correo
    this.usr.activo = this.usuario.activo
    this.usr.roles = this.rl
    console.log("EditaUsuario2: ", this.usr)
    this.service.SetUsername("adeleon@gmail.com");
    this.service.SetPassword("12345");
    this.service.AddNewUser(this.usr).pipe(map(data => data as any)).subscribe(data =>{
      console.log(data);
      this.Clean();
      this.GetInfoAllUser();
    }),(error:any)=>{console.log("errorAgregarUsuario: "+error)};
  }

  selectRol($event) {
       this.rl = []
       let id:number = $event
       this.rl.push(new Rol(id,this.lista[$event-1 ].descripcion,this.mn))
    //console.log(this.rl);
    this.GetRolMenu($event);
  }

  GetRolMenu(rol:number){
    this.service.SetUsername("adeleon@gmail.com");
    this.service.SetPassword("12345");
    this.service.GetRolMenu(rol).pipe(map(data =>data as any)).subscribe(data=>{
      this.menu = data.value.menus; 
      //console.log(this.menu)   
      this.mn = []
      for(let i: number=0; i<=this.menu.length-1; i++){
        this.mn.push(new Menu(this.menu[i].id, this.menu[i].icono, this.menu[i].ruta, this.menu[i].raiz, this.menu[i].descripcion));
      }
      this.rl[0].menus = this.mn;
      //console.log("GetRolMenuCOmponent: ", this.mn);
    },(error)=>{
          console.log('errorcomponentadministracion: ',error.status);
        });
  }

  public GetInfoAllUser(){
    this.service.SetUsername("adeleon@gmail.com");
    this.service.SetPassword("12345");
    this.service.GetInfoAllUser().pipe(map(data => data as Usuario)).subscribe(data =>{
      this.listaUsuario = data
      //console.log("GetInfoAllUserAdmin: ", data);
    }),(error:any)=>{console.log("GetInfoAllUser-ComponentList: ",error)};
  }

  public EditUser(usr:Usuario){
    this.rl = []
    this.rl.push(new Rol(usr.roles[0].id,usr.roles[0].descripcion,usr.roles[0].menus))
    this.usuario.id = usr.id;
    this.usuario.clave = usr.clave;
    this.usuario.nombre = usr.nombre;
    this.usuario.correo = usr.correo;
    this.usuario.activo = usr.activo;
    this.usuario.roles = this.rl
    this.habilitarbotonEdit = true;
    //console.log("EditUser: ", this.usuario)
  }

  public Cancelar(){
    this.Clean();
  }

  public Clean(){
    this.usuario = {
      activo: "",
      clave: "",
      correo: "",
      id: 0,
      nombre: "",
      roles :[{id:0,descripcion:"",menus:[]}]
    }
    this.habilitarbotonEdit = false;
  }
}
