import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { StudentBulkEntry } from '../models/student-bulk-entry';

@Injectable({
  providedIn: 'root'
})
export class StudentBulkEntryService {

  constructor(private httpClient: HttpClient) { }
  StudentBulkEntry(studentBulkentry:StudentBulkEntry) {
   
    return this.httpClient.post(UrlConstants.getStudentBulkEntry, studentBulkentry);
  }
}
