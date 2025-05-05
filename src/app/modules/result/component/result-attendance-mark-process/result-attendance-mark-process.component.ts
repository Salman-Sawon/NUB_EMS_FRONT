import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AttendanceProcessPrams } from '../../models/result-attendance';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultService } from '../../services/result.service';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TermListEntry } from '../../models/term-list-entry';

@Component({
  selector: 'app-result-attendance-mark-process',
  templateUrl: './result-attendance-mark-process.component.html',
  styleUrl: './result-attendance-mark-process.component.scss'
})
export class ResultAttendanceMarkProcessComponent implements OnInit, OnDestroy {
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
  userCode:any = localStorage.getItem('userCode');
  termList = JSON.parse(localStorage.getItem('TermGridList')!);
  private destroy$: Subject<void> = new Subject<void>();
  private unsubscribe: Subscription[] = [];
  commonForm: FormGroup;


  isVersionVisible: boolean = false;
  isSemesterVisible: boolean = false;
  isSectionVisible: boolean = false;
  isYearVisible: boolean = false;

  isSaveLoading = false;
  yearList: any[];
  semesterList: any[];
  visibilityList: any[];
  sectionlist: any;

  termListEntrySave: TermListEntry = new TermListEntry();
  attendanceprocessPrams:AttendanceProcessPrams=new AttendanceProcessPrams();


  examTermList:any;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private globalService: GlobalService,
    private resultService: ResultService,
    private changeDetect: ChangeDetectorRef)

    {

      this.isVersionVisible = globalService.isVisible("VERSION",'');

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

      });

    }
    ngOnInit(): void {
     this.VersionVisibility();
    }

    onTermLoad(){
      this.LoadTermList();
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
attenMarkProcess(){
  if(this.commonForm.valid){
    this.attendanceprocessPrams.ORG_CODE = this.organizationCode;
    this.attendanceprocessPrams.CAMPUS_CODE = this.campusCode;
    this.attendanceprocessPrams.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
    this.attendanceprocessPrams.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
    this.attendanceprocessPrams.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
    this.attendanceprocessPrams.SECTION_CODE =  this.commonForm.controls["SECTION_NAME"].value;
    this.attendanceprocessPrams.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
    this.attendanceprocessPrams.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
    this.attendanceprocessPrams.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
    this.attendanceprocessPrams.SHIFT_CODE =  this.commonForm.controls["SHIFT_CODE"].value;
    this.attendanceprocessPrams.TERM_ID =  this.commonForm.controls["TERM_NAME"].value;
    this.attendanceprocessPrams.USER_CODE = this.userCode;
    this.modal.confirm({
      nzTitle: `Confirmation `,
      nzContent: `Are you sure you want to process`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: false,
      nzOnOk: () => this.createResultProcess(),
      nzCancelText: 'No',
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

  createResultProcess() {
     this.isSaveLoading=true;
    this.resultService
      .AttendanceMarkProcess(this.attendanceprocessPrams)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:any) => {
        if (response.StatusCode === 1) {
          this.modal.success({
            nzTitle: 'success!',
            nzContent: response.Message,
          });
          this.isSaveLoading = false;
          this.commonForm.reset();
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
        this.changeDetect.detectChanges();
      });
      this.changeDetect.detectChanges();


  }

ngOnDestroy() {
  this.unsubscribe.forEach((sb) => sb.unsubscribe());
}
}

