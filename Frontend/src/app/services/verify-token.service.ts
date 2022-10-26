import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class VerifyTokenService implements HttpInterceptor {

  constructor(private authService: AuthService ) { }

  intercept(req, next){
    const tokenizedReq = req.clone({
      setHeaders:{
        authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }


}
