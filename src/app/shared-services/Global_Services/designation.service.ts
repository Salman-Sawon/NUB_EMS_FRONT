import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { RequestMessage } from 'src/app/models/request-message';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  user:User=new User();
  request:RequestMessage=new RequestMessage();
  constructor(private http:HttpClient) { }

  GetDesignationList(userCode: string): Observable<any> {
    let params = new HttpParams().set('userCode', userCode)
    return this.http.get(UrlConstants.getDesignationList,{ params: params });
  }

  getDesigList(organizationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organizationCode);
    return this.http.get(UrlConstants.getDesigList, {params: params});
  }
}
