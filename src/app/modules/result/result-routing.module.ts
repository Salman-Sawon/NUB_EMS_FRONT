import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermEntryComponent } from './component/term-entry/term-entry.component';
import { ExamTypeEntryComponent } from './component/exam-type-entry/exam-type-entry.component';
import { ResultGradeEntryComponent } from './component/result-grade-entry/result-grade-entry.component';
import { SubjectTemplateEntryComponent } from './component/subject-template-entry/subject-template-entry.component';
import { SubjectTemplateAssignComponent } from './component/subject-template-assign/subject-template-assign.component';
import { ResultMarkEntryComponent } from './component/result-mark-entry/result-mark-entry.component';
import { ResultMarkDistributionComponent } from './component/result-mark-distribution/result-mark-distribution.component';
import { ResultMarkBulkUploadComponent } from './component/result-mark-bulk-upload/result-mark-bulk-upload.component';
import { ResultProcessComponent } from './component/result-process/result-process.component';
import { ResultAttendanceConfigComponent } from './component/result-attendance-config/result-attendance-config.component';
import { ResultAttendanceSystemConfigComponent } from './component/result-attendance-system-config/result-attendance-system-config.component';
import { ResultAttendanceMarkProcessComponent } from './component/result-attendance-mark-process/result-attendance-mark-process.component';
import { LoadResultComponent } from './component/add-load-result/load-result/load-result.component';
import { SubjectAssignComponent } from './component/subject-assign/subject-assign.component';

const routes: Routes = [
  {
    path: '',
    component: LoadResultComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'term-entry' },
      {
        path: 'term-entry',
        component: TermEntryComponent,
      },
      {
        path: 'exam-type-entry',
        component: ExamTypeEntryComponent,
      },
      {
        path: 'result-grade-entry',
        component: ResultGradeEntryComponent,
      },
      {
        path: 'subject-template-entry',
        component: SubjectTemplateEntryComponent,
      },
      {
        path: 'subject-template-assign',
        component: SubjectTemplateAssignComponent,
      },
      {
        path: 'result-mark-entry',
        component: ResultMarkEntryComponent,
      },
      {
        path: 'result-mark-distribution',
        component: ResultMarkDistributionComponent,
      },
      {
        path: 'result-mark-bulk-upload',
        component: ResultMarkBulkUploadComponent,
      },
      {
        path: 'result-process',
        component:ResultProcessComponent ,
      },
      {
        path: 'result-attendance-config',
        component:ResultAttendanceConfigComponent ,
      },
      {
        path: 'result-attendance-system-config',
        component:ResultAttendanceSystemConfigComponent ,
      },
      {
        path: 'result-attendance-mark-process',
        component:ResultAttendanceMarkProcessComponent ,
      },
      {
        path: 'subject-assign',
        component:SubjectAssignComponent ,
      },
  ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
