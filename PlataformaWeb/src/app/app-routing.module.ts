import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './CLogin/login.component';
import { HomeComponent } from './Chome/home.component';
import { CAdministracionComponent } from './cadministracion/cadministracion.component';
import { CMenuComponent } from './cmenu/cmenu.component';


const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path:"home", component:HomeComponent},
  {path:"admin", component:CAdministracionComponent},
  {path:"menu", component: CMenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
