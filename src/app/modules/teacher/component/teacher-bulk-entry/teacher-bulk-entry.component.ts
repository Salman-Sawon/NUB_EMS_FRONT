import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { TeacherService } from '../../Services/teacher.service';
import { TeacherBulkEntry } from '../../models/teacher-sub-map';
import { ReportService } from 'src/app/Report-Service/report.service';

@Component({
  selector: 'app-teacher-bulk-entry',
  templateUrl: './teacher-bulk-entry.component.html',
  styleUrl: './teacher-bulk-entry.component.scss',
  providers: [
    DatePipe]
})

export class TeacherBulkEntryComponent implements OnInit, OnDestroy{
  organizationList = JSON.parse(localStorage.getItem('Organization')!);
  organizationCode = this.organizationList[0].CODE;
  userCode: any = localStorage.getItem('userCode');
  campusList = JSON.parse(localStorage.getItem('CampusList')!);
  campusCode = this.campusList[0].CODE;
  validateForm: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  isSaveLoading = false;
  teacherBulkEntry: TeacherBulkEntry = new TeacherBulkEntry();
  teacherlist :any;
constructor(
  private cdr: ChangeDetectorRef,
  private unfb: UntypedFormBuilder,
   private reportService: ReportService,
  private modal: NzModalService,
  private datePipe: DatePipe,
  private teacherService: TeacherService,


){
 
  this.validateForm = this.unfb.group({
  
    teacherFormArray: this.unfb.array([]),
  });

}

  ngOnInit(): void {

  }
  get teacherFormArray() {
    return this.validateForm.get('teacherFormArray') as FormArray;
  }
  Add(){
    this.teacherFormArray.push(
      this.unfb.group({      
        TEACHER_NAME: [null],
        FATHERS_NAME: [null],      
        JOINING_DATE: [new Date()],
        SMS_MOBILE_NUM: [null],
       
      })
    ); 
}
delete(index: number) {
  this.teacherFormArray.removeAt(index);
  this.cdr.detectChanges();
}

report() {

  this.teacherService
    .getActiveTeacherList(this.organizationCode)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any ) => {
        this.teacherlist = response.ResponseObj;  
        this.reportService.teacherListReport(this.teacherlist);
        this.cdr.detectChanges();
      
      
    });
}


prepareSave(){

    let data: any = [];
    data = this.validateForm.controls.teacherFormArray.value;
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
        nzContent: `<b style="color: red;">Are you sure you want to save this teacher?</b>`,
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
        
          for (let i = 0; i < data.length; i++) {
            this.teacherBulkEntry.TEACHER_NAME.push(data[i].TEACHER_NAME);
            this.teacherBulkEntry.FATHERS_NAME.push(data[i].FATHERS_NAME);
            //this.teacherBulkEntry.JOINING_DATE.push(this.datePipe.transform(data[i].JOINING_DATE, "dd/MM/yyyy"));
            this.teacherBulkEntry.JOINING_DATE.push(data[i].JOINING_DATE);
            this.teacherBulkEntry.SMS_MOBILE_NUM.push(data[i].SMS_MOBILE_NUM); 

          }
          
          this.teacherBulkEntry.USER_NAME = this.userCode;
          this.save(this.teacherBulkEntry);
        },
        nzCancelText: 'No',
      });
    } else {
      this.modal.warning({
        nzTitle: 'Error!',
        nzContent: `Please add  information then try again...`,
      });
    }
   
}



save(data:any){
  if(data){
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
        this.teacherFormArray.clear();
        this.validateForm.reset();
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

numberOnly(event: any) {
  const regex = new RegExp('^[0-9.]+$');
  const str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  if (regex.test(str)) {
    return true;
  }
  event.preventDefault();
  return false;
}






  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
