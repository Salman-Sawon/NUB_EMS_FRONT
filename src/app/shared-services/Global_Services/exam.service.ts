import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { RequestMessage } from 'src/app/modules/result/models/request-message';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  request: RequestMessage = new RequestMessage();

  constructor(private httpClient: HttpClient) { }

  ExamList(exam: any) {
    this.request.requestObject = JSON.stringify(exam);
    return this.httpClient.post(UrlConstants.getExamList, this.request);
  }

  GetExamList(value: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', value)
    return this.httpClient.get(UrlConstants.getExamList,{ params: params });
  }

  GetExamDetailNameList(examDetail: any) {
    this.request.requestObject = JSON.stringify(examDetail);
    return this.httpClient.post(UrlConstants.getExamDetailNameList, this.request);
  }
  GetBoardExamList(value: string): Observable<any> {
    let params = new HttpParams().set('userCode', value)
    return this.httpClient.get(UrlConstants.getBoardExamList,{ params: params });
  }
  GradeList(grade: any) {
    this.request.requestObject = JSON.stringify(grade);
    return this.httpClient.post(UrlConstants.getGradeList, this.request);
  }

  GetGradeList(organizationCode: string, userCode: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('organizationCode', organizationCode);
    params = params.set('userCode', userCode);
    return this.httpClient.get(UrlConstants.getGradeList,{ params: params });
  }

  GetExamResultFinalPro(examResultFinalPro: any) {
    this.request.requestObject = JSON.stringify(examResultFinalPro);
    return this.httpClient.post(UrlConstants.getExamResultFinalProcess, this.request);
  } 

  // Get Exam Result Comments
  GetExamResultCommentList(paraData: any) {
    this.request.requestObject = JSON.stringify(paraData);
    return this.httpClient.post(UrlConstants.getExamResultComment, this.request);
  }

  // Save Exam Result Comment
  CreateExamResultComment(examResultComment: any) {
    this.request.requestObject = JSON.stringify(examResultComment);
    return this.httpClient.post(UrlConstants.saveExamResultComment, this.request);
  }
}
