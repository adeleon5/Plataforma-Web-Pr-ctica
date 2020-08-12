import { Component, OnInit } from '@angular/core';
import { ApiRestSBService } from '../Sapirest/api-rest-sb.service';
import { map } from 'rxjs/operators';
import { Menu } from '../modelos/menu';
import { Rol } from '../modelos/rol';
import { MenuLista} from '../modelos/menulista';

@Component({
  selector: 'app-cmenu',
  templateUrl: './cmenu.component.html',
  styleUrls: ['./cmenu.component.css']
})
export class CMenuComponent implements OnInit {

  public rdescripcion: string = "";
  public menu: Menu[];
  public rol: Rol[];
  public urol: Rol;
  public menulista: MenuLista[];
  public menuadd: Menu;
  public esactualizacionmenu: boolean=false;
  public escreacionrol: boolean=false;

  constructor(private service: ApiRestSBService) { }

  ngOnInit(): void {
    this.GetAllMenu();
    this.GetAllRol();
    this.cleanMenuAdd();
    this.cleanRol();
  }

  GetAllMenu(){
    this.service.SetUsername("adeleon@gmail.com");
    this.service.SetPassword("12345");
    this.menulista = []
    this.service.GetAllMenu().pipe(map(data =>data as any)).subscribe(data=>{
      this.menu = data; 
      for(let i: number=0; i<=this.menu.length-1; i++){
        //console.log(this.menu[i].descripcion)
        this.menulista.push(new MenuLista(this.menu[i].id, this.menu[i].icono, this.menu[i].ruta, this.menu[i].raiz, this.menu[i].descripcion,false));
      }
    console.log("GetAllMenuComponentMenu: ", this.menulista);
    },(error)=>{
          console.log('errorcomponentadministracion: ',error.status);
        });
  }

  GetAllRol(){
    this.service.SetUsername("adeleon@gmail.com");
    this.service.SetPassword("12345");
    this.service.GetAllRol().pipe(map(data =>data as any)).subscribe(data=>{
      this.rol = data; 
     // for(let i: number=0; i<=this.menu.length-1; i++){
     //   this.mn.push(new Menu(this.menu[i].id, this.menu[i].icono, this.menu[i].ruta, this.menu[i].raiz, this.menu[i].descripcion));
     // }
    console.log("GetAllRolComponentMenu: ", this.rol);
    },(error)=>{
          console.log('errorcomponentadministracion: ',error.status);
        });
  }

  seleccionarItemMenu(lista:Rol){
    console.log("SeleccionItemMenu: ", lista.menus.length)
    //lleno el objeto urol es con el qu haré la actualización
    this.urol.id = lista.id
    this.urol.descripcion = lista.descripcion
    /*---------------------------------------------------------*/
    console.log("EditRol: ",this.urol)
    this.DeseleccionarItem();
    //hago el ciclo para marcar las opciones correspondientes al rol
    for(let i:number = 0; i<=lista.menus.length-1; i++){
      this.menulista[this.menulista.findIndex(item => item.id === lista.menus[i].id)].seleccion = true
      //console.log(this.menulista.findIndex(item => item.id === lista.menus[i].id))
    }
  }

  DeseleccionarItem(){
    for(let i:number = 0; i<=this.menulista.length-1; i++){
      this.menulista[i].seleccion = false;
    }
  }

  ItemAddList(menu:MenuLista){
    console.log("ItemAddList: ", menu)
    this.menulista[this.menulista.findIndex(item => item.id === menu.id)].seleccion = menu.seleccion
  }

  cleanMenuAdd(){
    this.menuadd = new Menu(0,'','',0,'')
  }

  EditMenu(menu:Menu){
    console.log(menu)
    this.menuadd.id = menu.id
    this.menuadd.descripcion = menu.descripcion
    this.menuadd.raiz = menu.raiz
    this.menuadd.ruta = menu.ruta
    this.menuadd.icono = menu.icono
    this.esactualizacionmenu = true;
  }

  ActualizarOpcionMenu(){
    this.service.SetUsername("adeleon@gmail.com");
    this.service.SetPassword("12345");
    this.service.AddNewOpcionMenu(this.menuadd).pipe(map(data => data as any)).subscribe(data =>{
      console.log(data);
      this.GetAllMenu();  
      this.cleanMenuAdd();
    }),(error:any)=>{console.log("errorActualizarOpcionMenu: "+error)};
   console.log("ActualizarOpcionesMenu: ",this.menuadd) 
  }

  AgregarOpcionMenu(){
    console.log("AgregarOpcioMenu: ",this.menuadd)
    this.service.SetUsername("adeleon@gmail.com");
    this.service.SetPassword("12345");
    this.service.AddNewOpcionMenu(this.menuadd).pipe(map(data => data as any)).subscribe(data =>{
      console.log(data);
      this.GetAllMenu();  
      this.cleanMenuAdd();
    }),(error:any)=>{console.log("errorAgregarOpcioMenu: "+error)};
  }

  cancelarOpcionesMenu(){
    this.GetAllMenu();
    this.GetAllRol();
    this.cleanMenuAdd();
    this.esactualizacionmenu = false;
  }


  /*CODIGO PARA ROLES Y SUS OPCIONES DE MENU */

  cleanRol(){
    this.urol = new Rol(0,'',[])
  }

  ActualizarOpcionRol(){
   let led:boolean
   this.urol.menus = []
   for(let i:number = 0; i<=this.menulista.length-1; i++){
     led = this.menulista[i].seleccion
     if(led === true){
       this.urol.menus.push(new Menu(this.menulista[i].id,this.menulista[i].icono,this.menulista[i].ruta,this.menulista[i].raiz,this.menulista[i].descripcion))
     }
   }
   if(this.escreacionrol){
     this.urol.menus = [];
     this.escreacionrol = false;
   }
   console.log("ActualizarOpcionesMenu: ",this.urol)
   this.service.SetUsername("adeleon@gmail.com");
    this.service.SetPassword("12345");
    this.service.AddNewRolandMenu(this.urol).pipe(map(data => data as any)).subscribe(data =>{
      console.log(data);
      this.cancelarOpcionesRolyMenu();
    }),(error:any)=>{console.log("errorActualizarOpcionesMenu: "+error)};
  }

  cancelarOpcionesRolyMenu(){
    this.GetAllMenu();
    this.GetAllRol();
    this.cleanMenuAdd();
    this.cleanRol();
    this.esactualizacionmenu = false;
  }

  creacionRol(){
    this.cancelarOpcionesRolyMenu();
    this.escreacionrol = true;
  }

}
