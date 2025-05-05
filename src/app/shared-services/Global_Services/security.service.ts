import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { RequestMessage } from 'src/app/models/request-message';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  request:RequestMessage=new RequestMessage();
  constructor(private http:HttpClient) { }
  
  signin(user:any){    
    this.request.requestObject=JSON.stringify(user);    
    return this.http.post(UrlConstants.login,this.request);
  }

  // SaveUserCreation(roleMenu:any){
  //   this.request.requestObject = JSON.stringify(roleMenu);
  //   return this.http.post('http://localhost:50681/api/AdminUser/UpdateUser',this.request);
  // }

  signout() {    
    return this.http.get(UrlConstants.logout);
  }
  refresh() {
    return this.http.get(UrlConstants.refresh);
  }
}
