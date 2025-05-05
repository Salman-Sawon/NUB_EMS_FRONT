import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { RequestMessage } from 'src/app/models/request-message';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  request: RequestMessage = new RequestMessage();

  constructor(private httpClient: HttpClient) { }
 
  GetSectionList(section: any) {
    this.request.requestObject = JSON.stringify(section);
    return this.httpClient.post(UrlConstants.getSectionList, this.request);
  }
}
