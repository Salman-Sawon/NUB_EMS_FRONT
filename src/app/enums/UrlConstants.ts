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
    getStudentListReports: "StudentBulkEntry/GetStudentListReports",

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




    getComboSerialList: "AllSetupPage/GetComboSerialList",









    getCustomFeeTypeList: "Fee/GetCustomFeeTypeList",

    SaveCustomFeeType: "Fee/SaveCustomFeeType",
    getClassSecDueData: "Fee/GetClassSecDueData",
    getStudentCollectionReportData: "Fee/getStudentCollectionReportData",
    getStudentCollectionReportDataTemp: "Fee/getStudentCollectionReportDataTemp",






    // All Common Setup
    getAllCommonSetupList: "AllCommonSetup/GetAllCommonSetupList",
    getAllSetupList: "AllCommonSetup/GetAllCommonSetupListNew",
    crtUptDltAllCommonSetup: "AllCommonSetup/AllCommonSetup",
    crtUptDltAllSetupNew: "AllCommonSetup/AllSetupNew",

    //




     saveRoomInfo:"teacher/saveRoomInfo",
     saveRoom:"teacher/saveRoomMst",
     getRoomInfo:"teacher/getRoomInfo",
     getBuildingRoom:"SeatPlan/getBuildingWiseRoom",

     getBuildingList:"teacher/getBuildingList",






};
