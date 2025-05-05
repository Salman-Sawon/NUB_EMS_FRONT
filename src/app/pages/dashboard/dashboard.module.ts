import { AdminDashboardModule } from '../../modules/dashboard/admin-dashboard.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [DashboardComponent, AdminDashboardComponent, ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    AdminDashboardModule
  ],
})
export class DashboardModule {}
