import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { SubjectEntry } from 'src/app/models/ResultNew/subject-entry';

@Injectable({
  providedIn: 'root'
})
export class ResultSubjectService {
  subGridDataChange: BehaviorSubject<SubjectEntry[]> = new BehaviorSubject<SubjectEntry[]>([]);
  subjectInfo: any;
  get subjectData(): SubjectEntry[]{
    return this.subjectInfo;
  }
  
  constructor(private httpClient: HttpClient) { }
  
  GetResultSubjectList(organinationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organinationCode)
    return this.httpClient.get(UrlConstants.getResultSubjectList,{ params: params });
  }
}
