export class SubjectEntry{
    SELECT: boolean = true;
    SELECT2: boolean = true;
    SELECT3: boolean = true;
    SELECT4: boolean = true;
    SUBJECT_ID: number;
    ORG_CODE: string;
    ORG_NAME: string;
    SUBJECT_CODE: string;
    SUBJECT_NAME: string;
    SUBJECT_SHORT_NAME: string;
    SUBJECT_PART: string;
    SUBJECT_DEFAULT_TYPE: string;
    SUJBECT_IS_PRACTICAL: string;
    SUJBECT_SRLNO: string;
    RowStatus: number;
    USER_CODE: string;
}

export class SubjectCreation {
    //SUBJECT_ID: any[];
    ORG_CODE: string;
    ORG_NAME: string;
    SUBJECT_CODE: any[];
    SUBJECT_NAME: any[];
    SUBJECT_NAME_BANGLA: any[];
    SUBJECT_SHORT_NAME: any[];
    SUBJECT_PART: any[];
    SUBJECT_DEFAULT_TYPE: any[];
    SUJBECT_IS_PRACTICAL: any[];
    SUJBECT_SRLNO: any[];
   // RowStatus: any[];
    User_Name: string;
    RowStatus: any;
    SUBJECT_ID:any;
}

export class SubjectCreationVM {
    SUBJECT_ID: any[];
    ORG_CODE: string;
    ORG_NAME: string;
    SUBJECT_CODE: any[];
    SUBJECT_NAME: any[];
    SUBJECT_NAME_BANGLA: any[];
    SUBJECT_SHORT_NAME: any[];
    SUBJECT_PART: any[];
    SUBJECT_DEFAULT_TYPE: any[];
    SUJBECT_IS_PRACTICAL: any[];
    SUJBECT_SRLNO: any[];
    RowStatus: any[];
    User_Name: string;
}
