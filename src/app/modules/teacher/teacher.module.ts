import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { QuickTeacherEntryComponent } from './component/quick-teacher-entry/quick-teacher-entry.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherBulkEntryComponent } from './component/teacher-bulk-entry/teacher-bulk-entry.component';


@NgModule({
  declarations: [
    TeacherBulkEntryComponent,
   QuickTeacherEntryComponent,
   
   
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
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
    InlineSVGModule,
    NzCardModule ,
    NzPaginationModule,
    NzSwitchModule,
    NzTabsModule,
    NzFormModule,
    NzModalModule
    
    
  ]
})
export class TeacherModule { }
