import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { TermList } from '../models/term-list';
import { TermListEntry } from '../models/term-list-entry';

@Injectable({
  providedIn: 'root'
})
export class ExamResultService {

  constructor(private httpClient: HttpClient) { }







  getGradeGridLoad(): Observable<any> {
    let params = new HttpParams();
    // alert(TERM_ID);
    return this.httpClient.get(UrlConstants.getResultGradeGridLoad, { params: params});
  }


  getExamCaptionList(TERM_ID: any, classCode: string, sessionCode: string, groupCode: string,versionCode: string, yearCode: string,semesterCode: string,sectionCode: string, organizationCode: string): Observable<any> {
    let params = new HttpParams();
    // alert(TERM_ID);
    params = params.set('TERM_ID', TERM_ID);
    params = params.set('CLASS_CODE', classCode);
    params = params.set('SESSION_CODE', sessionCode);
    params = params.set('GROUP_CODE', groupCode);
    params = params.set('VERSION_CODE', versionCode);
    params = params.set('YEAR_CODE', yearCode);
    params = params.set('SEMESTER_CODE', semesterCode);
    params = params.set('SECTION_CODE', sectionCode);
    // params = params.set('SUBJECT_CODE', subjectCode);
    params = params.set('ORG_CODE', organizationCode);
    

    return this.httpClient.get(UrlConstants.getExamCaptionList, { params: params});
  }
  getWorkingDaysGrid(ORG_CODE:string,CLASS_CODE:string,VERSION_CODE:string,GROUP_CODE:string,SESSION_CODE:string,YEAR_CODE:string,SEMESTER_CODE:string,SECTION_CODE:string,TERM_ID:number): Observable<any> {
    let params = new HttpParams();
    // alert(TERM_ID);
    params = params.set('ORG_CODE',ORG_CODE);
    params = params.set('CLASS_CODE',CLASS_CODE);
    params = params.set('VERSION_CODE',VERSION_CODE);
    params = params.set('GROUP_CODE',GROUP_CODE);
    params = params.set('SESSION_CODE',SESSION_CODE);
    params = params.set('YEAR_CODE',YEAR_CODE);
    params = params.set('SEMESTER_CODE',SEMESTER_CODE);
    params = params.set('SECTION_CODE',SECTION_CODE);
    params = params.set('TERM_ID',TERM_ID);
   
    return this.httpClient.get(UrlConstants.getWorkingdays, { params: params});
  }
  
  getStudentAttendance(ORG_CODE:string,CLASS_CODE:string,VERSION_CODE:string,GROUP_CODE:string,SESSION_CODE:string,YEAR_CODE:string,SEMESTER_CODE:string,SECTION_CODE:string,STATUS:number,USER_CODE:string): Observable<any> {
    let params = new HttpParams();
    // alert(TERM_ID);
    params = params.set('ORG_CODE',ORG_CODE);
    params = params.set('CLASS_CODE',CLASS_CODE);
    params = params.set('VERSION_CODE',VERSION_CODE);
    params = params.set('GROUP_CODE',GROUP_CODE);
    params = params.set('SESSION_CODE',SESSION_CODE);
    params = params.set('YEAR_CODE',YEAR_CODE);
    params = params.set('SEMESTER_CODE',SEMESTER_CODE);
    params = params.set('SECTION_CODE',SECTION_CODE);
    params = params.set('STATUS',STATUS.toString());
    params = params.set('USER_CODE',USER_CODE);
   
    return this.httpClient.get(UrlConstants.getStudentAttendance, { params: params});
  }

  geTeacherSignatureGrid(ORG_CODE:string,CLASS_CODE:string,VERSION_CODE:string,GROUP_CODE:string,SESSION_CODE:string,YEAR_CODE:string,SEMESTER_CODE:string,SECTION_CODE:string): Observable<any> {
    let params = new HttpParams();
    // alert(TERM_ID);
    params = params.set('ORG_CODE',ORG_CODE);
    params = params.set('CLASS_CODE',CLASS_CODE);
    params = params.set('VERSION_CODE',VERSION_CODE);
    params = params.set('GROUP_CODE',GROUP_CODE);
    params = params.set('SESSION_CODE',SESSION_CODE);
    params = params.set('YEAR_CODE',YEAR_CODE);
    params = params.set('SEMESTER_CODE',SEMESTER_CODE);
    params = params.set('SECTION_CODE',SECTION_CODE);
   
    return this.httpClient.get(UrlConstants.getTeacherSignature, { params: params});
  }

  getResultSummaryGrid(ORG_CODE:string,CLASS_CODE:string,VERSION_CODE:string,GROUP_CODE:string,SESSION_CODE:string,YEAR_CODE:string,SEMESTER_CODE:string,SECTION_CODE:string,TERM_ID:number,STATUS:number,USER_CODE:string ): Observable<any> {
    let params = new HttpParams();
    // alert(TERM_ID);
    params = params.set('ORG_CODE',ORG_CODE);
    params = params.set('CLASS_CODE',CLASS_CODE);
    params = params.set('VERSION_CODE',VERSION_CODE);
    params = params.set('GROUP_CODE',GROUP_CODE);
    params = params.set('SESSION_CODE',SESSION_CODE);
    params = params.set('YEAR_CODE',YEAR_CODE);
    params = params.set('SEMESTER_CODE',SEMESTER_CODE);
    params = params.set('SECTION_CODE',SECTION_CODE);
    params = params.set('TERM_ID',TERM_ID.toString());
    params = params.set('STATUS',STATUS.toString());
    params = params.set('USER_CODE',USER_CODE);
   
    return this.httpClient.get(UrlConstants.getResultSummaryGrid, { params: params});
  }


  getStudentResultTranscriptList( organizationCode: string, classCode: string, termid: number,VERSION_CODE:string,GROUP_CODE:string,SESSION_CODE:string,YEAR_CODE:string,SEMESTER_CODE:string,SECTION_CODE:string,STATUS:number,USER_CODE:string): Observable<any> {
    let params = new HttpParams();
    // alert(TERM_ID);
    params = params.set('ORG_CODE', organizationCode);
    params = params.set('CLASS_CODE', classCode);
    params = params.set('TERM_ID', termid);
    params = params.set('VERSION_CODE',VERSION_CODE);
    params = params.set('GROUP_CODE',GROUP_CODE);
    params = params.set('SESSION_CODE',SESSION_CODE);
    params = params.set('YEAR_CODE',YEAR_CODE);
    params = params.set('SEMESTER_CODE',SEMESTER_CODE);
    params = params.set('SECTION_CODE',SECTION_CODE);
    params = params.set('STATUS',STATUS.toString());
    params = params.set('USER_CODE',USER_CODE);
    
    
  
    return this.httpClient.get(UrlConstants.getStudentResultTranscriptList, { params: params});
  }

  getExamTermList(term:TermList): Observable<any> {
    let params = new HttpParams();
    params = params.set('ORG_CODE', term.ORG_CODE);
    params = params.set('CLASS_CODE', term.CLASS_CODE);
    params = params.set('SESSION_CODE',term.SESSION_CODE);
    params = params.set('GROUP_CODE', term.GROUP_CODE);
    params = params.set('VERSION_CODE', term.VERSION_CODE);
    params = params.set('YEAR_CODE', term.YEAR_CODE);
    params = params.set('SEMESTER_CODE', term.SEMESTER_CODE);
    
    // params = params.set('SUBJECT_CODE', subjectCode);
   
    return this.httpClient.get(UrlConstants.getTermList, { params: params});
  }


  getsubjectassignList(term:TermListEntry): Observable<any> {
    let params = new HttpParams();
    params = params.set('ORG_CODE', term.ORG_CODE);
    params = params.set('CLASS_CODE', term.CLASS_CODE);
    params = params.set('SESSION_CODE',term.SESSION_CODE);
    params = params.set('GROUP_CODE', term.GROUP_CODE);
    params = params.set('VERSION_CODE', term.VERSION_CODE);
    params = params.set('CAMPUS_CODE', term.CAMPUS_CODE);
    params = params.set('YEAR_CODE', term.YEAR_CODE);
    params = params.set('SEMESTER_CODE', term.SEMESTER_CODE);
   
    //params = params.set('SUBJECT_CODE', subjectCode);
   
    return this.httpClient.get(UrlConstants.getsubjectassignList, { params: params});
  }












}
