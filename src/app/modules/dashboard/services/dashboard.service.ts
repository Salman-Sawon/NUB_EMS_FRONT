import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  sendData(data: any) {
    this.dataSubject.next(data);
  }

  public getDashboardData(userCode: string) {
    let params = new HttpParams();
    params = params.set('userCode', userCode);
    return this.httpClient.get(UrlConstants.getDashboardData, {params: params});
   }

   public getDashboardAllData(orgCode: string, campusCode: string) {
    let params = new HttpParams();
    params = params.set('ORG_CODE', orgCode);
    params = params.set('CAMPUS_CODE', campusCode);
    return this.httpClient.get(UrlConstants.getDashboardAllData, {params: params});
   }






}
