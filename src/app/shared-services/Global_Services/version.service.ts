import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { RequestMessage } from 'src/app/modules/result/models/request-message';


@Injectable({
  providedIn: 'root'
})
export class VersionService {
  request: RequestMessage = new RequestMessage();

  constructor(private httpClient: HttpClient) { }

  GetVersionList(version: any) {
    this.request.requestObject = JSON.stringify(version);
    return this.httpClient.post(UrlConstants.getVersionList, this.request);
  }
}
