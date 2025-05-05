import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrgBranchParam } from '../models/common/params/OrgBranchParam';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/enums/UrlConstants';
import { LeaveReasonMst } from '../models/crud/leaveReasonMst';
import { RequestMessage } from '../../result/models/request-message';
import { AllSetupNew } from '../models/crud/all-setup';
import { BuildingInfo, RoomInfo } from '../models/crud/room-info';
import { Periodinfo } from '../models/crud/classRoutine';
import { HolidaysEntry } from '../models/crud/holidays-entry';
import { SubjectCreation, SubjectEntry } from '../models/crud/subject-entry';
import { PromotionConfigSave } from '../models/crud/promotion-config-save';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  response: RequestMessage = new RequestMessage();
  request: RequestMessage = new RequestMessage();
  constructor(private httpClient : HttpClient) { }


  getLeaveReason(orgBranchParams:OrgBranchParam): Observable<any> {
    let params = new HttpParams();
    params = params.set('ORG_ID', orgBranchParams.ORG_ID);
    params = params.set('BRANCH_ID', orgBranchParams.BRANCH_ID);
    return this.httpClient.get(UrlConstants.getAccountList, { params: params });
  }

  saveLeaveReason(leaveReasonMst:LeaveReasonMst){
    return this.httpClient.post(UrlConstants.getAccountList, leaveReasonMst);
  }
  getSessionGridView(userCode: string, sessionCode: any) {
    let parameter = new HttpParams();
    parameter = parameter.set("userCode", userCode);
    parameter = parameter.set("sessionCode", sessionCode);
    return this.httpClient.get(UrlConstants.getSessionGridView, {params: parameter});
  }

  saveSession(session: any) {
    this.request.requestObject = JSON.stringify(session);
    return this.httpClient.post(UrlConstants.saveSession, this.request);
  }
  public crtUptDltAllSetupNew(allCommonSetup: AllSetupNew) {
    return this.httpClient.post(UrlConstants.crtUptDltAllSetupNew, allCommonSetup);
 }

 public getAllSetupList(ORG_CODE: string, SET_UP_ID: any) {
  let params = new HttpParams();
  params = params.set('ORG_CODE', ORG_CODE);
  params = params.set('SET_UP_ID', SET_UP_ID);
  return this.httpClient.get(UrlConstants.getAllSetupList, {params: params});
}

getRoomInfo(ORG_CODE: string) {
  let params = new HttpParams();
  params = params.set('ORG_CODE', ORG_CODE);
  return this.httpClient.get(UrlConstants.getRoomInfo, { params: params });
}
getBuildingList(ORG_CODE: string,CAMPUS_CODE:string) {
  let params = new HttpParams();
  params = params.set('ORG_CODE', ORG_CODE);
  params = params.set('CAMPUS_CODE', CAMPUS_CODE);
  return this.httpClient.get(UrlConstants.getBuildingList, { params: params });
}

// SaveRoomentry(roomInfo: RoomInfo) {
//   const formData = new FormData();
//   formData.append("ROOM_ID", roomInfo.ROOM_ID.toString());
//   formData.append("ORG_CODE", roomInfo.ORG_CODE);
//   formData.append("ROOM_NAME", roomInfo.ROOM_NAME);
//   formData.append("CAPACITY", roomInfo.CAPACITY);
//   formData.append("NUMBER_OF_ROWS", roomInfo.NUM_OF_ROWS.toString());
//   formData.append("NUMBER_OF_COLUMNS", roomInfo.NUM_OF_COLUMNS.toString());
//   formData.append("USER_CODE", roomInfo.USER_CODE);
//   formData.append("RowStatus", roomInfo.RowStatus.toString());

//   return this.httpClient.post(UrlConstants.saveRoom, formData);
// }

SaveRoomentry(roomInfo:RoomInfo){
  return this.httpClient.post(UrlConstants.saveRoom, roomInfo);
}

SaveBuildingEntry(buildingInfo:BuildingInfo){
  return this.httpClient.post(UrlConstants.campusBuildingMst, buildingInfo);
}

getPeriodGrid(ORG_CODE: string,CAMPUS_CODE:string) {
  let params = new HttpParams();
  params = params.set('ORG_CODE', ORG_CODE);
  params = params.set('CAMPUS_CODE', CAMPUS_CODE);
  return this.httpClient.get(UrlConstants.GetPeriodGrid, { params: params });
}
SavePeriodentry(periodinfo: Periodinfo) {
  // const formData = new FormData();
  // formData.append("PERIOD_ID", periodinfo.PERIOD_ID.toString());
  // formData.append("ORG_CODE", periodinfo.ORG_CODE);
  // formData.append("CAMPUS_CODE", periodinfo.CAMPUS_CODE);
  // formData.append("PERIOD_NAME", periodinfo.PERIOD_NAME);
  // formData.append("START_TIME", periodinfo.START_TIME  );
  // formData.append("END_TIME", periodinfo.END_TIME );
  // formData.append("DURATION", periodinfo.DURATION);
  // formData.append("USER_CODE", periodinfo.USER_CODE);
  // formData.append("ROW_STATUS", periodinfo.ROW_STATUS.toString());

  return this.httpClient.post(UrlConstants.SaveClassRoutinePeriod, periodinfo);
}

getHolidaysGridList( organizationCode: string, sessionCode: string): Observable<any> {
  let params = new HttpParams();
  // alert(TERM_ID);
  params = params.set('ORG_CODE', organizationCode);
  params = params.set('SESSION_CODE', sessionCode);
 
  return this.httpClient.get(UrlConstants.Holidaysgrid, { params: params});
}

saveHolidaysEntry(holidaysEntry:HolidaysEntry  ) {
  const formData = new FormData();
  formData.append('ORG_CODE', holidaysEntry.ORG_CODE);
 

  const holidaytype = holidaysEntry.HOLIDAY_TYPE;
  for (let i = 0; i < holidaytype.length; i++) {
    formData.append('HOLIDAY_TYPE', holidaytype[i]);
  }
  const holidaydate = holidaysEntry.HOLIDAY_DATE;
  for (let i = 0; i < holidaydate.length; i++) {
    formData.append('HOLIDAY_DATE', holidaydate[i]);
  }
  const sessioncode = holidaysEntry.SESSION_CODE;
  for (let i = 0; i < sessioncode.length; i++) {
    formData.append('SESSION_CODE', sessioncode[i]);
  }
  
  
  return this.httpClient.post(UrlConstants.SaveHolidaysEntry, formData);
  
}

GetSubjectList(value: string): Observable<any> {
  let params = new HttpParams().set('organizationCode', value)
  return this.httpClient.get(UrlConstants.getSubject,{ params: params });
}

SaveSubjectEntry(roles: SubjectEntry) {
  this.request.requestObject = JSON.stringify(roles);
  return this.httpClient.post(UrlConstants.saveSubjectInfo,this.request);
}

SubjectCreation(subCreation: SubjectCreation) {
  this.request.requestObject = JSON.stringify(subCreation);
  return this.httpClient.post(UrlConstants.subjectCreation,this.request);
}

SaveCalendar(academicCalendar: any) {
  this.response.requestObject = JSON.stringify(academicCalendar);
  return this.httpClient.post(UrlConstants.SaveCalendar, this.response)
}


getCalendarList(ORG_CODE:string) {
  let params = new HttpParams();
  params = params.set('ORG_CODE', ORG_CODE);
  return this.httpClient.get(UrlConstants.GetCalendar, { params: params});
}





GetPromotionSystemConfigGrid(ORG_CODE: string,CAMPUS_CODE:string) {
  let params = new HttpParams();
  params = params.set('ORG_CODE', ORG_CODE);
  params = params.set('CAMPUS_CODE', CAMPUS_CODE);
  return this.httpClient.get(UrlConstants.GetPromotionSystemConfigGrid, { params: params });
}




GetPromotionSystemGrid() {
  let params = new HttpParams();

  return this.httpClient.get(UrlConstants.GetPromotionSystemGrid, { params: params });
}




// public createUptDltPromotionSystemConfig(saveData: PromotionConfigSave) {
  
//   return this.httpClient.post(UrlConstants.PromotionSystemConfigSave, saveData);
// }






createUptDltPromotionSystemConfig(saveData: PromotionConfigSave) {
  const formData = new FormData();

  // Helper function to handle null or undefined values
  const appendFormData = (key: string, value: any) => {
    if (value != null) {
        formData.append(key, value.toString());
    }
};
 
appendFormData('ID', saveData.ID.toString());
appendFormData('ORG_CODE', saveData.ORG_CODE);
appendFormData('CAMPUS_CODE', saveData.CAMPUS_CODE);
appendFormData('CLASS_CODE', saveData.CLASS_CODE);
appendFormData('FAILED_APPROVE', saveData.FAILED_APPROVE);
appendFormData('PROMOTION_SYSTEM_ID', saveData.PROMOTION_SYSTEM_ID.toString());
appendFormData('ROW_STATUS', saveData.ROW_STATUS.toString());

  const appendArrayFormData = (key: string, array: any[]) => {
    for (let i = 0; i < array.length; i++) {
        // Convert number to string if necessary
        const value = array[i] != null ? array[i].toString() : "";
        formData.append(key, value);
    }
};
  appendArrayFormData('SECTION_CODE', saveData.SECTION_CODE);
  appendArrayFormData('START_RANGE', saveData.START_RANGE);
  appendArrayFormData('END_RANGE', saveData.END_RANGE);
 

  return this.httpClient.post(UrlConstants.PromotionSystemConfigSave, formData);
}







GetPromotionSystemConfigRangeGrid(ORG_CODE: string,CAMPUS_CODE:string,ID:number) {
  let params = new HttpParams();
  params = params.set('ORG_CODE', ORG_CODE);
  params = params.set('CAMPUS_CODE', CAMPUS_CODE);
  params = params.set('ID', ID);
  return this.httpClient.get(UrlConstants.GetPromotionSystemConfigRangeGrid, { params: params });
}









}
