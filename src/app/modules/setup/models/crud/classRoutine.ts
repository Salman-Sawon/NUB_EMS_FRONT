export class classRoutineInfo{
    ORG_CODE: string;
    CAMPUS_CODE: string;
    CLASS_CODE: string;
    SECTION_CODE: string;
    GROUP_CODE: string;
    SESSION_CODE: string;
    VERSION_CODE: string;
    YEAR_CODE: string;
    SEMESTER_CODE: string;
    SHIFT_CODE: string;
    USER_CODE: string;
    DAY_CODE:string;
    SUBJECT_CODE:any;
    GENDER_CODE:any;
    START_TIME:any;
    PERIOD_CODE:any;
    END_TIME:any;
    ROOM_ID:any;
    TEACHER_CODE:any;
}

export class ParameterInfo{
    ORG_CODE: string;
    CAMPUS_CODE: string;
    CLASS_CODE: string;
    SECTION_CODE: string;
    GROUP_CODE: string;
    SESSION_CODE: string;
    VERSION_CODE: string;
    YEAR_CODE: string;
    SEMESTER_CODE: string;
    SHIFT_CODE: string;
    DAY_CODE: string;
}
export class ParameterInfoRoutine{
  ORG_CODE: string;
  CAMPUS_CODE: string;
  CLASS_CODE: string;
  SECTION_CODE: string;
  GROUP_CODE: string;
  SESSION_CODE: string;
  VERSION_CODE: string;
  YEAR_CODE: string;
  SEMESTER_CODE: string;
  SHIFT_CODE: string;
  DAY_CODE: string;
}









export class ParameterInfoTS{
    ORG_CODE: string;
    USER_CODE: string;
}

export class ParameterInfoDay{
    ORG_CODE: string;
    DAY_CODE: string;
    USER_CODE: string;
}

export class DayList{
    DAY_ID: any;
    DAY_NAME: any;
    DAY_CODE: any;
}

export class TeacherSubMapInfoParam{
  ORG_CODE: string;
  CAMPUS_CODE: string;
  CLASS_CODE: string;
  SECTION_CODE: string;
  GROUP_CODE: string;
  SESSION_CODE: string;
  VERSION_CODE: string;
  YEAR_CODE: string;
  SEMESTER_CODE: string;
  SHIFT_CODE: string;
}



export class NoticeParam{
  ORG_CODE: string;
  CAMPUS_CODE: string;
  NOTICE_FOR_ID: any;
  CLASS_CODE: string;
  SECTION_CODE: string;
  GROUP_CODE: string;
  SESSION_CODE: string;
  VERSION_CODE: string;
  YEAR_CODE: string;
  SEMESTER_CODE: string;
  SHIFT_CODE: string;
}
export class NoticeParamMst{
  NOTICE_FILE :any;
  ORG_CODE: string;
  ORG_NAME: string;
  CAMPUS_CODE: string;
  CAMPUS_NAME: string;
  USER_CODE: string;
  NOTICE_FOR_ID: any;
  NOTICE_DOCUMENT_TYPE: any;
  NOTICE_NAME: string;
  NOTICE_DESC: string;
  CLASS_CODE: string;
  SECTION_CODE: string;
  GROUP_CODE: string;
  SESSION_CODE: string;
  VERSION_CODE: string;
  YEAR_CODE: string;
  SEMESTER_CODE: string;
  SHIFT_CODE: string;
  ROW_STATUS: any;
  NOTICE_ID: any;

}

export class BatchParam{
  ORG_CODE: string;
  CAMPUS_CODE: string;
  CLASS_CODE: string;
  SUB_MAP_ID: number;

}

export class ChapterInfo{
  ORG_CODE: string;
  CAMPUS_CODE: string;
  CLASS_CODE: string;
  SUB_MAP_ID: number;
  SUB_BATCH_ID: number;
  TERM_ID: number;
  CHAPTER_ID: number;
  CHAPTER_NAME: string;
  USER_CODE: string;
  ROW_STATUS: number;



}
export class Periodinfo{
  ORG_CODE: string;
  CAMPUS_CODE: string;
  PERIOD_ID: number;
  PERIOD_NAME: string;
  START_TIME:  any;
  END_TIME:  any;
  DURATION: any;
  USER_CODE: string;
  ROW_STATUS: number;


 // END_TIME:  string | null;
}

export class Shiftinfo{
  ORG_CODE: string;
  CAMPUS_CODE: string;
  SHIFT_ID: number;
  SHIFT_NAME: string;
  START_TIME:  any;
  END_TIME:  any;
 
  USER_CODE: string;
  ROW_STATUS: number;


}

export class ShiftMapper{
  ORG_CODE: string;
  CAMPUS_CODE: string;
  SHIFT_ID: any;
  TEACHER_CODE: any;
  IN_TIME: any;
  OUT_TIME: any;
  TEACHER_ATT_ID: any;
  USER_CODE: string;
  
}