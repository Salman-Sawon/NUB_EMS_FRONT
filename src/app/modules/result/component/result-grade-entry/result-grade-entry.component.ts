import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ResultGradeEntry } from '../../models/result-grade-entry';
import { FormArray, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DatePipe } from '@angular/common';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-result-grade-entry',
  templateUrl: './result-grade-entry.component.html',
  styleUrl: './result-grade-entry.component.scss',
  providers: [
    DatePipe]
})
export class ResultGradeEntryComponent implements OnInit, OnDestroy{
  organizationList = JSON.parse(localStorage.getItem('Organization')!);
  organizationCode = this.organizationList[0].CODE;
  userCode: any = localStorage.getItem('userCode');
  campusList = JSON.parse(localStorage.getItem('CampusList')!);
  campusCode = this.campusList[0].CODE;
  groupList = JSON.parse(localStorage.getItem('groupList')!);
  classList = JSON.parse(localStorage.getItem('classList')!);
  versionList = JSON.parse(localStorage.getItem('versionList')!);
  sessionList = JSON.parse(localStorage.getItem('sessionList')!);
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
  resultGradeEntrySave: ResultGradeEntry = new ResultGradeEntry();
  isSkeletonShow = false;
  isSaveLoading = false;
  isSaveLoadingCopy = false;
  Showcopyform = false;


constructor(
  private cdr: ChangeDetectorRef,
  private unfb: UntypedFormBuilder,
  private globalService: GlobalService,
  private modal: NzModalService,
  private resultService: ResultService,


){
  this.isVersionVisible = globalService.isVisible("VERSION",'');
  this.validateForm = this.unfb.group({
    GROUP_NAME: [null, [Validators.required]],
    CLASS_NAME: [null, [Validators.required]],
    VERSION_NAME: [null, [Validators.required]],
    START_SESSION_NAME: [null, [Validators.required]],
    YEAR_NAME: [null, [Validators.required]],
    SEMESTER_NAME: [null, [Validators.required]],
    gradeFormArray: this.unfb.array([]),
  });


  this.validateFormCopy = this.unfb.group({
    GROUP_NAME: [null, [Validators.required]],
    CLASS_NAME: [null, [Validators.required]],
    VERSION_NAME: [null, [Validators.required]],
    START_SESSION_NAME: [null, [Validators.required]],
    YEAR_NAME: [null, [Validators.required]],
    SEMESTER_NAME: [null, [Validators.required]],
   
  });











}
  ngOnInit(): void {
 this.VersionVisibility();
 this.VersionVisibilityCopy();
  }
  get gradeFormArray() {
    return this.validateForm.get('gradeFormArray') as FormArray;
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



  search(){
   
        if(this.validateForm.valid){

         


          this.isSearchLoading = true;
          this.isSkeletonShow = true;
          this.resultGradeEntrySave.ORG_CODE=this.organizationCode;
        this.resultGradeEntrySave.CLASS_CODE =  this.validateForm.controls["CLASS_NAME"].value;
        this.resultGradeEntrySave.VERSION_CODE =  this.validateForm.controls["VERSION_NAME"].value;
        this.resultGradeEntrySave.GROUP_CODE =  this.validateForm.controls["GROUP_NAME"].value;
        this.resultGradeEntrySave.SESSION_CODE =  this.validateForm.controls["START_SESSION_NAME"].value;
        this.resultGradeEntrySave.YEAR_CODE =  this.validateForm.controls["YEAR_NAME"].value;
        this.resultGradeEntrySave.SEMESTER_CODE =  this.validateForm.controls["SEMESTER_NAME"].value;
        this.resultGradeEntrySave.CAMPUS_CODE=this.campusCode;
        this.resultService
        .getGradeGridList(
         this.resultGradeEntrySave
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe((response:any) => {
          let data:any = [];
          data = response.ResponseObj;
          
          if (data.length == 0) {
            this.Showcopyform=false;
            this.gradeFormArray.clear();
            this.modal.warning({
              nzTitle: 'Worning!',
              nzContent: `Given information no grade found...`,
           
              nzOkDanger:true
            });
            this.isSearchLoading = false;
            this.isSkeletonShow = false;
            this.cdr.detectChanges();

          } else {
            this.Showcopyform=true;
            this.gradeFormArray.clear();
            for (let i = 0; i < data.length; i++) {
              this.gradeFormArray.push(
                this.unfb.group({
                  FROM_VALUE: [data[i].FROM_VALUE,[Validators.required]],
                  UPTO_VALUE: [data[i].UPTO_VALUE],
                  LETTER_GRADE: [data[i].LETTER_GRADE],
                  GRADE_POINT: [data[i].GRADE_POINT],
                  REMARKS: [data[i].REMARKS],

                })
              );
              this.isSearchLoading = false;
            this.isSkeletonShow = false;
              this.cdr.detectChanges();
            }
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



      onSelectedClassCopy(classCode: any) {
        this.yearList = [];
        this.semesterList = [];
        this.isYearVisible = false;
        this.isSemesterVisible = false;
        this.validateFormCopy.controls['YEAR_NAME'].reset();
        this.validateFormCopy.controls['SEMESTER_NAME'].reset();
        if (classCode) {
          this.LoadYearListCopy(classCode);
          this.LoadSemesterListCopy(classCode);
          this.VersionVisibilityCopy();
        }
    
      }
      VersionVisibilityCopy() {
        if (!this.isVersionVisible) {
          this.validateFormCopy.controls.VERSION_NAME.setValue(this.versionList[0].CODE);
        } else {
          this.validateFormCopy.controls.VERSION_NAME.enable();
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
          this.validateFormCopy.controls.YEAR_NAME.setValue(this.yearList[0].CODE);
          this.cdr.detectChanges();
        } else {
          this.validateFormCopy.controls.YEAR_NAME.enable();
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
          this.validateFormCopy.controls.SEMESTER_NAME.setValue(this.semesterList[0].CODE);
        } else {
          this.validateFormCopy.controls.SEMESTER_NAME.enable();
        }
        this.cdr.detectChanges();
      }
    











  prepareSave(){
    if (this.validateForm.valid) {
      let data: any = [];
      data = this.validateForm.controls.gradeFormArray.value;
      if (data.length > 0) {
        let fromvalue: any[] = [];
        let tovalue: any[] = [];
        let lettergrade: any[] = [];
        let gradepoint: any[] = [];
        let remarks: any[] = [];
        for (let i = 0; i < data.length; i++) {
          fromvalue.push(data[i].FROM_VALUE);
          tovalue.push(data[i].UPTO_VALUE);
          lettergrade.push(data[i].LETTER_GRADE);
          gradepoint.push(data[i].GRADE_POINT);
          remarks.push(data[i].REMARKS);

          if (fromvalue[i] == null) {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please enter from value for Row No- ${i + 1} `,
              nzOkDanger: true,
            });
            return;
          }
          if (tovalue[i] == null) {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please enter upto value for Row No- ${
                i + 1
              } `,
              nzOkDanger: true,
            });
            return;
          }
          if (lettergrade[i] == null) {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please enter letter grade for Row No- ${
                i + 1
              } `,
              nzOkDanger: true,
            });
            return;
          }
          if (gradepoint[i] == null ) {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please enter grade point for Row No- ${
                i + 1
              }`,
              nzOkDanger: true,
            });
            return;
          }

          if (remarks[i] == null ) {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please enter remarks for Row No- ${
                i + 1
              }`,
              nzOkDanger: true,
            });
            return;
          }
        }

        this.modal.confirm({
          nzTitle: `Confirmation`,
          nzContent: `<b style="color: red;">Are you sure you want to save this grade?</b>`,
          nzOkText: 'Yes',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () => {
            // let data: any = [];

            this.resultGradeEntrySave.ORG_CODE = this.organizationCode;
             this.resultGradeEntrySave.CAMPUS_CODE = this.campusCode;
            this.resultGradeEntrySave.GROUP_CODE = this.validateForm.value.GROUP_NAME;
            this.resultGradeEntrySave.CLASS_CODE = this.validateForm.value.CLASS_NAME;
            this.resultGradeEntrySave.VERSION_CODE = this.validateForm.value.VERSION_NAME;
            this.resultGradeEntrySave.SESSION_CODE =this.validateForm.value.START_SESSION_NAME;
            this.resultGradeEntrySave.YEAR_CODE = this.validateForm.value.YEAR_NAME;
            this.resultGradeEntrySave.SEMESTER_CODE = this.validateForm.value.SEMESTER_NAME;
            this.resultGradeEntrySave.User_Name = this.userCode;


            this.resultGradeEntrySave.FROM_VALUE = [];
            this.resultGradeEntrySave.UPTO_VALUE = [];
            this.resultGradeEntrySave.LETTER_GRADE = [];
            this.resultGradeEntrySave.GRADE_POINT = [];
            this.resultGradeEntrySave.REMARKS = [];
            for (let i = 0; i < data.length; i++) {
              this.resultGradeEntrySave.FROM_VALUE.push(data[i].FROM_VALUE);
              this.resultGradeEntrySave.UPTO_VALUE.push(data[i].UPTO_VALUE);
               this.resultGradeEntrySave.LETTER_GRADE.push(data[i].LETTER_GRADE);
               this.resultGradeEntrySave.GRADE_POINT.push(data[i].GRADE_POINT);
              this.resultGradeEntrySave.REMARKS.push(data[i].REMARKS);

            }
            this.save(this.resultGradeEntrySave);
           


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
      .saveResultGradeEntry(this.resultGradeEntrySave)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response.StatusCode === 1) {
          this.modal.success({
            nzTitle: `Success`,
            nzContent: response.Message,
            nzOkDanger: true,
          });
          this.isSaveLoading = false;
          this.gradeFormArray.clear();
          this.validateForm.reset();
          this.VersionVisibility();
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
      data = this.validateForm.controls.gradeFormArray.value;
        if (data.length > 0) {
         
        
          this.resultGradeEntrySave.GROUP_CODE = this.validateFormCopy.value.GROUP_NAME;
          this.resultGradeEntrySave.CLASS_CODE = this.validateFormCopy.value.CLASS_NAME;
        
          this.resultGradeEntrySave.VERSION_CODE = this.validateFormCopy.value.VERSION_NAME;
          this.resultGradeEntrySave.SESSION_CODE =this.validateFormCopy.value.START_SESSION_NAME;
          this.resultGradeEntrySave.YEAR_CODE = this.validateFormCopy.value.YEAR_NAME;
          this.resultGradeEntrySave.SEMESTER_CODE =this.validateFormCopy.value.SEMESTER_NAME;

          this.resultGradeEntrySave.FROM_VALUE = [];
          this.resultGradeEntrySave.UPTO_VALUE = [];
          this.resultGradeEntrySave.LETTER_GRADE = [];
          this.resultGradeEntrySave.GRADE_POINT = [];
          this.resultGradeEntrySave.REMARKS = [];
          for (let i = 0; i < data.length; i++) {
            this.resultGradeEntrySave.FROM_VALUE.push(data[i].FROM_VALUE);
            this.resultGradeEntrySave.UPTO_VALUE.push(data[i].UPTO_VALUE);
             this.resultGradeEntrySave.LETTER_GRADE.push(data[i].LETTER_GRADE);
             this.resultGradeEntrySave.GRADE_POINT.push(data[i].GRADE_POINT);
            this.resultGradeEntrySave.REMARKS.push(data[i].REMARKS);

          }
            }
            else {
              this.modal.warning({
                nzTitle: 'Error!',
                nzContent: `Please add term information then try again...`,
              });
              this.isSaveLoadingCopy = false;
            }
         


        this.saveCopyFrom(this.resultGradeEntrySave);

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


  saveCopyFrom(data:any){
    if(data){
      this.isSaveLoadingCopy = true;
      this.resultService
      .saveResultGradeEntry(this.resultGradeEntrySave)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response.StatusCode === 1) {
          this.modal.success({
            nzTitle: `Success`,
            nzContent: response.Message,
            nzOkDanger: true,
          });
          this.isSaveLoadingCopy = false;
          this.gradeFormArray.clear();
          this.validateForm.reset();
          this.validateFormCopy.reset();
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
















  Add(){
    if(this.validateForm.valid){
    this.gradeFormArray.push(
      this.unfb.group({
        FROM_VALUE: [null],
        UPTO_VALUE: [null],
        LETTER_GRADE: [null],
        GRADE_POINT: [null],
        REMARKS: [null],
      })
    );
    if( this.gradeFormArray.length>0){
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
  this.gradeFormArray.removeAt(index);
  if( this.gradeFormArray.length>0){
    this.Showcopyform=true;
 }else{
   this.Showcopyform=false;
 }
  this.cdr.detectChanges();
}
alphaNumberOnly (e: any) {  // Accept only alpha numerics, not special characters
  var regex = new RegExp("^[0-9]");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
      return true;
  }

  e.preventDefault();
  return false;
}

alphaOnly (e: any) {  // Accept only alpha numerics, not special characters
  var regex = new RegExp("^[a-zA-Z+-]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (regex.test(str)) {
      return true;
  }

  e.preventDefault();
  return false;
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
onPaste(e: any) {
  e.preventDefault();
  return false;
}
  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();
  }
}
