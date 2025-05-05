
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {  tap, finalize } from 'rxjs/operators';
import { UrlConstants } from '../enums/UrlConstants';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authToken:any = '';
    if (localStorage.getItem("token")!=null) {
        authToken =  localStorage.getItem("token");
    }
    var customReq ;
    if (req.method=="GET") {
        customReq = req.clone({
            headers: new HttpHeaders({"Authorization": "bearer " + authToken}),
            url: UrlConstants.apiUrl + req.url
        });
    } else {
        customReq = req.clone({
            url: UrlConstants.apiUrl + req.url,
            body: req.body,
            headers: new HttpHeaders({"Authorization":"bearer " + authToken}),
        });
    }
    return next.handle(customReq).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                const jwt = event.body.Token;
            }
        }, error => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                  localStorage.removeItem("token");
                   location.replace("login");
                }
              }
        }),
        finalize(() => {
        }));
}
}
