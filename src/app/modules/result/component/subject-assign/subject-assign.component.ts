import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { ResultService } from '../../services/result.service';
import { Subject, takeUntil } from 'rxjs';
import { ResultAssignSubjectParams } from '../../models/assign-subject-list';
import { log } from 'console';
import { saveSubjectAssign } from '../../models/subject-template-assign';

@Component({
  selector: 'app-subject-assign',
 
  templateUrl: './subject-assign.component.html',
  styleUrl: './subject-assign.component.scss'
})
export class SubjectAssignComponent implements OnInit, OnDestroy {
commonForm: FormGroup;
 organizationList = JSON.parse(localStorage.getItem('Organization')!);
  orglogo = (localStorage.getItem('orgimgbyte')!);
  organizationCode = this.organizationList[0].CODE;
  organizationName = this.organizationList[0].NAME;
  userCode: any = localStorage.getItem('userCode');
  campusList = JSON.parse(localStorage.getItem('CampusList')!);
  campusCode = this.campusList[0].CODE;
  campusName = this.campusList[0].NAME;
  groupList = JSON.parse(localStorage.getItem('groupList')!);
  classList = JSON.parse(localStorage.getItem('classList')!);
  versionList = JSON.parse(localStorage.getItem('versionList')!);
  sessionList = JSON.parse(localStorage.getItem('sessionList')!);
  shiftList = JSON.parse(localStorage.getItem('shiftList')!);
  classCode = this.classList[0].CODE;
  yearList: any[];
  semesterList: any[];
  visibilityList: any[];
  isVersionVisible: boolean = false;
  isSemesterVisible: boolean = false;
  isYearVisible: boolean = false;
  validateForm: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  isSearchLoading=false;
  isSectionVisible: boolean = false;

  sectionlist: any;
  teacherList: any;

  isSkeletonShow=false;



  allSubjectList:any=[];
  assignSubjectList:any=[];
  templateDataList:any = [];
  compulsoryArrSelectList:any = [];
  fourthArrSelectList:any = [];
  thirdArrSelectList:any = [];


  SubjectListCompusary:any[] = [];


  SubjectListFourth:any[] = [];

  SubjectListThird:any[] = [];

  resultassignsubject:ResultAssignSubjectParams=new ResultAssignSubjectParams();
  savesubjectassign:saveSubjectAssign=new saveSubjectAssign();


  constructor(
    private fb: FormBuilder,
      private unfb: UntypedFormBuilder,
    private modal: NzModalService,
    private globalService: GlobalService,
    private resultService: ResultService,
    private changeDetect: ChangeDetectorRef)

    {
      this.isVersionVisible = globalService.isVisible("VERSION",'');
        this.commonForm = this.fb.group({
               GROUP_NAME: [null, [Validators.required]],
               CLASS_NAME: [null, [Validators.required]],
               VERSION_NAME: [null, [Validators.required]],
               SESSION_NAME: [null, [Validators.required]],
               YEAR_NAME: [null, [Validators.required]],
               SEMESTER_NAME: [null, [Validators.required]],
               SECTION_NAME: [null, [Validators.required]],
               SHIFT_CODE: [null, [Validators.required]],
              
               assignSubjectFormArray: this.unfb.array([]),
       
             });
     
             this.VersionVisibility();
             this.getAllSubjectList();
             this.Add();
    

    }
    ngOnInit(): void {
    }

 get assignSubjectFormArray() {
    return this.commonForm.get('assignSubjectFormArray') as FormArray;
  }

  Add(){
 
      this.assignSubjectFormArray.push(
        this.unfb.group({
          STUDENT_NAME: [null],
          STUDENT_CODE: [null],
          COMPULSORY_SUBJECTS: [null],
          THIRD_SUBJECTS: [null],
          FOURTH_SUBJECTS: [null],
        
        
        })
      );

      if( this.assignSubjectFormArray.length>0){
     }else{
     }

   
  }


  getAllSubjectList() {

      const subjsubs=  this.resultService.
      GetResultSubjectList( this.organizationCode)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:any) => {
        this.allSubjectList = response.ResponseObj;
        this.SubjectListCompusary =   this.allSubjectList.filter((f:any)=>f.SUBJECT_DEFAULT_TYPE === 'C'  );
        

        this.SubjectListThird =   this.allSubjectList.filter((f:any)=>f.SUBJECT_DEFAULT_TYPE === 'O'  );
       
        this.SubjectListFourth =   this.allSubjectList.filter((f:any)=>f.SUBJECT_DEFAULT_TYPE === 'O'  );
        
       console.log('allSubjectList',this.allSubjectList);
       
    
        this.changeDetect.detectChanges();

      });
    }

    changeComp(value:any){

       console.log('value',value);
       
    }



    getResultAssignSubjectGrid() {

      this.resultassignsubject.ORG_CODE =this.organizationCode;
      this.resultassignsubject.CAMPUS_CODE =this.campusCode;
      this.resultassignsubject.GROUP_CODE = this.commonForm.value.GROUP_NAME;
      this.resultassignsubject.CLASS_CODE = this.commonForm.value.CLASS_NAME;
      this.resultassignsubject.VERSION_CODE = this.commonForm.value.VERSION_NAME;
      this.resultassignsubject.SESSION_CODE =   this.commonForm.value.SESSION_NAME;
      this.resultassignsubject.YEAR_CODE = this.commonForm.value.YEAR_NAME;
      this.resultassignsubject.SEMESTER_CODE =this.commonForm.value.SEMESTER_NAME;
      this.resultassignsubject.SHIFT_CODE =this.commonForm.value.SHIFT_CODE;
      this.resultassignsubject.SECTION_CODE =this.commonForm.value.SECTION_NAME;


        
      this.resultService.
      getResultAssignSubjectParamsGrid( this.resultassignsubject)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:any) => {
        this.assignSubjectList = response.ResponseObj;
       let data = response.ResponseObj;


       type SubjectAssignData = {       
        STUDENT_NAME: string;
        STUDENT_CODE: string;
        compSubject: any;
        thirdSubject: any;
        fourthSubject: any;
      };
      const reformattedData: Record<string, SubjectAssignData> = {};

      data.sort(() => {
    }).forEach((item: any) => {
        const key: string = `conversation_id_${item.STUDENT_CODE}`;
          if (!reformattedData[key]) {
          reformattedData[key] = {
            STUDENT_NAME: item.STUDENT_NAME,
            STUDENT_CODE: item.STUDENT_CODE,                       
            compSubject:[],
            thirdSubject:[],
            fourthSubject:[]
          };
        }
          if(item.SUBJECT_DEFAULT_TYPE === "C"){
            reformattedData[key].compSubject.push(item.SUBJECT_CODE);
          }else if(item.SUBJECT_DEFAULT_TYPE === "O"){
            reformattedData[key].thirdSubject.push(item.SUBJECT_CODE);
          }
          if(item.SUBJECT_DEFAULT_TYPE === "O"){
            if (!reformattedData[key].fourthSubject.includes(item.FOURTH_SUBJECT_CODE)) {
              reformattedData[key].fourthSubject.push(item.FOURTH_SUBJECT_CODE);
          }
          
          } 

      });
      let conversationData = Object.values(reformattedData);;

      console.log('conversationData',conversationData);
      let assigndata:any = [];
      assigndata = conversationData;
      this.assignSubjectFormArray.clear();
      for (let i = 0; i < assigndata.length; i++) {
       // console.log('i',);
        
        this.assignSubjectFormArray.push(
          this.unfb.group({
            STUDENT_CODE: [assigndata[i].STUDENT_CODE,[Validators.required]],
            STUDENT_NAME: [assigndata[i].STUDENT_NAME,[Validators.required]],
            COMPULSORY_SUBJECTS: [assigndata[i].compSubject,[Validators.required]],
            THIRD_SUBJECTS: [assigndata[i].thirdSubject,[Validators.required]],
             FOURTH_SUBJECTS: [assigndata[i].fourthSubject,[Validators.required]],
            // FOURTH_SUBJECTS: [null,[Validators.required]],
            

          })
        );
        this.isSearchLoading = false;
      this.isSkeletonShow = false;
      this.changeDetect.detectChanges();
      }











     
        this.changeDetect.detectChanges();

      });
    }



saveAssignSubject(){

      this.savesubjectassign.ORG_CODE =this.organizationCode;
      this.savesubjectassign.CAMPUS_CODE =this.campusCode;
      this.savesubjectassign.USER_CODE =this.userCode;

      this.savesubjectassign.GROUP_CODE = this.commonForm.value.GROUP_NAME;
      this.savesubjectassign.CLASS_CODE = this.commonForm.value.CLASS_NAME;
      this.savesubjectassign.VERSION_CODE = this.commonForm.value.VERSION_NAME;
      this.savesubjectassign.SESSION_CODE = this.commonForm.value.SESSION_NAME;
      this.savesubjectassign.SECTION_CODE = this.commonForm.value.SECTION_NAME;
      this.savesubjectassign.YEAR_CODE = this.commonForm.value.YEAR_NAME;
      this.savesubjectassign.SEMESTER_CODE =this.commonForm.value.SEMESTER_NAME;
      this.savesubjectassign.SHIFT_CODE =this.commonForm.value.SHIFT_CODE;

      this.savesubjectassign.STUDENT_CODE = [];
       this.savesubjectassign.SUBJECT_CODE = [];
       this.savesubjectassign.FOURTH_SUBJECT_CODE = [];

          let data: any = [];
          data = this.commonForm.controls.assignSubjectFormArray.value;
          // for (let i = 0; i < data.length; i++) {
          //   this.savesubjectassign.STUDENT_CODE.push(data[i].STUDENT_CODE);
          //   let combinedSubjects = [...data[i].COMPULSORY_SUBJECTS, ...data[i].THIRD_SUBJECTS];

          //   this.savesubjectassign.SUBJECT_CODE.push(combinedSubjects);

          //  // this.savesubjectassign.FOURTH_SUBJECT_CODE.push(data[i].FOURTH_SUBJECTS);
          //   this.savesubjectassign.FOURTH_SUBJECT_CODE = data.map((item: { FOURTH_SUBJECTS: any; }) => item.FOURTH_SUBJECTS);


          // }

          for (let i = 0; i < data.length; i++) {
            this.savesubjectassign.STUDENT_CODE.push(data[i].STUDENT_CODE);
          
            let combinedSubjects = [...data[i].COMPULSORY_SUBJECTS, ...data[i].THIRD_SUBJECTS];
            this.savesubjectassign.SUBJECT_CODE.push(combinedSubjects.join(',')); 

            let fourthSubjects = data[i].FOURTH_SUBJECTS.length > 0 ? data[i].FOURTH_SUBJECTS.join(',') : "NFS";
            this.savesubjectassign.FOURTH_SUBJECT_CODE.push(fourthSubjects);
          }
          
         




          

          this.resultService
          .saveAssignSubject(this.savesubjectassign)
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            if (response.StatusCode === 1) {
              this.modal.success({
                nzTitle: `Success`,
                nzContent: response.Message,
                nzOkDanger: true,
              });
             
              this.changeDetect.detectChanges();
            } else {
              this.modal.error({
                nzTitle: `Failed`,
                nzContent: response.Message,
                nzOkDanger: true,
              });
              this.changeDetect.detectChanges();
            }
          });
          this.changeDetect.detectChanges();



}





















    onSelectedClass(classCode: any) {
      this.yearList = [];
      this.semesterList = [];
      this.isYearVisible = false;
      this.isSemesterVisible = false;
      this.commonForm.controls['YEAR_NAME'].reset();
      this.commonForm.controls['SEMESTER_NAME'].reset();
      this.commonForm.controls['SECTION_NAME'].reset();
      if (classCode) {
        this.LoadYearList(classCode);
        this.LoadSemesterList(classCode);
        this.LoadSectionList(classCode);
      }

    }
    VersionVisibility() {
      if (!this.isVersionVisible) {
        this.commonForm.controls.VERSION_NAME.setValue(this.versionList[0].CODE);
      } else {
        this.commonForm.controls.VERSION_NAME.enable();
      }
    }
    public LoadYearList(classCode: any) {
      // this.isYearVisible = false;
      this.yearList = this.globalService.getYearListByClassCode(classCode);
      this.visibilityList =
        this.globalService.getVisibilityListByClassCode(classCode);
      if (this.visibilityList !== null) {
        for (let i = 0; i < this.visibilityList.length; i++) {
          let Component = this.visibilityList[i].CODE;
          let isVisible = this.visibilityList[i].NAME;
          if (Component == 'YEAR' && isVisible == 'Y') {
            this.isYearVisible = this.globalService.isVisible('YEAR',classCode);
            this.changeDetect.detectChanges();
          }
        }
      }
      if (!this.isYearVisible) {
        this.commonForm.controls.YEAR_NAME.setValue(this.yearList[0].CODE);
        this.changeDetect.detectChanges();
      } else {
        this.commonForm.controls.YEAR_NAME.enable();
      }
      this.changeDetect.detectChanges();
    }
    public LoadSemesterList(classCode: any) {
      this.semesterList =
        this.globalService.getSemesterListByClassCode(classCode);
      this.visibilityList =
        this.globalService.getVisibilityListByClassCode(classCode);
      if (this.visibilityList !== null) {
        for (let i = 0; i < this.visibilityList.length; i++) {
          let Component = this.visibilityList[i].CODE;
          let isVisible = this.visibilityList[i].NAME;
          if (Component == 'SEMESTER' && isVisible == 'Y') {
            this.isSemesterVisible = this.globalService.isVisible('SEMESTER',classCode);
          }
        }
      }
      if (!this.isSemesterVisible) {
        this.commonForm.controls.SEMESTER_NAME.setValue(this.semesterList[0].CODE);
      } else {
        this.commonForm.controls.SEMESTER_NAME.enable();
      }
      this.changeDetect.detectChanges();
    }


    public LoadSectionList(classCode:any) {
      this.sectionlist = this.globalService.getSectionListByClassCode(classCode);
      
      this.visibilityList = this.globalService.getVisibilityListByClassCode(classCode);
    if(this.visibilityList !== null){
    for(let i = 0; i<this.visibilityList.length; i++){
      let Component = this.visibilityList[i].CODE;
      let isVisible = this.visibilityList[i].NAME;
      if(Component=='SECTION' && isVisible == 'Y' ){
        this.isSectionVisible = this.globalService.isVisible('SECTION',classCode);
      }
    }
    }
  
    if(!this.isSectionVisible)
    {
      
      
      this.commonForm.patchValue({SECTION_NAME:this.sectionlist[0].CODE });
    //  this.commonForm.controls.SECTION_NAME.disable();
    }
    else{
     
      this.commonForm.controls.SECTION_NAME.enable();
    }
      this.changeDetect.detectChanges();
     }





























    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

}
