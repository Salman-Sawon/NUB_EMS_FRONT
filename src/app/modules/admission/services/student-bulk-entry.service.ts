import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { StudentBulkEntry } from '../models/student-bulk-entry';
import { Observable } from 'rxjs';
import { StudentListParams } from '../models/fee-bill-generation-process';

@Injectable({
  providedIn: 'root'
})
export class StudentBulkEntryService {

  constructor(private httpClient: HttpClient) { }
  StudentBulkEntry(studentBulkentry:StudentBulkEntry) {
   
    return this.httpClient.post(UrlConstants.getStudentBulkEntry, studentBulkentry);
  }
  getStudentListReports(parameterData: StudentListParams): Observable<any> {
    let params = new HttpParams();
    params = params.set('ORG_CODE',parameterData.ORG_CODE);
    params = params.set('CAMPUS_CODE',parameterData. CAMPUS_CODE);
    params = params.set('CLASS_CODE',parameterData. CLASS_CODE);
    params = params.set('GROUP_CODE',parameterData. GROUP_CODE);
    params = params.set('VERSION_CODE',parameterData. VERSION_CODE);
    params = params.set('SESSION_CODE',parameterData. SESSION_CODE);
    params = params.set('SECTION_CODE',parameterData. SECTION_CODE);
    params = params.set('YEAR_CODE',parameterData. YEAR_CODE);
    params = params.set('SEMESTER_CODE',parameterData. SEMESTER_CODE);
    params = params.set('SHIFT_CODE',parameterData. SHIFT_CODE);
    params = params.set('USER_CODE',parameterData. USER_CODE);

    return this.httpClient.get(UrlConstants.getStudentListReports, { params: params});
  }

}
