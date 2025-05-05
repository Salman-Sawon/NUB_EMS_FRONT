import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ResultService } from '../../services/result.service';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ResultAttendanceGridPrams, ResultAttendanceMstPrams, ResultAttendanceSystemMstPrams } from '../../models/result-attendance';

@Component({
  selector: 'app-result-attendance-system-config',
  templateUrl: './result-attendance-system-config.component.html',
  styleUrl: './result-attendance-system-config.component.scss'
})
export class ResultAttendanceSystemConfigComponent implements OnInit, OnDestroy {
  organizationList = JSON.parse(localStorage.getItem('Organization')!);
  campusList = JSON.parse(localStorage.getItem('CampusList')!);
  organizationCode = this.organizationList[0].CODE;
  organizationName = this.organizationList[0].NAME;
  campusCode = this.campusList[0].CODE;
  classList = JSON.parse(localStorage.getItem('classList')!);
  groupList = JSON.parse(localStorage.getItem('groupList')!);
  versionList = JSON.parse(localStorage.getItem('versionList')!);
  sessionList = JSON.parse(localStorage.getItem('sessionList')!);
  shiftList = JSON.parse(localStorage.getItem('shiftList')!);
  classCode = this.classList[0].CODE;
  userCode:any = localStorage.getItem('userCode');
  private destroy$: Subject<void> = new Subject<void>();
  private unsubscribe: Subscription[] = [];
  commonForm: FormGroup;
  isVersionVisible: boolean = false;
  isSemesterVisible: boolean = false;
  isSectionVisible: boolean = false;
  isYearVisible: boolean = false;
  isSearchLoading=false;
  isSaveLoading = false;
  yearList: any[];
  semesterList: any[];
  visibilityList: any[];
  sectionlist: any;
  resultAttendanceGridPrams:ResultAttendanceGridPrams=new ResultAttendanceGridPrams();
  resultattendancemstprams: ResultAttendanceSystemMstPrams = new ResultAttendanceSystemMstPrams();


  attendanceConfigList:any;
  isVisible = false;
  btnDialog:string;
  Cancel:string;
  addDynamicTitle:string;
  validateForm!: UntypedFormGroup;
  constructor(
    private fb: FormBuilder,
    private unfb: UntypedFormBuilder,
    private modal: NzModalService,
    private globalService: GlobalService,
    private resultService: ResultService,
    private changeDetect: ChangeDetectorRef)

    {

      this.isVersionVisible = globalService.isVisible("VERSION",'');
;

      this.commonForm = this.fb.group({
        GROUP_NAME: [null, [Validators.required]],
        CLASS_NAME: [null, [Validators.required]],
        VERSION_NAME: [null, [Validators.required]],
        SESSION_NAME: [null, [Validators.required]],
        YEAR_NAME: [null, [Validators.required]],
        SEMESTER_NAME: [null, [Validators.required]],

      });
      this.validateForm = this.unfb.group({

        IS_ALL_SUB_ATT: [null, Validators.required],

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
    handleCancel(){
      this.validateForm.reset();
      this.isVisible = false;
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
    onSearchItem(){

      if(this.commonForm.valid){
        this.attendanceConfigList =[];
        this.resultAttendanceGridPrams.ORG_CODE =this.organizationCode
        this.resultAttendanceGridPrams.CAMPUS_CODE =this.campusCode
         this.resultAttendanceGridPrams.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
         this.resultAttendanceGridPrams.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
         this.resultAttendanceGridPrams.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
         this.resultAttendanceGridPrams.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
         this.resultAttendanceGridPrams.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
         this.resultAttendanceGridPrams.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
         this.isSearchLoading = true;
                this.resultService
               .getResultAttendanceSystemConfigGrid( this.resultAttendanceGridPrams )
               .pipe(takeUntil(this.destroy$))
               .subscribe((response:any) => {
                if(response.ResponseObj.length > 0){
                  this.attendanceConfigList = response.ResponseObj;

                  this.isSearchLoading = false;
                  this.changeDetect.detectChanges();
                }else{
                  this.modal.error({
                    nzTitle: 'error!',
                    nzContent:'data not found this information...',
                    nzOkDanger: true,
                  });

                  this.isSearchLoading = false;
                  this.changeDetect.detectChanges();
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

       Add(){

        if(this.commonForm.valid){

        this.validateForm = this.unfb.group({
          IS_ALL_SUB_ATT: [null, Validators.required],  });

       this.resultattendancemstprams.ORG_CODE=this.organizationCode;
       this.resultattendancemstprams.CAMPUS_CODE=this.campusCode;
       this.resultattendancemstprams.CLASS_CODE=this.commonForm.controls["CLASS_NAME"].value;
       this.resultattendancemstprams.GROUP_CODE=this.commonForm.controls["GROUP_NAME"].value;
       this.resultattendancemstprams.VERSION_CODE=this.commonForm.controls["VERSION_NAME"].value;
       this.resultattendancemstprams.SESSION_CODE=this.commonForm.controls["SESSION_NAME"].value;
       this.resultattendancemstprams.YEAR_CODE=this.commonForm.controls["YEAR_NAME"].value;
       this.resultattendancemstprams.SEMESTER_CODE=this.commonForm.controls["SEMESTER_NAME"].value;
       this.resultattendancemstprams.User_Name=this.userCode;

       this.resultattendancemstprams.RowStatus=1;
       this.resultattendancemstprams.RES_ATT_SYS_CONF_ID=0;

        this.addDynamicTitle='Add New Attendance Config'
        this.isVisible=true
        this.btnDialog = "Add";
        this.Cancel = "Cancel";


        }else{
          Object.values(this.commonForm.controls).forEach((control) => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          });
        }

      }


   edit(data:any){

  if(this.commonForm.valid){

  this.resultattendancemstprams.RES_ATT_SYS_CONF_ID= data.RES_ATT_SYS_CONF_ID;
  this.resultattendancemstprams.RowStatus= 2;
  this.resultattendancemstprams.ORG_CODE=this.organizationCode;
 this.resultattendancemstprams.CAMPUS_CODE=this.campusCode;
 this.resultattendancemstprams.CLASS_CODE=this.commonForm.controls["CLASS_NAME"].value;
 this.resultattendancemstprams.GROUP_CODE=this.commonForm.controls["GROUP_NAME"].value;
 this.resultattendancemstprams.VERSION_CODE=this.commonForm.controls["VERSION_NAME"].value;
 this.resultattendancemstprams.SESSION_CODE=this.commonForm.controls["SESSION_NAME"].value;
 this.resultattendancemstprams.YEAR_CODE=this.commonForm.controls["YEAR_NAME"].value;
 this.resultattendancemstprams.SEMESTER_CODE=this.commonForm.controls["SEMESTER_NAME"].value;
  this.resultattendancemstprams.User_Name=this.userCode;

  this.addDynamicTitle='Update Attendance Config'
  this.isVisible=true
  this.btnDialog = "Update";
  this.Cancel = "Cancel";


  this.validateForm.controls["IS_ALL_SUB_ATT"].patchValue(data.IS_ALL_SUB_ATT);



  }



}

 delete(data:any){
  this.modal.confirm({
    nzTitle: `Are you sure ?`,
    nzContent: 'You want to permanently delete ?',
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: false,
    nzOnOk: () => {


 this.resultattendancemstprams.RES_ATT_SYS_CONF_ID= data.RES_ATT_SYS_CONF_ID;
 this.resultattendancemstprams.ORG_CODE=this.organizationCode;
 this.resultattendancemstprams.CAMPUS_CODE=this.campusCode;
  this.resultattendancemstprams.CLASS_CODE= '';
  this.resultattendancemstprams.GROUP_CODE= '';
  this.resultattendancemstprams.VERSION_CODE= '';
  this.resultattendancemstprams.SESSION_CODE= '';
  this.resultattendancemstprams.YEAR_CODE= '';
  this.resultattendancemstprams.SEMESTER_CODE= '';
  this.resultattendancemstprams.RowStatus= 3;
  this.resultattendancemstprams.User_Name ='';

this.resultService
  .SaveResultAttendanceSystemConfigMst(this.resultattendancemstprams)
  .pipe(takeUntil(this.destroy$))
  .subscribe((response:any)=> {
    if (response.StatusCode === 1  && this.resultattendancemstprams.RowStatus === 3) {
      this.onSearchItem();
      this.modal.success({
        nzTitle: 'Deleted',
        nzContent: response.Message,
        nzOkDanger: true,
      });

      this.handleCancel();
      this.changeDetect.detectChanges();
    } else {

      this.modal.error({
        nzTitle: 'Error!',
        nzContent: response.Message,
        nzOkDanger: true,
      });
    }

  this.changeDetect.detectChanges();

});


  }

});
 }


 handleOk(){
  if(this.validateForm.valid){

 this.resultattendancemstprams.IS_ALL_SUB_ATT=this.validateForm.controls["IS_ALL_SUB_ATT"].value;
 this.resultService
  .SaveResultAttendanceSystemConfigMst(this.resultattendancemstprams)
  .pipe(takeUntil(this.destroy$))
  .subscribe((response:any)=> {
    if (response.StatusCode === 1  && this.resultattendancemstprams.RowStatus === 1) {
      this.onSearchItem();
      this.modal.success({
        nzTitle: 'Success',
        nzContent: response.Message,
        nzOkDanger: true,
      });
      this.validateForm.reset();
      this.handleCancel();
      this.changeDetect.detectChanges();
    }else if(response.StatusCode === 1  && this.resultattendancemstprams.RowStatus === 2){
     this.onSearchItem();
      this.modal.success({
        nzTitle: 'Updated',
        nzContent: response.Message,
        nzOkDanger: true,
      });

      this.handleCancel();
      this.changeDetect.detectChanges();
    } else {

      this.modal.error({
        nzTitle: 'Error!',
        nzContent: response.Message,
        nzOkDanger: true,
      });
    }

  this.changeDetect.detectChanges();

});
 } else{
  Object.values(this.validateForm.controls).forEach((control) => {
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




