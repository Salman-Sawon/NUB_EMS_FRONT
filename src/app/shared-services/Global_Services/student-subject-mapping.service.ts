import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class StudentSubjectMappingService {

  dialogData: any;
  stdSubjectMapping: any;
 

  constructor(private httpClient: HttpClient) { }

  GetClassList(value: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', value)
    return this.httpClient.get(UrlConstants.getClassList,{ params: params });
  }

  GetGroupList(value: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', value)
    return this.httpClient.get(UrlConstants.getGroupList,{ params: params });
  }

  GetVersionList(value: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', value);
    return this.httpClient.get(UrlConstants.getVersionList,{ params: params });
  }

  getSectionListByClassCode(classCode:string){
    let dataList = [];
    dataList = JSON.parse(localStorage.getItem('sectionList')!);
    if(dataList.length>0){
    dataList = dataList.filter((w:any)=>w.ID == classCode);
    }
    return dataList;
  }

  GetSectionList(organizationCode: string, classCode: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('organizationCode', organizationCode);
    params = params.set('classCode', classCode);
    return this.httpClient.get(UrlConstants.getSectionList,{ params: params });
  }

  GetSessionList(value: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', value)
    return this.httpClient.get(UrlConstants.getSessionList,{ params: params });
  }

  GetShiftList(value: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', value)
    return this.httpClient.get(UrlConstants.getShiftList,{ params: params });
  }

  GetSubjectList(organizationCode: string, classCode: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('organizationCode', organizationCode);
    params = params.set('classCode', classCode);
    return this.httpClient.get(UrlConstants.getSubjectList,{ params: params });
  }
}
