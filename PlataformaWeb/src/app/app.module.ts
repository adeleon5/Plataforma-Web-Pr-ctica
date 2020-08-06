import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './Cprincipal/app.component';
import { LoginComponent } from './CLogin/login/login.component';
import { HomeComponent } from './Chome/home/home.component';
import { ApiRestSBService} from './Sapirest/api-rest-sb.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiRestSBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
