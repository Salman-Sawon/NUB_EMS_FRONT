export class OnlineAdmission {
}



export class FeeBillCollectionOnAdmission {
    ORG_CODE: string;
    CAMPUS_CODE: string;
    COLLECTION_ID: string;
    STUDENT_CODE: string;
    ADMISSION_ROLL: string;
    TRANS_TYPE_CODE: string;
    TRANS_DATE = new Date();
    VOUCH_DATE: any;
    VOUCH_NO: string;
    COLL_AMT: number;
    PAY_MODE: string;
    BANK_CODE: string;
    BANK_BR_CODE: string;
    BANK_ACC_NUMBER: string;
    REF_TRANS_NUM: string;
    REF_CHEQUE_NUMBER: string;
    REF_BANK_NAME: string;
    REF_BANK_BR_NAME: string;
    REF_CHEQUE_DATE: Date;
    BOOTH_TYPE_CODE: string;
    User_Name: string;
    SMS_STATUS: number;
}