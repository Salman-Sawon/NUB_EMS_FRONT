import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TeacherService } from '../../Services/teacher.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { TeacherBulkEntry, TeacherQuickEntry } from '../../models/teacher-sub-map';

import * as XLSX from 'xlsx';
@Component({
  selector: 'app-quick-teacher-entry',
  templateUrl: './quick-teacher-entry.component.html',
  styleUrl: './quick-teacher-entry.component.scss',
  providers: [
    DatePipe]
})
export class QuickTeacherEntryComponent  implements OnInit, OnDestroy {
  organizationList = JSON.parse(localStorage.getItem('Organization')!);
  organizationCode = this.organizationList[0].CODE;
  userCode: any = localStorage.getItem('userCode');
  campusList = JSON.parse(localStorage.getItem('CampusList')!);
  campusCode = this.campusList[0].CODE;
  validateForm: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  isSaveLoading = false;
  teacherQuickEntry: TeacherQuickEntry = new TeacherQuickEntry();
  selectedFile: File | null = null;
  rowList: any[]=[];
  excelData: any[] = [];
  isDownload=false;
  originalData: any[];
  teacherBulkEntry: TeacherBulkEntry = new TeacherBulkEntry();

  constructor(
    private cdr: ChangeDetectorRef,
    private unfb: UntypedFormBuilder,
    private globalService: GlobalService,
    private modal: NzModalService,
    private datePipe: DatePipe,
    private teacherService: TeacherService,
  
  
  ){
    this.teacherQuickEntry.TEACHER_NAME = [];
    this.teacherQuickEntry.FATHERS_NAME = [];
    this.teacherQuickEntry.JOINING_DATE = [];
    this.teacherQuickEntry.SMS_MOBILE_NUM = [];

    this.validateForm = this.unfb.group({
      file: [null, Validators.required],
      teacherFormArray: this.unfb.array([]),
    });
  
  }
  
    ngOnInit(): void {
    }

    get commonFormControl() {
      return this.validateForm.controls;
    }
    
    get f() {
      return this.validateForm.controls;
    }
    get teacherFormArray() {
      return this.validateForm.get('teacherFormArray') as FormArray;
    }

    onFileChange(ev:any) {
      this.selectedFile = ev.target.files[0];
      const target: DataTransfer = <DataTransfer>ev.target;
      if (target.files.length !== 1) throw new Error("Cannot use multiple files");
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
        let AOA: any[][];
        this.excelData = <typeof AOA>XLSX.utils.sheet_to_json(ws, { header: 2 });
        this.cdr.detectChanges();
      }
      reader.readAsBinaryString(target.files[0]);
    }
    downloadExcelFormat(){
      this.isDownload = true;
      const fileDownloadUrl = `https://drive.google.com/uc?id=1HOpoKflT-cIVoWSH2xS447wLfBIuyiK5&export=download`;
      this.cdr.detectChanges();
      window.location.href = fileDownloadUrl;
      setTimeout(() => {
        this.isDownload = false;
        this.cdr.detectChanges();
  
      }, 1000);
    }
  
  removeFile(){
      this.selectedFile = null;
      this.excelData = [];
  }
  

    onSearchInputChange(event: KeyboardEvent) {
      const searchValue = (event.target as HTMLInputElement).value;
      this.filterTableData(searchValue);
    }
  
    filterTableData(searchValue: string) {
      if (!this.originalData) {
        // Store original data if not already stored
        this.originalData = [...this.excelData];
      }
  
      if (!searchValue) {
        // If searchValue is empty, reset to original data
        this.resetFilteredData(this.originalData);
      } else {
        const lowerCaseSearch = searchValue.toLowerCase();
        const filteredData = this.originalData.filter((item: any) => {
          const lowerCaseName = item.TEACHER_NAME.toLowerCase();
          return lowerCaseName.includes(lowerCaseSearch);
        });
        this.updateFilteredData(filteredData);
      }
    }
  
    resetFilteredData(originalData: any[]) {
      this.excelData = [...originalData]; // Reset to original data
      this.cdr.detectChanges();
    }
  
    updateFilteredData(filteredData: any[]) {
      this.excelData = [...filteredData]; // Update with filtered data
      this.cdr.detectChanges();
    }





    prepareSave() {

        if(!this.selectedFile){
          this.modal.warning({
            nzTitle: 'Error!',
            nzContent: `Please select a excel file then try again... `,
            nzOkDanger: true,
          });
          return;
        }
        let data: any = [];
        data = this.excelData;
        if (data.length > 0) {
          let teacherName: any[] = [];
          let fathersName: any[] = [];
          let joiningDate: any[] = [];
          let smsNumber: any[] = [];
          for (let i = 0; i < data.length; i++) {
      
            teacherName.push(data[i].TEACHER_NAME);
            fathersName.push(data[i].FATHERS_NAME);
            joiningDate.push(data[i].JOINING_DATE);
            smsNumber.push(data[i].SMS_MOBILE_NUM);
           
           
            if (teacherName[i] == null) {
              this.modal.warning({
                nzTitle: 'Error!',
                nzContent: `Please enter teacher name for Row No- ${
                  i + 1
                } `,
                nzOkDanger: true,
              });
              return;
            }
            if (fathersName[i] == null) {
              this.modal.warning({
                nzTitle: 'Error!',
                nzContent: `Please enter father's name for Row No- ${
                  i + 1
                } `,
                nzOkDanger: true,
              });
              return;
            }
            if (joiningDate[i] == null) {
              this.modal.warning({
                nzTitle: 'Error!',
                nzContent: `Please select joining date for Row No- ${
                  i + 1
                } `,
                nzOkDanger: true,
              });
              return;
            }
            if (smsNumber[i] == null) {
              this.modal.warning({
                nzTitle: 'Error!',
                nzContent: `Please enter mobile number for Row No- ${
                  i + 1
                } `,
                nzOkDanger: true,
              });
              return;
            }
           
          }
  
          this.modal.confirm({
            nzTitle: `Confirmation`,
            nzContent: `<b style="color: red;">Are you sure you want to save this teachers?</b>`,
            nzOkText: 'Yes',
            nzOkType: 'primary',
            nzOkDanger: true,
            nzOnOk: () => {
              this.teacherBulkEntry.ORG_CODE = this.organizationCode;
              this.teacherBulkEntry.CAMPUS_CODE = this.campusCode;
              this.teacherBulkEntry.TEACHER_NAME = [];
              this.teacherBulkEntry.FATHERS_NAME = [];
              this.teacherBulkEntry.JOINING_DATE = [];
              this.teacherBulkEntry.SMS_MOBILE_NUM = [];       
              for(let i=0;i<this.excelData.length;i++)
              {
                this.teacherBulkEntry.TEACHER_NAME[i] = this.excelData[i].TEACHER_NAME.toString();
                this.teacherBulkEntry.FATHERS_NAME[i] = this.excelData[i].FATHERS_NAME.toString();
               // this.teacherBulkEntry.JOINING_DATE[i] = this.excelData[i].JOINING_DATE;
               this.teacherBulkEntry.JOINING_DATE[i] = new Date(this.excelData[i].JOINING_DATE);
                this.teacherBulkEntry.SMS_MOBILE_NUM[i] = this.excelData[i].SMS_MOBILE_NUM.toString();
                
              }
              this.teacherBulkEntry.USER_NAME = this.userCode;
              this.save(this.teacherBulkEntry);
            },
          
            
            nzCancelText: 'No',
          });
        } else {
          this.modal.warning({
            nzTitle: 'Error!',
            nzContent: `Please add information then try again...`,
          });
        }
      
      
    }

    save(data:any){
      if(data){
        
        console.log('data',data);
        
        this.isSaveLoading = true;
        this.teacherService
        .SaveTeacherBulkEntry(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          if (response.StatusCode === 1) {
            this.modal.success({
              nzTitle: `Success`,
              nzContent: response.Message,
              nzOkDanger: true,
            });
            this.isSaveLoading = false;
            this.removeFile();
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


    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    } 


}
