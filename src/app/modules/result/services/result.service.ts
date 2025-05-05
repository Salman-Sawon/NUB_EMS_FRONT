import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { TermListEntry } from '../models/term-list-entry';
import { TermList } from '../models/term-list';
import { RequestMessage } from '../models/request-message';
import { ResultGradeEntry } from '../models/result-grade-entry';
import { ResultSubjectWiseDetail } from '../models/examResultSubjectWiseDtl';
import { AssignSubjectList, ResultAssignSubjectParams } from '../models/assign-subject-list';
import { MarkChartList } from '../models/mark-chart-list';
import { ResultMarkChartArray } from '../models/result-mark-chart-array';
import { ResultMarkChart } from '../models/result-mark-chart';
import { saveSubjectAssign, SubjectTemplateAssign } from '../models/subject-template-assign';
import { AttendanceProcessPrams, ResultAttendanceGridPrams, ResultAttendanceMstPrams, ResultAttendanceSystemGridPrams, ResultAttendanceSystemMstPrams } from '../models/result-attendance';


@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private httpClient: HttpClient) { }
  request: RequestMessage = new RequestMessage();

  getTermEntryGridList( organizationCode: string, classCode: string, versionCode: string, groupCode: string,  sessionCode: string,yearCode: string,semesterCode: string): Observable<any> {
    let params = new HttpParams();
    // alert(TERM_ID);
    params = params.set('ORG_CODE', organizationCode);
    params = params.set('CLASS_CODE', classCode);
    params = params.set('VERSION_CODE', versionCode);
    params = params.set('GROUP_CODE', groupCode);
    params = params.set('SESSION_CODE', sessionCode);
    params = params.set('YEAR_CODE', yearCode);
    params = params.set('SEMESTER_CODE', semesterCode);
    return this.httpClient.get(UrlConstants.getYearlyTermGrid, { params: params});
  }

  saveAcademicTermEntry(TermListinfo:TermListEntry ) {
    const formData = new FormData();
    formData.append('ORG_CODE', TermListinfo.ORG_CODE);
    formData.append('CLASS_CODE', TermListinfo.CLASS_CODE);
    formData.append('GROUP_CODE', TermListinfo.GROUP_CODE);
    formData.append('VERSION_CODE', TermListinfo.VERSION_CODE);
    formData.append('SESSION_CODE', TermListinfo.SESSION_CODE);
    formData.append('YEAR_CODE', TermListinfo.YEAR_CODE);
    formData.append('SEMESTER_CODE', TermListinfo.SEMESTER_CODE);
    const TERM_DESCRIPTION = TermListinfo.TERM_DESCRIPTION;
    for (let i = 0; i < TERM_DESCRIPTION.length; i++) {
      formData.append('TERM_DESCRIPTION', TERM_DESCRIPTION[i]);
    }
    const TERM_DESCRIPTION_BANGLA = TermListinfo.TERM_DESCRIPTION_BANGLA;
    for (let i = 0; i < TERM_DESCRIPTION_BANGLA.length; i++) {
      formData.append('TERM_DESCRIPTION_BANGLA', TERM_DESCRIPTION_BANGLA[i] ? TERM_DESCRIPTION_BANGLA[i] : '');
    }
    const START_DATE = TermListinfo.START_DATE;
    for (let i = 0; i < START_DATE.length; i++) {
      formData.append('START_DATE', START_DATE[i]);
    }
    const END_DATE = TermListinfo.END_DATE;
    for (let i = 0; i < END_DATE.length; i++) {
      formData.append('END_DATE', END_DATE[i]);
    }
    const SERIAL = TermListinfo.SERIAL;
    for (let i = 0; i < SERIAL.length; i++) {
      formData.append('SERIAL', SERIAL[i]);
    }
    return this.httpClient.post(UrlConstants.saveAcademicTermEntry, formData);

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
  //  params = params.set('SECTION_CODE', term.SECTION_CODE);
    // params = params.set('SUBJECT_CODE', subjectCode);
   
    return this.httpClient.get(UrlConstants.getTermList, { params: params});
  }

  GetTeacherList(ORG_CODE: string, CAMPUS_CODE: string) {
    let params = new HttpParams();
    params = params.set('Org_Code', ORG_CODE);
    params = params.set('Campus_Code', CAMPUS_CODE);
     return this.httpClient.get(UrlConstants.getTeacher, {params: params});
   }

   getExamTypeGrid(TERM_ID: any, classCode: string, sessionCode: string, groupCode: string, versionCode: string,YEAR_CODE: string, SEMESTER_CODE: string,organizationCode: string ,campusCode: string): Observable<any> {
    let params = new HttpParams();
    // alert(TERM_ID);
    params = params.set('TERM_ID', TERM_ID);
    params = params.set('CLASS_CODE', classCode);
    params = params.set('SESSION_CODE', sessionCode);
    params = params.set('GROUP_CODE', groupCode);
    params = params.set('VERSION_CODE', versionCode);
    params = params.set('YEAR_CODE', YEAR_CODE);
    params = params.set('SEMESTER_CODE', SEMESTER_CODE);
   // params = params.set('SECTION_CODE', SECTION_CODE);
    // params = params.set('SUBJECT_CODE', subjectCode);
    params = params.set('ORG_CODE', organizationCode);
    params = params.set('CAMPUS_CODE', campusCode);
    

    return this.httpClient.get(UrlConstants.getExamTypeGrid, { params: params});
  }

  saveUptDltExamType(examType: any) {
    this.request.requestObject = JSON.stringify(examType);
    return this.httpClient.post(UrlConstants.saveExamType, this.request);
  }

  getGradeGridList(gradeGridView: ResultGradeEntry): Observable<any> {
    let params = new HttpParams();
    // alert(TERM_ID);
    params = params.set('ORG_CODE',gradeGridView.ORG_CODE);
    params = params.set('CLASS_CODE',gradeGridView. CLASS_CODE);
    params = params.set('VERSION_CODE',gradeGridView. VERSION_CODE);
    params = params.set('GROUP_CODE',gradeGridView. GROUP_CODE);
    params = params.set('SESSION_CODE',gradeGridView. SESSION_CODE);
    params = params.set('YEAR_CODE',gradeGridView. YEAR_CODE);
    params = params.set('SEMESTER_CODE',gradeGridView. SEMESTER_CODE);
    params = params.set('CAMPUS_CODE',gradeGridView. CAMPUS_CODE);
    
    return this.httpClient.get(UrlConstants.getResultGradeGrid, { params: params});
  }


  saveResultGradeEntry(grade: any) {
    this.request.requestObject = JSON.stringify(grade);
    return this.httpClient.post(UrlConstants.saveResultGradeEntry, this.request);
  }

  SubjectTemplateList(organizationCode: string, userCode: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('organizationCode', organizationCode);
    params = params.set('userCode', userCode);

    return this.httpClient.get(UrlConstants.subjectTemplateList, { params: params});
  }
  getSubjectTemplateGridList(subjectTemplateId: any, organizationCode: string, userCode: string) {
    let params = new HttpParams();
    params = params.set('subjectTemplateId', subjectTemplateId);
    params = params.set('organizationCode', organizationCode);
    params = params.set('userCode', userCode);

    return this.httpClient.get(UrlConstants.getSubjectTemplateList, { params: params});
  }
  GetResultSubjectList(organizationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organizationCode)
    return this.httpClient.get(UrlConstants.getResultSubjectList,{ params: params });
  }
  saveUptDltSubjectTemplateMaster(subjectTemplateMaster: any) {
    this.request.requestObject = JSON.stringify(subjectTemplateMaster);
    return this.httpClient.post(UrlConstants.saveUptDltSubjectTemplateMaster, this.request);
  }
  getsubjectassignList(subject:AssignSubjectList): Observable<any> {
    let params = new HttpParams();
    params = params.set('ORG_CODE', subject.ORG_CODE);
    params = params.set('CLASS_CODE', subject.CLASS_CODE);
    params = params.set('SESSION_CODE',subject.SESSION_CODE);
    params = params.set('GROUP_CODE', subject.GROUP_CODE);
    params = params.set('VERSION_CODE', subject.VERSION_CODE);
    params = params.set('YEAR_CODE', subject.YEAR_CODE);
    params = params.set('SEMESTER_CODE', subject.SEMESTER_CODE);
    params = params.set('CAMPUS_CODE', subject.CAMPUS_CODE);
    
   
    return this.httpClient.get(UrlConstants.getsubjectassignList, { params: params});
  }
  
  getExamCaptionList(TERM_ID: any, classCode: string, sessionCode: string, groupCode: string,versionCode: string, yearCode: string,semesterCode: string,campusCode: string, organizationCode: string): Observable<any> {
    let params = new HttpParams();
    // alert(TERM_ID);
    params = params.set('TERM_ID', TERM_ID);
    params = params.set('CLASS_CODE', classCode);
    params = params.set('SESSION_CODE', sessionCode);
    params = params.set('GROUP_CODE', groupCode);
    params = params.set('VERSION_CODE', versionCode);
    params = params.set('YEAR_CODE', yearCode);
    params = params.set('SEMESTER_CODE', semesterCode);
    params = params.set('CAMPUS_CODE', campusCode);
    // params = params.set('SUBJECT_CODE', subjectCode);
    params = params.set('ORG_CODE', organizationCode);
    

    return this.httpClient.get(UrlConstants.getExamCaptionList, { params: params});
  }


  GetResultMarkStudentList(resultInfo: ResultSubjectWiseDetail) {
    let params = new HttpParams();
    params = params.set('ORG_CODE', resultInfo.ORG_CODE);
    params = params.set('CLASS_CODE', resultInfo.CLASS_CODE);
    params = params.set('GROUP_CODE', resultInfo.GROUP_CODE);
    params = params.set('VERSION_CODE', resultInfo.VERSION_CODE);
    params = params.set('SESSION_CODE', resultInfo.SESSION_CODE);
    params = params.set('SHIFT_CODE', resultInfo.SHIFT_CODE);
    params = params.set('SECTION_CODE', resultInfo.SECTION_CODE);
    params = params.set('YEAR_CODE', resultInfo.YEAR_CODE);
    params = params.set('SEMESTER_CODE', resultInfo.SEMESTER_CODE);
    params = params.set('SUBJECT_CODE', resultInfo.SUBJECT_CODE);
    params = params.set('TERM_ID', resultInfo.TERM_ID.toString());
    return this.httpClient.get(UrlConstants.getResultMarkStudentList, { params: params});
  }
  saveResultMarkBulkInfo(resultBulkInfo: any) {
    this.request.requestObject = JSON.stringify(resultBulkInfo);
    return this.httpClient.post(UrlConstants.saveResultMarkBulkInfo, this.request);
  }

  GetMarkChartInfo(TERM:MarkChartList): Observable<any> {
    let params = new HttpParams();
    params = params.set('ORG_CODE', TERM.ORG_CODE);
    params = params.set('CLASS_CODE', TERM.CLASS_CODE);
    params = params.set('GROUP_CODE',TERM. GROUP_CODE);
    params = params.set('VERSION_CODE',TERM. VERSION_CODE);
    params = params.set('SESSION_CODE',TERM. SESSION_CODE);
    params = params.set('YEAR_CODE', TERM.YEAR_CODE);
    params = params.set('SEMESTER_CODE', TERM.SEMESTER_CODE);
    params = params.set('CAMPUS_CODE',TERM. CAMPUS_CODE);
    params = params.set('TERM_ID', TERM.TERM_ID);
    return this.httpClient.get(UrlConstants.getExamMarkChartInfo, { params: params});
  }
  GetResultMarkDistributionGrid(TERM:MarkChartList): Observable<any> {
    let params = new HttpParams();
    params = params.set('ORG_CODE', TERM.ORG_CODE);
    params = params.set('CLASS_CODE', TERM.CLASS_CODE);
    params = params.set('GROUP_CODE',TERM. GROUP_CODE);
    params = params.set('VERSION_CODE',TERM. VERSION_CODE);
    params = params.set('SESSION_CODE',TERM. SESSION_CODE);
    params = params.set('YEAR_CODE', TERM.YEAR_CODE);
    params = params.set('SEMESTER_CODE', TERM.SEMESTER_CODE);
    params = params.set('CAMPUS_CODE',TERM. CAMPUS_CODE);
    params = params.set('TERM_ID', TERM.TERM_ID);
    return this.httpClient.get(UrlConstants.getResultMarkDistributionGrid, { params: params});
  }

  SaveMarkChartCopyForm(subCreation: ResultMarkChartArray) {
    this.request.requestObject = JSON.stringify(subCreation);
    return this.httpClient.post(UrlConstants.saveExamMartChartArray,this.request);
  }

  SaveMarkChart(subCreation: ResultMarkChart) {
    this.request.requestObject = JSON.stringify(subCreation);
    return this.httpClient.post(UrlConstants.saveExamMarkChart,this.request);
  }

  DeleteMarkChartItem(deleteMarkChartItem: ResultMarkChart){
    const formData = new FormData();
    formData.append('ORG_CODE', deleteMarkChartItem.ORG_CODE);
    formData.append('TERM_ID', deleteMarkChartItem.TERM_ID.toString());
    formData.append('CLASS_CODE', deleteMarkChartItem.CLASS_CODE);
    formData.append('SESSION_CODE', deleteMarkChartItem.SESSION_CODE);
    formData.append('GROUP_CODE', deleteMarkChartItem.GROUP_CODE);
    formData.append('VERSION_CODE', deleteMarkChartItem.VERSION_CODE);
    formData.append('SUBJECT_CODE', deleteMarkChartItem.SUBJECT_CODE);
    return this.httpClient.post(UrlConstants.deleteMarkChartItem, formData);

  }

  SaveExamResultPro(examResultPro: any) {
    this.request.requestObject = JSON.stringify(examResultPro);
    return this.httpClient.post(UrlConstants.resultProcess, this.request);
  } 

  getStudentSearchList(organizationCode: string, campusCode: string, M_WhereString: string, PageNumber:number): Observable<any> {
    let params = new HttpParams();
    params = params.set('organizationCode', organizationCode);
    params = params.set('campusCode', campusCode);
    params = params.set('M_WhereString',M_WhereString.replace(/\s/g, ""));
    params = params.set('PageNumber',PageNumber);
    return this.httpClient.get(UrlConstants.getStudentDataSearch,{ params: params });
  }
  AssignSubjectTemplate(subCreation: SubjectTemplateAssign) {
    this.request.requestObject = JSON.stringify(subCreation);
    return this.httpClient.post(UrlConstants.subjectTemplateAssign,this.request);
  }
  
  getResultAttendanceConfig(resultAttendanceGridPrams: ResultAttendanceGridPrams) {
    let params = new HttpParams();
    // alert(TERM_ID);
    params = params.set('ORG_CODE', resultAttendanceGridPrams.ORG_CODE);
    params = params.set('CAMPUS_CODE', resultAttendanceGridPrams.CAMPUS_CODE);
    params = params.set('CLASS_CODE', resultAttendanceGridPrams.CLASS_CODE);
    params = params.set('GROUP_CODE', resultAttendanceGridPrams.GROUP_CODE);
    params = params.set('VERSION_CODE', resultAttendanceGridPrams.VERSION_CODE);
    params = params.set('SESSION_CODE', resultAttendanceGridPrams.SESSION_CODE);
    params = params.set('YEAR_CODE', resultAttendanceGridPrams.YEAR_CODE);
    params = params.set('SEMESTER_CODE', resultAttendanceGridPrams.SEMESTER_CODE);
    return this.httpClient.get(UrlConstants.getResultAttendanceConfig, { params: params});
  } 
  SaveResultAttendanceConfigMst(parameterInfo: ResultAttendanceMstPrams) {
    const formData = new FormData();
    formData.append('ORG_CODE', parameterInfo.ORG_CODE);
    formData.append('CAMPUS_CODE', parameterInfo.CAMPUS_CODE);
    formData.append('CLASS_CODE', parameterInfo.CLASS_CODE);
    formData.append('GROUP_CODE', parameterInfo.GROUP_CODE);
    formData.append('VERSION_CODE', parameterInfo.VERSION_CODE);
    formData.append('SESSION_CODE', parameterInfo.SESSION_CODE);
    formData.append('YEAR_CODE', parameterInfo.YEAR_CODE);
    formData.append('SEMESTER_CODE', parameterInfo.SEMESTER_CODE);
    formData.append('TERM_ID', parameterInfo.TERM_ID.toString());
    formData.append('IS_RES_ATT', parameterInfo.IS_RES_ATT);
    formData.append('RowStatus', parameterInfo.RowStatus.toString());
    formData.append('RES_ATT_CONF_ID', parameterInfo.RES_ATT_CONF_ID.toString());
    formData.append('User_Name', parameterInfo.User_Name);
    
    return this.httpClient.post(UrlConstants.SaveResultAttendanceConfigMst, formData);
  }
  getResultAttendanceSystemConfigGrid(parameterInfo: ResultAttendanceSystemGridPrams) {
    let params = new HttpParams();
    // alert(TERM_ID);
    params = params.set('ORG_CODE', parameterInfo.ORG_CODE);
    params = params.set('CAMPUS_CODE', parameterInfo.CAMPUS_CODE);
    params = params.set('CLASS_CODE', parameterInfo.CLASS_CODE);
    params = params.set('GROUP_CODE', parameterInfo.GROUP_CODE);
    params = params.set('VERSION_CODE', parameterInfo.VERSION_CODE);
    params = params.set('SESSION_CODE', parameterInfo.SESSION_CODE);
    params = params.set('YEAR_CODE', parameterInfo.YEAR_CODE);
    params = params.set('SEMESTER_CODE', parameterInfo.SEMESTER_CODE);
    return this.httpClient.get(UrlConstants.getResultAttendanceSystemConfigGrid, { params: params});
  }

  SaveResultAttendanceSystemConfigMst(parameterInfo: ResultAttendanceSystemMstPrams) {
    const formData = new FormData();
    formData.append('ORG_CODE', parameterInfo.ORG_CODE);
    formData.append('CAMPUS_CODE', parameterInfo.CAMPUS_CODE);
    formData.append('CLASS_CODE', parameterInfo.CLASS_CODE);
    formData.append('GROUP_CODE', parameterInfo.GROUP_CODE);
    formData.append('VERSION_CODE', parameterInfo.VERSION_CODE);
    formData.append('SESSION_CODE', parameterInfo.SESSION_CODE);
    formData.append('YEAR_CODE', parameterInfo.YEAR_CODE);
    formData.append('SEMESTER_CODE', parameterInfo.SEMESTER_CODE);
    formData.append('IS_ALL_SUB_ATT', parameterInfo.IS_ALL_SUB_ATT);
    formData.append('RowStatus', parameterInfo.RowStatus.toString());
    formData.append('RES_ATT_SYS_CONF_ID', parameterInfo.RES_ATT_SYS_CONF_ID.toString());
    formData.append('User_Name', parameterInfo.User_Name);
    
    return this.httpClient.post(UrlConstants.SaveResultAttendanceSystemConfigMst, formData);
  }

  AttendanceMarkProcess(parameterInfo: AttendanceProcessPrams) {
    const formData = new FormData();
    formData.append('ORG_CODE', parameterInfo.ORG_CODE);
    formData.append('CAMPUS_CODE', parameterInfo.CAMPUS_CODE);
    formData.append('CLASS_CODE', parameterInfo.CLASS_CODE);
    formData.append('GROUP_CODE', parameterInfo.GROUP_CODE);
    formData.append('VERSION_CODE', parameterInfo.VERSION_CODE);
    formData.append('SECTION_CODE', parameterInfo.SECTION_CODE);
    formData.append('SESSION_CODE', parameterInfo.SESSION_CODE);
    formData.append('YEAR_CODE', parameterInfo.YEAR_CODE);
    formData.append('SEMESTER_CODE', parameterInfo.SEMESTER_CODE);
    formData.append('SHIFT_CODE', parameterInfo.SHIFT_CODE);
    formData.append('TERM_ID', parameterInfo.TERM_ID.toString());
    formData.append('USER_CODE', parameterInfo.USER_CODE);
    
    return this.httpClient.post(UrlConstants.SaveAttendanceMarkProcess, formData);
  }




  getTermSubjExmcaptionList( organizationCode: string,campusCode: string): Observable<any> {
    let params = new HttpParams();

    params = params.set('ORG_CODE', organizationCode);
    params = params.set('CAMPUS_CODE', campusCode);
    

    return this.httpClient.get(UrlConstants.getTermSubjExmcaptionList, { params: params});
  }



  getResultAssignSubjectParamsGrid(parameterInfo: ResultAssignSubjectParams) {
    let params = new HttpParams();
    
    params = params.set('ORG_CODE', parameterInfo.ORG_CODE);
    params = params.set('CAMPUS_CODE', parameterInfo.CAMPUS_CODE);
    params = params.set('CLASS_CODE', parameterInfo.CLASS_CODE);
    params = params.set('GROUP_CODE', parameterInfo.GROUP_CODE);
    params = params.set('VERSION_CODE', parameterInfo.VERSION_CODE);
    params = params.set('SESSION_CODE', parameterInfo.SESSION_CODE);
    params = params.set('YEAR_CODE', parameterInfo.YEAR_CODE);
    params = params.set('SEMESTER_CODE', parameterInfo.SEMESTER_CODE);
    params = params.set('SHIFT_CODE', parameterInfo.SHIFT_CODE);
    params = params.set('SECTION_CODE', parameterInfo.SECTION_CODE);
    return this.httpClient.get(UrlConstants.getResultAssignSubjectGrid, { params: params});
  }

  saveAssignSubject(subCreation: saveSubjectAssign) {
    console.log('subCreation',subCreation);
    
    this.request.requestObject = JSON.stringify(subCreation);
    return this.httpClient.post(UrlConstants.savesubjectAssign,this.request);
  }

  // saveAssignSubject(subCreation: saveSubjectAssign) {
  //       return this.httpClient.post(UrlConstants.savesubjectAssign, subCreation);
  //     }


}
