import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { RequestMessage } from 'src/app/models/request-message';

@Injectable({
  providedIn: 'root'
})
export class RemarksService {

  request: RequestMessage = new RequestMessage();

  constructor(private httpClient: HttpClient) { }

  GetRemarkList(remarks: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('organizationCode', remarks);
    return this.httpClient.get(UrlConstants.getRemarkList, {params:params});
  }

  GetDistributionRemarkList(organizationCode: string, userCode: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('organizationCode', organizationCode);
    params = params.set('userCode', userCode);
    return this.httpClient.get(UrlConstants.getDistRemarkList, {params:params});
  }

  GetResultEntryRemarkList(organizationCode: string, userCode: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('organizationCode', organizationCode);
    params = params.set('userCode', userCode);
    return this.httpClient.get(UrlConstants.getResultEntryRemarkList, {params:params});
  }
}
