import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let jwt = this.auth.getJWT();
    let authdReq: HttpRequest<any>;

    if(jwt) {
      authdReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${jwt}`)});
    } else {
      authdReq = req;
    }

    return next.handle(authdReq);
  }
}