import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'admin/setup',
    loadChildren: () => import('../modules/setup/setup.module').then((m) => m.SetupModule),
  },
  {
    path: 'admin/admission',
    loadChildren: () => import('../modules/admission/admission.module').then((m) => m.AdmissionModule),
  },




 

  {
    path: 'admin/teacher',
    loadChildren: () => import('../modules/teacher/teacher.module').then((m) => m.TeacherModule),
  },









  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
