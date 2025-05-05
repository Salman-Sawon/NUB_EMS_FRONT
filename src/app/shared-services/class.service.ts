import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { RequestMessage } from '../modules/result/models/request-message';


@Injectable({
  providedIn: 'root'
})
export class ClassService {
  request: RequestMessage = new RequestMessage();

  constructor(private httpClient: HttpClient) { }

  GetClassList(organizationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organizationCode)
    return this.httpClient.get(UrlConstants.getClassList,{ params: params });
  }

  GetYearList(organizationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organizationCode)
    return this.httpClient.get(UrlConstants.getYearList,{ params: params });
  }

  
  GetSemesterList(organizationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organizationCode)
    return this.httpClient.get(UrlConstants.getSemesterList,{ params: params });
  }
}
