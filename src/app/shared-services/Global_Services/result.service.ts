import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class ResultService {



  constructor(private http:HttpClient) { }

  getResultSubjectList() : Observable<any> {
    return this.http.get(UrlConstants.getTabSheetSubjectList);
  }

  getExamCaptionList() : Observable<any> {
    return this.http.get(UrlConstants.getTabSheetExamCaptionList);
  }

  //  getResultDetailsList(tabulationSheetInfo:TabulationSheetInfo) : Observable<any> {
  // //   organizationCode: string, classCode: string, groupCode: string, versionCode: string,
  // //   sessionCode: string, term: any, section: string, shift: string, campus: string, userName: string
  //   let params = new HttpParams();
  //   params = params.set('ORG_CODE', tabulationSheetInfo.ORG_CODE);
  //   params = params.set('CAMPUS_CODE', tabulationSheetInfo.CAMPUS_CODE);
  //   params = params.set('CLASS_CODE', tabulationSheetInfo.CLASS_CODE);
  //   params = params.set('GROUP_CODE', tabulationSheetInfo.GROUP_CODE);
  //   params = params.set('VERSION_CODE', tabulationSheetInfo.VERSION_CODE);
  //   params = params.set('SESSION_CODE', tabulationSheetInfo.SESSION_CODE);
  //   params = params.set('SECTION_CODE', tabulationSheetInfo.SECTION_CODE);
  //   params = params.set('SHIFT_CODE', tabulationSheetInfo.SHIFT_CODE);
  //   params = params.set('SEMESTER_CODE', tabulationSheetInfo.SEMESTER_CODE);
  //   params = params.set('YEAR_CODE', tabulationSheetInfo.YEAR_CODE);
  //   params = params.set('TERM_ID', tabulationSheetInfo.TERM_ID);
  //   params = params.set('USER_NAME', tabulationSheetInfo.USER_NAME);

  //   return this.http.get(UrlConstants.getTabSheetResultList,{params: params});
  // }

}
