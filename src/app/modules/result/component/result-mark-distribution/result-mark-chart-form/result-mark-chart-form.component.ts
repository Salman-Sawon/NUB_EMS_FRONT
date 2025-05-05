import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { TermListEntry } from '../../../models/term-list-entry';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { ResultService } from '../../../services/result.service';
import { AssignSubjectList } from '../../../models/assign-subject-list';
import { ResultSubjectWiseDetail } from '../../../models/examResultSubjectWiseDtl';
import { ResultMarkChartArray } from '../../../models/result-mark-chart-array';
import { ResultMarkChart } from '../../../models/result-mark-chart';


@Component({
  selector: 'app-result-mark-chart-form',
  templateUrl: './result-mark-chart-form.component.html',
  styleUrl: './result-mark-chart-form.component.scss'
})
export class ResultMarkChartFormComponent implements OnInit, OnDestroy{

  parmdata:any
  action:string
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
  SubjectGridList = JSON.parse(localStorage.getItem('SubjectGridList')!);
  ExamCaptionGridList = JSON.parse(localStorage.getItem('ExamCaptionGridList')!);
  private destroy$: Subject<void> = new Subject<void>();
  private unsubscribe: Subscription[] = [];
  commonForm: FormGroup;


  examTermList:any;
  assignsubject:any;
  examCaptionList: any;

  isVersionVisible: boolean = false;
  isSemesterVisible: boolean = false;

  isYearVisible: boolean = false;
  rowList: any = [];
  isSearchLoading = false;
  isSaveLoading = false;
  yearList: any[];
  semesterList: any[];
  visibilityList: any[];
  btnUpdateSave:string;
  data:any
  resultmarkChartArray: ResultMarkChartArray = new ResultMarkChartArray();

  termListEntrySave: TermListEntry = new TermListEntry();
  assignSubjectList: AssignSubjectList = new AssignSubjectList();
  examResultSubjectWiseDetail: ResultSubjectWiseDetail = new ResultSubjectWiseDetail();

  resultMarkChart: ResultMarkChart = new ResultMarkChart();

  constructor(
    private fb: FormBuilder,
    private i18n: NzI18nService,
    private modal: NzModalService,
    private globalService: GlobalService,
    private resultService: ResultService,
    private modalRef: NzModalRef,


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
        SUBJECT_CODE: [null, [Validators.required]],

        SUBJECT_NAME: [null,],
        EXAM_TOTAL_MARK: [null, [Validators.required]],
        MULTIPLY_BY: [1, ],
        TOTAL_PASS_MARK: [null, [Validators.required]],
        IS_JOIN: [null,[Validators.required]],
        SUBJECT_JOINING: [null, ],
        JOIN_PASS_MARK: [null, ],
        JOIN_ORDER:[null,],

        examCaptionArray: this.fb.array([]),

      });
      this.modalRef.afterOpen.pipe(takeUntil(this.destroy$)).subscribe(() => {
        if (modalRef.componentInstance) {
          this.resultMarkChart = modalRef.componentInstance.data;
          this.action = modalRef.componentInstance.action;
          this.data = modalRef.componentInstance.data;
          if(this.action === 'Add'){
            this.btnUpdateSave = 'Save ';
            this.commonForm.patchValue({GROUP_NAME: this.resultMarkChart.GROUP_CODE});
            this.commonForm.patchValue({CLASS_NAME: this.resultMarkChart.CLASS_CODE});
            this.commonForm.patchValue({VERSION_NAME: this.resultMarkChart.VERSION_CODE});
            this.commonForm.patchValue({SESSION_NAME: this.resultMarkChart.SESSION_CODE});
            this.commonForm.patchValue({YEAR_NAME: this.resultMarkChart.YEAR_CODE});
            this.commonForm.patchValue({SEMESTER_NAME: this.resultMarkChart.SEMESTER_CODE});
            this.commonForm.patchValue({TERM_NAME: this.resultMarkChart.TERM_ID});
           // this.LoadTermList();
           
            this.GetCaptionList();
          }else if(this.action === 'Update'){
            this.resultMarkChart = this.data;
          
            this.btnUpdateSave = 'Update ';
            this.commonForm.patchValue({GROUP_NAME: this.resultMarkChart.GROUP_CODE});
            this.commonForm.patchValue({CLASS_NAME: this.resultMarkChart.CLASS_CODE});
            this.commonForm.patchValue({VERSION_NAME: this.resultMarkChart.VERSION_CODE});
            this.commonForm.patchValue({SESSION_NAME: this.resultMarkChart.SESSION_CODE});
            this.commonForm.patchValue({YEAR_NAME: this.resultMarkChart.YEAR_CODE});
            this.commonForm.patchValue({SEMESTER_NAME: this.resultMarkChart.SEMESTER_CODE});
            this.commonForm.patchValue({TERM_NAME: this.resultMarkChart.TERM_ID});
            this.commonForm.patchValue({SUBJECT_CODE: this.data.SUBJECT_CODE});

            this.commonForm.patchValue({EXAM_TOTAL_MARK: this.data.EXAM_TOTAL_MARK});
            this.commonForm.patchValue({MULTIPLY_BY: this.data.MULTIPLY_BY});
            this.commonForm.patchValue({TOTAL_PASS_MARK: this.data.TOTAL_PASS_MARK});
            this.commonForm.patchValue({IS_JOIN: this.data.IS_JOIN});
            this.commonForm.patchValue({SUBJECT_JOINING: this.data.SUBJECT_JOINING});
            this.commonForm.patchValue({JOIN_PASS_MARK: this.data.JOIN_PASS_MARK});
            this.commonForm.patchValue({JOIN_ORDER: this.data.JOIN_ORDER});
           
            this.GetCaptionList();

          }
        }
      });


    }
    ngOnInit(): void {
     this.VersionVisibility();
    }
   

     get examCaptionArray() {
      return this.commonForm.get('examCaptionArray') as FormArray;
    }


    get commonFormControl() {
      return this.commonForm.controls;
    }

    get f() {
      return this.commonForm.controls;
    }

    addExamType(examTypeId: any, examTypeName: string, index: number) {
      index+=1;
      this.examCaptionArray.push(
        this.fb.group({
          EXAM_TYPE_ID: [examTypeId],
          ['EXAM_' + index + '_CAPTION']: [examTypeName],
          ['EXAM_' + index + '_TOTAL_MARK']:  ['0'],
          ['EXAM_' + index + '_PERCENT_MARK']: ['0'],
          ['EXAM_' + index + '_PASS_MARK']: ['0']
        })
      );

    }

    loadExamTypeWithMark(examTypeId: any, examTypeName: string, index: number,
      totalMark:any,percentMark:any,passMark:any
    ) {
      index+=1;
      this.examCaptionArray.push(
        this.fb.group({
          EXAM_TYPE_ID: [examTypeId],
          ['EXAM_' + index + '_CAPTION']: [examTypeName],
          ['EXAM_' + index + '_TOTAL_MARK']: [totalMark],
          ['EXAM_' + index + '_PERCENT_MARK']: [percentMark],
          ['EXAM_' + index + '_PASS_MARK']: [passMark]
        })
      );
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

//   public LoadTermList() {
//     this.termListEntrySave.ORG_CODE = this.organizationCode;
//     this.termListEntrySave.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
//     this.termListEntrySave.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
//     this.termListEntrySave.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
//     this.termListEntrySave.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
//     this.termListEntrySave.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
//     this.termListEntrySave.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
//     //this.termListEntrySave.SECTION_CODE =  this.commonForm.controls["sectionName"].value;

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


public Loadsubjectassign() {
  this.assignSubjectList.ORG_CODE = this.organizationCode;
  this.assignSubjectList.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
  this.assignSubjectList.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
  this.assignSubjectList.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
  this.assignSubjectList.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
 this.assignSubjectList.CAMPUS_CODE =  this.campusCode;
  this.assignSubjectList.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
  this.assignSubjectList.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
// this.resultService
// .getsubjectassignList(this.assignSubjectList)
// .pipe(takeUntil(this.destroy$))
// .subscribe((response: any) => {
//   this.assignsubject = response.ResponseObj;
  
//   this.changeDetect.detectChanges();
// });
this.assignsubject = this.SubjectGridList.filter((item: { CLASS_CODE: string; GROUP_CODE: string; ORG_CODE: string; SEMESTER_CODE: string; SESSION_CODE: string; VERSION_CODE: string; YEAR_CODE: string; }) => 
  item.CLASS_CODE ===  this.assignSubjectList.CLASS_CODE &&
item.GROUP_CODE ===  this.assignSubjectList.GROUP_CODE && 
item.SEMESTER_CODE ===  this.assignSubjectList.SEMESTER_CODE &&
item.SESSION_CODE ===  this.assignSubjectList.SESSION_CODE &&
item.VERSION_CODE ===  this.assignSubjectList.VERSION_CODE &&
item.YEAR_CODE ===  this.assignSubjectList.YEAR_CODE 

);


}


// GetCaptionList() {
//     this.examResultSubjectWiseDetail.ORG_CODE = this.organizationCode;
//     this.examResultSubjectWiseDetail.TERM_ID =  this.commonForm.controls["TERM_NAME"].value;
//     this.examResultSubjectWiseDetail.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
//     this.examResultSubjectWiseDetail.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
//     this.examResultSubjectWiseDetail.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
//     this.examResultSubjectWiseDetail.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
//    this.examResultSubjectWiseDetail.CAMPUS_CODE =  this.campusCode;
//     this.examResultSubjectWiseDetail.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
//     this.examResultSubjectWiseDetail.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;

//   this.resultService
//     .getExamCaptionList(
//       this.examResultSubjectWiseDetail.TERM_ID,
//       this.examResultSubjectWiseDetail.CLASS_CODE,
//       this.examResultSubjectWiseDetail.SESSION_CODE,
//       this.examResultSubjectWiseDetail.GROUP_CODE,
//       this.examResultSubjectWiseDetail.VERSION_CODE,
//       this.examResultSubjectWiseDetail.YEAR_CODE,
//       this.examResultSubjectWiseDetail.SEMESTER_CODE,
//       this.campusCode,
//       this.organizationCode
//     )
//     .pipe(takeUntil(this.destroy$))
//     .subscribe((response: any) => {
//       this.examCaptionList = response.ResponseObj;
//       this.Loadsubjectassign();
//       if(this.examCaptionList.length >0){
//         for( let i=0;i<this.examCaptionList.length;i++){
//           if(this.action=="Add"){
//             this.addExamType(this.examCaptionList[i].EXAM_TYPE_ID,this.examCaptionList[i].EXAM_CAPTION,i);
//           }else{
//             const examType = this.examCaptionList[i].EXAM_TYPE_ID;
//             const examCaption = this.examCaptionList[i].EXAM_CAPTION;
//             const totalMarkKey = `EXAM_${i + 1}_TOTAL_MARK`; // Dynamically construct the property name
//             const percentMarkKey = `EXAM_${i + 1}_PERCENT_MARK`; // Dynamically construct the property name
//             const passMarkKey = `EXAM_${i + 1}_PASS_MARK`; // Dynamically construct the property name
//             this.loadExamTypeWithMark(examType, examCaption, i, this.data[totalMarkKey], this.data[percentMarkKey], this.data[passMarkKey]);
//           }
//         }
//       }

//     });


//   }

GetCaptionList() {
  this.examResultSubjectWiseDetail.ORG_CODE = this.organizationCode;
  this.examResultSubjectWiseDetail.TERM_ID =  this.commonForm.controls["TERM_NAME"].value;
  this.examResultSubjectWiseDetail.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
  this.examResultSubjectWiseDetail.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
  this.examResultSubjectWiseDetail.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
  this.examResultSubjectWiseDetail.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
 this.examResultSubjectWiseDetail.CAMPUS_CODE =  this.campusCode;
  this.examResultSubjectWiseDetail.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
  this.examResultSubjectWiseDetail.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;


  this.examCaptionList = this.ExamCaptionGridList.filter((item: {TERM_ID:number; CLASS_CODE: string; GROUP_CODE: string; ORG_CODE: string; SEMESTER_CODE: string; SESSION_CODE: string; VERSION_CODE: string; YEAR_CODE: string; }) => 
    item.CLASS_CODE ===  this.examResultSubjectWiseDetail.CLASS_CODE &&
  item.GROUP_CODE ===  this.examResultSubjectWiseDetail.GROUP_CODE && 
  item.SEMESTER_CODE ===  this.examResultSubjectWiseDetail.SEMESTER_CODE &&
  item.SESSION_CODE ===  this.examResultSubjectWiseDetail.SESSION_CODE &&
  item.VERSION_CODE ===  this.examResultSubjectWiseDetail.VERSION_CODE &&
  item.YEAR_CODE ===  this.examResultSubjectWiseDetail.YEAR_CODE &&
  item.TERM_ID ===  this.examResultSubjectWiseDetail.TERM_ID
);
this.Loadsubjectassign();
    if(this.examCaptionList.length >0){
          for( let i=0;i<this.examCaptionList.length;i++){
            if(this.action=="Add"){
              this.addExamType(this.examCaptionList[i].CODE,this.examCaptionList[i].NAME,i);
            }else{
              const examType = this.examCaptionList[i].CODE;
              const examCaption = this.examCaptionList[i].NAME;
              const totalMarkKey = `EXAM_${i + 1}_TOTAL_MARK`; // Dynamically construct the property name
              const percentMarkKey = `EXAM_${i + 1}_PERCENT_MARK`; // Dynamically construct the property name
              const passMarkKey = `EXAM_${i + 1}_PASS_MARK`; // Dynamically construct the property name
              this.loadExamTypeWithMark(examType, examCaption, i, this.data[totalMarkKey], this.data[percentMarkKey], this.data[passMarkKey]);
            }
          }
        }


}


Save(){
  this.modal.confirm({
    nzTitle:'Confirmation',
    nzContent: `Are you sure you want to ${this.btnUpdateSave}`,
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: false,
    nzOnOk: () => this.createresultMarkChart(),
    nzCancelText: 'No',
  });

}
createresultMarkChart(){
  if(this.commonForm.valid ){
  this.resultMarkChart.ORG_CODE =  this.organizationCode;
  this.resultMarkChart.TERM_ID =  this.commonForm.controls["TERM_NAME"].value;
  this.resultMarkChart.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
  this.resultMarkChart.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
  this.resultMarkChart.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
  this.resultMarkChart.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
  this.resultMarkChart.SUBJECT_CODE =  this.commonForm.controls["SUBJECT_CODE"].value;
  this.resultMarkChart.CRITERIA =  this.resultMarkChart.CRITERIA;
  this.resultMarkChart.CRITERIA_SHOW =  this.resultMarkChart.CRITERIA_SHOW;
  this.resultMarkChart.CRITERIA_PASS =this.resultMarkChart.CRITERIA_PASS;
  this.resultMarkChart.IS_JOIN =   this.commonForm.controls["IS_JOIN"].value;

this.resultMarkChart.CALCULATION_TYPE = this.commonForm.get('IS_JOIN')?.value === 'Yes' ? 'Join' : 'Single';

  this.resultMarkChart.JOIN_ORDER =   this.commonForm.controls["JOIN_ORDER"].value;
  this.resultMarkChart.SUBJECT_JOINING =   this.commonForm.controls["SUBJECT_JOINING"].value;
  this.resultMarkChart.JOIN_PASS_MARK =   this.commonForm.controls["JOIN_PASS_MARK"].value;
  this.resultMarkChart.MULTIPLY_BY_JOIN =  this.resultMarkChart.MULTIPLY_BY_JOIN;
  this.resultMarkChart.TOTAL_SUBJECT =  this.resultMarkChart.TOTAL_SUBJECT;
  this.resultMarkChart.EXAM_TOTAL_MARK =   this.commonForm.controls["EXAM_TOTAL_MARK"].value;
  this.resultMarkChart.MULTIPLY_BY =   this.commonForm.controls["MULTIPLY_BY"].value;
  this.resultMarkChart.TOTAL_PASS_MARK =   this.commonForm.controls["TOTAL_PASS_MARK"].value;





  let data:any []=[]=this.examCaptionArray.value;
  for(let i = 0; i<data.length;i++){
    const totalMarkKey = `EXAM_${i + 1}_TOTAL_MARK`; // Dynamically construct the property name
    const percentMarkKey = `EXAM_${i + 1}_PERCENT_MARK`; // Dynamically construct the property name
    const passMarkKey = `EXAM_${i + 1}_PASS_MARK`;
    this.resultMarkChart[totalMarkKey] = data[i][totalMarkKey];
    this.resultMarkChart[percentMarkKey] = data[i][percentMarkKey];
    this.resultMarkChart[passMarkKey] = data[i][passMarkKey];

}
this.resultMarkChart.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
this.resultMarkChart.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
this.resultMarkChart.CAMPUS_CODE= this.campusCode;
let SUBJECT_NAME = this.assignsubject.filter((f:any)=>f.SUBJECT_CODE == this.resultMarkChart.SUBJECT_CODE).map((m:any)=>m.SUBJECT_NAME);
this.resultService.
SaveMarkChart(this.resultMarkChart)
.pipe(takeUntil(this.destroy$))
.subscribe((response:any) => {
  if (response.StatusCode === 1) {

  this.modal.success({
    nzTitle: `${this.btnUpdateSave}`,
    nzContent:  SUBJECT_NAME+response.Message,
  });
  this.modalRef.close(1);
  } else {
    this.modal.error({
      nzTitle: 'error!',
      nzContent: SUBJECT_NAME+response.Message,
    });
  }
});

this.changeDetect.detectChanges();

if(this.commonForm.controls["SUBJECT_NAME"].value != null) {
  this.resultMarkChart.SUBJECT_CODE =  this.commonForm.controls["SUBJECT_NAME"].value;
   this.resultService
   .SaveMarkChart(this.resultMarkChart)
   .pipe(takeUntil(this.destroy$))
   .subscribe((response:any) => {
    if (response.StatusCode === 1) {
      this.changeDetect.detectChanges();
      this.modal.success({
        nzTitle: 'success!',
        nzContent:  '2nd subject is Saved',
      });
      this.modalRef.close(1);
    } else {
      this.modal.error({
        nzTitle: 'error!',
        nzContent:  '2nd subject is Failed',
      });
    }
  });


}
}else {
  Object.values(this.commonForm.controls).forEach((control) => {
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
