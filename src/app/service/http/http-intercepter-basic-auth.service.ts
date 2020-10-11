import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor() { }

  createAuthenticationHttpHeader(){
    let user= "teledeclaration";
    let password= "teledeclaration.pro";
    let basicAuthHeaderstring = 'Basic ' + window.btoa(user + ':' + password);
    return basicAuthHeaderstring;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let user= "teledeclaration";
    let password= "teledeclaration.pro";
    let basicAuthHeaderstring = 'Basic ' + window.btoa(user + ':' + password);
    request = request.clone({
      setHeaders: {
        Authorization : basicAuthHeaderstring
      }
    });
    return next.handle(request);
  }
}
