import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
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



import { ResultRoutingModule } from './result-routing.module';
import { TermEntryComponent } from './component/term-entry/term-entry.component';
import { ExamTypeEntryComponent } from './component/exam-type-entry/exam-type-entry.component';
import { ResultGradeEntryComponent } from './component/result-grade-entry/result-grade-entry.component';
import { SubjectTemplateEntryComponent } from './component/subject-template-entry/subject-template-entry.component';
import { SubjectTemplateAssignComponent } from './component/subject-template-assign/subject-template-assign.component';
import { ResultMarkEntryComponent } from './component/result-mark-entry/result-mark-entry.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ResultMarkDistributionComponent } from './component/result-mark-distribution/result-mark-distribution.component';
import { ResultMarkChartFormComponent } from './component/result-mark-distribution/result-mark-chart-form/result-mark-chart-form.component';
import { ResultMarkBulkUploadComponent } from './component/result-mark-bulk-upload/result-mark-bulk-upload.component';
import { ResultProcessComponent } from './component/result-process/result-process.component';
import { ResultAttendanceConfigComponent } from './component/result-attendance-config/result-attendance-config.component';
import { ResultAttendanceSystemConfigComponent } from './component/result-attendance-system-config/result-attendance-system-config.component';
import { ResultAttendanceMarkProcessComponent } from './component/result-attendance-mark-process/result-attendance-mark-process.component';
import { LoadResultComponent } from './component/add-load-result/load-result/load-result.component';
import { SubjectAssignComponent } from './component/subject-assign/subject-assign.component';

@NgModule({
  declarations: [
    TermEntryComponent,
    ExamTypeEntryComponent,
    ResultGradeEntryComponent,
    SubjectTemplateEntryComponent,
    SubjectTemplateAssignComponent,
    ResultMarkEntryComponent,
    ResultMarkDistributionComponent,
    ResultMarkChartFormComponent,
    ResultMarkBulkUploadComponent,
    ResultProcessComponent,
    ResultAttendanceConfigComponent,
    ResultAttendanceSystemConfigComponent,
    ResultAttendanceMarkProcessComponent,
    LoadResultComponent,
    SubjectAssignComponent
  ],
  imports: [
    CommonModule,
    ResultRoutingModule,
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
    FormsModule ,
    NzUploadModule,

    
   
   

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ResultModule { }
