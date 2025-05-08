import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { RequestMessage } from 'src/app/modules/result/models/request-message';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  request: RequestMessage = new RequestMessage();

  constructor(private httpClient: HttpClient) { }

  GetShiftList(shift: any) {
    this.request.requestObject = JSON.stringify(shift);
    return this.httpClient.post(UrlConstants.getShiftList, this.request);
  }
}
