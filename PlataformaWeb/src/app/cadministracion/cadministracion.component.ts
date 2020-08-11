import { Component, OnInit } from '@angular/core';
import {Rol} from  '../modelos/rol'
import {Estatus} from '../modelos/estatus'
 
@Component({
  selector: 'app-cadministracion',
  templateUrl: './cadministracion.component.html',
  styleUrls: ['./cadministracion.component.css']
})
export class CAdministracionComponent implements OnInit {

  usuario = {
    activo: "",
    clave: "",
    correo: "",
    id: 0,
    nombre: "",
    roles : {
        id: 0,
        descripcion:""
      }
  }


  public lista:Rol[]=[];
  public estatus:Estatus[]=[];

  constructor() { }

  ngOnInit(): void {
    this.lista.push(new Rol(1,"SUPER USUARIO"));
    this.lista.push(new Rol(2,"VENTAS"));
    this.estatus.push(new Estatus("S","ACTIVO"));
    this.estatus.push(new Estatus("N","INACTIVO"));
  }

  AgregarUsuario(){
    console.log(this.usuario)
  }

  selectRol( $event) {
    //In my case $event come with a id value
    this.usuario.roles.descripcion = this.lista[$event-1 ].descripcion;
    console.log(this.lista[$event-1].descripcion);
  }
}
