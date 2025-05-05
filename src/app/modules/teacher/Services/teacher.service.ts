import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { TeacherQuickEntryInfo, TeacherSubMapInfo } from '../models/teacher-sub-map';
import { TeacherEntryForm } from '../models/teacher-entry-form';
import { TeacherProfileDataParams } from '../models/teacher-profile-data-params';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient : HttpClient) { }



  
  SaveTeacherBulkEntry(teacherBulkEntry: TeacherQuickEntryInfo): Observable<any> {
  
    return this.httpClient.post(UrlConstants.SaveTeacherBulkEntry, teacherBulkEntry);
  }

  // SaveTeacherFormEntry(teacherEntryForm: TeacherEntryForm): Observable<any> {
  
  //   return this.httpClient.post(UrlConstants.TeacherFormEntry, teacherEntryForm);
  // }

  






   GetTeacherList(ORG_CODE: string, CAMPUS_CODE: string) {
    let params = new HttpParams();
    params = params.set('Org_Code', ORG_CODE);
    params = params.set('Campus_Code', CAMPUS_CODE);
     return this.httpClient.get(UrlConstants.getTeacher, {params: params});
   }



   GetTeacherInfo(userCode: string, ) {
    let params = new HttpParams();
    params = params.set('userCode', userCode);
     return this.httpClient.get(UrlConstants.getTeacherInfo, {params: params});
   }

   getActiveTeacherList(ORG_CODE: string, ) {
    let params = new HttpParams();
    params = params.set('ORG_CODE', ORG_CODE);
     return this.httpClient.get(UrlConstants.getActiveTeacherList, {params: params});
   }
GetTeacherInfoGrid(organizationCode: string, campusCode: string,  PageNumber:number): Observable<any> {
  let params = new HttpParams();
    params = params.set('ORG_CODE', organizationCode);
    params = params.set('CAMPUS_CODE', campusCode);
    params = params.set('PAGE_NUMBER',PageNumber);
    return this.httpClient.get(UrlConstants.getTeacherInfoGrid,{ params: params });
  }



 


}
