import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { RequestMessage } from 'src/app/models/request-message';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  request: RequestMessage = new RequestMessage();

  constructor(private httpClient: HttpClient) { }

  GetSessionList(session: any) {
    this.request.requestObject = JSON.stringify(session);
    return this.httpClient.post(UrlConstants.getSessionList, this.request);
  }

  saveSession(session: any) {
    this.request.requestObject = JSON.stringify(session);
    return this.httpClient.post(UrlConstants.saveSession, this.request);
  }

  getSessionGridView(userCode: string, sessionCode: any) {
    let parameter = new HttpParams();
    parameter = parameter.set("userCode", userCode);
    parameter = parameter.set("sessionCode", sessionCode);
    return this.httpClient.get(UrlConstants.getSessionGridView, {params: parameter});
  }
}