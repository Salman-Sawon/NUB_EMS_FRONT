import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickTeacherEntryComponent } from './component/quick-teacher-entry/quick-teacher-entry.component';
import { TeacherBulkEntryComponent } from './component/teacher-bulk-entry/teacher-bulk-entry.component';

const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'teacher-bulk-entry',
        component: TeacherBulkEntryComponent,
      },
      {
        path:'quick-teacher-entry',
        component:QuickTeacherEntryComponent,
      },

     

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
