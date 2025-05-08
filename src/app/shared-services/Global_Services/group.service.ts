import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { RequestMessage } from 'src/app/modules/result/models/request-message';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  request: RequestMessage = new RequestMessage();

  constructor(private httpClient: HttpClient) { }

  GetGroupList(group: any) {
    this.request.requestObject = JSON.stringify(group);
    return this.httpClient.post(UrlConstants.getGroupList, this.request);
  }
}
