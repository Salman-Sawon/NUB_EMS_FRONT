import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { TermListEntry } from '../../models/term-list-entry';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-term-entry',
  templateUrl: './term-entry.component.html',
  styleUrl: './term-entry.component.scss',
  providers: [
    DatePipe]
})
export class TermEntryComponent implements OnInit, OnDestroy{

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
  termListEntrySave: TermListEntry = new TermListEntry();
  datafount:number;
  titlemessage:string;
  isSkeletonShow = false;
  isSaveLoading = false;
  isSaveLoadingCopy = false;
  Showcopyform = false;
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
    START_SESSION_NAME: [null, [Validators.required]],
    YEAR_NAME: [null, [Validators.required]],
    SEMESTER_NAME: [null, [Validators.required]],
    termFormArray: this.unfb.array([]),
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
//this.VersionVisibility();
  }
  get termFormArray() {
    return this.validateForm.get('termFormArray') as FormArray;
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
  this.termFormArray.clear();
  this.isSkeletonShow = true;
  this.isSearchLoading = true;
    this.termListEntrySave.CLASS_CODE =  this.validateForm.controls["CLASS_NAME"].value;
    this.termListEntrySave.VERSION_CODE =  this.validateForm.controls["VERSION_NAME"].value;
    this.termListEntrySave.GROUP_CODE =  this.validateForm.controls["GROUP_NAME"].value;
    this.termListEntrySave.SESSION_CODE =  this.validateForm.controls["START_SESSION_NAME"].value;
    this.termListEntrySave.YEAR_CODE =  this.validateForm.controls["YEAR_NAME"].value;
    this.termListEntrySave.SEMESTER_CODE =  this.validateForm.controls["SEMESTER_NAME"].value;
    this.resultService
    .getTermEntryGridList(
      this.organizationCode,
      this.termListEntrySave.CLASS_CODE,
      this.termListEntrySave.VERSION_CODE,
      this.termListEntrySave.GROUP_CODE,
      this.termListEntrySave.SESSION_CODE,
      this.termListEntrySave.YEAR_CODE,
      this.termListEntrySave.SEMESTER_CODE
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:any) => {
      let data:any = [];
      data = response.ResponseObj;
      if (data.length == 0) {
        this.Showcopyform=false;
        this.datafount=0;
        this.titlemessage='save this term';
        this.termFormArray.clear();
        this.modal.warning({
          nzTitle: 'Error!',
          nzContent: `Given information no exam term found...`,
          nzOkDanger:true
        });
        this.isSearchLoading = false;
        this.isSkeletonShow = false;
        this.cdr.detectChanges();

      } else {
        this.datafount=1;
        this.Showcopyform=true;
        this.titlemessage='copy this term';
        this.termFormArray.clear();
        for (let i = 0; i < data.length; i++) {
          this.termFormArray.push(
            this.unfb.group({
              TERM_NAME: [data[i].TERM_DESCRIPTION,[Validators.required]],
              TERM_NAME_IN_BANGLA: [data[i].TERM_DESCRIPTION_BANGLA],
              START_DATE: [data[i].START_DATE],
              END_DATE: [data[i].END_DATE],
              SERIAL: [data[i].SERIAL],

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














  Add(){
    if(this.validateForm.valid){
     
      this.termFormArray.push(
        this.unfb.group({
          TERM_NAME: [null],
          TERM_NAME_IN_BANGLA: [null],
          START_DATE: [new Date()],
          END_DATE: [new Date()],
          SERIAL: [null],
        })
      );

if( this.termFormArray.length>0){
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
    this.termFormArray.removeAt(index);
    
if( this.termFormArray.length>0){
  this.Showcopyform=true;
}else{
 this.Showcopyform=false;
}
    this.cdr.detectChanges();
  }



  prepareSave(){
    if (this.validateForm.valid) {
      let data: any = [];
      data = this.validateForm.controls.termFormArray.value;
      if (data.length > 0) {
        let termName: any[] = [];
        let startDate: any[] = [];
        let endDate: any[] = [];
        let serial: any[] = [];
        for (let i = 0; i < data.length; i++) {
          termName.push(data[i].TERM_NAME);
          startDate.push(data[i].START_DATE);
          endDate.push(data[i].END_DATE);
          serial.push(data[i].SERIAL);
          if (termName[i] == null) {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please enter term name for Row No- ${i + 1} `,
              nzOkDanger: true,
            });
            return;
          }
          if (startDate[i] == null) {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please select start date for Row No- ${
                i + 1
              } `,
              nzOkDanger: true,
            });
            return;
          }
          if (endDate[i] == null) {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please select end date for Row No- ${
                i + 1
              } `,
              nzOkDanger: true,
            });
            return;
          }
          if (serial[i] == null ) {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please enter a serial for Row No- ${
                i + 1
              }`,
              nzOkDanger: true,
            });
            return;
          }
        }

        this.modal.confirm({
          nzTitle: `Confirmation`,
          nzContent: `<b style="color: red;">Are you sure you want to ${this.titlemessage}</b>`,
          nzOkText: 'Yes',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () => {
            // let data: any = [];
            // data = this.validateForm.controls.bulkEntryFormArray.value;
            this.termListEntrySave.ORG_CODE = this.organizationCode;
            // this.termListEntrySave.CAMPUS_CODE = this.campusCode;
            this.termListEntrySave.GROUP_CODE = this.validateForm.value.GROUP_NAME;
            this.termListEntrySave.CLASS_CODE = this.validateForm.value.CLASS_NAME;
            // this.termListEntrySave.SECTION_CODE = this.validateForm.value.SECTION_NAME;
            this.termListEntrySave.VERSION_CODE = this.validateForm.value.VERSION_NAME;
            this.termListEntrySave.SESSION_CODE =this.validateForm.value.START_SESSION_NAME;
            this.termListEntrySave.YEAR_CODE = this.validateForm.value.YEAR_NAME;
            this.termListEntrySave.SEMESTER_CODE =this.validateForm.value.SEMESTER_NAME;
            this.termListEntrySave.USER_CODE = this.userCode;
            this.termListEntrySave.TERM_DESCRIPTION = [];
            this.termListEntrySave.TERM_DESCRIPTION_BANGLA = [];
            this.termListEntrySave.START_DATE = [];
            this.termListEntrySave.END_DATE = [];
            this.termListEntrySave.SERIAL = [];
            for (let i = 0; i < data.length; i++) {
              this.termListEntrySave.TERM_DESCRIPTION.push(data[i].TERM_NAME);
              this.termListEntrySave.TERM_DESCRIPTION_BANGLA.push(data[i].TERM_NAME_IN_BANGLA);
              this.termListEntrySave.START_DATE.push(this.datePipe.transform(data[i].START_DATE,"dd-MMM-yyyy"));
              this.termListEntrySave.END_DATE.push(this.datePipe.transform(data[i].END_DATE,"dd-MMM-yyyy"));


              this.termListEntrySave.SERIAL.push(data[i].SERIAL);

            }


            this.save(this.termListEntrySave);

          },
          nzCancelText: 'No',
        });
      } else {
        this.modal.warning({
          nzTitle: 'Error!',
          nzContent: `Please add term information then try again...`,
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
      .saveAcademicTermEntry(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response.StatusCode === 1) {


          this.modal.success({
            nzTitle: `Success`,
            nzContent: response.Message,
            nzOkDanger: true,
          });
       

          this.Showcopyform = false;
          this.isSaveLoading = false;
          this.isSaveLoadingCopy = false;
          this.termFormArray.clear();
          this.validateForm.reset();
          this.validateFormCopy.reset();
          this.VersionVisibility();
          this.loadTermList();
          this.cdr.detectChanges();
        } else {
          this.isSaveLoading = false;
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

  SaveCopyFrom(){

    if(this.validateFormCopy.valid){
    
    this.modal.confirm({
      nzTitle: `Confirmation`,
      nzContent: `<b style="color: red;">Are you sure you want to Save Copy Form</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
      
        let data: any = [];
        data = this.validateForm.controls.termFormArray.value;
        if (data.length > 0) {
         
        this.termListEntrySave.ORG_CODE = this.organizationCode;
            // this.termListEntrySave.CAMPUS_CODE = this.campusCode;
            this.termListEntrySave.GROUP_CODE = this.validateFormCopy.value.GROUP_NAME;
            this.termListEntrySave.CLASS_CODE = this.validateFormCopy.value.CLASS_NAME;
            // this.termListEntrySave.SECTION_CODE = this.validateForm.value.SECTION_NAME;
            this.termListEntrySave.VERSION_CODE = this.validateFormCopy.value.VERSION_NAME;
            this.termListEntrySave.SESSION_CODE =this.validateFormCopy.value.START_SESSION_NAME;
            this.termListEntrySave.YEAR_CODE = this.validateFormCopy.value.YEAR_NAME;
            this.termListEntrySave.SEMESTER_CODE =this.validateFormCopy.value.SEMESTER_NAME;
            this.termListEntrySave.USER_CODE = this.userCode;
            this.termListEntrySave.TERM_DESCRIPTION = [];
            this.termListEntrySave.TERM_DESCRIPTION_BANGLA = [];
            this.termListEntrySave.START_DATE = [];
            this.termListEntrySave.END_DATE = [];
            this.termListEntrySave.SERIAL = [];
            for (let i = 0; i < data.length; i++) {
              this.termListEntrySave.TERM_DESCRIPTION.push(data[i].TERM_NAME);
              this.termListEntrySave.TERM_DESCRIPTION_BANGLA.push(data[i].TERM_NAME_IN_BANGLA);
              this.termListEntrySave.START_DATE.push(this.datePipe.transform(data[i].START_DATE,"dd-MMM-yyyy"));
              this.termListEntrySave.END_DATE.push(this.datePipe.transform(data[i].END_DATE,"dd-MMM-yyyy"));


              this.termListEntrySave.SERIAL.push(data[i].SERIAL);

            }
            }
            else {
              this.modal.warning({
                nzTitle: 'Error!',
                nzContent: `Please add term information then try again...`,
              });
              this.isSaveLoadingCopy = false;
            }
         


        this.savecopyterm(this.termListEntrySave);

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
      .saveAcademicTermEntry(data)
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
          this.termFormArray.clear();
          this.validateForm.reset();
          this.validateFormCopy.reset();
          this.loadTermList();
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







  loadTermList(){
   
    this.resultService
    .getTermSubjExmcaptionList(this.organizationCode,this.campusCode )
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:any) => {
      let data:any = [];
      data = response.ResponseObj;   
     localStorage.setItem('TermGridList', JSON.stringify(data));

    });
   

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
