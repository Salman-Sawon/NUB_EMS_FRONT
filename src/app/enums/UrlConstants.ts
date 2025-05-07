import { environment } from "src/environments/environment";


export const UrlConstants = {

    // BaseUrl
    apiUrl: environment.apiUrl,

    // security
    login:"Authentication/login",
    //login:"users/authenticate",
    logout:"Authentication/logout",
    refresh:"auth/refresh",
    createUser: "AdminUser/CreateUser",

    //Change Password
    changePassword: "Authentication/ChangePassword",

    //menu
    getMenuList: "Menus/GetMenuList",
    GetDBMenuList: "Menus/GetDBMenuList",
    GetDBMenuListNew: "Menus/getDBMenuListNew",




    //account
    getAccountList: "Accounts/GetAccountList",
    getGlFeeList: "Accounts/GetGlFeeList",
    saveEmsGlFeeMapper: "Accounts/SaveEmsGlFeeMapper",
    GetEmsGlFeeMapper: "Accounts/GetEmsGlFeeMapperGrid",
    saveCashHead:"Accounts/SaveCashHead",
    getCashHead: "Accounts/GetCashHead",
    saveTransaction:"Accounts/SaveTransaction",
    saveBankDetails:"Accounts/SaveBankDetails",
    getBankDetails:"Accounts/GetBankDetails",
    saveAccountHead:"Accounts/SaveAccountHead",
    getAccountHead:"Accounts/GetAccountHead",
    getApproved:"Accounts/GetApproved",
    getAccountVoucherWiseTrans:"Accounts/GetAccountVoucherWiseTrans",
    accountTransTempDelete:"Accounts/AccountTransTempDelete",
    transAppeoved:"Accounts/TransApprovedSave",
    getChequeApproved:"Accounts/GetChequeApproved",
    receiptPayment:"Accounts/receipt-payment",


    getDailyTrans:"Accounts/getDailyTransList",
    getCashBookTrans:"Accounts/getCashBookTrans",
    getLedgerTrans:"Accounts/getLedgerList",
    getHeadLedgerTrans:"Accounts/getHeadLedgerList",

    //role
    getRoleList: "Roles/GetRoleList",
    saveUserRole: "Roles/SaveUserRole",

    //role assign
    user_role_assignList: "UserRoleAssign/GetUserRoleAssignList",
    allMenuList: "AllMenu/GetAllMenuList",
    saveRoleMenu: "AllMenu/SaveAllRoleMenu",

    //userType
    getUserTypeList: "UserTypes/GetUserTypeList",
    saveUserType: "UserTypes/SaveUserType",

    // Dashboard
    getDashboardData: "Dashboard/DashboardData",
    getDashboardAllData: "Dashboard/get-Dashboard-data",
    getDashboardClassList: "Dashboard/getDashboardClassList",
    getBillGenCollList: "Dashboard/getDashboardBillColGenList",
    getTotalBillGenCollList: "Dashboard/getDashboardTotalCollGenList",
    getDashboardTeacherAttenList: "Dashboard/getDashboardTeacherAttenList",
    getDashboardNoticeList: "Dashboard/getDashboardNoticeList",
    getDashboarResultSummaryList: "Dashboard/getDashboarResultSummaryList",

    getDashboardTermList: "Dashboard/getDashboardTermList",





    //Organization Information
    getOrganizationInfoList: "SetUp/GetOrganizationInfoList",
    crtUptDltOrganizationInfo: "SetUp/OrganizationInfo",

    //Reference data
    getAllReferenceDataList: "Common/GetAllReferenceDataList",
    getCurSessionList: "Common/GetCurSessionList",
    getAccRefData:"Accounts/getAccRefData",

    getOrgImageUrlList: "Common/GetOrg_image_Url_grid",




    //organization
    getOrganizationList: "Organizations/GetOrganizationList",
    getOrganizationTypeList: "Organizations/GetOrganizationTypeList",

    //designation
    getDesignationList: "Designations/GetDesignationList",
    getDesigList: "Designations/GetDesigList",
    crtUptDltDesignation: "Designations/Designation",

    //student
    getStudentList: 'Students/GetStudentList',
    //STUDENET COUNT

    getBoardPrevExamList: 'GlobalDataByOrg/GetPrevBoardExamList',
    //Calendar
    SaveCalendar: 'AcademicCalendar/Savecalendar',

    GetCalendar: 'AcademicCalendar/AcademicCalendarGridView',


    getStudentCount: 'Students/GetAllStudentCount',

    //campus
    getCampusList: 'Campus/GetCampusList',
    getCampusTypeList: 'Campus/GetCampusTypeList',

    //class
    getClassList: 'Class/GetClassList',

    //group
    getGroupList: 'Group/GetGroupList',

    //version
    getVersionList: "Version/GetVersionList",

    //Section
    getSectionList: "Section/GetSectionList",
    getSection: "Section/GetSection",

    //session
    getSessionList: "Session/GetSessionList",
    saveSession: "Session/SaveSession",
    getSessionGridView: "Session/GetSessionGridView",

    // subject
    getSubjectList: "Students/GetSubjectList",

    //shift
    getShiftList: "Shift/GetShiftList",

    //Year
    getYearList: "Year/GetYearList",

    //semester

    getSemesterList: "Semester/GetSemesterList",

  //  getTermDDL: 'ResultInfo/GetExamTermListTP',

    //Exam
    getExamList: "Exam/GetExamList",
    getBoardExamList: "Exam/GetBoardExamList",
    getExamDetailNameList: "Exam/GetExamDetailNameList",
    getGradeList: "Exam/GetGradeList",

    //Remarks
    getRemarkList: "Remark/GetRemarkList",
    getDistRemarkList:"Remark/GetDistributionRemarkList",
    getResultEntryRemarkList: "Remark/GetResultEntryRemarkList",

    // Admin User
    getAdminUserList: "AdminUser/GetAdminUserList",
    saveuserCreation: "AdminUser/UpdateUser",

    //Student Subject Mapping
    mapStudentSubject: "Students/MapStudentSubject",
    studentSubMapList: "Students/GetStudentSubjectMappingList",

    // Admin User Organization
    getAdminUserOrganizationList: "Organizations/GetOrgUserCreationList",
    addAdminUserOrganization: "OrganizationUser/CreateUserOrganization",

    // Student Bulk Entry
    getStudentBulkEntry: "StudentBulkEntry/StudentBulkEntry",

    // Student
    getStudentAdmissionInfoList: "Students/GetStudentAdmissionInfoList",
    crtUptDltStudentAdmissionInfo: "Students/StudentAdmissionInfo",
    StudentAdmissionFormInfo: "Students/StudentAdmissionFormInfo",


    classWiseStdImageZip: "OnlineAdmission/class-wise-std-image-zip",

    crtUptDltStdQuickAdmissionInfo: "Students/StudentQuickAdmissionInfo",

    // Student Attendance Information
    SaveStdAttendanceEntry: "Students/SaveStdAttendanceEntry",
    StdAttendanceProcess: "Students/StdAttendanceProcess",
    getStudentAttendanceInfo: "Students/GetStudentAttendanceInfo",
    GetStudentAttendanceList: "Students/GetStudentAttendanceList",
    getStdAtdEntryList: "Students/GetStudentAttendanceEntryList",
    getStdListForSms: "Students/GetStudentListforSms",
    GetStdConfigGridList: "Students/GetStdConfigGridList",
    StdAttendConfigInfoMst: "Students/StdAttendConfigInfoMst",



    saveStudentSessionInfo: "Students/SaveChangeSessionInfo",
    getStudentInfo: "Students/GetStudentInfo",
    GetSystemSettingsList:"AllCommonSetup/GetSystemSettingsGridList",

    // student Attendence Master Detail Add Data
    stdAttendMasterDetail: "Students/StudentAttendenceInfoMasterDetail",
    stdAttendSMSAuth: "Students/SaveStdAttendenceTemplateForSMSAuth",



    //Student Detail Information
    getStudentDetailList: "Students/GetStudentInfoList",
    getstudentPreAcaInfo: "Students/GetStudentPreAca",
    savePreAcaInfo: "Students/SaveStudentPreAcaInfo",
    getStudentSingleData: "Students/GetStudentSingleDataList",
    saveStudentSingleData: "Students/SaveUptDltStudentSingleData",
    getSiblingData: "Students/GetStudentSiblingList",
    saveSiblingData: "Students/SaveStudentSiblingInfo",
    getDefenceData: "Students/GetStudentDefenceInfoList",
    saveDefenceData: "Students/SaveUptDltStudentDefenceData",
    getStudentDetailsReports: "Students/GetStudentDetailsReports",
    getOptSubjectWiseStudentList: "Students/GetOptSubjectWiseStudentList",
    getOptionalSubjectList: "Students/GetGroupWiseOptionalSubjectList",
    getStudentProfileReportData: "Students/get-Student-profile_rep-data",
    getStudentFormFillupType: "Students/GetStudentFormFillupType",
    getStudentFormFillupTypeRpt: "Students/GetStudentFormFillupTypeRpt",
    savetudentFormFillupType: "Students/savetudentFormFillupType",





    ///promotion

    GetStudentPromotionDataList: "StudentPromotion/GetStudentPromotionDataList",
    SaveStudentPromotionMst: "StudentPromotion/SaveStudentPromotionMst",



    GetPromotionSystemConfigGrid: "StudentPromotion/GetPromotionSystemConfigGrid",
    GetPromotionSystemGrid: "StudentPromotion/GetPromotionSystemGrid",

    PromotionSystemConfigSave: "StudentPromotion/PromotionSystemConfigSave",
    GetPromotionSystemConfigRangeGrid: "StudentPromotion/GetPromotionSystemConfigRangeGrid",








    //Student Subject Template
    getSubjectTemplateMstDtl: "Students/StudentSubjectTemplateList",
    saveSubjectTemplateMstDtl: "Students/SaveSubjectTemplateMstDtl",
    getTemplateList: "SubjectTemplateList/GetSubjectTemplateList",
    deleteSubjectTemplateMstDtl: "Students/DeleteSubjectTemplateMstDtl",

    //Subject Mapping Process
    saveSubjectMappingProcess: "Students/SaveSubjectMappingProcess",
    saveSubjectMapProcTempList: "Students/GetSubjectMapProcTempList",
    saveSubjectMapProcStudentList: "Students/GetSubjectMapProcStudentList",

    //Student Promotion
    studentPromotion: "Students/StudentPromotionProcess",

    //Student Information Search
    studentInfoSearch: "Students/GetStudentSearchingInfo",
    getStudentDataSearch: "Students/GetStudentSearchingData",

    // Sms
    smsSender: "SMS/SendSMS",
    unauthorizedSMS: "SMSAuthorization/GetUnauthorizedSMSList",
    unauthorizedSMSGrid: "SMSAuthorization/GetUnauthorizedSMSGrid",
    multipleSmsSender: "SMS/SendMultipleSMS",
    saveSMSAuthData: "SMSAuthorization/SaveSMSAuthData",
    saveDueData: "SMSAuthorization/SaveSMSDueData",
    smsType: "SMSAuthorization/SmsTypeList",
    GetSmsTypeList: "SMSAuthorization/GetSmsTypeList",
    SmsConfigInfoSave: "SMSAuthorization/SmsConfigInfoSave",
    GetSmsConfigGridList: "SMSAuthorization/GetSmsConfigGridList",
    SmsContentInfoMst: "SMSAuthorization/SmsContentInfoMst",
    GetSmsContentGridList: "SMSAuthorization/GetSmsContentGridList",
    SmsGatewayConfigInfoSave: "SMSAuthorization/SmsGatewayConfigInfoSave",
    GetSmsGateWayConfigGridList: "SMSAuthorization/GetSmsGateWayConfigGridList",
    GetSmsGateWayConfigList: "SMSAuthorization/GetSmsGateWayConfigListDDL",


    GetLessonPlanHomeworkList: "SMSAuthorization/GetLessonPlanHomeworkList",
    getExamRoutineListForSms: "SMSAuthorization/GetExamRoutineList",

    

    savemultipramsms: "SMSAuthorization/send-SmS-Save",







    unAuthItemDlt: "SMSAuthorization/UnAuthItemDlt",

    unAuthItemUpdate: "SMSAuthorization/UnAuthItemUpdate",
    smsAuthInfoSave: "SMSAuthorization/SmsAuthInfoSave",
    BulkSmsSave: "SMSAuthorization/BulkSmsSave",


///// Notification 


SaveNotificationDueData: "notification/SaveNotificationDueData",
SaveNotificationResultData: "notification/SaveNotifResultData",
sendNotificationForAllData: "notification/sendNotificationForAllData",
getNotificationConfigDataList: "notification/GetNotificationConfigDataList",
getNotificationtypeList: "notification/GetNotificationTypeList",
saveNotificationConfigInfo: "notification/saveNotificationConfigInfo",

getExamRoutineListForNotification: "notification/ExamRoutineNotification",















  //comments

  getcomments: "AcademicCalendar/getResulCommentsGrid",
  updatecomments: "AcademicCalendar/UPCommentsUpdate",


    // Teacher
    getTeacherInfo: 'Teacher/GetTeacherInfoList',
    getActiveTeacherList: 'Teacher/GetActiveTeacherList',
    getTeacherInfoListByCode: "Teacher/GetTeacherInfoListByCode",
    getTeacher: "Teacher/GetTeacherList",
    getTeacherSubMap: "Teacher/GetTeacherSubjectMapList",
    CreateTeacherSubMap: "Teacher/TeacherSubjectMapping",
    createUptDelTeacherInfo: "Teacher/TeacherInfo",
    getTeacherAttendList: "Teacher/GetTeacherAttendenceList",
    createTeacherAttendance: "Teacher/TeacherAttendance",
    getTeacherPreAca: "Teacher/GetTeacherPreAcaList",
    createTeacherPreAca: "Teacher/TeacherPreviousAcademic",
    GetSingleTeacher: "Teacher/GetSingleTeacherGrid",
    teacherSubMap: "Teacher/TeacherSubjectInfo",
    teacherSubMapList: "Teacher/GetTeacherSubList",
    teacherWiseClassList: "Teacher/TeacherWiseClassList",
    teacherWiseClassRoutine: "Teacher/TeacherWiseClassRoutine",
    SaveTeacherBulkEntry: "Teacher/TeacherEntry",
    SaveTeacherAttBulkEntry: "Teacher/TeacherFingerAttendenceEntry",
    SaveTeacherEntryByExcel: "Teacher/TeacherEntryByExcel",
    TeacherFormEntry: "Teacher/TeacherFormEntry",
    TeacherEntryFormUpdate: "Teacher/TeacherEntryFormUpdate",
    getTeacherInfoGrid: "Teacher/get-Teacher-info-data",
   
    getTeacherProfileData: "Teacher/get-Teacher-profile_rep-data",
    // Teacher File Upload

    saveFileInfo: "TeacherFileUpload/FileSave",
    deleteFile: "TeacherFileUpload/FileDelete",
    getFileId: "TeacherFileUpload/GetFileId",
    getFileList: "TeacherFileUpload/GetFileList",
    getFileDownload: "TeacherFileUpload/GetFileDownload",
    getDocumentList: "GoogleDrive/GetDocumentList",
    saveFileDriveDB: "GoogleDrive/SaveFileDriveDB",


    // Global Data List
    getResultSubjectList: "GlobalDataByOrg/GetSubjectList",
    getBloodGroupList: "GlobalDataByOrg/GetBloodList",
    getNationalityList: "GlobalDataByOrg/GetNationalityList",
    getBirthPlaceList: "GlobalDataByOrg/GetBirthPlaceList",
    getReligionList: "GlobalDataByOrg/GetReligionList",
    getGenderList: "GlobalDataByOrg/GetGenderList",
    getRelationTypeList: "GlobalDataByOrg/GetRelationTypeList",

    getAddressInformartionList: "Students/GetAddressInformationList",
    getDistrictList: "GlobalDataByOrg/GetDistrictList",
    getDepartmentList: "GlobalDataByOrg/GetDepartmentList",
    getDesignation: "GlobalDataByOrg/GetDesignationList",
    getOccupationList: "GlobalDataByOrg/GetOccupationList",
    getTeacherList: "GlobalDataByOrg/GetTeacherList",
    getBoardOrUniList: "GlobalDataByOrg/GetBoardOrUniList",
    getBankList: "GlobalDataByOrg/GetBankList",
    getBankBranchList: "GlobalDataByOrg/GetBankBranchList",
    getBillMonthList: "Fee/GetBillMonthList",
    getPayDateList: "GlobalDataByOrg/GetDateList",
    getFeeList: "GlobalDataByOrg/FeeList",
    getUserList: "GlobalDataByOrg/GetUserList",
    getFeeTempList: "GlobalDataByOrg/StudentFeeTemplateList",
    getCommonTableInfoList: "GlobalDataByOrg/CommonTableInfoList",
    getSetUpInfoList: "GlobalDataByOrg/setUpInfoList",
    getCountryList: "GlobalDataByOrg/CountryList",
    getDivisionList: "GlobalDataByOrg/DevisionList",
    getDistricList: "GlobalDataByOrg/DistrictList",
    getThanaList: "GlobalDataByOrg/ThanaList",
    getFeeBillTemplateList: "GlobalDataByOrg/FeeBillTemplateList",
    getFeeTypeListByOrganization: "GlobalDataByOrg/FeeTypeByListOrganization",
    getSessionSrtEndMonthVoucherList: "GlobalDataByOrg/SessionSrtEndMonthVoucherList",
    getBankBranchListByBankCode: "GlobalDataByOrg/GetBranchByBankList",
    getManualId: "GlobalDataByOrg/GetManualNumber",
    getCollectionId: "GlobalDataByOrg/GetCollectionId",
    getVoucherNO: "GlobalDataByOrg/GetVoucherNo",
    GetVoucherNO_UNIQ: "GlobalDataByOrg/GetVoucherNO_UNIQ",

    // Result OLD EMS
    getExamInfoEntryList: "ExamInfoEntry/GetExamInfoEntryList",
    crtUptDltExamInfoEntry: "ExamInfoEntry/SaveExamInformation",

    getExamResultEntryList: "ExamResultEntry/GetExamResultEntryList",
    getStudentData: "ExamResultEntry/GetResultEntryStudentList",
    saveExamResultEntry: "ExamResultEntry/SaveExamResultEntry",
    DeleteItemClassRoutine: "Routine/DeleteItemClassRoutine",
    getSectionListByRoutine: "Routine/GetSectionListByRoutine",
    getYearListByRoutine: "Routine/GetYearListByRoutine",
    getSemesterListByRoutine: "Routine/GetSemesterListByRoutine",
    GetPeriodWiseOrgRoutineVmre: "Routine/GetPeriodWiseOrgRoutineVmre",

    getExamResultCommonRuleList: "ExamResultCommonRule/GetExamResultCommonRuleList",
    saveExamResultCommonRule: "ExamResultCommonRule/SaveExamCommonRules",

    getExamSubjectRelationList: "ExamSubjectRelation/GetExamSubjectRelationList",
    saveSubjectRelation: "ExamSubjectRelation/SaveSubjectRelation",

    getExamResultDistributionList: "ExamResultDistribution/GetExamResultDistributionList",
    saveResultDistribution: "ExamResultDistribution/SaveExamResultDistribution",

    getExamResultFinalProcess: "Exam/ExamResultFinalProcess",
    getCombinedSubjectResultProcess: "Exam/CombinedSubjectResultProcess",
    getExamResultComment: "Exam/GetExamResultCommentList",
    saveExamResultComment: "Exam/ExamResultComment",


    //Result New
    saveSubjectInfo: 'SubjectInfo/SaveSubjectInfo',
    subjectCreation: 'teacher/SaveSubjectCreation',
    getSubject: 'teacher/GetResultSubjectList',
    getSubjectTemplateList: "SubjectInfo/GetSubjectTemplateGridList",
    subjectTemplateList: "SubjectInfo/SubjectTemplateList",
    subjectTemplateAssign: "SubjectInfo/SubjectTemplateAssign",
    
    savesubjectAssign: "SubjectInfo/saveSubjectAssign",

    getExamType: "SubjectInfo/GetExamCaptionList",
    saveExamMarkChart : "ResultInfo/SaveExamResultMarkChartEntry",
    saveExamMartChartArray: "ResultInfo/ExamResultMarkChartEntryArray",
    getExamMarkChartInfo: "ResultInfo/GetResultMarkChartGrid",
    getResultMarkDistributionGrid: "ResultInfo/GetResultMarkDistributionGrid",

    deleteMarkChartItem: "ResultInfo/DeleteResultMarkChartItem",

    // Fee
    getFeeTypeList: 'Fee/GetFeeTypeList',
    createFeeType: 'Fee/FeeType',

    getStudentFeeTemplateList: "Fee/GetFeeTemplateList",
    crtUptDltStdFeeTemp: "Fee/FeeTemplate",
    deleteFeeTemplateMaster: "Fee/FeeTemplateMasterDelete",

    getFeeBankList: "Fee/GetBankList",
    createUpdateDeleteBank: "Fee/Bank",

    getFeeBankAccountList: "Fee/GetBankAccountList",
    createUpdateDeleteBankAccount: "Fee/BankAccount",

    getFeeBankBranchList: "Fee/GetBankBranchList",
    createUpdateDeleteBankBranch: "Fee/BankBranch",

    getStdFeeMapList: "Fee/GetFeeStudentMapList",
    crtUptDltStdFeeMap: "Fee/FeeStudentMap",

    createFeeGeneratePro: "Fee/FeeGenerationProcess",

    getBankBranchUserMapList: "Fee/GetBankBranchUserMapList",
    createBankBranchUserMap: "Fee/BankBranchUserMap",

    createDayEndFeeCollection: "Fee/DayEndFeeCollection",
    createStudentAnyTransaction: "Fee/StudentAnyTransaction",
    getStudentAnyTransaction: "Fee/GetStdAnyTransactionList",
    SaveAnyTransactionF: "Fee/SaveAnyTransactionF",
    editCollection: "Fee/BillCollectionEdit",



    createStudentAnyTransection: "StudentAnyTransection/CreateStudentAnyTransection",
    createStudentManualBillGeneration: "Fee/StudentManualBillGeneration",
    getStudentManualBillGeneration: "Fee/GetManualBillGeneration",
    deleteManualBill: "Fee/DeleteManualBill",
    classWiseBulkGeneration: "Fee/ClassWiseBulkGeneration",

    dltManualBillGenItem: "Fee/DeleteManualBillGenItem",
    dltManualBillCollItem: "Fee/DeleteManualBillCollItem",



    getManualCollection: "Fee/GetManualBillCollection",
    getFormFillUpApproval: "Fee/GetFormFillUpApproval",
    saveFormFillUpApprovMst: "Fee/SaveFormFillUpApprovMst",

    getDayWiseFeeDetailView: "AcademicCalendar/getDayWiseFeeDetailView",
    getClassWiseFineViewList: "FeeBillDetailView/ClassWiseFineViewList",
    
    // Fee Bill Generation Process
    getFeeBillGenerationProcessList: "Fee/GetFeeBillTemplateDetailList",
    createFeeMasterTemplate: "Fee/FeeBillMasterTemplate",
    updateFeeMasterTemplate: "Fee/UpdateFeeBillMasterTemplate",
    deleteFeeMasterTemplate: "Fee/DeleteFeeBillMasterTemplate",
    createFeeBillGenerationProcess: "Fee/FeeBillGenerationProcessTemplate",
    feeBillProcessString: "Fee/FeeBillProcessString",
    createFeeTemplateAssign: "Fee/FeeTemplateAssign",
    deleteFeeTemplateAssign: "Fee/FeeTemplateDelete",
    feeExceptionStudentList: "Fee/FeeExceptionStudentList",
    getFeeExceptionVoucherString: "Fee/FeeExceptionVoucherString",
    getStdExceptionData:"Fee/getStdExceptionData",
    createStudentFeeException: "Fee/FeeStudentException",
    createBillGenerationProcess: "Fee/BillGenerationProcess",
    getBillTemplateListByCG: "Fee/GetBillTemplateListByCG",
    getWaiverListFixedView: "Fee/WaiverListFixedView",
    getWaiverListPercentageView: "Fee/WaiverListPercentageView",
    getNewStudentList: "Fee/GetNewStudentList",
    newStudentBillGeneration: "Fee/BillGenerationProcessForNewStudent",
    paySlipStdInfo: "Fee/CollPaySlipInfo",
    payCollSlipStdInfo: "Fee/CollPayCollInfo",
    openingBalance: "Fee/SaveOpeningBalance",
    feeReason: "Fee/GetBillTransType",

    stdBankCollInfo: "Fee/GetStdBankCollInfo",
    // Fee Collection
    getFeeCollectionDtlList: 'Fee/GetFeeCollectionDetailsList',
    getFeeCollectionMasterList: 'Fee/GetFeeCollectionMasterList',
    createfeeCollection: 'Fee/CreateFeeCollection',
    getOrganizationListByBank: "FeeCollection/GetOrganizationListByBank",
    getBankOrganizationStudentWiseAccList: "FeeCollection/GetBankOrganizationStudentdWiseAccList",
    getStudentManualList: "FeeCollection/GetStudentManualDataList",
    SavePreviousStudentCollection: "FeeCollection/PreviousStudentCollectionSave",
    getPreviousStudentCollection: "FeeCollection/GetPreviousStudentCollection",
    getanyStudentCollection: "FeeCollection/GetAnyStudentCollection",
    deleteanyStudentCollection: "FeeCollection/PreviousStudentCollectionDelete",


    getBankInfo:"Fee/GetBankInfo",
    // Fee Bill Detail View
    getStudentWiseDetailBillViewList: "FeeBillDetailView/StudentWiseDetailViewList",
    getStudentWiseDetailAllBillView: "FeeBillDetailView/StudentWiseDetailAllBillView",
    getClassSectionWiseBillAllViewList: "FeeBillDetailView/ClassSectionWiseViewAllList",
    getClassSectionWiseBillViewList: "FeeBillDetailView/ClassSectionWiseViewList",
    getDueSmsStudentList: "FeeBillDetailView/getDueSmsStudentList",

    getDayWiseBillCollectionViewList: "FeeBillDetailView/DayWiseBillCollectionViewList",
    getFeeBillCollectionDetailViewList: "FeeBillDetailView/FeeBillCollectionDetailViewList",
    getFeeBillCollectionDetailViewListNew: "FeeBillDetailView/FeeBillCollectionDetailViewNew",
    getFeeBillCollectionDetail: "FeeBillDetailView/GetFeeBillCollectionDetail",
    getStudentWiseBillCollectionViewList: "FeeBillDetailView/StudentWiseBillCollectionViewList",
    getStudentLedgerViewList: "FeeBillDetailView/StudentLedgerViewList",
    getStudentLedgerView: "FeeBillDetailView/StudentLedgerView",
    getStudentBalanceViewList: "FeeBillDetailView/StudentBalanceViewList",


    getStudentBillDueTypeWise: "FeeBillDetailView/getStudentBillDueTypeWise",
    getClassWisePerticulrFeeCollection: "FeeBillDetailView/getClassWisePerticulrFeeCollection",














    getCustomFeeTypeList: "Fee/GetCustomFeeTypeList",

    SaveCustomFeeType: "Fee/SaveCustomFeeType",
    getClassSecDueData: "Fee/GetClassSecDueData",
    getStudentCollectionReportData: "Fee/getStudentCollectionReportData",
    getStudentCollectionReportDataTemp: "Fee/getStudentCollectionReportDataTemp",






/////Pdf report


   getDuesStdPdf: "PdfReport/get-class-wise-due-report",

   getGenerateTeacherAttenSumaryPdf: "PdfReport/getGenerateTeacherAttenSumaryPdf",
   getGenerateAllTeacherAttenPdf: "PdfReport/getGenerateAllTeacherAttenPdf",
   getGenerateSingleTeacherAttenPdf: "PdfReport/getGenerateSingleTeacherAttenPdf",
   getGenerateTeacherAttenSummaryDateRangePdfReport: "PdfReport/getGenerateTeacherAttenSummaryDateRangePdfReport",
   getStudentListReports:"Students/GetStudentListReports",
   getDateWiseAdmissionStudentList:"Students/GetDateWiseAdmissionStudentList",

   getTeacherAttRpt:"Teacher/get-teacher-sub-wise-attendance",
   getStudentAttRpt:"Students/get-sub-wise-attendance",

   getTeacherSerInfo:"Teacher/get-Teacher-service-rpt",

//fee attendance fine
getattendancefinegridList:"AttendancFine/GetAttendanceFineGrid",
saveattendancefinemst:"AttendancFine/SaveAttendanceFineMstIUD",
getattendancefineconfiggridList:"AttendancFine/GetAttendanceFineConfigGrid",
saveattendancefineconfigmst:"AttendancFine/SaveAttendanceFineConfigMstIUD",







    ClassWiseStudentDueViewList: "FeeBillDetailView/ClassWiseStudentDueViewList",
    ClassWiseBillCollectionViewList: "FeeBillDetailView/ClassWiseBillCollectionView",


    SaveFeeTypeMapper: "Fee/SaveFeeTypeMapper",
    GetFeeTypeMapGrid: "Fee/GetFeeTypeMapGrid",

    // Fee Bill Collection BankBrachAccountList
    getFeeBillTotalList: "Fee/TotalBillList",
    getFeeSuspenseList: "Fee/SuspenseBillList",
    getBankBranchAccountList: "Fee/BankBrachAccountList",
    createFeeBillCollection: "Fee/FeeBillCollection",
    FeeBillCollectiontemp: "Fee/FeeBillCollectiontemp",
    deleteCollection: "Fee/DeleteBillCollection",

    FeeBillCollectionTemp:"Fee/FeeBillCollectionTemp",

    manualBillCollection: "Fee/ManualBillCollection",
    manualBillCollectionNew: "Fee/ManualBillCollectionNew",
    manualBillCollectionTemp: "Fee/ManualBillCollectionTemp",
    manualBillCollectionData: "Fee/GetManualBillData",
    deleteManualBillCollectionData:"Fee/DeleteManualBillCollection",


    getfeedetaildata: "Fee/GetFeeDetailsData",
    getCollectionDataSearch: "Fee/GetCollectionSearchingData",

    // Result New Url
    saveUptDltSubjectTemplateMaster: "SubjectInfo/SaveUptDltSubjectTemplateMaster",
    getExamResultTypeCapList: "ExamResult/ResultExamTypeCaptionList",
    createUptExamResultSubWiseDTL: "ExamResult/ExamResultSubWiseDTL",

    resultProcess:"ResultInfo/ExamResultProcess",

    // All Common Setup
    getAllCommonSetupList: "AllCommonSetup/GetAllCommonSetupList",
    getAllSetupList: "AllCommonSetup/GetAllCommonSetupListNew",
    crtUptDltAllCommonSetup: "AllCommonSetup/AllCommonSetup",
    crtUptDltAllSetupNew: "AllCommonSetup/AllSetupNew",

    // Report
    studentTabulationSheetList: 'StudentTabulationSheetReport/StudentTabulationSheet',
    GetStudentTransferDataList: 'StudentTabulationSheetReport/GetStudentTransferDataList',
    GetStudentAdmitCardDataList: 'StudentTabulationSheetReport/GetStudentAdmitCardDataList',
    GetStudentCertificateDataList: 'StudentTabulationSheetReport/GetStudentCertificateDataList',
    GetStudentTestimonialDataList: 'StudentTabulationSheetReport/GetStudentTestimonialDataList',

    // Payment
    paymentCheckout: "Cart/Checkout",

    //GetSubjectList
    getExamSubjectList:"SubjectInfo/GetSubjectList",
    getsubjectassignList:"SubjectInfo/getAssignSubject",
    getclasswisesubjectList:"SubjectInfo/getClassWiseSubject",

     //Save Exam Type
     saveExamType:"SubjectInfo/SaveExamType",

     //getExamTypeGrid
     getExamTypeGrid:"SubjectInfo/GetExamTypeGrid",

     //getExamCaptionList
     getExamCaptionList:"SubjectInfo/GetExamCaptionList",

     //SaveResultMarkBulkInfo
     saveResultMarkBulkInfo:"ResultInfo/SaveResultMarkBulkInfo",

     saveResultGradeEntry:"ResultInfo/SaveResultGradeEntry",
     getResultGradeGrid:"ResultInfo/ResultGradeGrid",
     getExamResultInfoList:"ResultInfo/GetExamResultInfoList",

     getResultGradeGridLoad:"ResultMarksheet/getResultGridLoad",


     // TermList
     getTermList:"ResultInfo/GetExamTermList",

     getResultBulkStudentList : "ResultInfo/GetBulkStudentList",
     getResultMarkStudentList:"ResultInfo/GetResultMark",
     getResultMarkChartList:"ResultInfo/GetResultMarkChart",

     getTermSubjExmcaptionList:"Dashboard/getTermSubjExmcaptionList",

     //Save Result Report Heading
     saveResultReportHeading: "ResultInfo/SaveResultHeading",
     resultReportHeadingGrid: "ResultInfo/ResultReportHeadingGrid",


     getResultSummary:"ResultMarksheet/getResultSummaryGrid",


///RESULT ATTENDANCE


SaveResultAttendanceConfigMst:"ResultAttendance/ResultAttendanceConfigMstSave",
 getResultAttendanceConfig:"ResultAttendance/getResultAttendanceConfig",

 SaveResultAttendanceSystemConfigMst:"ResultAttendance/ResultAttendanceSystemConfigMstSave",
 getResultAttendanceSystemConfigGrid:"ResultAttendance/getResultAttendanceSystemConfigGrid",

 SaveResultAttWorkingMarksMst:"ResultAttendance/ResultAttWorkingMarksMstSave",
 getResultWorkingMarksGrid:"ResultAttendance/getResultWorkingMarksGrid",

 getLeaveStudentListGrid:"ResultAttendance/getLeaveStudentListGrid",
 getLeaveTypeGrid:"ResultAttendance/getLeaveTypeGrid",
 SaveLeaveMst:"ResultAttendance/SaveLeaveMst",
 SaveAttendanceMarkProcess:"ResultAttendance/SaveAttendanceMarkProcess",


 getResultAssignSubjectGrid:"SubjectInfo/getResultAssignSubject",



/////Attendance Fine

getAttendanceFineStudentGrid:"AttendancFine/GetAttendanceFineStudentGrid",
getGetAttendanceFineList:"AttendancFine/GetAttendanceFineList",

ProcessAttendanceFineSave:"AttendancFine/ProcessAttendanceFineSave",








     //saveExamRoutine: "SubjectInfo/SaveExamRoutine",
     //getExamRoutine: "SubjectInfo/GetExamRoutine",

     //save dep drop
     getDepDropList: "ResultInfo/GetDepDropList",
     saveDepDrop: "ResultInfo/SaveDepDrop",

     //Result
     getTabSheetSubjectList: "ResultInfo/GetSubjectList",
     getTabSheetExamCaptionList: "ResultInfo/GetExamCaptionList",
     getTabSheetResultList:  "ResultInfo/GetDetailsResultList",

     getTabData:  "StudentTabulationSheetReport/GetTabulationSheetData",
     getSubAnalysisData:  "StudentTabulationSheetReport/GetSubjectWiseResultAnalysis",
     getGradeAnalysisData:  "StudentTabulationSheetReport/GetGradeWiseResultAnalysis",
   //  getTabData:"StudentTabulationSheetReport/GetTabulationSheetData",



     getPassFailedData:"StudentTabulationSheetReport/getStudentPassFailedList",
     getSubjectWiseFailedList:"StudentTabulationSheetReport/getSubjectWiseFailedList",

     getParameterWiseSubjectFailedList:"StudentTabulationSheetReport/getParameterWiseSubjectFailedList",









     //marksheet
     getResultGradeGridList: "ResultMarksheet/getResultGradeGridcs",
     getStudentResultTranscriptList: "ResultMarksheet/getStudentResultTranscript",

     getResultSummaryGrid: "ResultMarksheet/getResultSummaryGrid",
     getWorkingdays: "GlobalDataByOrg/GetWorkingdays",
     getStudentAttendance: "AcademicCalendar/getStudentAttendance",
     getTeacherSignature: "AcademicCalendar/TeacherSignatureGrid",

     getPersonSignatureGrid:"ResultInfo/PersonSignatureGrid",
     savePersonSignatureEntry:"AcademicCalendar/SaveSignature",

     getYearlyTermGrid: "AcademicCalendar/getTermListGrid",
     saveAcademicTermEntry: "AcademicCalendar/SaveTermListEntry",



     SaveHolidaysEntry: "AcademicCalendar/SaveHolidaysEntry",

     resultSmsSend: "ResultInfo/ResultSmsSend",


    Holidaysgrid:"AcademicCalendar/getHolidaysGrid",



    GetStudentidcardinfoGrid:"AcademicCalendar/GetStudentidcardinfoGrid",


     // Html report url
     studentTranscriptReportList: "StudentTranscriptReport/StudentTranscriptReportList",



     //Routine

     classRoutineSave:"Routine/saveClassRoutine",
     saveClassRoutinePeriodWise:"Routine/saveClassRoutinePeriodWise",
     saveClassRoutinespzrdc:"Routine/saveClassRoutinespzrdc",
     saveClassRoutineGendar:"Routine/saveClassRoutineGendar",
     getClassRoutine:"Routine/getClassRoutine",
     getPeriodWiseClassRoutine:"Routine/getPeriodWiseClassRoutine",
     SaveClassRoutinePeriod:"Routine/SaveClassRoutinePeriodMst",
     GetPeriodGrid:"Routine/GetPeriodGrid",
     getClassRoutineGendarGrid:"Routine/getClassRoutineGendarGrid",
     getStudentClassRoutine:"Routine/getStudentClassRoutine",
     getTeacherClassRoutine:"Routine/getTeacherClassRoutine",
     getDayClassRoutine:"Routine/getDayClassRoutine",
     getDayClassRoutineTeacher:"Routine/getDayClassRoutineTeacher",
     getTeacherSubMapInfo:"Routine/getTeacherSubMapInfo",
     getMappedTeacherList: "Routine/getMappedTeacherList",
     getDayList:"Routine/getDay",
     saveExamRoutine:"Routine/saveExamRoutine",
     getExamRoutine: "Routine/GetExamRoutine",
     getAllExamRoutine: "Routine/GetAllExamRoutine",
     getRoomList: "Routine/GetRoomList",
     getSeniorTeacherList: "Routine/GetSeniorTeacherList",
     getJuniorTeacherList: "Routine/GetJuniorTeacherList",
     saveRoomAssign:"Routine/saveTeacherAssign",
     getAssignedRoomList: "Routine/GetAssignedRoomList",
     getStudentClassRoutinerep: 'Routine/GetstudentClassRoutinereport',
     getPeriodWiseClassRoutineReport: 'Routine/getPeriodWiseClassRoutineReport',
     getPeriodWiseOrgRoutineReport: 'Routine/getPeriodWiseOrgRoutineReport',

     noticeData: "Notice/GetNotices",
     NoticeInfoMst: "Notice/NoticeInfoMst",


    // batchData: "Lession/GetBatchName",
    // chapterData: "Lession/GetChapterList",
     //ChapterInfoMst: "Lession/SaveLessionChapter",


     //seatPlan

     saveRoomInfo:"teacher/saveRoomInfo",
     saveRoom:"teacher/saveRoomMst",
     getRoomInfo:"teacher/getRoomInfo",
     getBuildingRoom:"SeatPlan/getBuildingWiseRoom",
     getStdInfo:"SeatPlan/getStudentInfo",
     getExistingStdInfo:"SeatPlan/getExistingStudentInfo",
     saveSeatInfo: "SeatPlan/saveSeatInfo",
     getSeatPlanGrid:"SeatPlan/getSeatPlanGrid",
     getBuildingList:"teacher/getBuildingList",
     campusBuildingMst:"SeatPlan/CampusBuildingMst",


     //Online Admission Through Website

     saveBoardMeritList:"OnlineAdmission/SaveBoardStudentMeritList",
     saveNationalUniMeritList:"OnlineAdmission/SaveNationalUniStudentMeritList",

     getClassDDL: "Teacher/GetTeacherClassDDL",
     getBatchDDL: "Teacher/GetTeacherSubMapDDL",
     getStudentAttendanceData: "Students/GetStudentAttendanceData",
     getApproveStudentList: "OnlineAdmission/GetApproveStudentList",
     getAlreadyApproveStudentList: "OnlineAdmission/Get-Already-Approved-Student-List",
     saveApproveStudentList: "OnlineAdmission/Save-Student-Admission-Approve",


/////Ooline Admission


getOnlineCollPaySlipInfo: "OnlineAdmissionFee/OnlineCollPaySlipInfo",
getOnlineAdmissionFeeBillCollection: "OnlineAdmissionFee/OnlineAdmissionFeeBillCollection",

getOnlineAdmissionColRepData: "OnlineAdmissionFee/get-Online-Admission-Rep-Data",

GetStudentTransectionList: "OnlineAdmissionFee/GetStudentTransectionList",

onlineAdmissionBillCOllDel: "OnlineAdmissionFee/OnlineAdmissionDeleteBillCollection",

getOnlineAdmissionSubjectGridData: "OnlineAdmission/getOnlineAdmissionSubjectGridData",
savestudentSubjectMapUpdate: "OnlineAdmission/studentSubjectMapUpdate",







     //combo

     getComboSerialList: "AllSetupPage/GetComboSerialList",


  ////syllabus
  batchData: "Lession/GetBatchName",
  chapterData: "Lession/GetChapterList",
  ChapterInfoMst: "Lession/SaveLessionChapter",

  GetLessionChapterMapperGrid: "Lession/GetLessionChapterMapperGrid",
  SaveLessionChapterMapperInfo: "Lession/SaveLessionChapterMapperInfo",

  ChaptertermList: "Lession/GetChapterTermList",
  SaveSyllebusChapterMapperInfo: "Lession/SaveSyllebusChapterMapperInfo",
  GetSyllabusChapterMapGrid: "Lession/GetSyllabusChapterMapGrid",



  SaveLessonPlanRequest: "Lession/SaveLessonPlanRequest",
  GetLessonPlanGrid: "Lession/GetLessonPlanGrid",





  GetChapterSubjectList: "Lession/GetChapterSubjectList",

 getTermDDL: 'ResultInfo/GetExamTermListTP',
// getTermDDL: 'ResultInfo/GetExamTermListTP',

///Accounts

GetDailyTransViewModel: 'Accounts/GetDailyTransViewModel',
SaveEmsTransStudenteCR: 'Accounts/SaveEmsTransStudenteCR',

GetTransCollectionList: 'Accounts/GetTransCRCheck',
GetTransCollecttionDeleteList: 'Accounts/GetTransDRCheckCollDelete',
SaveGlTrans: 'Accounts/SaveGLTrans',


/////QUESTION


SaveQuestionPaperInfo: 'Question/SaveQuestionPaperInfo',
GetQuestionPaperRandomGrid: 'Question/getQuestionPaperRandomGrid',
GetWordQuestion: 'Question/GetWordQuestion',
SaveQuestionConfigInfo: 'Question/SaveQuestionConfigInfo',
GetQuestionConfigGrid: 'Question/GetQuestionConfigList',

getQuestionPaperRandomProcess: 'Question/QuestionPaperRandomProcess',

GetDailyCollectionView: 'Fee/GetDailyCollectionView',

GetNotApproveList:'OnlineAdmission/GetNotApprovStudentList',

SaveApproveStudent:'OnlineAdmission/SaveStudentApprove',
GetOnlineAdmissionStudentList:'OnlineAdmission/GetOnlineAdmissionStudentList',
saveOnlinePayment: "OnlineAdmission/SaveStudentOnlineAmount",


GetTeacherSummaryTableHeader:"Teacher/GetTeacherSummaryTableHeader",
getAllTeacherAttStatus:"Teacher/GetAllTeacherAttStatus",

SaveTeacherShiftMst:"TeacherShift/SaveTeacherShiftMst",
getShiftGrid:"TeacherShift/GetShiftGrid",
getShiftMapperGrid:"TeacherShift/GetShiftMappingGrid",
getShifList:"TeacherShift/GetShiftGridList",
saveTeacherShiftMapper:"TeacherShift/saveTeacherShiftMapper",
getSingleTeacherAttStatus:"TeacherShift/GetSingleTeacherAttStatus",
getFingerAttendenceProcess:"TeacherShift/FingerAttendenceProcess",
getTeacherAttendenceSummary:"TeacherShift/GetTeacherAttendenceSummary",
getTeacherTechMst:"DcDashboard/teacherTeachProgressMst",
getTeacherTechDtl:"DcDashboard/teacherTeachProgressDtl",
getTeacherTechSubDtl:"DcDashboard/teacherTeachProgressSubDtl",


////dc dashboard

getDcDashboardList:"DcDashboard/getDcDashboardList",
getDcDashboardOrgList:"DcDashboard/getDcDashboardOrgList",
getDcOrgAttenCountList:"DcDashboard/getDcOrgAttenCountList",

getDcClassWiseStdAttList:"DcDashboard/getDcOrgClassAttList",
ClassWiseStduDtl:"DcDashboard/ClassWiseStduDtl",

//// transcript

getGenerateTranscriptReportPdf:"PdfTranscriptReport/getGenerateTranscriptReportPdf",


    // security
    //login:"auth/login",
   // getDbMenuList:"menu/menu-list",
    //login:"users/authenticate",


    //setup
    getLeaveReason: 'setup/leave-reason-list',
    saveLeaveReason:'setup/save-leave-reason'

///Report















};
