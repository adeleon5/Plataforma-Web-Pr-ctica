import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APIInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //throw new Error("Method not implemented.");
    console.log("paso por el interceptor")
    return next.handle(req).pipe(
      catchError(this.manejarError)
    );
  }

  manejarError(error: HttpErrorResponse ){
    console.log('Sucedio un error')
    console.log('Registrado en el log file')
    console.log(error.status);
    //console.warn(error.status);
    return throwError('Error personalizado');
  };

}
