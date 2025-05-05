import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { StudentAdmissionForm } from '../models/student.admission.info';
import { StudentapproveMst, Studentapproveparams } from '../models/studentapproveparams';

@Injectable({
  providedIn: 'root'
})
export class StudentAdmissionService {
  dialogData: any;
  studentAdmissionInfo: any;

  constructor(private httpClient: HttpClient) { }

  getDialogData() {
    return this.dialogData;
  }
  getadmissionstudentlist(studentapproveparams:Studentapproveparams): Observable<any> {
    let params = new HttpParams();
    params = params.set('ORG_CODE', studentapproveparams.ORG_CODE);
    params = params.set('CAMPUS_CODE', studentapproveparams.CAMPUS_CODE);
    params = params.set('SESSION_CODE',studentapproveparams.SESSION_CODE);
    params = params.set('CLASS_CODE', studentapproveparams.CLASS_CODE);
    return this.httpClient.get(UrlConstants.getApproveStudentList, { params: params});
  }

  getAlreadyApproveStudentList(studentapproveparams:Studentapproveparams): Observable<any> {
    let params = new HttpParams();
    params = params.set('ORG_CODE', studentapproveparams.ORG_CODE);
    params = params.set('CAMPUS_CODE', studentapproveparams.CAMPUS_CODE);
    params = params.set('SESSION_CODE',studentapproveparams.SESSION_CODE);
    params = params.set('CLASS_CODE', studentapproveparams.CLASS_CODE);
    params = params.set('START_DATE', studentapproveparams.START_DATE);
    params = params.set('END_DATE', studentapproveparams.END_DATE);

    return this.httpClient.get(UrlConstants.getAlreadyApproveStudentList, { params: params});
  }
  saveStudentApproveMst(parameterInfo: StudentapproveMst) {
    const formData = new FormData();

    formData.append('ORG_CODE', parameterInfo.ORG_CODE);
    formData.append('CAMPUS_CODE', parameterInfo.CAMPUS_CODE);
    formData.append('SESSION_CODE', parameterInfo.SESSION_CODE);
    formData.append('CLASS_CODE', parameterInfo.CLASS_CODE);
    formData.append('USER_CODE', parameterInfo.USER_CODE);

     const admissionroll = parameterInfo.ADMISSION_ROLL;
    for(let i=0; i < admissionroll.length; i++){
      formData.append('ADMISSION_ROLL', admissionroll[i]);
    }
    formData.append('ROW_STATUS', parameterInfo.ROW_STATUS.toString());


    return this.httpClient.post(UrlConstants.saveApproveStudentList, formData);
  }

  // public crtuptDltStdAdmissionInfo(studentAdmissionInfo: any) {
  //   this.requestMsg.requestObject = JSON.stringify(studentAdmissionInfo);
  //    return this.httpClient.post(UrlConstants.crtUptDltStudentAdmissionInfo, this.requestMsg);
  //  }
  // public SaveStudentInfoForm(studentAdmissionForm: any) {
  //   this.requestMsg.requestObject = JSON.stringify(studentAdmissionForm);
  //    return this.httpClient.post(UrlConstants.crtUptDltStudentAdmissionInfo, this.requestMsg);
  //  }

   SaveStudentInfoForm(studentAdmissionForm:StudentAdmissionForm ) {

    const formData = new FormData();
    formData.append('MyFile', studentAdmissionForm.MyFile);
    formData.append('RowStatus', studentAdmissionForm.RowStatus ? studentAdmissionForm.RowStatus.toString():'');
   // formData.append("STUDENT_ID", studentAdmissionForm.STUDENT_ID ? studentAdmissionForm.STUDENT_ID.toString() : '');
    formData.append('STUDENT_ID', studentAdmissionForm.STUDENT_ID.toString());
    formData.append('STUDENT_CODE', studentAdmissionForm.STUDENT_CODE);
    formData.append('ORG_CODE', studentAdmissionForm.ORG_CODE);
    formData.append('ORG_NAME', studentAdmissionForm.ORG_NAME);
    formData.append('CAMPUS_CODE', studentAdmissionForm.CAMPUS_CODE);
    formData.append('CAMPUS_NAME', studentAdmissionForm.CAMPUS_NAME);
    formData.append('CLASS_CODE', studentAdmissionForm.CLASS_CODE);
    formData.append('CLASS_NAME', studentAdmissionForm.CLASS_NAME);
    formData.append('GROUP_CODE', studentAdmissionForm.GROUP_CODE);
    formData.append('VERSION_CODE', studentAdmissionForm.VERSION_CODE);
    formData.append('START_SESSION_CODE', studentAdmissionForm.START_SESSION_CODE);
    formData.append('CUR_SESSION_CODE', studentAdmissionForm.CUR_SESSION_CODE);
    formData.append('SECTION_CODE', studentAdmissionForm.SECTION_CODE);
    formData.append('YEAR_CODE', studentAdmissionForm.YEAR_CODE);
    formData.append('SEMESTER_CODE', studentAdmissionForm.SEMESTER_CODE);
    formData.append('SHIFT_CODE', studentAdmissionForm.SHIFT_CODE);
    formData.append('CLASS_ROLL', studentAdmissionForm.CLASS_ROLL);
    formData.append('STUDENT_NAME', studentAdmissionForm.STUDENT_NAME);
    formData.append('SUR_NAME', studentAdmissionForm.SUR_NAME ?studentAdmissionForm.SUR_NAME:'');
    formData.append('DATE_OF_BIRTH', studentAdmissionForm.DATE_OF_BIRTH ? studentAdmissionForm.DATE_OF_BIRTH:'');
    formData.append('ADMISSION_DATE', studentAdmissionForm.ADMISSION_DATE);
    formData.append('SMS_MOBILE_NUM', studentAdmissionForm.SMS_MOBILE_NUM);
    formData.append('BIRTH_REG_NUMBER', studentAdmissionForm.BIRTH_REG_NUMBER? studentAdmissionForm.BIRTH_REG_NUMBER:'');
    formData.append('GENDER_CODE', studentAdmissionForm.GENDER_CODE? studentAdmissionForm.GENDER_CODE:'');
    formData.append('BLOOD_GROUP_CODE', studentAdmissionForm.BLOOD_GROUP_CODE? studentAdmissionForm.BLOOD_GROUP_CODE:'');
    formData.append('RELIGION_CODE', studentAdmissionForm.RELIGION_CODE? studentAdmissionForm.RELIGION_CODE:'');
    formData.append('STUDENT_IMG', studentAdmissionForm.STUDENT_IMG ? studentAdmissionForm.STUDENT_IMG:'');
    formData.append('FATHERS_NAME', studentAdmissionForm.FATHERS_NAME ? studentAdmissionForm.FATHERS_NAME:'');
    formData.append('FATHERS_NID', studentAdmissionForm.FATHERS_NID ? studentAdmissionForm.FATHERS_NID:'');
    formData.append('FATHER_OCCUPATION', studentAdmissionForm.FATHER_OCCUPATION ? studentAdmissionForm.FATHER_OCCUPATION:'');
    formData.append('FATHER_CONTACT_NO', studentAdmissionForm.FATHER_CONTACT_NO ? studentAdmissionForm.FATHER_CONTACT_NO:'');
    formData.append('MOTHERS_NAME', studentAdmissionForm.MOTHERS_NAME ? studentAdmissionForm.MOTHERS_NAME:'');
    formData.append('MOTHERS_NID', studentAdmissionForm.MOTHERS_NID ? studentAdmissionForm.MOTHERS_NID:'');
    formData.append('MOTHER_OCCUPATION', studentAdmissionForm.MOTHER_OCCUPATION ? studentAdmissionForm.MOTHER_OCCUPATION:'');
    formData.append('MOTHER_CONTACT_NO', studentAdmissionForm.MOTHER_CONTACT_NO ? studentAdmissionForm.MOTHER_CONTACT_NO:'');
    formData.append('GURDIAN_NAME', studentAdmissionForm.GURDIAN_NAME ? studentAdmissionForm.GURDIAN_NAME:'');
    formData.append('GUARDIAN_NID', studentAdmissionForm.GUARDIAN_NID ? studentAdmissionForm.GUARDIAN_NID:'');
    formData.append('GUARDIAN_OCCUPATION', studentAdmissionForm.GUARDIAN_OCCUPATION ? studentAdmissionForm.GUARDIAN_OCCUPATION:'');
    formData.append('GUARDIAN_CONTACT_NO', studentAdmissionForm.GUARDIAN_CONTACT_NO ? studentAdmissionForm.GUARDIAN_CONTACT_NO:'');
    formData.append('GUARDIAN_RELATION_TYPE_CODE', studentAdmissionForm.GUARDIAN_RELATION_TYPE_CODE ? studentAdmissionForm.GUARDIAN_RELATION_TYPE_CODE:'');
    formData.append('SIBLING_STUDENT_CODE', studentAdmissionForm.SIBLING_STUDENT_CODE ? studentAdmissionForm.SIBLING_STUDENT_CODE:'');
    formData.append('SIBLING_CLASS_CODE', studentAdmissionForm.SIBLING_CLASS_CODE ? studentAdmissionForm.SIBLING_CLASS_CODE:'');
    formData.append('EMAIL_ADDRESS', studentAdmissionForm.EMAIL_ADDRESS ? studentAdmissionForm.EMAIL_ADDRESS:'');
    formData.append('FACEBOOK_ID', studentAdmissionForm.FACEBOOK_ID ? studentAdmissionForm.FACEBOOK_ID:'');
    formData.append('PRESENT_ADDR', studentAdmissionForm.PRESENT_ADDR? studentAdmissionForm.PRESENT_ADDR:'');
    formData.append('PERMANENT_ADDR', studentAdmissionForm.PERMANENT_ADDR? studentAdmissionForm.PERMANENT_ADDR:'');
    formData.append('TRANSPORT', studentAdmissionForm.TRANSPORT? studentAdmissionForm.TRANSPORT:'');
    formData.append('USER_NAME', studentAdmissionForm.USER_NAME);
    return this.httpClient.post(UrlConstants.StudentAdmissionFormInfo, formData);

  }


}
