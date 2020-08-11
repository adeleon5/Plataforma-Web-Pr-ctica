import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { ApiRestSBService } from 'src/app/Sapirest/api-rest-sb.service';

@Injectable({
  providedIn: 'root'
})
export class APIInterceptorService implements HttpInterceptor {

  private username:string;
  private password:string;

  constructor(private service:ApiRestSBService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("paso por el interceptor")
    this.username = this.service.GetUsername();
    this.password = this.service.GetPassword();

    const headers= new HttpHeaders({Authorization: 'Basic '+btoa(this.username+':'+this.password)})
    
    const reqClone = req.clone({
      headers
    });

    return next.handle(reqClone).pipe(
      catchError(this.manejarError)
    );
  }

  manejarError(error: HttpErrorResponse ){
    //console.log('Sucedio un error')
    //console.log('Registrado en el log file')
    //console.log(error.status);
    //console.warn(error.status);
    return throwError(error);
  };

}
