import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { SetupRoutingModule } from './setup-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { SessionSetupComponent } from './components/session-setup/session-setup.component';
import { AllSetupComponent } from './components/all-setup/all-setup.component';
import { ClassRoomEntryComponent } from './components/class-room-entry/class-room-entry.component';
import { AddRoomEntryComponent } from './components/class-room-entry/add-room-entry/add-room-entry.component';
import { PeriodEntryComponent } from './components/period-entry/period-entry.component';
import { AddPeriodEntryComponent } from './components/period-entry/add-period-entry/add-period-entry.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { SubjectEntryComponent } from './components/subject-entry/subject-entry.component';
@NgModule({
  declarations: [
  
    SessionSetupComponent,
    AllSetupComponent,
    ClassRoomEntryComponent,
    AddRoomEntryComponent,
    PeriodEntryComponent,
    AddPeriodEntryComponent,
    SubjectEntryComponent,
    
  ],
  imports: [
    CommonModule,
    SetupRoutingModule,
    NzButtonModule,
    NzTableModule,
    ReactiveFormsModule,
    NzInputModule,
    NzDividerModule,
    NzModalModule,
    NzIconModule,
    NzToolTipModule,
    NzFormModule,
    NzSelectModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzAvatarModule,
    NzUploadModule,
    NzDatePickerModule,
    NzSkeletonModule,
    NzTimePickerModule
  ],
})
export class SetupModule { }
