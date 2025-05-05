import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormArray, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { ResultService } from '../../services/result.service';
import { TermListEntry } from '../../models/term-list-entry';
import { ExamType } from '../../models/exam-type';
@Component({
  selector: 'app-exam-type-entry',
  templateUrl: './exam-type-entry.component.html',
  styleUrl: './exam-type-entry.component.scss',
  providers: [
    DatePipe]
})

export class ExamTypeEntryComponent implements OnInit, OnDestroy{
  organizationList = JSON.parse(localStorage.getItem('Organization')!);
  organizationCode = this.organizationList[0].CODE;
  userCode: any = localStorage.getItem('userCode');
  campusList = JSON.parse(localStorage.getItem('CampusList')!);
  campusCode = this.campusList[0].CODE;
  groupList = JSON.parse(localStorage.getItem('groupList')!);
  classList = JSON.parse(localStorage.getItem('classList')!);
  versionList = JSON.parse(localStorage.getItem('versionList')!);
  sessionList = JSON.parse(localStorage.getItem('sessionList')!);
  termList = JSON.parse(localStorage.getItem('TermGridList')!);
  yearList: any[];
  semesterList: any[];
  visibilityList: any[];
  isVersionVisible: boolean = false;
  isSemesterVisible: boolean = false;
  isYearVisible: boolean = false;
  validateForm: FormGroup;
  validateFormCopy: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  isSearchLoading = false;
  termListEntrySave: TermListEntry = new TermListEntry();
  examTypeItemSave: ExamType = new ExamType();
  isSkeletonShow = false;
  isSaveLoading = false;
  teacherList: any[];
  examTermList:any[];
  datacount:number;
  Showcopyform = false;
  isSaveLoadingCopy = false;





constructor(
  private cdr: ChangeDetectorRef,
  private unfb: UntypedFormBuilder,
  private globalService: GlobalService,
  private modal: NzModalService,
  private datePipe: DatePipe,
  private resultService: ResultService,


){
  this.isVersionVisible = globalService.isVisible("VERSION",'');

  this.validateForm = this.unfb.group({
    GROUP_NAME: [null, [Validators.required]],
    CLASS_NAME: [null, [Validators.required]],
    VERSION_NAME: [null, [Validators.required]],
    SESSION_NAME: [null, [Validators.required]],
    YEAR_NAME: [null, [Validators.required]],
    SEMESTER_NAME: [null, [Validators.required]],
    TERM_NAME: [null, [Validators.required]],
    examtypeFormArray: this.unfb.array([]),
  });
  this.validateFormCopy = this.unfb.group({
    GROUP_NAME_COPY: [null, [Validators.required]],
    CLASS_NAME_COPY: [null, [Validators.required]],
    VERSION_NAME_COPY: [null, [Validators.required]],
    SESSION_NAME_COPY: [null, [Validators.required]],
    YEAR_NAME_COPY: [null, [Validators.required]],
    SEMESTER_NAME_COPY: [null, [Validators.required]],
    TERM_NAME_COPY: [null, [Validators.required]],
    
  });




   this.VersionVisibility();
   this.VersionVisibilityCopy();
   this.LoadTeacherList();
}
  ngOnInit(): void {

  }
  onChangeGroup(){
    this.examTermList = [];
    this.validateForm.controls["TERM_NAME"].reset();
    this.cdr.detectChanges();
   }

   onChangeClass(){
    this.examTermList = [];
    this.validateForm.controls["TERM_NAME"].reset();
    this.campusList.detectChanges();
   }

   onChangeSection(){
    this.examTermList = [];
    this.validateForm.controls["TERM_NAME"].reset();
    this.cdr.detectChanges();
   }
   

  // onMultipleSelectedItem(classCode) {

  //   this.onSelectedClass(classCode) ;
  // }
  onSessionChange(value:any){
    this.examTermList=[];
    if(value!=null){
    if(!this.isYearVisible){
    this.validateForm.controls["TERM_NAME"].reset();
      this.LoadTermList();
    }
  }
  }
  onSessionChangeCopy(value:any){
    this.examTermList=[];
    if(value!=null){
    if(!this.isYearVisible){
    this.validateFormCopy.controls["TERM_NAME_COPY"].reset();
      this.LoadTermList();
    }
    }
  }

  get examtypeFormArray() {
    return this.validateForm.get('examtypeFormArray') as FormArray;
  }

  public LoadTeacherList() {
    this.teacherList = [];
    this.resultService
      .GetTeacherList(this.organizationCode, this.campusCode)
      .subscribe((response:any) => {
        this.teacherList = response.ResponseObj;

        this.cdr.detectChanges();

      });
  }


  onSelectedClass(classCode: any) {
    this.yearList = [];
    this.semesterList = [];
    this.isYearVisible = false;
    this.isSemesterVisible = false;
    this.validateForm.controls['YEAR_NAME'].reset();
    this.validateForm.controls['SEMESTER_NAME'].reset();
    if (classCode) {
      this.LoadYearList(classCode);
      this.LoadSemesterList(classCode);
      this.VersionVisibility();
    }

  }
  VersionVisibility() {
    if (!this.isVersionVisible) {
      this.validateForm.controls.VERSION_NAME.setValue(this.versionList[0].CODE);
    } else {
      this.validateForm.controls.VERSION_NAME.enable();
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
          this.cdr.detectChanges();
        }
      }
    }
    if (!this.isYearVisible) {
      this.validateForm.controls.YEAR_NAME.setValue(this.yearList[0].CODE);
      this.cdr.detectChanges();
    } else {
      this.validateForm.controls.YEAR_NAME.enable();
    }
    this.cdr.detectChanges();
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
      this.validateForm.controls.SEMESTER_NAME.setValue(this.semesterList[0].CODE);
    } else {
      this.validateForm.controls.SEMESTER_NAME.enable();
    }
    this.cdr.detectChanges();
  }



  onSelectedClassCopy(classCode: any) {
    this.yearList = [];
    this.semesterList = [];
    this.isYearVisible = false;
    this.isSemesterVisible = false;
    this.validateFormCopy.controls['YEAR_NAME_COPY'].reset();
    this.validateFormCopy.controls['SEMESTER_NAME_COPY'].reset();
    if (classCode) {
      this.LoadYearListCopy(classCode);
      this.LoadSemesterListCopy(classCode);
    }

  }
  VersionVisibilityCopy() {
    if (!this.isVersionVisible) {
      this.validateFormCopy.controls.VERSION_NAME_COPY.setValue(this.versionList[0].CODE);
    } else {
      this.validateFormCopy.controls.VERSION_NAME_COPY.enable();
    }
  }
  public LoadYearListCopy(classCode: any) {
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
          this.cdr.detectChanges();
        }
      }
    }
    if (!this.isYearVisible) {
      this.validateFormCopy.controls.YEAR_NAME_COPY.setValue(this.yearList[0].CODE);
      this.cdr.detectChanges();
    } else {
      this.validateFormCopy.controls.YEAR_NAME_COPY.enable();
    }
    this.cdr.detectChanges();
  }
  public LoadSemesterListCopy(classCode: any) {
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
      this.validateFormCopy.controls.SEMESTER_NAME_COPY.setValue(this.semesterList[0].CODE);
    } else {
      this.validateFormCopy.controls.SEMESTER_NAME_COPY.enable();
    }
    this.cdr.detectChanges();
  }














  public LoadTermList() {

    this.termListEntrySave.ORG_CODE = this.organizationCode;
    this.termListEntrySave.CLASS_CODE =  this.validateForm.controls["CLASS_NAME"].value;
    this.termListEntrySave.GROUP_CODE =  this.validateForm.controls["GROUP_NAME"].value;
    this.termListEntrySave.VERSION_CODE =  this.validateForm.controls["VERSION_NAME"].value;
    this.termListEntrySave.SESSION_CODE =  this.validateForm.controls["SESSION_NAME"].value;
    this.termListEntrySave.YEAR_CODE =  this.validateForm.controls["YEAR_NAME"].value;
    this.termListEntrySave.SEMESTER_CODE =  this.validateForm.controls["SEMESTER_NAME"].value;
    //this.termListEntrySave.SECTION_CODE =  this.commonForm.controls["sectionName"].value;
    this.examTermList = this.termList.filter((item: { CLASS_CODE: string; GROUP_CODE: string; ORG_CODE: string; SEMESTER_CODE: string; SESSION_CODE: string; VERSION_CODE: string; YEAR_CODE: string; }) => 
      item.CLASS_CODE ===  this.termListEntrySave.CLASS_CODE &&
    item.GROUP_CODE ===  this.termListEntrySave.GROUP_CODE && 
    item.SEMESTER_CODE ===  this.termListEntrySave.SEMESTER_CODE &&
    item.SESSION_CODE ===  this.termListEntrySave.SESSION_CODE &&
    item.VERSION_CODE ===  this.termListEntrySave.VERSION_CODE &&
    item.YEAR_CODE ===  this.termListEntrySave.YEAR_CODE
  );
  console.log('tes', this.examTermList);
  if ( this.examTermList.length == 0) {
     
          this.modal.warning({
            nzTitle: 'Error!',
            nzContent: `Given information no exam term found...`,
            nzOkDanger:true
          });
        }
}


  search(){
    this.examtypeFormArray.clear();
        if(this.validateForm.valid){
          this.isSkeletonShow = true;
         this.isSearchLoading = true;
         this.datacount = 0;
        this.examTypeItemSave.CLASS_CODE =  this.validateForm.controls["CLASS_NAME"].value;
        this.examTypeItemSave.SESSION_CODE =  this.validateForm.controls["SESSION_NAME"].value;
        this.examTypeItemSave.GROUP_CODE =  this.validateForm.controls["GROUP_NAME"].value;
        this.examTypeItemSave.VERSION_CODE =  this.validateForm.controls["VERSION_NAME"].value;
        this.examTypeItemSave.YEAR_CODE =  this.validateForm.controls["YEAR_NAME"].value;
        this.examTypeItemSave.SEMESTER_CODE =  this.validateForm.controls["SEMESTER_NAME"].value;
        this.examTypeItemSave.TERM_ID =  this.validateForm.controls["TERM_NAME"].value;
        
        this.resultService
        .getExamTypeGrid(
          this.examTypeItemSave.TERM_ID,
          this.examTypeItemSave.CLASS_CODE,
          this.examTypeItemSave.SESSION_CODE,
          this.examTypeItemSave.GROUP_CODE,
          this.examTypeItemSave.VERSION_CODE,
          this.examTypeItemSave.YEAR_CODE,
          this.examTypeItemSave.SEMESTER_CODE,
          this.organizationCode,
          this.campusCode

        )
        .pipe(takeUntil(this.destroy$))
        .subscribe((response:any) => {
          let data:any = [];
          data = response.ResponseObj;

        


          if (data.length == 0) {
            this.Showcopyform=false;
            this.examtypeFormArray.clear();
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Given information no exam type found...`,
              nzOkDanger:true
            });
            this.isSearchLoading = false;
            this.isSkeletonShow = false;
            this.cdr.detectChanges();

          } else {
           this.Showcopyform=true
            this.examtypeFormArray.clear();
            for (let i = 0; i < data.length; i++) {
              this.examtypeFormArray.push(
                this.unfb.group({
                  EXAM_TYPE: [data[i].EXAM_CAPTION,[Validators.required]],
                  TEACHER_NAME: [data[i].TEACHER_CODE,[Validators.required]],
                  EXAM_DATE: [data[i].EXAM_DATE],
                  LAST_SUB_DATE: [data[i].LAST_SUBMISSION_DATE],
                  RESULT_DATE: [data[i].RESULT_DATE],
                  IS_ATTENDANCE: [data[i].IS_ATTENDANCE],

                })
              );
              this.isSearchLoading = false;
            this.isSkeletonShow = false;
              this.cdr.detectChanges();
            }
        
            this.cdr.detectChanges();



          }

        });
        }else{
          Object.values(this.validateForm.controls).forEach((control) => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          });
        }

      }


      Add(){
        if(this.validateForm.valid){
          this.examtypeFormArray.push(
            this.unfb.group({
              EXAM_TYPE: [null],
              TEACHER_NAME: [null],
              EXAM_DATE: [new Date()],
              LAST_SUB_DATE: [new Date()],
              RESULT_DATE: [new Date()],
              IS_ATTENDANCE: ["N"],
            })
          );

          if( this.examtypeFormArray.length>0){
            this.Showcopyform=true;
         }else{
           this.Showcopyform=false;
         }

        }else {
          Object.values(this.validateForm.controls).forEach((control) => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          });
        } 
      }
      delete(index: number) {
        this.examtypeFormArray.removeAt(index);
        if( this.examtypeFormArray.length>0){
          this.Showcopyform=true;
       }else{
         this.Showcopyform=false;
       }
        this.cdr.detectChanges();
      }



      prepareSave(){
        if (this.validateForm.valid) {
          let data: any = [];
          data = this.validateForm.controls.examtypeFormArray.value;
          if (data.length > 0) {
            let examType: any[] = [];
            let teacherName: any[] = [];
            let examDate: any[] = [];
            let lastSubDate: any[] = [];
            let resultDate: any[] = [];
            let attendance: any[] = [];
            for (let i = 0; i < data.length; i++) {
              examType.push(data[i].EXAM_TYPE);
              teacherName.push(data[i].TEACHER_NAME);
              examDate.push(data[i].EXAM_DATE);
              lastSubDate.push(data[i].LAST_SUB_DATE);
              resultDate.push(data[i].RESULT_DATE);
              attendance.push(data[i].IS_ATTENDANCE);
              if (examType[i] == null) {
                this.modal.warning({
                  nzTitle: 'Error!',
                  nzContent: `Please enter exam type name for Row No- ${i + 1} `,
                  nzOkDanger: true,
                });
                return;
              }
              if (teacherName[i] == null) {
                this.modal.warning({
                  nzTitle: 'Error!',
                  nzContent: `Please select teacher for Row No- ${
                    i + 1
                  } `,
                  nzOkDanger: true,
                });
                return;
              }
              if (examDate[i] == null) {
                this.modal.warning({
                  nzTitle: 'Error!',
                  nzContent: `Please select exam date for Row No- ${
                    i + 1
                  } `,
                  nzOkDanger: true,
                });
                return;
              }
              if (lastSubDate[i] == null) {
                this.modal.warning({
                  nzTitle: 'Error!',
                  nzContent: `Please select last submit date for Row No- ${
                    i + 1
                  } `,
                  nzOkDanger: true,
                });
                return;
              }
              if (resultDate[i] == null) {
                this.modal.warning({
                  nzTitle: 'Error!',
                  nzContent: `Please select result date for Row No- ${
                    i + 1
                  } `,
                  nzOkDanger: true,
                });
                return;
              }
              if (attendance[i] == null) {
                this.modal.warning({
                  nzTitle: 'Error!',
                  nzContent: `Please select attendance status for Row No- ${
                    i + 1
                  } `,
                  nzOkDanger: true,
                });
                return;
              }

            }

            this.modal.confirm({
              nzTitle: `Confirmation`,
              nzContent: `<b style="color: red;">Are you sure you want to save this exam type?</b>`,
              nzOkText: 'Yes',
              nzOkType: 'primary',
              nzOkDanger: true,
              nzOnOk: () => {

                this.examTypeItemSave.ORG_CODE = this.organizationCode;
                // this.termListEntrySave.CAMPUS_CODE = this.campusCode;
                this.examTypeItemSave.CAMPUS_CODE =this.campusCode;
                this.examTypeItemSave.GROUP_CODE = this.validateForm.value.GROUP_NAME;
                this.examTypeItemSave.CLASS_CODE = this.validateForm.value.CLASS_NAME;
                this.examTypeItemSave.VERSION_CODE = this.validateForm.value.VERSION_NAME;
                this.examTypeItemSave.SESSION_CODE =   this.validateForm.value.SESSION_NAME;
                this.examTypeItemSave.YEAR_CODE = this.validateForm.value.YEAR_NAME;
                this.examTypeItemSave.SEMESTER_CODE =this.validateForm.value.SEMESTER_NAME;

                this.examTypeItemSave.EXAM_CAPTION = [];
                this.examTypeItemSave.TEACHER_CODE = [];
                this.examTypeItemSave.EXAM_DATE = [];
                this.examTypeItemSave.LAST_SUBMISSION_DATE = [];
                this.examTypeItemSave.RESULT_DATE = [];
                this.examTypeItemSave.IS_ATTENDANCE = [];
                for (let i = 0; i < data.length; i++) {
                  this.examTypeItemSave.EXAM_CAPTION.push(data[i].EXAM_TYPE);
                  this.examTypeItemSave.TEACHER_CODE.push(data[i].TEACHER_NAME);
                  this.examTypeItemSave.EXAM_DATE.push(this.datePipe.transform(data[i].EXAM_DATE,"dd-MMM-yyyy"));
                  this.examTypeItemSave.LAST_SUBMISSION_DATE.push(this.datePipe.transform(data[i].LAST_SUB_DATE,"dd-MMM-yyyy"));
                  this.examTypeItemSave.RESULT_DATE.push(this.datePipe.transform(data[i].RESULT_DATE,"dd-MMM-yyyy"));
                  this.examTypeItemSave.IS_ATTENDANCE.push(data[i].IS_ATTENDANCE);

                }
                this.save(this.examTypeItemSave);


              







              },
              nzCancelText: 'No',
            });
          } else {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please add  information then try again...`,
            });
          }
        } else {
          Object.values(this.validateForm.controls).forEach((control) => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          });
        }
      }



      save(data:any){

    

        if(data){
          this.isSaveLoading = true;
          this.resultService
          .saveUptDltExamType(data)
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            if (response.StatusCode === 1) {
              this.modal.success({
                nzTitle: `Success`,
                nzContent: response.Message,
                nzOkDanger: true,
              });
              this.isSaveLoading = false;
              this.Showcopyform = false;
              this.examtypeFormArray.clear();
              this.validateForm.reset();
              this.validateFormCopy.reset();
              this.cdr.detectChanges();
            } else {
              this.isSaveLoading = false;
              this.modal.error({
                nzTitle: `Failed`,
                nzContent: response.Message,
                nzOkDanger: true,
              });
              this.cdr.detectChanges();
            }
          });
          this.cdr.detectChanges();


        

        }

       
      }




      preperCopyFrom(){

        if(this.validateFormCopy.valid){
        
        this.modal.confirm({
          nzTitle: `Confirmation`,
          nzContent: `<b style="color: red;">Are you sure you want to Save Copy Form</b>`,
          nzOkText: 'Yes',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () => {
          
            let data: any = [];
          data = this.validateForm.controls.examtypeFormArray.value;
            if (data.length > 0) {
             
              this.examTypeItemSave.ORG_CODE = this.organizationCode;
              // this.termListEntrySave.CAMPUS_CODE = this.campusCode;
              this.examTypeItemSave.CAMPUS_CODE =this.campusCode;
              this.examTypeItemSave.GROUP_CODE = this.validateFormCopy.value.GROUP_NAME_COPY;
              this.examTypeItemSave.CLASS_CODE = this.validateFormCopy.value.CLASS_NAME_COPY;
              this.examTypeItemSave.VERSION_CODE = this.validateFormCopy.value.VERSION_NAME_COPY;
              this.examTypeItemSave.SESSION_CODE =   this.validateFormCopy.value.SESSION_NAME_COPY;
              this.examTypeItemSave.YEAR_CODE = this.validateFormCopy.value.YEAR_NAME_COPY;
              this.examTypeItemSave.SEMESTER_CODE =this.validateFormCopy.value.SEMESTER_NAME_COPY;
              this.examTypeItemSave.TERM_ID =this.validateFormCopy.value.TERM_NAME_COPY;

              this.examTypeItemSave.EXAM_CAPTION = [];
              this.examTypeItemSave.TEACHER_CODE = [];
              this.examTypeItemSave.EXAM_DATE = [];
              this.examTypeItemSave.LAST_SUBMISSION_DATE = [];
              this.examTypeItemSave.RESULT_DATE = [];
              this.examTypeItemSave.IS_ATTENDANCE = [];
              for (let i = 0; i < data.length; i++) {
                this.examTypeItemSave.EXAM_CAPTION.push(data[i].EXAM_TYPE);
                this.examTypeItemSave.TEACHER_CODE.push(data[i].TEACHER_NAME);
                this.examTypeItemSave.EXAM_DATE.push(this.datePipe.transform(data[i].EXAM_DATE,"dd-MMM-yyyy"));
                this.examTypeItemSave.LAST_SUBMISSION_DATE.push(this.datePipe.transform(data[i].LAST_SUB_DATE,"dd-MMM-yyyy"));
                this.examTypeItemSave.RESULT_DATE.push(this.datePipe.transform(data[i].RESULT_DATE,"dd-MMM-yyyy"));
                this.examTypeItemSave.IS_ATTENDANCE.push(data[i].IS_ATTENDANCE);

              }
                }
                else {
                  this.modal.warning({
                    nzTitle: 'Error!',
                    nzContent: `Please add term information then try again...`,
                  });
                  this.isSaveLoadingCopy = false;
                }
             
    
    
            this.savecopyterm(this.examTypeItemSave);
    
          },
          nzCancelText: 'No',
        });
    
      }else {
        Object.values(this.validateFormCopy.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    
      }
    
    
    
    
      savecopyterm(data:any){
        if(data){
          this.isSaveLoadingCopy = true;
          this.resultService
          .saveUptDltExamType(data)
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            if (response.StatusCode === 1) {   
              this.modal.success({
                nzTitle: `Success`,
                nzContent: response.Message,
                nzOkDanger: true,
              });
              this.isSaveLoadingCopy = false;
              this.Showcopyform = false;
              this.examtypeFormArray.clear();
              this.validateForm.reset();
              this.validateFormCopy.reset();
              this.VersionVisibility();
              this.cdr.detectChanges();
            } else {
             
              this.isSaveLoadingCopy = false;
              this.modal.error({
                nzTitle: `Failed`,
                nzContent: response.Message,
                nzOkDanger: true,
              });
              this.cdr.detectChanges();
            }
          });
          this.cdr.detectChanges();
        }
      }
    























  numberOnly (e:any) {
    var regex = new RegExp("^[0-9.]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
  }
  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();
  }
}
