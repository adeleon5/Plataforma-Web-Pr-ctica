import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './Cprincipal/app.component';
import { LoginComponent } from './CLogin/login.component';
import { HomeComponent } from './Chome/home.component';
import { ApiRestSBService} from './Sapirest/api-rest-sb.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {APIInterceptorService} from './Interceptor/apiinterceptor.service';
import { CAdministracionComponent } from './cadministracion/cadministracion.component';
import { CMenuComponent } from './cmenu/cmenu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CAdministracionComponent,
    CMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
  ],
  providers: [
      ApiRestSBService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: APIInterceptorService,
        multi: true
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
