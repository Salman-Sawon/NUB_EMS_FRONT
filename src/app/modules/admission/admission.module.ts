import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionRoutingModule } from './admission-routing.module';
import { BulkEntryComponent } from './components/offline/bulk-entry/bulk-entry.component';
import { QuickEntryComponent } from './components/offline/quick-entry/quick-entry.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NzListModule } from 'ng-zorro-antd/list';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { StudentListReportComponent } from './components/offline/student-list-report/student-list-report.component';

@NgModule({
  declarations: [
    BulkEntryComponent,
    QuickEntryComponent,
    StudentListReportComponent
  ],
  imports: [
    CommonModule,
    AdmissionRoutingModule,
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
    NzListModule,
    NzEmptyModule,
    ScrollingModule


  ]
})
export class AdmissionModule { }
