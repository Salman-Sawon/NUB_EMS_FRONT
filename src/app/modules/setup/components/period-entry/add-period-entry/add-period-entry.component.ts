import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Periodinfo } from '../../../models/crud/classRoutine';
import { Subject, takeUntil } from 'rxjs';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { SetupService } from '../../../service/setup.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { isNull } from 'util';
@Component({
  selector: 'app-add-period-entry',
  templateUrl: './add-period-entry.component.html',
  styleUrl: './add-period-entry.component.scss',
  providers: [
    DatePipe,
  ]
})
export class AddPeriodEntryComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
organizationList = JSON.parse(localStorage.getItem('Organization')!);
campusList = JSON.parse(localStorage.getItem('CampusList')!);
organizationCode = this.organizationList[0].CODE;
campusCode = this.campusList[0].CODE;
periodinfo: Periodinfo = new Periodinfo();
ValidateForm: FormGroup;
action: string;
btnUpdateSave:string;
isSaveLoading = false;
startTime: string | null;
endTime: string | null;
constructor(
  private globalService: GlobalService,
  private setupService: SetupService,
  private cdr: ChangeDetectorRef,
  private fb: FormBuilder,
  private datePipe: DatePipe,
  private modalRef: NzModalRef,
  private modal: NzModalService
) { 
  this.ValidateForm = this.fb.group({
    PERIOD_NAME: [null,[Validators.required]],
    START_TIME: [new(Date),[Validators.required]],
    END_TIME: [new(Date),[Validators.required]],
    DURATION: [null,[Validators.required]],
  });
  this.modalRef.afterOpen
  .pipe(takeUntil(this.destroy$))
  .subscribe(() => {
    if (modalRef.componentInstance) {
      this.periodinfo = modalRef.componentInstance.data;
      this.action = modalRef.componentInstance.action;
      if(this.action === 'Add'){
        this.btnUpdateSave = 'Save';
       
      }else{
        this.btnUpdateSave = 'Update';
        this.ValidateForm.patchValue({PERIOD_NAME: this.periodinfo.PERIOD_NAME});
        const inputTime = this.periodinfo.START_TIME; 
        const STime = moment(inputTime, 'hh:mm A').toDate();
        this.ValidateForm.controls['START_TIME'].patchValue( STime);
         //for update
        const inputstartTime =this.ValidateForm.controls.START_TIME.value;
         const momentStartTime=moment(inputstartTime,'HH:mm')
         const formatstartTime=momentStartTime.format('hh:mm A');
         this.startTime=formatstartTime;
      
   
       const endtime = this.periodinfo.END_TIME; 
       const formattedDate = moment(endtime, 'hh:mm A').toDate();
       this.ValidateForm.controls['END_TIME'].patchValue( formattedDate);
       //for update
       const inputendTime = this.ValidateForm.controls.END_TIME.value; 
       const momentEndtime = moment(inputendTime, 'HH:mm');
       // Format the time in 12-hour clock with AM/PM
       const formatendTime = momentEndtime.format('hh:mm A');
       this.endTime=formatendTime;
   
        this.ValidateForm.patchValue({DURATION:this.periodinfo.DURATION});
      }
    }
  });

 // this.getRoomInfo();
}

ngOnInit(): void { 
}

clearEndTime() {
  // Clear the END_TIME control
  this.ValidateForm.controls['END_TIME'].reset();
  this.endTime = null;
}

starttime(value: Date): void {
  const inputTime = this.ValidateForm.controls.START_TIME.value; // Replace with your actual time
  const starttime = moment(inputTime, 'HH:mm');
 
  // Format the time in 12-hour clock with AM/PM
  const startTime = starttime.format('hh:mm A');
  this.startTime=startTime;
  
  
}


endtime(value: Date): void {
  this.ValidateForm.controls['DURATION'].reset();
  const inputTime = this.ValidateForm.controls.END_TIME.value; // Replace with your actual time
  const endtime = moment(inputTime, 'HH:mm');
  // Format the time in 12-hour clock with AM/PM
  const endTime = endtime.format('hh:mm A');
  this.endTime=endTime;
  if(value){
   
    const startTime = this.startTime;
    const endTime = this.endTime; 

    const startMoment = moment(startTime, 'hh:mm A');
    const endMoment = moment(endTime, 'hh:mm A');

    const timeDifference = endMoment.diff(startMoment, 'minutes');
    
    const timeDifferenceStr = timeDifference.toString(); // Convert number to string
     this.ValidateForm.controls['DURATION'].patchValue(timeDifferenceStr);
    

  }

 

  
}


savePeriod(){
  if(this.ValidateForm.valid){    
    this.periodinfo.PERIOD_NAME = this.ValidateForm.value.PERIOD_NAME;
    this.periodinfo.START_TIME = this.startTime;
    this.periodinfo.END_TIME = this.endTime;
    this.periodinfo.DURATION = this.ValidateForm.value.DURATION;
    this.modal.confirm({
      nzTitle: `Are you sure you want to ${this.btnUpdateSave} this period?`,
      nzContent: `<b style="color: red;">${this.ValidateForm.value.PERIOD_NAME}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.updateOrAddPeriod(this.periodinfo),
      nzCancelText: 'No'
    });
  }else{
    Object.values(this.ValidateForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
}


updateOrAddPeriod(data:any){
  
  if(data){ 
    this.isSaveLoading = true;
    this.setupService
    .SavePeriodentry(data)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:any) => {
      
      if(response.StatusCode == 1){
        this.modal.success({
          nzTitle: `${this.periodinfo.PERIOD_NAME}`,
          nzContent: response.Message,
          nzOkDanger: true,
        });
        this.isSaveLoading = false;
        this.ValidateForm.reset();
        this.modalRef.close();       
      }else{
        this.modal.error({
          nzTitle: `${this.periodinfo.PERIOD_NAME}`,
          nzContent: response.Message,
          nzOkDanger: true,
        });
        this.isSaveLoading = false;
      }
      this.cdr.detectChanges();
    });
  }
}
ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
}
