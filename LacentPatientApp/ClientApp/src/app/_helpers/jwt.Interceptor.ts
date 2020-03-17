import { Injectable } from "@angular/core";
import { HttpInterceptor } from '@angular/common/http';
import { RegisterService } from '../register.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
    providedIn:'root'
})

export class JwtInterceptor implements HttpInterceptor{


    /**
     *
     */
    constructor(private acct:RegisterService) {
    }
    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

        let currentUser=this.acct.isLoggedIn;
        let token = localStorage.getItem('jwt');

        if(currentUser && token!==undefined){
            req=req.clone({
                setHeaders:{
                    Authorization:`Bearer ${token}`
                }
            });
        }
        return next.handle(req).pipe(
          catchError(
            (err, caught) => {
              if (err.status === 401){
                this.handleAuthError();
                return of(err);
              }
              throw err;
            }
          )
        );
      }
      private handleAuthError() {
        this.acct.logout();
      }
}
