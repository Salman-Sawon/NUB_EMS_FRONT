import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  loadData: any;
  dialogData: any;
  private orgCode = new Subject<any>();
  private orgName = new Subject<any>();
  organizationBehav: BehaviorSubject<Array<any>> = new BehaviorSubject<any>('');
  organizationList = this.organizationBehav.asObservable();
  constructor(private http:HttpClient) { }

  getDialogData() {
    return this.dialogData;
  }

  setOrganizationCode(orgCode:any){
    this.orgCode.next(orgCode);
  }
  getOrganizationObs(): Observable<any> {
    return this.orgCode.asObservable();
}

setOrganizationName(orgName:any){
  this.orgName.next(orgName);
}
getOrganizationNameObs(): Observable<any> {
  return this.orgName.asObservable();
}

  getOrganizationList(userCode:any) : Observable<any> {
    let params = new HttpParams();
    params = params.set('userCode', userCode);
    return this.http.get(UrlConstants.getOrganizationList, {params: params});
  }

  setOrganizationList(userCode:any){
    this.getOrganizationList(userCode).subscribe((res: any) => {
      this.organizationBehav.next(Object.assign([], res.ResponseObj));
    })
  }

  // Organization Type List
  getOrganizationTypeList() : Observable<any> {
    return this.http.get(UrlConstants.getOrganizationTypeList);
  }

  setLoadData(loadData: any) {
    this.loadData = loadData;
  }

  getLoadData() {
    return this.loadData;
  }

}

