export class ResultProcess {
    ORG_CODE: string;
    CAMPUS_CODE: string;
    CLASS_CODE: string;
    GROUP_CODE: string;
    VERSION_CODE: string;
    SECTION_CODE: string;
    SESSION_CODE: string;
    YEAR_CODE: string;
    SEMESTER_CODE: string;
    SHIFT_CODE: string;
    SUBJECT_CODE: string;
    TERM_ID: any;
    USER_CODE: string;
}




export class ResultPassFailed {
    ORG_CODE: string;
    CAMPUS_CODE: string;
    CLASS_CODE: string;
    GROUP_CODE: string;
    VERSION_CODE: string;
    SESSION_CODE: string;
    YEAR_CODE: string;
    SEMESTER_CODE: string;
    STATUS: string;
    TERM_ID: any;
}

export class ResultSubjectWiseFailed {
    ORG_CODE: string;
    CAMPUS_CODE: string;
    CLASS_CODE: string;
    GROUP_CODE: string;
    VERSION_CODE: string;
    SESSION_CODE: string;
    SECTION_CODE: string;
    YEAR_CODE: string;
    SEMESTER_CODE: string;
    SHIFT_CODE: string;
    SUBJECT_CODE: string;
    TERM_ID: any;
}

export class ResultParameterSubjectWiseFailed {
    ORG_CODE: string;
    CAMPUS_CODE: string;
    CLASS_CODE: string;
    GROUP_CODE: string;
    VERSION_CODE: string;
    SESSION_CODE: string;
    SECTION_CODE: string;
    YEAR_CODE: string;
    SEMESTER_CODE: string;
    SHIFT_CODE: string;
    NUM_OF_SUB: number;
    TERM_ID: any;
}
