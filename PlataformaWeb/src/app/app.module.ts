import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './Cprincipal/app.component';
import { LoginComponent } from './CLogin/login.component';
import { HomeComponent } from './Chome/home.component';
import { ApiRestSBService} from './Sapirest/api-rest-sb.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {APIInterceptorService} from './Interceptor/apiinterceptor.service'

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
