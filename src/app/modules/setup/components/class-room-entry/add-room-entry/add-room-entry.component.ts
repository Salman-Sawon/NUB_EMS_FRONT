import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RoomInfo } from '../../../models/crud/room-info';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { SetupService } from '../../../service/setup.service';
import { Subject, takeUntil } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-add-room-entry',
  templateUrl: './add-room-entry.component.html',
  styleUrl: './add-room-entry.component.scss'
})
export class AddRoomEntryComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
organizationList = JSON.parse(localStorage.getItem('Organization')!);
campusList = JSON.parse(localStorage.getItem('CampusList')!);
organizationCode = this.organizationList[0].CODE;
campusCode = this.campusList[0].CODE;
roomInfo: RoomInfo = new RoomInfo();
ValidateForm: FormGroup;
action: string;
btnUpdateSave:string;
isSaveLoading = false;
buildingList:any;
constructor(
  private globalService: GlobalService,
  private setupService: SetupService,
  private cdr: ChangeDetectorRef,
  private fb: FormBuilder,
  private modalRef: NzModalRef,
  private modal: NzModalService
) { 
  this.ValidateForm = this.fb.group({
    ROOM_NAME: [null,[Validators.required]],
    CAPACITY: [null,[Validators.required]],
    NUMBER_OF_ROWS: [null,[Validators.required]],
    NUMBER_OF_COLUMNS: [null,[Validators.required]],
    BUILDING_ID: [null,[Validators.required]],
  });
  this.modalRef.afterOpen
  .pipe(takeUntil(this.destroy$))
  .subscribe(() => {
    if (modalRef.componentInstance) {
      this.roomInfo = modalRef.componentInstance.data;
      this.action = modalRef.componentInstance.action;
      if(this.action === 'Add'){
        this.btnUpdateSave = 'Save';
       
      }else{
        this.btnUpdateSave = 'Update';
        this.ValidateForm.patchValue({BUILDING_ID: this.roomInfo.BUILDING_ID});
        this.ValidateForm.patchValue({ROOM_NAME: this.roomInfo.ROOM_NAME});
        this.ValidateForm.patchValue({CAPACITY:this.roomInfo.CAPACITY});
        this.ValidateForm.patchValue({NUMBER_OF_ROWS:this.roomInfo.NUM_OF_ROWS});
        this.ValidateForm.patchValue({NUMBER_OF_COLUMNS:this.roomInfo.NUM_OF_COLUMNS});
      }
    }
  });

  this.getBuildingList();
}

ngOnInit(): void { 
}

public getBuildingList() {
  this.setupService
  .getBuildingList(this.organizationCode,this.campusCode)
  .pipe(takeUntil(this.destroy$))
    .subscribe((response:any) => {
      this.buildingList = response.ResponseObj;
   console.log('this.buildingList',this.buildingList);
   
      this.cdr.detectChanges();
    });
}

saveRoom(){
  if(this.ValidateForm.valid){
    this.roomInfo.ROOM_NAME = this.ValidateForm.value.ROOM_NAME;
    this.roomInfo.BUILDING_ID = this.ValidateForm.value.BUILDING_ID;
    this.roomInfo.CAPACITY = this.ValidateForm.value.CAPACITY;
    this.roomInfo.NUM_OF_ROWS = this.ValidateForm.value.NUMBER_OF_ROWS;
    this.roomInfo.NUM_OF_COLUMNS = this.ValidateForm.value.NUMBER_OF_COLUMNS;
    this.modal.confirm({
      nzTitle: `Are you sure you want to ${this.action.toLocaleLowerCase()} this room?`,
      nzContent: `<b style="color: red;">${this.ValidateForm.value.ROOM_NAME}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.updateOrAddroom(this.roomInfo),
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


updateOrAddroom(data:any){
  if(data){ 
    this.isSaveLoading = true;
    this.setupService
    .SaveRoomentry(data)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:any) => {
      if(response.StatusCode == 1){
        this.modal.success({
          nzTitle: `${this.roomInfo.ROOM_NAME}`,
          nzContent: response.Message,
          nzOkDanger: true,
        });
        this.isSaveLoading = false;
        this.ValidateForm.reset();
          this.modalRef.close();       
      }else{
        this.modal.error({
          nzTitle: `${this.roomInfo.ROOM_NAME}`,
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
