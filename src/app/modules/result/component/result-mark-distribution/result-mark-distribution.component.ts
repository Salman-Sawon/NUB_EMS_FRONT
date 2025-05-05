import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ResultService } from '../../services/result.service';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TermListEntry } from '../../models/term-list-entry';
import { MarkChartList } from '../../models/mark-chart-list';
import { StudentBulkEntry } from '../../models/student-bulk-entry';
import { ResultMarkChartArray } from '../../models/result-mark-chart-array';
import { ResultMarkChartFormComponent } from './result-mark-chart-form/result-mark-chart-form.component';
import { ResultMarkChart } from '../../models/result-mark-chart';
interface ItemData {
  SUBJECT_NAME: string;
  SUBJECT_CODE: string;
}
@Component({
  selector: 'app-result-mark-distribution',
  templateUrl: './result-mark-distribution.component.html',
  styleUrl: './result-mark-distribution.component.scss'
})
export class ResultMarkDistributionComponent implements OnInit, OnDestroy {
  organizationList = JSON.parse(localStorage.getItem('Organization')!);
  campusList = JSON.parse(localStorage.getItem('CampusList')!);
  organizationCode = this.organizationList[0].CODE;
  campusCode = this.campusList[0].CODE;
  classList = JSON.parse(localStorage.getItem('classList')!);
  groupList = JSON.parse(localStorage.getItem('groupList')!);
  versionList = JSON.parse(localStorage.getItem('versionList')!);
  sessionList = JSON.parse(localStorage.getItem('sessionList')!);
  shiftList = JSON.parse(localStorage.getItem('shiftList')!);
  classCode = this.classList[0].CODE;
  userCode:any = localStorage.getItem('userCode');
  termList = JSON.parse(localStorage.getItem('TermGridList')!);
  private destroy$: Subject<void> = new Subject<void>();
  private unsubscribe: Subscription[] = [];
  commonForm: FormGroup;
  commonFormDwn: FormGroup;

  examTermList:any;
  markChartArray:any;
  listOfData: ItemData[] = [];
  isVersionVisible: boolean = false;
  isSemesterVisible: boolean = false;
  isSectionVisible: boolean = false;
  isYearVisible: boolean = false;
  rowList: any = [];
  isSearchLoading = false;
  isSaveLoading = false;
  yearList: any[];
  semesterList: any[];
  visibilityList: any[];

  sectionlist: any;
  Showcopyform = false;
  isActiveSkelton = false;
  isSkeletonShow = false;

  termListEntrySave: TermListEntry = new TermListEntry();
  markChartList: MarkChartList = new MarkChartList();


  resultMarkChart: ResultMarkChart = new ResultMarkChart();

  stdBulkEntry: StudentBulkEntry = new StudentBulkEntry();
  resultmarkChartArray: ResultMarkChartArray = new ResultMarkChartArray();

  constructor(
    private fb: FormBuilder,
    private i18n: NzI18nService,
    private modal: NzModalService,
    private globalService: GlobalService,
    private resultService: ResultService,



    private changeDetect: ChangeDetectorRef)

    {
      this.i18n.setLocale(en_US);
      this.isVersionVisible = globalService.isVisible("VERSION",'');


      this.commonForm = this.fb.group({
        GROUP_NAME: [null, [Validators.required]],
        CLASS_NAME: [null, [Validators.required]],
        VERSION_NAME: [null, [Validators.required]],
        SESSION_NAME: [null, [Validators.required]],
        YEAR_NAME: [null, [Validators.required]],
        SEMESTER_NAME: [null, [Validators.required]],
        TERM_NAME: [null, [Validators.required]],



      });

      this.commonFormDwn = this.fb.group({
        GROUP_NAME: [null, [Validators.required]],
        CLASS_NAME: [null, [Validators.required]],
        VERSION_NAME: [null, [Validators.required]],
        SESSION_NAME: [null, [Validators.required]],
        YEAR_NAME: [null, [Validators.required]],
        SEMESTER_NAME: [null, [Validators.required]],


        TO_TERM_NAME: [null,[Validators.required]],

      });

    }
    ngOnInit(): void {
     this.VersionVisibility();
    }

    get commonFormControl() {
      return this.commonForm.controls;
    }

    get f() {
      return this.commonForm.controls;
    }

    onSelectedClass(classCode: any) {
      this.yearList = [];
      this.semesterList = [];
      this.isYearVisible = false;
      this.isSemesterVisible = false;
      this.commonForm.controls['YEAR_NAME'].reset();
      this.commonForm.controls['SEMESTER_NAME'].reset();
     // this.commonForm.controls['SECTION_NAME'].reset();
      if (classCode) {
        this.LoadYearList(classCode);
        this.LoadSemesterList(classCode);
      //  this.LoadSectionList(classCode);
      }

    }
    VersionVisibility() {
      if (!this.isVersionVisible) {
        this.commonForm.controls.VERSION_NAME.setValue(this.versionList[0].CODE);
      } else {
        this.commonForm.controls.VERSION_NAME.enable();
      }
    }
    public LoadYearList(classCode: any) {
      // this.isYearVisible = false;
      this.yearList = this.globalService.getYearListByClassCode(classCode);
      this.visibilityList =
        this.globalService.getVisibilityListByClassCode(classCode);
      if (this.visibilityList !== null) {
        for (let i = 0; i < this.visibilityList.length; i++) {
          let Component = this.visibilityList[i].CODE;
          let isVisible = this.visibilityList[i].NAME;
          if (Component == 'YEAR' && isVisible == 'Y') {
            this.isYearVisible = this.globalService.isVisible('YEAR',classCode);
            this.changeDetect.detectChanges();
          }
        }
      }
      if (!this.isYearVisible) {
        this.commonForm.controls.YEAR_NAME.setValue(this.yearList[0].CODE);
        this.changeDetect.detectChanges();
      } else {
        this.commonForm.controls.YEAR_NAME.enable();
      }
      this.changeDetect.detectChanges();
    }
    public LoadSemesterList(classCode: any) {
      this.semesterList =
        this.globalService.getSemesterListByClassCode(classCode);
      this.visibilityList =
        this.globalService.getVisibilityListByClassCode(classCode);
      if (this.visibilityList !== null) {
        for (let i = 0; i < this.visibilityList.length; i++) {
          let Component = this.visibilityList[i].CODE;
          let isVisible = this.visibilityList[i].NAME;
          if (Component == 'SEMESTER' && isVisible == 'Y') {
            this.isSemesterVisible = this.globalService.isVisible('SEMESTER',classCode);
          }
        }
      }
      if (!this.isSemesterVisible) {
        this.commonForm.controls.SEMESTER_NAME.setValue(this.semesterList[0].CODE);
      } else {
        this.commonForm.controls.SEMESTER_NAME.enable();
      }
      this.changeDetect.detectChanges();
    }


  // public LoadSectionList(classCode:any) {
  //   this.sectionlist = this.globalService.getSectionListByClassCode(classCode);
  //   this.visibilityList = this.globalService.getVisibilityListByClassCode(classCode);
  // if(this.visibilityList !== null){
  // for(let i = 0; i<this.visibilityList.length; i++){
  //   let Component = this.visibilityList[i].CODE;
  //   let isVisible = this.visibilityList[i].NAME;
  //   if(Component=='SECTION' && isVisible == 'Y' ){
  //     this.isSectionVisible = this.globalService.isVisible('SECTION',classCode);
  //   }
  // }
  // }

  // if(!this.isSectionVisible)
  // {
  //   //this.stdBulkEntry.SECTION_CODE =  this.sectionlist[0].CODE;
  //   this.commonForm.patchValue({ SECTION_NAME: this.sectionlist[0].CODE });
  //   this.commonForm.controls.SECTION_NAME.disable();
  // }
  // else{
  //   this.commonForm.controls.SECTION_NAME.enable();
  // }
  //   this.changeDetect.detectChanges();
  //  }

  onSessionChange(value:any){
    this.examTermList=[];
    if(value!=null){
    if(!this.isYearVisible){
    this.commonForm.controls["TERM_NAME"].reset();
      this.LoadTermList();
    }
  }
  }
  onYearChange(value:any){
    this.examTermList=[];
    if(value!=null){
    if(!this.isSemesterVisible){
    this.commonForm.controls["TERM_NAME"].reset();
      this.LoadTermList();
    }
  }
  }
  onSemesterChange(value:any){
    this.examTermList=[];
    if(value!=null){
   
    this.commonForm.controls["TERM_NAME"].reset();
      this.LoadTermList();
   
  }
  }




  //  onSessionChange(){
  //   if(!this.isYearVisible){
  //     this.commonForm.controls["TERM_NAME"].reset();
  //         this.LoadTermList();

  //   }
  // }

//   public LoadTermList() {
//     this.termListEntrySave.ORG_CODE = this.organizationCode;
//     this.termListEntrySave.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
//     this.termListEntrySave.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
//     this.termListEntrySave.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
//     this.termListEntrySave.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
//     this.termListEntrySave.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
//     this.termListEntrySave.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
//  this.resultService
//   .getExamTermList(this.termListEntrySave)
//   .pipe(takeUntil(this.destroy$))
//   .subscribe((response: any) => {
//     this.examTermList = response.ResponseObj;
//     this.changeDetect.detectChanges();

//   });

// }


public LoadTermList() {

  this.termListEntrySave.ORG_CODE = this.organizationCode;
  this.termListEntrySave.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
  this.termListEntrySave.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
  this.termListEntrySave.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
  this.termListEntrySave.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
  this.termListEntrySave.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
  this.termListEntrySave.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
  //this.termListEntrySave.SECTION_CODE =  this.commonForm.controls["sectionName"].value;
 
 
  this.examTermList = this.termList.filter((item: { CLASS_CODE: string; GROUP_CODE: string; ORG_CODE: string; SEMESTER_CODE: string; SESSION_CODE: string; VERSION_CODE: string; YEAR_CODE: string; }) => 
    item.CLASS_CODE ===  this.termListEntrySave.CLASS_CODE &&
  item.GROUP_CODE ===  this.termListEntrySave.GROUP_CODE && 
  item.SEMESTER_CODE ===  this.termListEntrySave.SEMESTER_CODE &&
  item.SESSION_CODE ===  this.termListEntrySave.SESSION_CODE &&
  item.VERSION_CODE ===  this.termListEntrySave.VERSION_CODE &&
  item.YEAR_CODE ===  this.termListEntrySave.YEAR_CODE
);
if ( this.examTermList.length == 0) {
   
        this.modal.warning({
          nzTitle: 'Error!',
          nzContent: `Given information no exam term found...`,
          nzOkDanger:true
        });
      }
}










getMarkDistributionInfo(value:any) {
  this.isActiveSkelton = false;
 
  if (this.commonForm.valid) {
    this.isSearchLoading=true;
    this.markChartArray=[];
    this.isSearchLoading = true;
    this.isActiveSkelton = true;
    this.isSkeletonShow=true;
    this.Showcopyform=false;
  this.markChartList.ORG_CODE = this.organizationCode;
  this.markChartList.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
  this.markChartList.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
  this.markChartList.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
  this.markChartList.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
  this.markChartList.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
  this.markChartList.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
  this.markChartList.CAMPUS_CODE =  this.campusCode;
  this.markChartList.TERM_ID =  this.commonForm.controls["TERM_NAME"].value;

     this.resultService.GetMarkChartInfo( this.markChartList)
     .pipe(takeUntil(this.destroy$))
     .subscribe((response: any) => {
      this.markChartArray = response.ResponseObj;
      this.isSearchLoading=false;
      if(this.markChartArray.length > 0){
        this.isSearchLoading=false;
        this.Showcopyform=true;
        this.isActiveSkelton=false;
        this.isSkeletonShow=false;

        this.commonFormDwn.patchValue({CLASS_NAME: this.markChartList.CLASS_CODE});
        this.commonFormDwn.patchValue({GROUP_NAME: this.markChartList.GROUP_CODE});
        this.commonFormDwn.patchValue({VERSION_NAME: this.markChartList.VERSION_CODE});
        this.commonFormDwn.patchValue({SESSION_NAME: this.markChartList.SESSION_CODE});
        this.commonFormDwn.patchValue({YEAR_NAME: this.markChartList.YEAR_CODE});
        this.commonFormDwn.patchValue({SEMESTER_NAME: this.markChartList.SEMESTER_CODE});

      }else{
        this.isActiveSkelton=false;
        this.Showcopyform=false;
        this.isSkeletonShow=false;
        if(value===1){
        this.modal.warning({
          nzTitle: 'Error!',
          nzContent: `No Data Found!`,
          nzOkDanger:true
        });
      }

      }
     this.listOfData.push(...this.markChartArray);
    
     this.changeDetect.detectChanges();

    });
  }else{
    this.isSearchLoading = false;
      Object.values(this.commonForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }


}

getStyle(subject: any, index: number) {
  if (subject.IS_JOIN === 'Yes') {
    const joinSubjects = this.markChartArray.filter((item: { IS_JOIN: string; }) => item.IS_JOIN === 'Yes');

    // Red for the first two join subjects
    if (joinSubjects.indexOf(subject) < 2) {
      return { 'color': '#3498db' };
    }

    // Green for the next two join subjects
    if (joinSubjects.indexOf(subject) >= 2 && joinSubjects.indexOf(subject) < 4) {
      return { 'color': '#d4ac0d' };
    }
  }

  // Default style if not in the first 4 join subjects
  return {'color': '#566573'};
}





onSearchInputChange(event: KeyboardEvent) {
  const searchValue = (event.target as HTMLInputElement).value;
  this.filterTableData(searchValue);
}

filterTableData(searchValue: string) {
  if (!searchValue) {
    this.markChartArray = [...this.listOfData];
    this.changeDetect.detectChanges();
  } else {
    const lowerCaseSearch = searchValue.toLowerCase();

    const filteredMenu = this.listOfData.filter((menuItem) => {
      const lowerCaseName = menuItem.SUBJECT_NAME.toLowerCase();
      return lowerCaseName.includes(lowerCaseSearch);
    });
    if (filteredMenu.length === 0) {
      this.changeDetect.detectChanges();
    } else {
      this.changeDetect.detectChanges();
    }
    this.markChartArray = filteredMenu;
  }
}
addEditMarkchart(action: string,data:any){
  if(this.commonForm.valid){
  if(action === 'Update'){
    this.resultMarkChart.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
    this.resultMarkChart.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
    this.resultMarkChart.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
    this.resultMarkChart.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
    this.resultMarkChart.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
    this.resultMarkChart.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
    this.resultMarkChart.TERM_ID =  this.commonForm.controls["TERM_NAME"].value;
    this.resultMarkChart.SUBJECT_CODE = data.SUBJECT_CODE;
    this.resultMarkChart.EXAM_TOTAL_MARK = data.EXAM_TOTAL_MARK;
    this.resultMarkChart.TOTAL_PASS_MARK = data.TOTAL_PASS_MARK;
    this.resultMarkChart.MULTIPLY_BY = data.MULTIPLY_BY;
    this.resultMarkChart.IS_EFFECTIVE = data.IS_EFFECTIVE;
    this.resultMarkChart.SUBJECT_JOINING = data.SUBJECT_JOINING;
    this.resultMarkChart.JOIN_PASS_MARK = data.JOIN_PASS_MARK;
    this.resultMarkChart.JOIN_ORDER = data.JOIN_ORDER;
    this.resultMarkChart.IS_JOIN = data.IS_JOIN;


    this.resultMarkChart.EXAM_1_TOTAL_MARK = data.EXAM_1_TOTAL_MARK;
    this.resultMarkChart.EXAM_1_PERCENT_MARK = data.EXAM_1_PERCENT_MARK;
    this.resultMarkChart.EXAM_1_PASS_MARK = data.EXAM_1_PASS_MARK;
    this.resultMarkChart.EXAM_2_TOTAL_MARK = data.EXAM_2_TOTAL_MARK;
    this.resultMarkChart.EXAM_2_PERCENT_MARK = data.EXAM_2_PERCENT_MARK;
    this.resultMarkChart.EXAM_2_PASS_MARK = data.EXAM_2_PASS_MARK;
    this.resultMarkChart.EXAM_3_TOTAL_MARK = data.EXAM_3_TOTAL_MARK;
    this.resultMarkChart.EXAM_3_PERCENT_MARK = data.EXAM_3_PERCENT_MARK;
    this.resultMarkChart.EXAM_3_PASS_MARK = data.EXAM_3_PASS_MARK;
    this.resultMarkChart.EXAM_4_TOTAL_MARK = data.EXAM_4_TOTAL_MARK;
    this.resultMarkChart.EXAM_4_PERCENT_MARK = data.EXAM_4_PERCENT_MARK;
    this.resultMarkChart.EXAM_4_PASS_MARK = data.EXAM_4_PASS_MARK;
    this.resultMarkChart.EXAM_5_TOTAL_MARK = data.EXAM_5_TOTAL_MARK;
    this.resultMarkChart.EXAM_5_PERCENT_MARK = data.EXAM_5_PERCENT_MARK;
    this.resultMarkChart.EXAM_5_PASS_MARK = data.EXAM_5_PASS_MARK;
    this.resultMarkChart.EXAM_6_TOTAL_MARK = data.EXAM_6_TOTAL_MARK;
    this.resultMarkChart.EXAM_6_PERCENT_MARK = data.EXAM_6_PERCENT_MARK;
    this.resultMarkChart.EXAM_6_PASS_MARK = data.EXAM_6_PASS_MARK;


  }else if (action === 'Add'){
    this.resultMarkChart.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
    this.resultMarkChart.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
    this.resultMarkChart.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
    this.resultMarkChart.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
    this.resultMarkChart.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
    this.resultMarkChart.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
    this.resultMarkChart.TERM_ID =  this.commonForm.controls["TERM_NAME"].value;
  }
  const modalRef: NzModalRef = this.modal.create({
    nzTitle: `${action} Mark Chart`,
    nzContent: ResultMarkChartFormComponent,
    nzFooter: null,
    nzMaskClosable: false,
    nzWidth:1100
  });
  modalRef.componentInstance.action = action;
  modalRef.componentInstance.data = this.resultMarkChart;
  modalRef.afterClose.subscribe((result: any) => {
   
    if(result){
      this.getMarkDistributionInfo(2);
    }
   
  });
}else{

    Object.values(this.commonForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }



}




deleteItem(row:any) {


  this.modal.confirm({
    nzTitle: `Confirmation`,
    nzContent: `<b style="color: red;">Are you sure you want to delete  ${row.SUBJECT_NAME}</b>`,
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => {
      this.resultMarkChart.ORG_CODE = this.organizationCode;
      this.resultMarkChart.TERM_ID =  this.commonForm.controls["TERM_NAME"].value;
      this.resultMarkChart.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
      this.resultMarkChart.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
      this.resultMarkChart.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
      this.resultMarkChart.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
      this.resultMarkChart.SUBJECT_CODE = row.SUBJECT_CODE;

      this.resultService.
      DeleteMarkChartItem(this.resultMarkChart)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:any) => {
        if (response.StatusCode === 1) {
          this.modal.success({
            nzTitle: 'success!',
            nzContent: response.Message,
          });
         this.isSaveLoading=false;
          this.getMarkDistributionInfo(1);

        } else {
          this.modal.error({
            nzTitle: 'error!',
            nzContent: response.Message,
          });
        }
      });

    }
  });










}

Save(){
  if (this.commonFormDwn.valid) {
    this.markChartList.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
  this.markChartList.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
  this.markChartList.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
  this.markChartList.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
  this.markChartList.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
  this.markChartList.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
  this.markChartList.TERM_ID =  this.commonForm.controls["TERM_NAME"].value;

    this.stdBulkEntry.CLASS_CODE=this.commonForm.controls['CLASS_NAME'].value;
    this.stdBulkEntry.GROUP_CODE=this.commonForm.controls['GROUP_NAME'].value;
    this.stdBulkEntry.SESSION_CODE=this.commonForm.controls['SESSION_NAME'].value;
    this.stdBulkEntry.TERM_ID=this.commonForm.controls['TERM_NAME'].value;



    this.resultmarkChartArray.CLASS_CODE =  this.commonFormDwn.controls["CLASS_NAME"].value;
    this.resultmarkChartArray.YEAR_CODE =  this.commonFormDwn.controls["YEAR_NAME"].value;
    this.resultmarkChartArray.SEMESTER_CODE =  this.commonFormDwn.controls["SEMESTER_NAME"].value;
    this.resultmarkChartArray.GROUP_CODE =  this.commonFormDwn.controls["GROUP_NAME"].value;
    this.resultmarkChartArray.SESSION_CODE =  this.commonFormDwn.controls["SESSION_NAME"].value;
    this.resultmarkChartArray.VERSION_CODE =  this.commonFormDwn.controls["VERSION_NAME"].value;
    this.resultmarkChartArray.TERM_ID =  this.commonFormDwn.controls["TO_TERM_NAME"].value;


  let FClassName = this.classList.filter((f:any)=>f.CODE == this.stdBulkEntry.CLASS_CODE).map((m:any)=>m.NAME);
  let FGroupName = this.groupList.filter((f:any)=>f.CODE == this.stdBulkEntry.GROUP_CODE).map((m:any)=>m.NAME);
  let FSessionName = this.sessionList.filter((f:any)=>f.CODE == this.stdBulkEntry.SESSION_CODE).map((m:any)=>m.NAME);
  let FTermName = this.examTermList.filter((f:any)=>f.TERM_ID == this.stdBulkEntry.TERM_ID).map((m:any)=>m.TERM_DESCRIPTION);

  let TClassName = this.classList.filter((f:any)=>f.CODE == this.resultmarkChartArray.CLASS_CODE).map((m:any)=>m.NAME);
  let TGroupName = this.groupList.filter((f:any)=>f.CODE == this.resultmarkChartArray.GROUP_CODE).map((m:any)=>m.NAME);
  let TSessionName = this.sessionList.filter((f:any)=>f.CODE == this.resultmarkChartArray.SESSION_CODE).map((m:any)=>m.NAME);
  let TTermName = this.examTermList.filter((f:any)=>f.TERM_ID == this.resultmarkChartArray.TERM_ID).map((m:any)=>m.TERM_DESCRIPTION);

  this.modal.confirm({
    nzTitle: `Are you sure `,
    nzContent: `you want to copy from
    ${FGroupName+'-'}${FClassName+'-'}${FSessionName+'-'}${FTermName}
    to
    ${TClassName+'-'}${TGroupName+'-'}${TSessionName+'-'}${TTermName}`,
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: false,
    nzOnOk: () => this.createresultMarkChartCopyForm(),
    nzCancelText: 'No',
  });


  }else{
    this.isSaveLoading = false;
      Object.values(this.commonFormDwn.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }



}
createresultMarkChartCopyForm() {

  if (this.commonForm.valid) {
this.isSaveLoading=true;
    this.resultmarkChartArray.SUBJECT_CODE = [];
    this.resultmarkChartArray.JOIN_SUBJECT_CODE = [];
    this.resultmarkChartArray.CRITERIA = [];
    this.resultmarkChartArray.CRITERIA_SHOW = [];
    this.resultmarkChartArray.CRITERIA_PASS = [];
    this.resultmarkChartArray.IS_JOIN = [];
    this.resultmarkChartArray.CALCULATION_TYPE = [];
    this.resultmarkChartArray.JOIN_ORDER = [];
    this.resultmarkChartArray.SUBJECT_JOINING = [];
    this.resultmarkChartArray.JOIN_PASS_MARK = [];
    this.resultmarkChartArray.MULTIPLY_BY_JOIN = [];
    this.resultmarkChartArray.TOTAL_SUBJECT = [];
    this.resultmarkChartArray.EXAM_TOTAL_MARK = [];
    this.resultmarkChartArray.MULTIPLY_BY = [];
    this.resultmarkChartArray.TOTAL_PASS_MARK = [];
    this.resultmarkChartArray.EXAM_1_TOTAL_MARK = [];
    this.resultmarkChartArray.EXAM_1_PERCENT_MARK = [];
    this.resultmarkChartArray.EXAM_1_PASS_MARK = [];
    this.resultmarkChartArray.EXAM_2_TOTAL_MARK = [];
    this.resultmarkChartArray.EXAM_2_PERCENT_MARK = [];
    this.resultmarkChartArray.EXAM_2_PASS_MARK = [];
    this.resultmarkChartArray.EXAM_3_TOTAL_MARK = [];
    this.resultmarkChartArray.EXAM_3_PERCENT_MARK = [];
    this.resultmarkChartArray.EXAM_3_PASS_MARK = [];
    this.resultmarkChartArray.EXAM_4_TOTAL_MARK = [];
    this.resultmarkChartArray.EXAM_4_PERCENT_MARK = [];
    this.resultmarkChartArray.EXAM_4_PASS_MARK = [];
    this.resultmarkChartArray.EXAM_5_TOTAL_MARK = [];
    this.resultmarkChartArray.EXAM_5_PERCENT_MARK = [];
    this.resultmarkChartArray.EXAM_5_PASS_MARK = [];
    this.resultmarkChartArray.EXAM_6_TOTAL_MARK = [];
    this.resultmarkChartArray.EXAM_6_PERCENT_MARK = [];
    this.resultmarkChartArray.EXAM_6_PASS_MARK = [];

    this.resultmarkChartArray.ORG_CODE = this.organizationCode;
    this.resultmarkChartArray.CAMPUS_CODE = this.campusCode;

    this.markChartArray.forEach((item:any,i:any) => {
    // this.markChartArray.SUBJECT_ID[i] = item.SUBJECT_ID;
    this.resultmarkChartArray.SUBJECT_CODE[i] = item.SUBJECT_CODE;
    this.resultmarkChartArray.JOIN_SUBJECT_CODE[i] = item.JOIN_SUBJECT_CODE;
    this.resultmarkChartArray.CRITERIA[i] = item.CRITERIA;
    this.resultmarkChartArray.CRITERIA_SHOW[i] = item.CRITERIA_SHOW;
    this.resultmarkChartArray.CRITERIA_PASS[i] = item.CRITERIA_PASS;
    this.resultmarkChartArray.IS_JOIN[i] = item.IS_JOIN;
    this.resultmarkChartArray.CALCULATION_TYPE[i] = item.CALCULATION_TYPE;
    this.resultmarkChartArray.JOIN_ORDER[i] = item.JOIN_ORDER;
    this.resultmarkChartArray.SUBJECT_JOINING[i] = item.SUBJECT_JOINING;
    this.resultmarkChartArray.JOIN_PASS_MARK[i] = item.JOIN_PASS_MARK;
    this.resultmarkChartArray.MULTIPLY_BY_JOIN[i] = item.MULTIPLY_BY_JOIN;
    this.resultmarkChartArray.TOTAL_SUBJECT[i] = item.TOTAL_SUBJECT;
    this.resultmarkChartArray.EXAM_TOTAL_MARK[i] = item.EXAM_TOTAL_MARK;
    this.resultmarkChartArray.MULTIPLY_BY[i] = item.MULTIPLY_BY;
    this.resultmarkChartArray.TOTAL_PASS_MARK[i] = item.TOTAL_PASS_MARK;
    this.resultmarkChartArray.EXAM_1_TOTAL_MARK[i] = item.EXAM_1_TOTAL_MARK;
    this.resultmarkChartArray.EXAM_1_PERCENT_MARK[i] = item.EXAM_1_PERCENT_MARK;
    this.resultmarkChartArray.EXAM_1_PASS_MARK[i] = item.EXAM_1_PASS_MARK;
    this.resultmarkChartArray.EXAM_2_TOTAL_MARK[i] = item.EXAM_2_TOTAL_MARK;
    this.resultmarkChartArray.EXAM_2_PERCENT_MARK[i] = item.EXAM_2_PERCENT_MARK;
    this.resultmarkChartArray.EXAM_2_PASS_MARK[i] = item.EXAM_2_PASS_MARK;
    this.resultmarkChartArray.EXAM_3_TOTAL_MARK[i] = item.EXAM_3_TOTAL_MARK;
    this.resultmarkChartArray.EXAM_3_PERCENT_MARK[i] = item.EXAM_3_PERCENT_MARK;
    this.resultmarkChartArray.EXAM_3_PASS_MARK[i] = item.EXAM_3_PASS_MARK;
    this.resultmarkChartArray.EXAM_4_TOTAL_MARK[i] = item.EXAM_4_TOTAL_MARK;
    this.resultmarkChartArray.EXAM_4_PERCENT_MARK[i] = item.EXAM_4_PERCENT_MARK;
    this.resultmarkChartArray.EXAM_4_PASS_MARK[i] = item.EXAM_4_PASS_MARK;
    this.resultmarkChartArray.EXAM_5_TOTAL_MARK[i] = item.EXAM_5_TOTAL_MARK;
    this.resultmarkChartArray.EXAM_5_PERCENT_MARK[i] = item.EXAM_5_PERCENT_MARK;
    this.resultmarkChartArray.EXAM_5_PASS_MARK[i] = item.EXAM_5_PASS_MARK;
    this.resultmarkChartArray.EXAM_6_TOTAL_MARK[i] = item.EXAM_6_TOTAL_MARK;
    this.resultmarkChartArray.EXAM_6_PERCENT_MARK[i] = item.EXAM_6_PERCENT_MARK;
    this.resultmarkChartArray.EXAM_6_PASS_MARK[i] = item.EXAM_6_PASS_MARK;
    this.resultmarkChartArray.IS_EFFECTIVE = item.IS_EFFECTIVE;
  });
 this.resultService.SaveMarkChartCopyForm(this.resultmarkChartArray)
 .pipe(takeUntil(this.destroy$))
 .subscribe((response:any) => {
    if (response.StatusCode === 1) {

      this.modal.success({
        nzTitle: 'success!',
        nzContent: response.Message,
      });
      //this.commonForm.get('TERM_ID').reset();
     this.isSaveLoading=false;

      this.getMarkDistributionInfo(2);
      this.commonFormDwn.controls['TO_TERM_NAME'].reset();

      this.changeDetect.detectChanges();
    } else {

      this.modal.error({
        nzTitle: 'error!',
        nzContent:response.Message,
      });
    this.isSaveLoading=false;

    }

  });


}else{
this.isSaveLoading = false;
  Object.values(this.commonFormDwn.controls).forEach((control) => {
    if (control.invalid) {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    }
  });
}

}
ngOnDestroy() {
  this.unsubscribe.forEach((sb) => sb.unsubscribe());
}
}
