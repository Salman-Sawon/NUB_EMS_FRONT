import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';
// import { StudentAttendenceVM } from 'src/app/models/Student/std-attendance-info-vw';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  message: string = '';
  private ngUnsubscribe = new Subject<void>();

  constructor(private httpClient: HttpClient) {

  }
  // Campus List
  GetCampusList(value: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', value)
    return this.httpClient.get(UrlConstants.getCampusList,{ params: params });
  }

  // Campus Type List
  GetCampusTypeList() {
    return this.httpClient.get(UrlConstants.getCampusTypeList);
  }

  // Class List
  // GetClassList(){
  //   let dataList = [];
  //   dataList = JSON.parse(localStorage.getItem('classList'));
  //   return dataList;
  // }
  GetClassList(organizationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organizationCode)
    return this.httpClient.get(UrlConstants.getClassList,{ params: params });
  }

  // Group List
  GetGroupList(organizationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organizationCode)
    return this.httpClient.get(UrlConstants.getGroupList,{ params: params });
  }

  // Version List
  GetVersionList(organizationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organizationCode)
    return this.httpClient.get(UrlConstants.getVersionList,{ params: params });
  }

  // getVersionList(organizationCode: string)
  // {
  //     //get from local storage
  //     //yes --> return
  //     //no --
  //     // subsribe to api
  //     // unsubscribe
  //     let versionList = JSON.parse(localStorage.getItem("versionList")!);
  //     if (!versionList) {
  //       let params = new HttpParams().set('organizationCode', organizationCode);
  //         // this.httpClient.get(UrlConstants.getVersionList, {params: params})
  //         //         .pipe(takeUntil(this.ngUnsubscribe))
  //         //         .subscribe((res:any= ResponseMessage) => {
  //         //          let dataList = [];
  //         //           dataList = res.ResponseObj;
  //         //           if(dataList.length>0)
  //         //               {
  //         //                 localStorage.setItem('versionList', JSON.stringify(dataList));
  //         //               }
  //         // });
  //         return this.httpClient.get(UrlConstants.getVersionList,{ params: params });
  //     } else {
  //       return versionList;
  //     }
  // }






  getSectionListByClassCodeRoutine(classCodes:string[]){
    let dataList = [];
    dataList = JSON.parse(localStorage.getItem('sectionList')!);

    if (dataList.length > 0) {
        dataList = dataList.filter((w: any) => classCodes.includes(w.ID));
    }

    return dataList;
  }






  getSmstypeList() {
    let params = new HttpParams();

    return this.httpClient.get(UrlConstants.GetSmsTypeList, {params: params});
  }







  getSectionListByRoutine(ORG_CODE: string) {


    let params = new HttpParams();
    params = params.set('ORG_CODE', ORG_CODE);

    return this.httpClient.get(UrlConstants. getSectionListByRoutine, {params: params});
  }

  getYearListByRoutine(ORG_CODE: string) {
    let params = new HttpParams();
    params = params.set('ORG_CODE', ORG_CODE);

    return this.httpClient.get(UrlConstants. getYearListByRoutine, {params: params});
  }

  getSemesterListByRoutine(ORG_CODE: string) {
    let params = new HttpParams();
    params = params.set('ORG_CODE', ORG_CODE);

    return this.httpClient.get(UrlConstants. getSemesterListByRoutine, {params: params});
  }

  getVersionListByClassCode(classCode:string){
    let dataList = [];
    dataList = JSON.parse(localStorage.getItem('versionList')!);
    if(dataList.length>0){
    dataList = dataList.filter((w:any)=>w.ID == classCode);
    }
    return dataList;
  }

  getSemesterListByClassCode(classCode:string){
    let dataList = [];
    dataList = JSON.parse(localStorage.getItem('semesterList')!);
    if(dataList.length>0){
    dataList = dataList.filter((w:any)=>w.ID == classCode);
    }
    return dataList;
  }

  getYearListByClassCode(classCode:string){
    let dataList = [];
    dataList = JSON.parse(localStorage.getItem('yearList')!);
    if(dataList.length>0){
    dataList = dataList.filter((w:any)=>w.ID == classCode);
    }
    return dataList;
  }
  getSectionListByClassCode(classCode:string){
    let dataList = [];
    dataList = JSON.parse(localStorage.getItem('sectionList')!);
    if(dataList.length>0){
    dataList = dataList.filter((w:any)=>w.ID == classCode);
    }
    return dataList;
  }

  //Section List
  GetSectionList(organizationCode: string, classCode: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('organizationCode', organizationCode)
    params = params.set('classCode', classCode)
    return this.httpClient.get(UrlConstants.getSectionList,{ params: params });
  }

  //New Section Service
  GetSection (userCode: string): Observable<any> {
    let params= new HttpParams().set('userCode', userCode)
    return this.httpClient.get(UrlConstants.getSection,{params: params});
  }


  // Session List
  GetSessionList(organizationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organizationCode)
    return this.httpClient.get(UrlConstants.getSessionList,{ params: params });
  }

  // Shift List
  GetShiftList(organizationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organizationCode)
    return this.httpClient.get(UrlConstants.getShiftList,{ params: params });
  }

  GetYearList(organizationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organizationCode)
    return this.httpClient.get(UrlConstants.getYearList,{ params: params });
  }
  GetSemesterList(organizationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organizationCode)
    return this.httpClient.get(UrlConstants.getSemesterList,{ params: params });
  }

  // Teacher List
  public GetTeacherInfo(organizationCode: string, campusCode: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('Org_Code', organizationCode)
    params = params.set('Campus_Code', campusCode)
    return this.httpClient.get(UrlConstants.getTeacher, {params: params});
   }

   // Subject List
   GetSubjectList(organizationCode: string, classCode: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('organizationCode', organizationCode)
    params = params.set('classCode', classCode)
    return this.httpClient.get(UrlConstants.getSubjectList,{ params: params });
  }
  // Blood Group List
  GetBloodGroupList(organinationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organinationCode)
    return this.httpClient.get(UrlConstants.getBloodGroupList,{ params: params });
  }

  // Nationality List
  GetNationalityList(organinationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organinationCode)
    return this.httpClient.get(UrlConstants.getNationalityList,{ params: params });
  }

  // Birth Place List
  GetBirthPlaceList(): Observable<any> {
    return this.httpClient.get(UrlConstants.getBirthPlaceList);
  }

  // Religion List
  GetReligionList(organinationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organinationCode)
    return this.httpClient.get(UrlConstants.getReligionList,{ params: params });
  }

  // Gender List
  GetGenderList(organinationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organinationCode)
    return this.httpClient.get(UrlConstants.getGenderList,{ params: params });
  }
  // Teacher List
  GetTeacherList(organinationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organinationCode)
    return this.httpClient.get(UrlConstants.getTeacherList,{ params: params });
  }

  // Board Or University List
  GetBoardOrUniList(organinationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organinationCode)
    return this.httpClient.get(UrlConstants.getBoardOrUniList,{ params: params });
  }

  // Relation type list
  GetRelationTypeList(organinationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organinationCode)
    return this.httpClient.get(UrlConstants.getRelationTypeList,{ params: params });
  }
  GetAddressInformartionList(ORG_CODE: string,CAMPUS_CODE :string): Observable<any> {
    let params = new HttpParams();
    params = params.set('ORG_CODE', ORG_CODE);
    params = params.set('CAMPUS_CODE', CAMPUS_CODE);
    return this.httpClient.get(UrlConstants.getAddressInformartionList,{ params: params });
  }

  // Occupation List
  GetOccupationList(organinationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organinationCode)
    return this.httpClient.get(UrlConstants.getOccupationList,{ params: params });
  }

  // District List
  GetDistrictList(): Observable<any> {
    return this.httpClient.get(UrlConstants.getDistrictList);
  }
  getDesignationList(): Observable<any> {
    return this.httpClient.get(UrlConstants.getDesignation);
  }
  getDepartmentList(): Observable<any> {
    return this.httpClient.get(UrlConstants.getDepartmentList);
  }

  // Bank list
  GetBankList(userCode: string): Observable<any> {
    let params = new HttpParams().set('userCode', userCode)
    return this.httpClient.get(UrlConstants.getBankList,{ params: params });
  }

  // Fee list
  GetFeeList(organinationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organinationCode)
    return this.httpClient.get(UrlConstants.getFeeList,{ params: params });
  }

  // User list
  GetUserList(organinationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organinationCode)
    return this.httpClient.get(UrlConstants.getUserList,{ params: params });
  }

  // User list
  GetStdFeeTempList(userCode: string): Observable<any> {
    let params = new HttpParams().set('userCode', userCode)
    return this.httpClient.get(UrlConstants.getFeeTempList,{ params: params });
  }

  // Bank Branch list
  GetBankBranchList(organinationCode: string, bankCode: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('organizationCode', organinationCode);
    params = params.set('bankCode', bankCode);
    return this.httpClient.get(UrlConstants.getBankBranchList,{ params: params });
  }

  // Get Bill Month List
  GetBillMonthList(organinationCode: string, sessionCode: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('organizationCode', organinationCode);
    params = params.set('sessionCode', sessionCode);
    return this.httpClient.get(UrlConstants.getBillMonthList,{ params: params });
  }

  // Get Pay Date List
  GetDateList(organinationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organinationCode)
    return this.httpClient.get(UrlConstants.getPayDateList,{ params: params });
  }

  // Common Table list
  GetCommonTableList(userCode: string): Observable<any> {
    let params = new HttpParams().set('userCode', userCode)
    return this.httpClient.get(UrlConstants.getCommonTableInfoList,{ params: params });
  }

  GetSetUpInfoList(): Observable<any> {
    let params = new HttpParams();
    return this.httpClient.get(UrlConstants.getSetUpInfoList,{ params: params });
  }

  // Country List
  getCountryList() {
    return this.httpClient.get(UrlConstants.getCountryList);
  }

  // Get Devision List
  getDevisionList(countryCode: string): Observable<any> {
    let params = new HttpParams().set('devision', countryCode)
    return this.httpClient.get(UrlConstants.getDivisionList,{ params: params });
  }

  getDistrictList(devisionCode: string): Observable<any> {
    let params = new HttpParams().set('district', devisionCode)
    return this.httpClient.get(UrlConstants.getDistricList,{ params: params });
  }

  getThanaList(thanaCode: string): Observable<any> {
    let params = new HttpParams().set('thana', thanaCode)
    return this.httpClient.get(UrlConstants.getThanaList,{ params: params });
  }

  // Get Fee Template List
  getFeeBillTemplateList(organizationCode: string, userCode: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('organizationCode', organizationCode);
    params = params.set('userCode', userCode);
    return this.httpClient.get(UrlConstants.getFeeBillTemplateList,{ params: params });
  }

  // Get Fee Template List
  getFeeExceptionVoucherStringList(studentCode: string, organizationCode: string, userCode: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('studentCode', studentCode);
    params = params.set('organizationCode', organizationCode);
    params = params.set('userCode', userCode);
    return this.httpClient.get(UrlConstants.getFeeExceptionVoucherString,{ params: params });
  }

  // Get Organization User Type
  getOrgUserTypeList() {
    return this.httpClient.get(UrlConstants.getUserTypeList);
  }

  // getGlFeeTypeList() {
  //   return this.httpClient.get(UrlConstants.getGlFeeList);
  // }
  // Get Fee Type List By Organization
  getFeeTypeListByOrganization(organizationCode: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', organizationCode);
    return this.httpClient.get(UrlConstants.getFeeTypeListByOrganization,{ params: params });
  }
//Get Fee Reson Trans Type List
  getFeeReasonList(): Observable<any> {
    let params = new HttpParams();
    return this.httpClient.get(UrlConstants.feeReason,{ params: params });
  }

  // Get Student List
  public getStudentList(organizationCode: string, userCode: string) {
    let params = new HttpParams();
    params = params.set('organizationCode', organizationCode);
    params = params.set('userCode', userCode);
    return this.httpClient.get(UrlConstants.getStudentDetailList, { params: params });
  }

  studentList(value: string): Observable<any> {
    let params = new HttpParams().set('organizationCode', value)
    return this.httpClient.get(UrlConstants.getStudentList,{ params: params });
  }




  setMessage(data:any) {
    this.message = data;
  }

  getMessage() {
    return this.message;
  }

  // change password
  changePassword(changePassword: any): Observable<any> {
    return this.httpClient.post(UrlConstants.changePassword, changePassword);
  }


  getVisibilityListByClassCode(classCode:string){

    let dataList = [];
    dataList = JSON.parse(localStorage.getItem('visibility')!);

    if(dataList !== null){
      if(dataList.length>0){
        dataList = dataList.filter((w:any)=>w.ID == classCode);
        }
    }
    return dataList;
  }

  




  isVisible(component:string,id:any){
    let visibilitylist = JSON.parse(localStorage.getItem('visibility')!);
    if(visibilitylist)
    {
    if(visibilitylist.length > 0 )
    {
      let comp:any;
      if(component == 'VERSION'){
        comp = visibilitylist.filter((w:any)=>w.CODE == component.toUpperCase());
      }else{
        comp = visibilitylist.filter((w:any)=>w.CODE == component.toUpperCase() && w.ID == id);
      }
      if(comp.length>0){
        return comp[0].NAME.toUpperCase() == 'Y' ? true : false;
      }
      else{
        return true;
      }
    }
    else{
      return true;
    }
  }
  else
    return true;

  }


}
