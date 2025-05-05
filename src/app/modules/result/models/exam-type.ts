import { FormControl } from "@angular/forms";

export class ExamType{
    
    TERM_ID: number;
    CLASS_CODE: string;
    SESSION_CODE: string;
    GROUP_CODE: string;
    VERSION_CODE: string;
    YEAR_CODE:string;
    SEMESTER_CODE:string;
    SECTION_CODE:string;
     CAMPUS_CODE: string;
    ORG_CODE : string;
    EXAM_CAPTION: any[];
    TEACHER_CODE: any[];
    EXAM_DATE:  any[];
    RESULT_DATE: any[];
    LAST_SUBMISSION_DATE: any[];
    IS_ATTENDANCE: any[];


}


export class ExamTypeItemVM{
    
    
    TERM_ID: number;
    CLASS_CODE: string;
    SESSION_CODE: string;
    GROUP_CODE: string;
    VERSION_CODE: string;
    // SUBJECT_CODE: string;
    ORG_CODE : string;
    EXAM_CAPTION: any[];
    TEACHER_CODE: any[];
    EXAM_DATE:  any[];
    RESULT_DATE: any[];
    LAST_SUBMISSION_DATE: any[];


}