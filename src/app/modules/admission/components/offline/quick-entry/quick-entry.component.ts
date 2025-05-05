import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { StudentBulkEntry } from '../../../models/student-bulk-entry';
import { Subject, takeUntil } from 'rxjs';
import { StudentBulkEntryService } from '../../../services/student-bulk-entry.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { StudentSubjectMappingService } from 'src/app/shared-services/Global_Services/student-subject-mapping.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-quick-entry',
  templateUrl: './quick-entry.component.html',
  styleUrl: './quick-entry.component.scss',
  providers: [DatePipe],
})
export class QuickEntryComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  organizationList = JSON.parse(localStorage.getItem('Organization')!);
  campusList = JSON.parse(localStorage.getItem('CampusList')!);
  groupList = JSON.parse(localStorage.getItem('groupList')!);
  classList = JSON.parse(localStorage.getItem('classList')!);
  sectionlist: any[];
  versionList = JSON.parse(localStorage.getItem('versionList')!);
  sessionList = JSON.parse(localStorage.getItem('sessionList')!);
  yearList: any[];
  semesterList: any[];
  shiftlist = JSON.parse(localStorage.getItem('shiftList')!);

  organizationCode = this.organizationList[0].CODE;
  campusCode = this.campusList[0].CODE;
  userCode: any = localStorage.getItem('userCode');

  isSaveLoading = false;
  quickEntryItems: StudentBulkEntry = new StudentBulkEntry();
  private destroy$: Subject<void> = new Subject<void>();

  visibilityList: any[];
  isVersionVisible: boolean = false;
  isSemesterVisible: boolean = false;
  isSectionVisible: boolean = false;
  isYearVisible: boolean = false;


  originalData: any[];
  constructor(
    private unfb: UntypedFormBuilder,
    private cdr: ChangeDetectorRef,
    private quickEntryService: StudentBulkEntryService,
    private modal: NzModalService,
    private globalService: GlobalService,
    private datePipe: DatePipe,
    private stdSubMapService: StudentSubjectMappingService
  ) {
    this.isVersionVisible = globalService.isVisible("VERSION",'');
    this.validateForm = this.unfb.group({
      GROUP_NAME: [null, [Validators.required]],
      CLASS_NAME: [null, [Validators.required]],
      SECTION_NAME: [null, [Validators.required]],
      VERSION_NAME: [null, [Validators.required]],
      START_SESSION_NAME: [null, [Validators.required]],
      CURRENT_SESSION_NAME: [null, [Validators.required]],
      YEAR_NAME: [null, [Validators.required]],
      SEMESTER_NAME: [null, [Validators.required]],
      SHIFT_NAME: [null, [Validators.required]],
      bulkEntryFormArray: this.unfb.array([]),
    });
  }
  ngOnInit(): void {
    this.VersionVisibility();
  }
  get bulkEntryFormArray() {
    return this.validateForm.get('bulkEntryFormArray') as FormArray;
  }
  onSelectedClass(classCode: any) {
    if (classCode !== undefined && classCode !== null) {
      this.LoadSectionList(classCode);
      this.LoadYearList(classCode);
      this.LoadSemesterList(classCode);
    }else{
      this.validateForm.controls['SECTION_NAME'].setValue(null);
      this.validateForm.controls['YEAR_NAME'].setValue(null);
      this.validateForm.controls['SEMESTER_NAME'].setValue(null);
      this.isSectionVisible = false;
      this.isYearVisible = false;
      this.isSemesterVisible = false;
      this.cdr.detectChanges();
    }
  }
  public LoadSectionList(classCode: any) {
    this.sectionlist =
      this.stdSubMapService.getSectionListByClassCode(classCode);
    this.visibilityList =
      this.globalService.getVisibilityListByClassCode(classCode);
    if (this.visibilityList !== null) {
      for (let i = 0; i < this.visibilityList.length; i++) {
        let Component = this.visibilityList[i].CODE;
        let isVisible = this.visibilityList[i].NAME;
        if (Component == 'SECTION' && isVisible == 'Y') {
          this.isSectionVisible = this.globalService.isVisible('SECTION',classCode);
        }
      }
    }

    if (!this.isSectionVisible) {
      this.validateForm.controls.SECTION_NAME.setValue(this.sectionlist[0].CODE);
    } else {
      this.validateForm.controls.SECTION_NAME.enable();
    }
    this.cdr.detectChanges();
  }
  VersionVisibility() {
    if (!this.isVersionVisible) {
      this.validateForm.controls.VERSION_NAME.setValue(this.versionList[0].CODE);
      this.cdr.detectChanges();
    } else {
      this.validateForm.controls.VERSION_NAME.enable();
      this.cdr.detectChanges();
    }
  }
  public LoadYearList(classCode: any) {
    this.yearList = this.globalService.getYearListByClassCode(classCode);
    this.visibilityList =
      this.globalService.getVisibilityListByClassCode(classCode);
    if (this.visibilityList !== null) {
      for (let i = 0; i < this.visibilityList.length; i++) {
        let Component = this.visibilityList[i].CODE;
        let isVisible = this.visibilityList[i].NAME;
        if (Component == 'YEAR' && isVisible == 'Y') {
          this.isYearVisible = this.globalService.isVisible('YEAR',classCode);
        }else{
          this.isYearVisible = false;

        }
      }
    }
    if (!this.isYearVisible) {
      this.validateForm.controls.YEAR_NAME.setValue(this.yearList[0].CODE);
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
        }else{
          this.isSemesterVisible = false;
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
  Add() {
    this.bulkEntryFormArray.push(
      this.unfb.group({
        STUDENT_NAME: [null],
        FATHERS_NAME: [null],
        CLASS_ROLL: [null],
        SMS_MOBILE_NUM: [null],
        ADMISSION_DATE: [new Date()],
      })
    );
    this.clear();
  }

  delete(index: number) {
    this.bulkEntryFormArray.removeAt(index);
    this.clear();
    this.cdr.detectChanges();
  }
  prepareSaveBulkEntry() {
    if (this.validateForm.valid) {
      let data: any = [];
      data = this.validateForm.controls.bulkEntryFormArray.value;
      if (data.length > 0) {
        let stdName: any[] = [];
        let stdFathersName: any[] = [];
        let stdClassRoll: any[] = [];
        let stdSmsMobileNum: any[] = [];
        let stdAdmissionDate: any[] = [];
        for (let i = 0; i < data.length; i++) {
          stdName.push(data[i].STUDENT_NAME);
          stdFathersName.push(data[i].FATHERS_NAME);
          stdClassRoll.push(data[i].CLASS_ROLL);
          stdSmsMobileNum.push(data[i].SMS_MOBILE_NUM);
          stdAdmissionDate.push(data[i].ADMISSION_DATE);
          if (stdName[i] == null) {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please enter student name for Row No- ${i + 1} `,
              nzOkDanger: true,
            });
            return;
          }
          if (stdFathersName[i] == null) {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please enter student father name for Row No- ${
                i + 1
              } `,
              nzOkDanger: true,
            });
            return;
          }
          if (stdClassRoll[i] == null) {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please enter student class roll for Row No- ${
                i + 1
              } `,
              nzOkDanger: true,
            });
            return;
          }
          if (stdSmsMobileNum[i] === null || stdSmsMobileNum[i].length !== 11) {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please enter a valid 11-digit mobile number for Row No- ${
                i + 1
              }`,
              nzOkDanger: true,
            });
            return;
          }
          if (stdAdmissionDate[i] == null) {
            this.modal.warning({
              nzTitle: 'Error!',
              nzContent: `Please select student admission date for Row No- ${
                i + 1
              } `,
              nzOkDanger: true,
            });
            return;
          }
        }

        this.modal.confirm({
          nzTitle: `Confirmation`,
          nzContent: `<b style="color: red;">Are you sure you want to save this students?</b>`,
          nzOkText: 'Yes',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () => {
            let data: any = [];
            data = this.validateForm.controls.bulkEntryFormArray.value;
            this.quickEntryItems.ORG_CODE = this.organizationCode;
            this.quickEntryItems.CAMPUS_CODE = this.campusCode;
            this.quickEntryItems.GROUP_CODE = this.validateForm.value.GROUP_NAME;
            this.quickEntryItems.CLASS_CODE = this.validateForm.value.CLASS_NAME;
            this.quickEntryItems.SECTION_CODE = this.validateForm.value.SECTION_NAME;
            this.quickEntryItems.VERSION_CODE = this.validateForm.value.VERSION_NAME;
            this.quickEntryItems.START_SESSION_CODE =
              this.validateForm.value.START_SESSION_NAME;
            this.quickEntryItems.CURRENT_SESSION_CODE =
              this.validateForm.value.CURRENT_SESSION_NAME;
            this.quickEntryItems.YEAR_CODE = this.validateForm.value.YEAR_NAME;
            this.quickEntryItems.SEMESTER_CODE =
              this.validateForm.value.SEMESTER_NAME;
            this.quickEntryItems.SHIFT_CODE =
              this.validateForm.value.SHIFT_NAME;
            this.quickEntryItems.USER_NAME = this.userCode;
            this.quickEntryItems.RowStatus = 1;
            this.quickEntryItems.STUDENT_NAME = [];
            this.quickEntryItems.FATHERS_NAME = [];
            this.quickEntryItems.CLASS_ROLL = [];
            this.quickEntryItems.SMS_MOBILE_NUM = [];
            this.quickEntryItems.ADMISSION_DATE = [];
            for (let i = 0; i < data.length; i++) {
              this.quickEntryItems.STUDENT_NAME.push(data[i].STUDENT_NAME);
              this.quickEntryItems.FATHERS_NAME.push(data[i].FATHERS_NAME);
              this.quickEntryItems.CLASS_ROLL.push(data[i].CLASS_ROLL);
              this.quickEntryItems.SMS_MOBILE_NUM.push(data[i].SMS_MOBILE_NUM);
              this.quickEntryItems.ADMISSION_DATE.push(this.datePipe.transform(data[i].ADMISSION_DATE,'dd/MM/yyyy'));
            }
            this.save(this.quickEntryItems);
          },
          nzCancelText: 'No',
        });
      } else {
        this.modal.warning({
          nzTitle: 'Error!',
          nzContent: `Please add student information then try again...`,
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

  save(data: any) {
    if(data){
      this.isSaveLoading = false;
      this.quickEntryService
      .StudentBulkEntry(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if (response.StatusCode === 1) {
          this.modal.success({
            nzTitle: `Success`,
            nzContent: response.Message,
            nzOkDanger: true,
          });
          this.isSaveLoading = false;
          this.bulkEntryFormArray.clear();
          this.validateForm.reset();
          this.VersionVisibility();
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
   // Declare a property to store the original data
clear(){
  this.originalData = [];
  this.originalData = this.bulkEntryFormArray.value;
}
onSearchInputChange(event: KeyboardEvent) {
  const searchValue = (event.target as HTMLInputElement).value;
  this.filterTableData(searchValue);
}

filterTableData(searchValue: string) {
  if (!this.originalData) {
    // Store original data if not already stored
    this.originalData = this.bulkEntryFormArray.value;
  }

  if (!searchValue) {
    // If searchValue is empty, reset to original data
    this.resetFilteredData(this.originalData);
  } else {
    const lowerCaseSearch = searchValue.toLowerCase();
    const filteredData = this.originalData.filter((item: any) => {
      const lowerCaseName = item.STUDENT_NAME.toLowerCase();
      return lowerCaseName.includes(lowerCaseSearch);
    });
    this.updateFilteredData(filteredData);
  }
}

resetFilteredData(originalData: any[]) {
  this.bulkEntryFormArray.clear(); // Clear existing data
  originalData.forEach(item => {
    this.bulkEntryFormArray.push(this.unfb.group(item)); // Re-add original data
  });
  this.cdr.detectChanges();
}

updateFilteredData(filteredData: any[]) {
  this.bulkEntryFormArray.clear(); // Clear existing data
  filteredData.forEach(item => {
    this.bulkEntryFormArray.push(this.unfb.group(item)); // Add filtered data
  });
  this.cdr.detectChanges();
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
