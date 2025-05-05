import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPortionComponent } from './components/top-portion/top-portion.component';
import { StudentsComponent } from './components/students/students.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxEditorModule } from 'ngx-editor';





@NgModule({
  declarations: [
    TopPortionComponent,
    StudentsComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    
    NzSkeletonModule,
    NgxDocViewerModule,
    NgxEditorModule,
    NgxSpinnerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,



  ],
  exports:[
    TopPortionComponent,
    StudentsComponent,
 

  ],
})
export class AdminDashboardModule { }
