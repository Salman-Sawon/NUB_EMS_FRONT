import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { SetupService } from '../../service/setup.service';
import { DatePipe } from '@angular/common';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { Session } from '../../models/crud/session';
import { Month } from '../../models/crud/month';


@Component({
  selector: 'app-session-setup',
  templateUrl: './session-setup.component.html',
  styleUrl: './session-setup.component.scss',
  providers: [
    DatePipe]
})
export class SessionSetupComponent  implements OnInit, OnDestroy{

  organizationList = JSON.parse(localStorage.getItem('Organization')!);
  organizationCode = this.organizationList[0].CODE;
  userCode: any = localStorage.getItem('userCode');
  campusList = JSON.parse(localStorage.getItem('CampusList')!);
  campusCode = this.campusList[0].CODE;
  sessionList = JSON.parse(localStorage.getItem('sessionList')!);
  private destroy$: Subject<void> = new Subject<void>();
  validateForm: FormGroup;
  session: Session = new Session();
  action: string;
  btnUpdateSave:string;
  isSaveLoading = false;
  monthList: Month[];

  monthYear: any;
  billMonth: number;
  billYear: number;
  rowList: any = [];
  generateButtonHide=true;
  generateButton: string = 'Generate Bill Month';
  changeButton: string = 'Save';
  constructor(private cdr:ChangeDetectorRef,
    private fb:FormBuilder,
    private setupService: SetupService,
    private datePipe: DatePipe,
    private globalService: GlobalService,
    private modal:NzModalService
    ) {
      this.validateForm = this.fb.group({
        SESSION_ID:[null, ],
        SESSION_NAME:[null,[ Validators.required] ],
        START_DATE:[new(Date), [ Validators.required]],
        END_DATE:[new(Date), [ Validators.required]],
        SESSION_NAME_BANGLA:[null,],
        sessionFormArray: this.fb.array([]),
      });
      this.getSessionList();
      this. fillMonthList();
  }
  ngOnInit(): void {
  }
  get sessionFormArray() {
    return this.validateForm.get('sessionFormArray') as FormArray;
  }





  slectedSession(sessionId: any) {
    
    if (sessionId == null) {  // This will check for both null and undefined
    
      this.generateButtonHide=true;
        this.changeButton = 'Save';
        this.monthYear = [];  // Clear the array
        this.session.SESSION_ID == null; 
        this.sessionFormArray.clear();  // Clear the FormArray
        this.validateForm.reset();  // Reset the entire form
        this.cdr.detectChanges();  // Detect changes to update the view
        
    } else {
        this.changeButton = 'Update';
        this.generateButtonHide = false;
        this.getSessionGridView(sessionId);
        //this.generateButton = 'Delete';
        this.cdr.detectChanges();
    }

    this.cdr.detectChanges();
}



  generateBillMonth() {
    if(this.validateForm.valid){
    const startDateValue = this.validateForm.controls["START_DATE"].value;
  

    let startDateString: string;
  
    // Check if startDateValue is a Date object
    if (startDateValue instanceof Date) {
      // Format the Date object to DD/MM/YYYY
      const day = ("0" + startDateValue.getDate()).slice(-2);
      const month = ("0" + (startDateValue.getMonth() + 1)).slice(-2);
      const year = startDateValue.getFullYear();
      startDateString = `${day}/${month}/${year}`;
    } else if (typeof startDateValue === 'string') {
      startDateString = startDateValue;
    } else {
      console.error("Invalid START_DATE format.");
      return;
    }
  
    // Assuming the date format in the form control is DD/MM/YYYY
    const startDateSplit = startDateString.split("/");
    
    if (startDateSplit.length !== 3) {
      console.error("Invalid START_DATE format.");
      return;
    }
  
    this.billMonth = Number(startDateSplit[1]);
    this.billYear = Number(startDateSplit[2]);

    // Initialize arrays
    this.session.SESSION_DTL_ID = [];
    this.session.Row_Status = [];
    this.session.BILL_MONTH = [];
    this.session.DTL_START_DATE = [];
    this.session.DTL_END_DATE = [];
    this.session.BILL_DATE = [];
    this.session.DUE_DATE = [];
  
    this.monthYear = []; // Ensure monthYear is cleared before populating
  
    for (let i = 0; i < 12; i++) {
      let m = ("0" + this.billMonth).slice(-2);
      let formattedStartDate = `01/${m}/${this.billYear}`;
      let formattedEndDate = `28/${m}/${this.billYear}`;
      let formattedBillDate = `01/${m}/${this.billYear}`;
      let formattedDueDate = `15/${m}/${this.billYear}`;
  
      this.session.DTL_START_DATE.push(formattedStartDate);
      this.session.DTL_END_DATE.push(formattedEndDate);
      this.session.BILL_DATE.push(formattedBillDate);
      this.session.DUE_DATE.push(formattedDueDate);
      this.session.SESSION_DTL_ID.push(0);
      if (this.session.SESSION_ID == null) {
        this.session.Row_Status.push(1);
      }else{
        this.session.Row_Status.push(2);
      }
    
      this.session.BILL_MONTH.push(`${this.billYear}${m}`);
  
      // Update monthYear array for FormArray
      this.monthYear.push({
        billMonth: `${this.billYear}${m}`,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        billDate: formattedBillDate,
        dueDate: formattedDueDate
      });
  
      // Update month and year for next iteration
      if (this.billMonth === 12) {
        this.billYear += 1;
        this.billMonth = 1;
      } else {
        this.billMonth += 1;
      }
    }
  
    // Clear and populate the FormArray
    this.sessionFormArray.clear();
    this.monthYear.forEach((month: any) => {
      this.sessionFormArray.push(this.fb.group({
        billMonth: [month.billMonth],
        startDate: [month.startDate],
        endDate: [month.endDate],
        billDate: [month.billDate],
        dueDate: [month.dueDate]
      }));
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
  

  

  convertDateFormat(dateStr: string): string {
    const [month, day, year] = dateStr.split('/');
    return `${day}/${month}/${year}`;
  }

  getSessionGridView(sessionId: any) {
    if (sessionId > 0) {
      this.setupService.getSessionGridView(this.userCode, sessionId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          this.session = response.ResponseObj;
        
          if (!Array.isArray(this.session.Row_Status)) {
       
            this.session.Row_Status = [];  // Initialize Row_Status as an empty array
          }
          for (let i = 0; i < 12; i++) {
            this.session.Row_Status.push(2);
          }

          this.monthYear = this.session.BILL_MONTH.map((billMonth: string, index: number) => ({
            billMonth: billMonth,
            
            
            startDate: this.session.DTL_START_DATE[index],
            endDate: this.session.DTL_END_DATE[index],
            billDate: this.session.BILL_DATE[index],
            dueDate: this.session.DUE_DATE[index],
          }));
         
          this.sessionFormArray.clear();
  
          this.monthYear.forEach((month:any) => {
            this.sessionFormArray.push(this.fb.group({
              billMonth: [month.billMonth],
              startDate: [month.startDate],
              endDate: [month.endDate],
              billDate: [month.billDate],
              dueDate: [month.dueDate],
              
            }));
          });
        
          // Set values in the form controls
          const formattedStartDate = this.convertDateFormat(this.session.START_DATE);
          this.validateForm.controls["START_DATE"].setValue(formattedStartDate);
          const formattedEndDate = this.convertDateFormat(this.session.END_DATE);
          this.validateForm.controls["END_DATE"].setValue(formattedEndDate);
          this.validateForm.controls["SESSION_NAME"].setValue(this.session.SESSION_NAME);
          this.validateForm.controls["SESSION_NAME_BANGLA"].setValue(this.session.SESSION_NAME_BANGLA);       
        
         // this.generateBillMonth();
          this.cdr.detectChanges();
        });
  
      this.cdr.detectChanges();
    } else  {
      this.generateButtonHide=true;
      this.monthYear = [];
      this.sessionFormArray.clear(); 
      this.validateForm.reset();
      this.cdr.detectChanges();
    }
    this.cdr.detectChanges();
  }
  
  getSessionList() {
     this.globalService
    .GetSessionList(this.organizationCode)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:any) => {
      this.sessionList = response.ResponseObj;    
      this.cdr.detectChanges();
    });
   
  }

  fillMonthList() {
    this.monthList=[];
      let month = {} as Month;
      month.MonthId=1;
      month.MonthName = "Jan";
      this.monthList.push(month);

      month = {} as Month;
      month.MonthId=2;
      month.MonthName = "Feb";
      this.monthList.push(month);

      month = {} as Month;
      month.MonthId=3;
      month.MonthName = "Mar";
      this.monthList.push(month);

      month = {} as Month;
      month.MonthId=4;
      month.MonthName = "Apr";
      this.monthList.push(month);

      month = {} as Month;
      month.MonthId=5;
      month.MonthName = "May";
      this.monthList.push(month);

      month = {} as Month;
      month.MonthId=6;
      month.MonthName = "Jun";
      this.monthList.push(month);

      month = {} as Month;
      month.MonthId=7;
      month.MonthName = "Jul";
      this.monthList.push(month);

      month = {} as Month;
      month.MonthId=8;
      month.MonthName = "Aug";
      this.monthList.push(month);

      month = {} as Month;
      month.MonthId=9;
      month.MonthName = "Sep";
      this.monthList.push(month);

      month = {} as Month;
      month.MonthId=10;
      month.MonthName = "Oct";
      this.monthList.push(month);

      month = {} as Month;
      month.MonthId=11;
      month.MonthName = "Nov";
      this.monthList.push(month);

      month = {} as Month;
      month.MonthId=12;
      month.MonthName = "Dec";
      this.monthList.push(month);
  }

  saveSession() {
    this.session.ORG_CODE = this.organizationCode;
    this.session.User_Code = this.userCode;
    this.session.SESSION_NAME = this.validateForm.value.SESSION_NAME;
    this.session.SESSION_NAME_BANGLA = this.validateForm.value.SESSION_NAME_BANGLA;
    let aDate = this.validateForm.controls['START_DATE'].value;
    let AddDate = this.datePipe.transform(aDate, 'dd/MM/yyyy')!;
    this.session.START_DATE = AddDate;
    let EDate = this.validateForm.controls['END_DATE'].value;
    let EndDate = this.datePipe.transform(EDate, 'dd/MM/yyyy')!;
    this.session.END_DATE = EndDate;
    
     this.setupService
     .saveSession(this.session)
     .pipe(takeUntil(this.destroy$))
     .subscribe((response:any) => {
      if (response.StatusCode === 1 && this.session.Row_Status[0] == 1) {
        this.modal.success({
          nzTitle: `Success`,
          nzContent: response.Message,
          nzOkDanger: true,
        });
        this.getSessionList();
     // this.authService.getOrganization(this.userCode);

        this.monthYear = [] ;
      }
      else if (response.StatusCode === 1 && this.session.Row_Status[0] == 2) {
        this.modal.success({
          nzTitle: `Updated`,
          nzContent: response.Message,
          nzOkDanger: true,
        });
        this.getSessionList();
     // this.authService.getOrganization(this.userCode);

        this.monthYear = [] ;
      }
      else {
        this.modal.error({
          nzTitle: `Error`,
          nzContent: response.Message,
          nzOkDanger: true,
        });
        //this.monthYear.clear();
      }
    });
    
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
