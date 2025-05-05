import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionSetupComponent } from './components/session-setup/session-setup.component';
import { AllSetupComponent } from './components/all-setup/all-setup.component';
import { ClassRoomEntryComponent } from './components/class-room-entry/class-room-entry.component';
import { PeriodEntryComponent } from './components/period-entry/period-entry.component';
import { SubjectEntryComponent } from './components/subject-entry/subject-entry.component';

const routes: Routes = [
  {
    path: '',
    children: [
    
      {
        path: 'session-setup',
        component: SessionSetupComponent,
      },
      {
        path: 'all-setup',
        component: AllSetupComponent,
      },
      {
        path: 'class-room-entry',
        component: ClassRoomEntryComponent,
      },
      {
        path: 'period-entry',
        component: PeriodEntryComponent,
      },
     
      {
        path: 'subject-entry',
        component: SubjectEntryComponent,
      },
     
    
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
