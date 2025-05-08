import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickEntryComponent } from './components/offline/quick-entry/quick-entry.component';
import { BulkEntryComponent } from './components/offline/bulk-entry/bulk-entry.component';
import { StudentListReportComponent } from './components/offline/student-list-report/student-list-report.component';

const routes: Routes = [
  {
    path: '',
    children: [
    
      {
        path: 'bulk-entry',
        component: BulkEntryComponent,
      },
      {
        path: 'quick-entry',
        component: QuickEntryComponent,
      },
      {
        path: 'student-list',
        component: StudentListReportComponent,
      },
    


///online admission component

  
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }
