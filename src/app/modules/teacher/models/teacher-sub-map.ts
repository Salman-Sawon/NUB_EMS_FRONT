export class TeacherSubMap {
    Row_Status: number;
    SUB_MAP_ID: number;
    ORG_CODE: string;
    ORG_NAME: string;
    TEACHER_CODE: string;
    TEACHER_NAME: string;
    CAMPUS_CODE: string;
    CAMPUS_NAME: string;
    CLASS_CODE: string;
    CLASS_NAME: string;
    GROUP_CODE: string;
    GROUP_NAME: string;
    VERSION_CODE: string;
    VERSION_NAME: string;
    SECTION_CODE: string;
    SECTION_NAME: string;
    SESSION_CODE: string;
    SESSION_NAME: string;
    SHIFT_CODE: string;
    SHIFT_NAME: string;
    SUBJECT_CODE: string;
    SUBJECT_NAME: string;
    USER_NAME: string;
}



export class TeacherSubMapInfo {
    Row_Status: number;
    SUB_MAP_ID: number;
    ORG_CODE: string;
    TEACHER_CODE: string;
    CAMPUS_CODE: any;
    CLASS_CODE: any;
    GROUP_CODE: any;
    VERSION_CODE: any;
    SECTION_CODE: any;
    SESSION_CODE: any;
    YEAR_CODE: any;
    SEMESTER_CODE: any;
    SHIFT_CODE: any;
    SUBJECT_CODE: any;
    USER_NAME: string;
}

export class TeacherBulkEntry{
    ORG_CODE:string;
    CAMPUS_CODE:string;
    TEACHER_NAME:any;
    FATHERS_NAME:any;
    JOINING_DATE:any;
    SMS_MOBILE_NUM:any;
    USER_NAME:string;
}

export class TeacherQuickEntry{

    ORG_CODE:string;
    CAMPUS_CODE:string;
    TEACHER_NAME: string[];
    FATHERS_NAME: string[];
    JOINING_DATE: any[];
    SMS_MOBILE_NUM: string[];
    USER_NAME:string;
}

export class TeacherFingerAttendenceEntry{

  ORG_CODE:string;
  CAMPUS_CODE:string;
  ID: number[];
  NAME: string[];
  DATE_TIME: any[];
  DEPARTMENT: string[];
  STATUS: string[];
  USER_NAME:string;
}

export class TeacherQuickEntryInfo{

    ORG_CODE:string;
    CAMPUS_CODE:string;
    TEACHER_NAME: string[];
    FATHERS_NAME: string[];
    JOINING_DATE: any[];
    SMS_MOBILE_NUM: string[];
    USER_NAME:string;
}


export class TeacherQuickEntryInfoVm{


    TEACHER_NAME: string[];
    FATHERS_NAME: string[];
    JOINING_DATE: any[];
    SMS_MOBILE_NUM: string[];

}
export class TeacherFingerAttEntry{
  ORG_CODE:string;
  CAMPUS_CODE:string;
  TEACHER_TEACHER_ATT_NO: number[];
  TEACHER_ATT_DATE_TIME: any[];
  TEACHER_ATT_STATUS: string[];
}
