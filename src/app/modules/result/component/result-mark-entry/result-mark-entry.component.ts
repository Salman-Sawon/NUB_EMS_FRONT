import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ResultSubjectWiseDetail } from '../../models/examResultSubjectWiseDtl';
import { TermListEntry } from '../../models/term-list-entry';
import { ResultService } from '../../services/result.service';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { AssignSubjectList } from '../../models/assign-subject-list';
interface ItemData {
  STUDENT_CODE: string;
  STUDENT_NAME: string;
}
@Component({
  selector: 'app-result-mark-entry',
  templateUrl: './result-mark-entry.component.html',
  styleUrl: './result-mark-entry.component.scss'

})
export class ResultMarkEntryComponent implements OnInit, OnDestroy {
  listOfData: ItemData[] = [];

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
  ExamCaptionGridList = JSON.parse(localStorage.getItem('ExamCaptionGridList')!);
  SubjectGridList = JSON.parse(localStorage.getItem('SubjectGridList')!);
  private destroy$: Subject<void> = new Subject<void>();
  private unsubscribe: Subscription[] = [];
  commonForm: FormGroup;

  examTermList:any;
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
  assignsubject: any[];
  sectionlist: any;
  examCaptionList: any;
  studentCodeList: any;
  studentList: any;


  termListEntrySave: TermListEntry = new TermListEntry();
  assignSubjectList: AssignSubjectList = new AssignSubjectList();
  examResultSubjectWiseDetail: ResultSubjectWiseDetail = new ResultSubjectWiseDetail();
  savebtnshow=false;
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
      this.examResultSubjectWiseDetail.STUDENT_CODE = [];
     this.examResultSubjectWiseDetail.EXAM_TYPE = [];
      this.examResultSubjectWiseDetail.MARK = [];

      this.commonForm = this.fb.group({
        GROUP_NAME: [null, [Validators.required]],
        CLASS_NAME: [null, [Validators.required]],
        VERSION_NAME: [null, [Validators.required]],
        SESSION_NAME: [null, [Validators.required]],
        YEAR_NAME: [null, [Validators.required]],
        SEMESTER_NAME: [null, [Validators.required]],
        TERM_NAME: [null, [Validators.required]],
        SECTION_NAME: [null, [Validators.required]],
        SHIFT_CODE: [null, [Validators.required]],
        SUBJECT_CODE: [null, Validators.required],
        EXAM_TYPE_ID: [[]],
        MarkFormArray: new FormArray([]),
      });

    }
    ngOnInit(): void {
     this.VersionVisibility();
    }

    onTermLoad(){
      this.LoadTermList();

     }

     selectedProvince = 'Zhejiang';
     selectedCity = 'Hangzhou';
     provinceData = ['Zhejiang', 'Bangladesh vs South Africa, 1st Test - Live Cricket Score, Commentary'];
     cityData: { [place: string]: string[] } = {
       Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
       Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
     };
   
     provinceChange(value: string): void {
       this.selectedCity = this.cityData[value][0];
     }


    get commonFormControl() {
      return this.commonForm.controls;
    }

    get f() {
      return this.commonForm.controls;
    }
    get MarkFormArray() {
      return this.f.MarkFormArray as FormArray;
    }


    onSelectedClass(classCode: any) {
      this.yearList = [];
      this.semesterList = [];
      this.isYearVisible = false;
      this.isSemesterVisible = false;
      this.commonForm.controls['YEAR_NAME'].reset();
      this.commonForm.controls['SEMESTER_NAME'].reset();
      this.commonForm.controls['SECTION_NAME'].reset();
      if (classCode) {
        this.LoadYearList(classCode);
        this.LoadSemesterList(classCode);
        this.LoadSectionList(classCode);
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


  public LoadSectionList(classCode:any) {
    this.sectionlist = this.globalService.getSectionListByClassCode(classCode);
    this.visibilityList = this.globalService.getVisibilityListByClassCode(classCode);
  if(this.visibilityList !== null){
  for(let i = 0; i<this.visibilityList.length; i++){
    let Component = this.visibilityList[i].CODE;
    let isVisible = this.visibilityList[i].NAME;
    if(Component=='SECTION' && isVisible == 'Y' ){
      this.isSectionVisible = this.globalService.isVisible('SECTION',classCode);
    }
  }
  }

  if(!this.isSectionVisible)
  {
    //this.stdBulkEntry.SECTION_CODE =  this.sectionlist[0].CODE;
    this.commonForm.patchValue({ SECTION_NAME: this.sectionlist[0].CODE });
    this.commonForm.controls.SECTION_NAME.disable();
  }
  else{
    this.commonForm.controls.SECTION_NAME.enable();
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

  public LoadTermList() {

    this.termListEntrySave.ORG_CODE = this.organizationCode;
    this.termListEntrySave.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
    this.termListEntrySave.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
    this.termListEntrySave.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
    this.termListEntrySave.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
    this.termListEntrySave.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
    this.termListEntrySave.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
  // this.resultService
  // .getExamTermList(this.termListEntrySave)
  // .pipe(takeUntil(this.destroy$))
  // .subscribe((response: any) => {
  //   this.examTermList = response.ResponseObj;
  //   this.changeDetect.detectChanges();

  // });
  this.examTermList = this.termList.filter((item: { CLASS_CODE: string; GROUP_CODE: string; ORG_CODE: string; SEMESTER_CODE: string; SESSION_CODE: string; VERSION_CODE: string; YEAR_CODE: string; }) => 
    item.CLASS_CODE ===  this.termListEntrySave.CLASS_CODE &&
  item.GROUP_CODE ===  this.termListEntrySave.GROUP_CODE && 
  item.SEMESTER_CODE ===  this.termListEntrySave.SEMESTER_CODE &&
  item.SESSION_CODE ===  this.termListEntrySave.SESSION_CODE &&
  item.VERSION_CODE ===  this.termListEntrySave.VERSION_CODE &&
  item.YEAR_CODE ===  this.termListEntrySave.YEAR_CODE
);

this.Loadsubjectassign();
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


  onexamType(value:any) {
  if(value !== null){
    this.examResultSubjectWiseDetail.ORG_CODE = this.organizationCode;
    this.examResultSubjectWiseDetail.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
    this.examResultSubjectWiseDetail.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
    this.examResultSubjectWiseDetail.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
    this.examResultSubjectWiseDetail.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
   this.examResultSubjectWiseDetail.CAMPUS_CODE =  this.campusCode;
    this.examResultSubjectWiseDetail.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
    this.examResultSubjectWiseDetail.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;

  // this.resultService
  //   .getExamCaptionList(
  //     value,
  //     this.examResultSubjectWiseDetail.CLASS_CODE,
  //     this.examResultSubjectWiseDetail.SESSION_CODE,
  //     this.examResultSubjectWiseDetail.GROUP_CODE,
  //     this.examResultSubjectWiseDetail.VERSION_CODE,
  //     this.examResultSubjectWiseDetail.YEAR_CODE,
  //     this.examResultSubjectWiseDetail.SEMESTER_CODE,
  //     this.campusCode,
  //     this.organizationCode
  //   )
  //   .pipe(takeUntil(this.destroy$))
  //   .subscribe((response: any) => {
  //     this.examCaptionList = response.ResponseObj;
  //      if(this.examCaptionList.length>0){
  //      this.commonForm.get('EXAM_TYPE_ID')?.setValue(this.examCaptionList.map((item:any) => item.EXAM_TYPE_ID));
  //      }
  //   });
  //   this.changeDetect.detectChanges();
  
  this.examCaptionList = this.ExamCaptionGridList.filter((item: {TERM_ID:number; CLASS_CODE: string; GROUP_CODE: string; ORG_CODE: string; SEMESTER_CODE: string; SESSION_CODE: string; VERSION_CODE: string; YEAR_CODE: string; }) => 
    item.CLASS_CODE ===  this.examResultSubjectWiseDetail.CLASS_CODE &&
  item.GROUP_CODE ===  this.examResultSubjectWiseDetail.GROUP_CODE && 
  item.SEMESTER_CODE ===  this.examResultSubjectWiseDetail.SEMESTER_CODE &&
  item.SESSION_CODE ===  this.examResultSubjectWiseDetail.SESSION_CODE &&
  item.VERSION_CODE ===  this.examResultSubjectWiseDetail.VERSION_CODE &&
  item.YEAR_CODE ===  this.examResultSubjectWiseDetail.YEAR_CODE &&
  item.TERM_ID ===  value
);




        if(this.examCaptionList.length>0){
        this.commonForm.get('EXAM_TYPE_ID')?.setValue(this.examCaptionList.map((item:any) => item.CODE));
        }



  this.changeDetect.detectChanges();
  }
  }




    numberOnly(e:any) {
      // Accept only alpha numerics, not special characters
      var regex = new RegExp("^[0-9.]+$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
        return true;
      }

      e.preventDefault();
      return false;
    }
    onPaste(e:any) {
      e.preventDefault();
      return false;
    }

    getResult() {
      this.examResultSubjectWiseDetail.STUDENT_CODE =[];
      this.studentCodeList=[];
        if(this.commonForm.valid){
          this.savebtnshow=true;
          this.isSearchLoading = true;
          this.examResultSubjectWiseDetail.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
        this.examResultSubjectWiseDetail.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
        this.examResultSubjectWiseDetail.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
        this.examResultSubjectWiseDetail.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
        this.examResultSubjectWiseDetail.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
        this.examResultSubjectWiseDetail.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
        this.examResultSubjectWiseDetail.SECTION_CODE =  this.commonForm.controls["SECTION_NAME"].value;
        this.examResultSubjectWiseDetail.SHIFT_CODE =  this.commonForm.controls["SHIFT_CODE"].value;
        this.examResultSubjectWiseDetail.TERM_ID =  this.commonForm.controls["TERM_NAME"].value;
        this.examResultSubjectWiseDetail.SUBJECT_CODE =  this.commonForm.controls["SUBJECT_CODE"].value;
          this.examResultSubjectWiseDetail.ORG_CODE = this.organizationCode;
         this.resultService
        .GetResultMarkStudentList( this.examResultSubjectWiseDetail)
        .pipe(takeUntil(this.destroy$))
          .subscribe((response:any) =>  {
          this.studentList = response.ResponseObj;
          
          this.isSearchLoading = false;
          if(this.studentList.length == 0){

            this.changeDetect.detectChanges();
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Given information student not found...`,
              nzOkDanger:true
            });
          } else {
            this.MarkFormArray.clear();
            for (let i = 0; i < this.studentList.length; i++) {
              this.MarkFormArray.push(
                this.fb.group({
                  STUDENT_CODE: [this.studentList[i].STUDENT_CODE,],
                  STUDENT_NAME: [this.studentList[i].STUDENT_NAME,],
                  CLASS_ROLL: [this.studentList[i].CLASS_ROLL,],
                  EXAM_1_MARK: [this.studentList[i].EXAM_1_MARK,],
                  EXAM_2_MARK: [this.studentList[i].EXAM_2_MARK,],
                  EXAM_3_MARK: [this.studentList[i].EXAM_3_MARK,],
                  EXAM_4_MARK: [this.studentList[i].EXAM_4_MARK,],
                  EXAM_5_MARK: [this.studentList[i].EXAM_5_MARK,],
                  EXAM_6_MARK: [this.studentList[i].EXAM_6_MARK,],
                })
              );
              this.isSearchLoading = false;

              this.changeDetect.detectChanges();
            }
          }


        });
        this.changeDetect.detectChanges();

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



      onSearchInputChange(event: KeyboardEvent) {
        const searchValue = (event.target as HTMLInputElement).value;
        this.filterTableData(searchValue);
      }

      filterTableData(searchValue: string) {
        if (!searchValue) {
          this.studentList = [...this.listOfData];
          this.changeDetect.detectChanges();
        } else {
          const lowerCaseSearch = searchValue.toLowerCase();

          const filteredMenu = this.listOfData.filter((menuItem) => {
            const lowerCaseName = menuItem.STUDENT_NAME.toLowerCase();
            return lowerCaseName.includes(lowerCaseSearch);
          });
          if (filteredMenu.length === 0) {
            this.changeDetect.detectChanges();
          } else {
            this.changeDetect.detectChanges();
          }
          this.studentList = filteredMenu;
        }
      }



      prepareSave(){
     if (this.commonForm.valid  ) {
      this.examResultSubjectWiseDetail.ORG_CODE = this.organizationCode;
      this.examResultSubjectWiseDetail.CAMPUS_CODE = this.campusCode;
    this.examResultSubjectWiseDetail.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
    this.examResultSubjectWiseDetail.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
    this.examResultSubjectWiseDetail.SECTION_CODE =  this.commonForm.controls["SECTION_NAME"].value;
    this.examResultSubjectWiseDetail.SHIFT_CODE =  this.commonForm.controls["SHIFT_CODE"].value;
     this.examResultSubjectWiseDetail.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
    this.examResultSubjectWiseDetail.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;

    let data: any = [];
    data = this.commonForm.controls.MarkFormArray.value;
    this.examResultSubjectWiseDetail.STUDENT_CODE = [];
    this.examResultSubjectWiseDetail.MARK = [];
    this.examResultSubjectWiseDetail.EXAM_TYPE = [];

    for (let i = 0; i < data.length; i++) {
      for(let j = 0; j < this.examCaptionList.length;j++){
      this.examResultSubjectWiseDetail.STUDENT_CODE.push(data[i].STUDENT_CODE);
      this.examResultSubjectWiseDetail.EXAM_TYPE.push(this.examCaptionList[j].CODE);
      this.examResultSubjectWiseDetail.MARK.push(data[i]['EXAM_'+(j+1)+'_MARK']);

    }
    }



  this.examResultSubjectWiseDetail.User_Name = this.userCode;
  this.examResultSubjectWiseDetail.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
  this.examResultSubjectWiseDetail.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;

//console.log('this.examCaptionList',this.examCaptionList);
//console.log('this.examResultSubjectWiseDetail',this.examResultSubjectWiseDetail);


if(data.length>0){


   this.modal.confirm({
    nzTitle: `Confirmation `,
    nzContent: `Are you sure you want to Save`,
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: false,
    nzOnOk: () => this.createExamResultEntry(),
    nzCancelText: 'No',
  });
}else{

  this.modal.warning({
    nzTitle: 'Error!',
    nzContent: `Given  student mark not found...`,
    nzOkDanger:true
  });



}

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



      createExamResultEntry() {
        this.isSaveLoading = true;
            this.resultService
              .saveResultMarkBulkInfo(this.examResultSubjectWiseDetail)
              .pipe(takeUntil(this.destroy$))
              .subscribe((response:any) => {
                if (response.StatusCode === 1) {
                  this.modal.success({
                    nzTitle: 'success!',
                    nzContent: response.Message,
                  });
                  this.isSaveLoading = false;
                  this.MarkFormArray.clear();
                  this.examResultSubjectWiseDetail.STUDENT_CODE =[];
                  this.studentCodeList=[];
                  this.VersionVisibility();
                  this.changeDetect.detectChanges();
                }
                else {
                  this.modal.warning({
                    nzTitle: 'error!',
                    nzContent:response.Message,
                  });
                  this.isSaveLoading = false;
                }
              });
              this.changeDetect.detectChanges();


        }




        ngOnDestroy() {
          this.unsubscribe.forEach((sb) => sb.unsubscribe());
       }

}
