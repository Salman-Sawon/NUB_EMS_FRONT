import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { LocalStorageViewModel, LocalStorageViewModelcampus } from 'src/app/modules/auth/components/login/model/local-storage-view';

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  private campusName = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  setCampusName(campusName:any){
    this.campusName.next(campusName);
  }
  getCampusNameObs(): Observable<any> {
    return this.campusName.asObservable();
  }


  getOrgCampusList(orgCode: string): Observable<any>{

      let params = new HttpParams().set('organizationCode', orgCode)
      return this.httpClient.get(UrlConstants.getCampusList,{ params: params });
  }

  setCampusinLocalStorage(localStorageViewModel:LocalStorageViewModelcampus[])
  {
     this.setCampusName(localStorageViewModel[0].NAME);
    localStorage.setItem('CampusList', JSON.stringify(localStorageViewModel));
  }


  GetCampusList(value: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', value)
    return this.httpClient.get(UrlConstants.getCampusList,{ params: params });
  }

  GetCampusTypeList() {
    return this.httpClient.get(UrlConstants.getCampusTypeList);
  }
}
