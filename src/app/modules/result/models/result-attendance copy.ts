export class ResultAttendanceGridPrams {

    USER_CODE : string;
    ORG_CODE: string;
    CAMPUS_CODE: string;
    CLASS_CODE: string;
    VERSION_CODE: string;
    GROUP_CODE: string;
    SESSION_CODE: string;
    YEAR_CODE: string;
    SEMESTER_CODE: string;
    SECTION_CODE: string;
    TERM_ID:number;
    TERM_DESCRIPTION: any[];
  
}


export class ResultAttendanceMstPrams {

    RES_ATT_CONF_ID : number;
    User_Name : string;
    ORG_CODE: string;
    CAMPUS_CODE: string;
    CLASS_CODE: string;
    VERSION_CODE: string;
    GROUP_CODE: string;
    SESSION_CODE: string;
    YEAR_CODE: string;
    SEMESTER_CODE: string;
    IS_RES_ATT: string;
    TERM_ID:number;
    RowStatus:number;
  
}


export class ResultAttendanceSystemMstPrams {

    RES_ATT_SYS_CONF_ID : number;
    User_Name : string;
    ORG_CODE: string;
    CAMPUS_CODE: string;
    CLASS_CODE: string;
    VERSION_CODE: string;
    GROUP_CODE: string;
    SESSION_CODE: string;
    YEAR_CODE: string;
    SEMESTER_CODE: string;
    IS_ALL_SUB_ATT: string;
  
    RowStatus:number;
  
}

export class ResultAttendanceSystemGridPrams {

    USER_CODE : string;
    ORG_CODE: string;
    CAMPUS_CODE: string;
    CLASS_CODE: string;
    VERSION_CODE: string;
    GROUP_CODE: string;
    SESSION_CODE: string;
    YEAR_CODE: string;
    SEMESTER_CODE: string;
  
}





export class WorkingAttendanceMstPrams {

    RES_WORKNG_DAYS_MARK_ID : number;
    User_Name : string;
    ORG_CODE: string;
    CAMPUS_CODE: string;
    CLASS_CODE: string;
    VERSION_CODE: string;
    GROUP_CODE: string;
    SESSION_CODE: string;
    YEAR_CODE: string;
    SEMESTER_CODE: string;
    TERM_ID:number;
    WORKING_DAYS_MARKS:number;
    RowStatus:number;
  
}

export class WorkingAttendanceGridPrams {

    USER_CODE : string;
    ORG_CODE: string;
    CAMPUS_CODE: string;
    CLASS_CODE: string;
    VERSION_CODE: string;
    GROUP_CODE: string;
    SESSION_CODE: string;
    YEAR_CODE: string;
    SEMESTER_CODE: string;
  
}





export class AttendanceProcessPrams {

   
    ORG_CODE: string;
    CAMPUS_CODE: string;
    CLASS_CODE: string;
    VERSION_CODE: string;
    GROUP_CODE: string;
    SESSION_CODE: string;
    YEAR_CODE: string;
    SEMESTER_CODE: string;
    SECTION_CODE: string;
    SHIFT_CODE: string;
    TERM_ID:number;
    USER_CODE : string;
}

