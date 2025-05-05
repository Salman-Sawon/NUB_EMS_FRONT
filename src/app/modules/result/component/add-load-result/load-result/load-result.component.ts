import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResultService } from '../../../services/result.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-load-result',
  templateUrl: './load-result.component.html',
  styleUrl: './load-result.component.scss'
})
export class LoadResultComponent implements OnInit, OnDestroy{
  private destroy$: Subject<void> = new Subject<void>();
  organizationList = JSON.parse(localStorage.getItem('Organization')!);
  organizationCode = this.organizationList[0].CODE;
  userCode: any = localStorage.getItem('userCode');
  campusList = JSON.parse(localStorage.getItem('CampusList')!);
  campusCode = this.campusList[0].CODE;


  constructor(
    private resultService: ResultService,

  
  ){
    
    this.loadTermList();


  }

  ngOnInit(): void {
   
     }



  loadTermList(){
   
    this.resultService
    .getTermSubjExmcaptionList(this.organizationCode,this.campusCode )
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:any) => {
      let data:any = [];
      data = response.ResponseObj;

  let termlist = data.filter((item: { TYPE: string;  }) => item.TYPE ===  'TERM' );
  let subjlist = data.filter((item: { TYPE: string;  }) => item.TYPE ===  'SUBJECT' );
  let examcaptionlist = data.filter((item: { TYPE: string;  }) => item.TYPE ===  'EXMCAP' );



  localStorage.setItem('TermGridList', JSON.stringify(termlist));
  localStorage.setItem('SubjectGridList', JSON.stringify(subjlist));
  localStorage.setItem('ExamCaptionGridList', JSON.stringify(examcaptionlist));

    });
   

  }




  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();
  }
}
