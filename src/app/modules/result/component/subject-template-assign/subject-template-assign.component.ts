import {  ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ResultService } from '../../services/result.service';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { StudentSearchParameter } from '../../models/student-search-parameter';
import { SubjectTemplateAssign } from '../../models/subject-template-assign';
interface ItemData {
  MENU_ITEM_ID: number;
  SUBJECT_CODE: string;
  SC: string;
  SN: string;
  SUBJECT_NAME: string;
  PARENT_MENU_ITEM_ID: number;
  MENU_DESCRIPTION: string;
  MENU_URL: string;
}

@Component({
  selector: 'app-subject-template-assign',
  templateUrl: './subject-template-assign.component.html',
  styleUrl: './subject-template-assign.component.scss'
})

export class SubjectTemplateAssignComponent implements OnInit, OnDestroy {

  checkedStudent = false;
  listOfSelectionStudent = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllCheckedStudent(true);
      },
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageDataStudent.forEach((data, index) =>
          this.updateCheckedSetStudent(data.SC, index % 2 !== 0)
        );
        this.refreshCheckedStatusStudent();
      },
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageDataStudent.forEach((data, index) =>
          this.updateCheckedSetStudent(data.SC, index % 2 === 0)
        );
        this.refreshCheckedStatusStudent();
      },
    },
  ];
    //For student
    setOfCheckedIdStudent = new Set<string>();
    indeterminateStudent = false;
    listOfCurrentPageDataStudent: readonly ItemData[] = [];
    listOfDataStudent: ItemData[] = [];
    checkboxDisableStudent: boolean = true;
    searchDatastudentlist:any[] = [];


  /// Compusary
checkedCompusary = false;
listOfSelectionCompusary = [
  {
    text: 'Select All Row',
    onSelect: () => {
      this.onAllCheckedCompusary(true);
    },
  },
  {
    text: 'Select Odd Row',
    onSelect: () => {
      this.listOfCurrentPageDataCompusary.forEach((data, index) =>
        this.updateCheckedSetCompusary(data.SUBJECT_CODE, index % 2 !== 0)
      );
      this.refreshCheckedStatusCompusary();
    },
  },
  {
    text: 'Select Even Row',
    onSelect: () => {
      this.listOfCurrentPageDataCompusary.forEach((data, index) =>
        this.updateCheckedSetCompusary(data.SUBJECT_CODE, index % 2 === 0)
      );
      this.refreshCheckedStatusCompusary();
    },
  },
];
/// Third

listOfSelectionThird = [
  {
    text: 'Select All Row',
    onSelect: () => {
      this.onAllCheckedThird(true);
    },
  },
  {
    text: 'Select Odd Row',
    onSelect: () => {
      this.listOfCurrentPageDataThird.forEach((data, index) =>
        this.updateCheckedSetThird(data.SUBJECT_CODE, index % 2 !== 0)
      );
      this.refreshCheckedStatusThird();
    },
  },
  {
    text: 'Select Even Row',
    onSelect: () => {
      this.listOfCurrentPageDataThird.forEach((data, index) =>
        this.updateCheckedSetThird(data.SUBJECT_CODE, index % 2 === 0)
      );
      this.refreshCheckedStatusThird();
    },
  },
];

/// Fourth

listOfSelectionFourth = [
  {
    text: 'Select All Row',
    onSelect: () => {
      this.onAllCheckedFourth(true);
    },
  },
  {
    text: 'Select Odd Row',
    onSelect: () => {
      this.listOfCurrentPageDataFourth.forEach((data, index) =>
        this.updateCheckedSetFourth(data.SUBJECT_CODE, index % 2 !== 0)
      );
      this.refreshCheckedStatusFourth();
    },
  },
  {
    text: 'Select Even Row',
    onSelect: () => {
      this.listOfCurrentPageDataFourth.forEach((data, index) =>
        this.updateCheckedSetFourth(data.SUBJECT_CODE, index % 2 === 0)
      );
      this.refreshCheckedStatusFourth();
    },
  },
];
//// Third


checkedThird = false;
setOfCheckedIdThird = new Set<string>();
indeterminateThird = false;
listOfCurrentPageDataThird: readonly ItemData[] = [];
listOfDataThird: ItemData[] = [];
checkboxDisableThird: boolean = true;

SubjectListThird:any[] = [];


//// Fourth


checkedFourth = false;
setOfCheckedIdFourth = new Set<string>();
indeterminateFourth = false;
listOfCurrentPageDataFourth: readonly ItemData[] = [];
listOfDataFourth: ItemData[] = [];
checkboxDisableFourth: boolean = true;

SubjectListFourth:any[] = [];

setOfCheckedIdCompusary = new Set<string>();
indeterminateCompusary = false;
listOfCurrentPageDataCompusary: readonly ItemData[] = [];
listOfDataCompusary: ItemData[] = [];
allMenu: any[] = [];
checkboxDisableCompusary: boolean = true;
SubjectListCompusary:any[] = [];


  organizationList = JSON.parse(localStorage.getItem('Organization')!);
  campusList = JSON.parse(localStorage.getItem('CampusList')!);
  organizationCode = this.organizationList[0].CODE;
  organizationName = this.organizationList[0].NAME;
  campusCode = this.campusList[0].CODE;
  classList = JSON.parse(localStorage.getItem('classList')!);
  groupList = JSON.parse(localStorage.getItem('groupList')!);
  versionList = JSON.parse(localStorage.getItem('versionList')!);
  sessionList = JSON.parse(localStorage.getItem('sessionList')!);
  shiftList = JSON.parse(localStorage.getItem('shiftList')!);
  classCode = this.classList[0].CODE;
  userCode:any = localStorage.getItem('userCode');
  private destroy$: Subject<void> = new Subject<void>();
  private unsubscribe: Subscription[] = [];
  commonForm: FormGroup;
  isSearchLoading=false;
  isVersionVisible: boolean = false;
  isSemesterVisible: boolean = false;
  isSectionVisible: boolean = false;
  isYearVisible: boolean = false;

  isSaveLoading = false;
  isSkeletonShow = false;
  nzTotalSize = 0;
  currentPage = 1;
  yearList: any[];
  semesterList: any[];
  visibilityList: any[];
  sectionlist: any;
  examTermList: any;
  subjecTemptList: any;



  allSubjectList:any=[];
  templateDataList:any = [];
  compulsoryArrSelectList:any = [];
  fourthArrSelectList:any = [];
  thirdArrSelectList:any = [];


  subjectTemplateAssign: SubjectTemplateAssign = new SubjectTemplateAssign();

  studentSearchParameter: StudentSearchParameter = new StudentSearchParameter();

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private globalService: GlobalService,
    private resultService: ResultService,
    private changeDetect: ChangeDetectorRef)

    {

      this.isVersionVisible = globalService.isVisible("VERSION",'');
;

      this.commonForm = this.fb.group({
        GROUP_NAME: [null, [Validators.required]],
        CLASS_NAME: [null, [Validators.required]],
        VERSION_NAME: [null, [Validators.required]],
        SESSION_NAME: [null, [Validators.required]],
        YEAR_NAME: [null, [Validators.required]],
        SEMESTER_NAME: [null, [Validators.required]],
        SECTION_NAME: [null, [Validators.required]],
        SHIFT_CODE: [null, [Validators.required]],
        SUBJECT_TEMPLATE_ID: ['',],
        SEARCH_1: ['', ],
        SEARCH_2: ['', ],
        SEARCH_3: ['', ],
        SEARCH_4: ['', ],


      });
      this.getAllSubjectList();
      this.subjectTemplateList();


    }
    ngOnInit(): void {
     this.VersionVisibility();
    }




    get commonFormControl() {
      return this.commonForm.controls;
    }

    get f() {
      return this.commonForm.controls;
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
    this.commonForm.patchValue({ SECTION_NAME: this.sectionlist[0].CODE });
    this.commonForm.controls.SECTION_NAME.disable();
  }
  else{
    this.commonForm.controls.SECTION_NAME.enable();
  }
    this.changeDetect.detectChanges();
   }



   subjectTemplateList() {
      this.resultService.
      SubjectTemplateList(this.organizationCode, this.userCode)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
         this.subjecTemptList = response.ResponseObj;


         this.changeDetect.detectChanges();
       });

     }

     selectSubjectTemplate(value:any) {
      this.onAllCheckedCompusary(false);
      this.onAllCheckedThird(false);
      this.onAllCheckedFourth(false);
     if(value){

      this.getSubjectTemplateGridList(value);


      this.changeDetect.detectChanges();
    }else if(!value){
      this.onAllCheckedCompusary(false);
      this.onAllCheckedThird(false);
      this.onAllCheckedFourth(false);
    }
      this.changeDetect.detectChanges();
    }

    getSubjectTemplateGridList(subjectTemplateId:any) {

       this.resultService.getSubjectTemplateGridList(subjectTemplateId, this.organizationCode, this.userCode).subscribe((response:any) => {
        this.templateDataList = response.ResponseObj[0];


       if( this.templateDataList.COMPULSORY_SUBJECT_ID_LIST !== null){
        let SubjectListCompusary =  this.templateDataList.COMPULSORY_SUBJECT_ID_LIST.split(',');

          SubjectListCompusary.forEach((subjectCode:any) => {
            this.updateCheckedSetCompusary(subjectCode, true);
            this.changeDetect.detectChanges();
          });
          this.refreshCheckedStatusCompusary();
        }

       if( this.templateDataList.THIRD_SUBJECT_ID_LIST !== null){
        let SubjectListThird =  this.templateDataList.THIRD_SUBJECT_ID_LIST.split(',');


          SubjectListThird.forEach((subjectCode:any) => {
            this.updateCheckedSetThird(subjectCode, true);
            this.changeDetect.detectChanges();
          });
          this.refreshCheckedStatusThird();
        }

        if( this.templateDataList.FOURTH_SUBJECT_ID_LIST !== null){
          let SubjectListFourth =  this.templateDataList.FOURTH_SUBJECT_ID_LIST.split(',');

          SubjectListFourth.forEach((subjectCode:any) => {
            this.updateCheckedSetFourth(subjectCode, true);
            this.changeDetect.detectChanges();
          });
          this.refreshCheckedStatusFourth();

        }

          });


          this.changeDetect.detectChanges();
    }

     getAllSubjectList() {

      const subjsubs=  this.resultService.
      GetResultSubjectList( this.organizationCode)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response:any) => {
        this.allSubjectList = response.ResponseObj;
        this.SubjectListCompusary =   this.allSubjectList.filter((f:any)=>f.SUBJECT_DEFAULT_TYPE === 'C'  );
        this.listOfDataCompusary.push(...this.SubjectListCompusary);
        this.checkboxDisableCompusary = false;

        this.SubjectListThird =   this.allSubjectList.filter((f:any)=>f.SUBJECT_DEFAULT_TYPE === 'O'  );
        this.listOfDataThird.push(...this.SubjectListThird);
        this.checkboxDisableThird = false;

        this.SubjectListFourth =   this.allSubjectList.filter((f:any)=>f.SUBJECT_DEFAULT_TYPE === 'O'  );
        this.listOfDataFourth.push(...this.SubjectListFourth);
        this.checkboxDisableFourth = false;


    
        this.changeDetect.detectChanges();

      });
      this.unsubscribe.push(subjsubs);
    }

////compusary



onCurrentPageDataChangeCompusary($event: readonly ItemData[]): void {
  this.listOfCurrentPageDataCompusary = $event;
  this.refreshCheckedStatusCompusary();
}

refreshCheckedStatusCompusary(): void {
  this.checkedCompusary = this.listOfCurrentPageDataCompusary.every((item) =>
    this.setOfCheckedIdCompusary.has(item.SUBJECT_CODE)
  );
  this.indeterminateCompusary =
    this.listOfCurrentPageDataCompusary.some((item) =>
      this.setOfCheckedIdCompusary.has(item.SUBJECT_CODE)
    ) && !this.checkedCompusary;
}

updateCheckedSetCompusary(id: string, checked: boolean): void {
  if (checked) {
    this.setOfCheckedIdCompusary.add(id);
  } else {
    this.setOfCheckedIdCompusary.delete(id);
  }
}

onItemCheckedCompusary(id: string, checked: boolean): void {
  this.updateCheckedSetCompusary(id, checked);
  this.refreshCheckedStatusCompusary();
}

onAllCheckedCompusary(value: boolean): void {
  this.listOfCurrentPageDataCompusary.forEach((item) =>
    this.updateCheckedSetCompusary(item.SUBJECT_CODE, value)
  );
  this.refreshCheckedStatusCompusary();
}


onSearchSubjectCompusary(event: KeyboardEvent) {
  const searchValue = (event.target as HTMLInputElement).value;
  this.filterTableDataCompusary(searchValue);
}

filterTableDataCompusary(searchValue: string) {
  if (!searchValue) {
    this.checkboxDisableCompusary = false;
    this.SubjectListCompusary = [...this.listOfDataCompusary];
    this.changeDetect.detectChanges();
  } else {
    const lowerCaseSearch = searchValue.toLowerCase();


    const filteredMenu = this.listOfDataCompusary.filter((menuItem) => {
      const lowerCaseName = menuItem.SUBJECT_NAME.toLowerCase();
      return lowerCaseName.includes(lowerCaseSearch);
    });
    if (filteredMenu.length === 0) {
      this.checkboxDisableCompusary = true;
      this.changeDetect.detectChanges();
    } else {
      this.checkboxDisableCompusary = false;
      this.changeDetect.detectChanges();
    }
    this.SubjectListCompusary = filteredMenu;
  }
}

////compusary end

//// Third


onCurrentPageDataChangeThird($event: readonly ItemData[]): void {
  this.listOfCurrentPageDataThird = $event;
  this.refreshCheckedStatusThird();
  }

  refreshCheckedStatusThird(): void {
  this.checkedThird = this.listOfCurrentPageDataThird.every((item) =>
    this.setOfCheckedIdThird.has(item.SUBJECT_CODE)
  );
  this.indeterminateThird =
    this.listOfCurrentPageDataThird.some((item) =>
      this.setOfCheckedIdThird.has(item.SUBJECT_CODE)
    ) && !this.checkedThird;
  }

  updateCheckedSetThird(id: string, checked: boolean): void {
  if (checked) {
    this.setOfCheckedIdThird.add(id);
  } else {
    this.setOfCheckedIdThird.delete(id);
  }
  }

  onItemCheckedThird(id: string, checked: boolean): void {
  if(checked === true){
  const subjectCodeToRemove = id;
    this.SubjectListFourth = this.SubjectListFourth.filter(subject => {
      return subject.SUBJECT_CODE !== subjectCodeToRemove;
    });
    this.listOfDataFourth=[];
    this.listOfDataFourth.push(...this.SubjectListFourth);
    this.changeDetect.detectChanges();
  }
  else if(checked === false){

  this.listOfDataFourth=[];
  let filterlist =   this.SubjectListThird.filter((f:any)=>f.SUBJECT_CODE === id  );

  this.SubjectListFourth.push(filterlist[0]);


  this.SubjectListFourth = this.SubjectListFourth.filter(subject => {
    return subject.SUBJECT_CODE;
  });
  this.changeDetect.detectChanges();
  this.listOfDataFourth.push(...this.SubjectListFourth);
  this.changeDetect.detectChanges();


  }
  this.changeDetect.detectChanges();

  this.updateCheckedSetThird(id, checked);
  this.refreshCheckedStatusThird();
  }

  onAllCheckedThird(value: boolean): void {
  this.listOfCurrentPageDataThird.forEach((item) =>
    this.updateCheckedSetThird(item.SUBJECT_CODE, value)
  );
  this.refreshCheckedStatusThird();
  }


  onSearchSubjectThird(event: KeyboardEvent) {
  const searchValue = (event.target as HTMLInputElement).value;

  this.filterTableDataThird(searchValue);
  }

  filterTableDataThird(searchValue: string) {
  if (!searchValue) {
    this.checkboxDisableThird = false;
    this.SubjectListThird = [...this.listOfDataThird];
    this.changeDetect.detectChanges();
  } else {
    const lowerCaseSearch = searchValue.toLowerCase();


    const filteredMenu = this.listOfDataThird.filter((menuItem) => {
      const lowerCaseName = menuItem.SUBJECT_NAME.toLowerCase();
      return lowerCaseName.includes(lowerCaseSearch);
    });
    if (filteredMenu.length === 0) {
      this.checkboxDisableThird = true;
      this.changeDetect.detectChanges();
    } else {
      this.checkboxDisableThird = false;
      this.changeDetect.detectChanges();
    }
    this.SubjectListThird = filteredMenu;
  }
  }

  //// Third end


  //// Fourth

  onCurrentPageDataChangeFourth($event: readonly ItemData[]): void {
  this.listOfCurrentPageDataFourth = $event;
  this.refreshCheckedStatusFourth();
  }

  refreshCheckedStatusFourth(): void {
  this.checkedFourth = this.listOfCurrentPageDataFourth.every((item) =>
    this.setOfCheckedIdFourth.has(item.SUBJECT_CODE)
  );
  this.indeterminateFourth =
    this.listOfCurrentPageDataFourth.some((item) =>
      this.setOfCheckedIdFourth.has(item.SUBJECT_CODE)
    ) && !this.checkedFourth;
  }

  updateCheckedSetFourth(id: string, checked: boolean): void {
  if (checked) {
    this.setOfCheckedIdFourth.add(id);
  } else {
    this.setOfCheckedIdFourth.delete(id);
  }
  }

  onItemCheckedFourth(id: string, checked: boolean): void {
  this.updateCheckedSetFourth(id, checked);
  this.refreshCheckedStatusFourth();
  }

  onAllCheckedFourth(value: boolean): void {
  this.listOfCurrentPageDataFourth.forEach((item) =>
    this.updateCheckedSetFourth(item.SUBJECT_CODE, value)
  );
  this.refreshCheckedStatusFourth();
  }


  onSearchSubjectFourth(event: KeyboardEvent) {
  const searchValue = (event.target as HTMLInputElement).value;
  this.filterTableDataFourth(searchValue);
  }

  filterTableDataFourth(searchValue: string) {
  if (!searchValue) {
    this.checkboxDisableFourth = false;
    this.SubjectListFourth = [...this.listOfDataFourth];
    this.changeDetect.detectChanges();
  } else {
    const lowerCaseSearch = searchValue.toLowerCase();


    const filteredMenu = this.listOfDataFourth.filter((menuItem) => {
      const lowerCaseName = menuItem.SUBJECT_NAME.toLowerCase();
      return lowerCaseName.includes(lowerCaseSearch);
    });
    if (filteredMenu.length === 0) {
      this.checkboxDisableFourth = true;
      this.changeDetect.detectChanges();
    } else {
      this.checkboxDisableFourth = false;
      this.changeDetect.detectChanges();
    }
    this.SubjectListFourth = filteredMenu;
  }
  }


  pageIndex(value: number) {
    this.currentPage = value;
    this.getStudent();
   // this.refreshCheckedStatusStudent();
  }
  // onCurrentPageDataChangeStudent(value: number) {
  //   this.currentPage = value;
  //   this.getStudent();
  //  // this.refreshCheckedStatusStudent();
  // }

   getStudent(){
 
    if(this.commonForm.valid){

    this.isSearchLoading = true;
    this.searchDatastudentlist = [];
    this.studentSearchParameter.organizationCode = this.organizationCode;
    this.studentSearchParameter.campusCode = this.campusCode;
    this.studentSearchParameter.M_WhereString= ' and 1=1 ';
    this.studentSearchParameter.PageNumber= this.currentPage;

    if(this.commonForm.value.SEARCH){
      this.studentSearchParameter.M_WhereString = this.studentSearchParameter.M_WhereString +
      ` and (STUDENT_CODE LIKE '%${this.commonForm.value.SEARCH}%' OR STUDENT_NAME LIKE '%${this.commonForm.value.SEARCH}%')`
    }
    if (this.commonForm.value.GROUP_NAME)
      {
        this.studentSearchParameter.M_WhereString = this.studentSearchParameter.M_WhereString +' and GROUP_CODE =' + this.commonForm.value.GROUP_NAME;
      }
    if (this.commonForm.value.CLASS_NAME)
      {
        this.studentSearchParameter.M_WhereString = this.studentSearchParameter.M_WhereString +' and CLASS_CODE =' + this.commonForm.value.CLASS_NAME;
      }
    if (this.commonForm.value.SECTION_NAME)
      {
        this.studentSearchParameter.M_WhereString = this.studentSearchParameter.M_WhereString +' and SECTION_CODE =' + this.commonForm.value.SECTION_NAME;
      }
    if (this.commonForm.value.VERSION_NAME)
      {
        this.studentSearchParameter.M_WhereString = this.studentSearchParameter.M_WhereString +' and VERSION_CODE =' + this.commonForm.value.VERSION_NAME;
      }
    if (this.commonForm.value.SESSION_NAME)
      {
        this.studentSearchParameter.M_WhereString = this.studentSearchParameter.M_WhereString +' and START_SESSION_CODE =' + this.commonForm.value.SESSION_NAME;
      }

    if (this.commonForm.value.YEAR_NAME)
      {
        this.studentSearchParameter.M_WhereString = this.studentSearchParameter.M_WhereString +' and YEAR_CODE =' + this.commonForm.value.YEAR_NAME;
      }
    if (this.commonForm.value.SEMESTER_NAME)
      {
        this.studentSearchParameter.M_WhereString = this.studentSearchParameter.M_WhereString +' and SEMESTER_CODE =' + this.commonForm.value.SEMESTER_NAME;
      }
    if (this.commonForm.value.SHIFT_NAME)
      {
        this.studentSearchParameter.M_WhereString = this.studentSearchParameter.M_WhereString +' and SHIFT_CODE =' + this.commonForm.value.SHIFT_NAME;
      }


console.log('this.studentSearchParameter',this.studentSearchParameter);


    this.resultService.
    getStudentSearchList(this.studentSearchParameter.organizationCode,
      this.studentSearchParameter.campusCode,
      this.studentSearchParameter.M_WhereString,
      this.studentSearchParameter.PageNumber)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if(data.ResponseObj.length > 0){
          this.searchDatastudentlist = data.ResponseObj;
          this.nzTotalSize = this.searchDatastudentlist[0].TR;
          this.listOfDataStudent.push(...this.searchDatastudentlist);
console.log('this.listOfDataStudent',this.listOfDataStudent);

          this.isSkeletonShow = false;
          this.isSearchLoading = false;
          this.changeDetect.detectChanges();
        }else{
          this.modal.error({
            nzTitle: 'error!',
            nzContent:'Student not found this information...',
          });
          this.isSkeletonShow = false;
          this.isSearchLoading = false;
          this.changeDetect.detectChanges();
        }
      });
    }else{
      this.isSaveLoading = false;
        Object.values(this.commonForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }

    }

///Student






refreshCheckedStatusStudent(): void {
  this.checkedStudent = this.listOfCurrentPageDataStudent.every((item) =>
    this.setOfCheckedIdStudent.has(item.SC)
  );
  this.indeterminateStudent =
    this.listOfCurrentPageDataStudent.some((item) =>
      this.setOfCheckedIdStudent.has(item.SC)
    ) && !this.checkedStudent;
}

updateCheckedSetStudent(id: string, checked: boolean): void {
  if (checked) {

    this.setOfCheckedIdStudent.add(id);
  } else {
    this.setOfCheckedIdStudent.delete(id);
  }
}

onItemCheckedStudent(id: string, checked: boolean): void {
  this.updateCheckedSetStudent(id, checked);
  this.refreshCheckedStatusStudent();
}

onAllCheckedStudent(value: boolean): void {
  this.listOfCurrentPageDataStudent.forEach((item) =>
    this.updateCheckedSetStudent(item.SC, value)
  );
  this.refreshCheckedStatusStudent();
}


onSearchSubjectStudent(event: KeyboardEvent) {
  const searchValue = (event.target as HTMLInputElement).value;
  this.filterTableDataStudent(searchValue);
}

filterTableDataStudent(searchValue: string) {
  if (!searchValue) {
    this.checkboxDisableStudent = false;
    this.searchDatastudentlist = [...this.listOfDataStudent];
    this.changeDetect.detectChanges();
  } else {
    const lowerCaseSearch = searchValue.toLowerCase();
    const filteredMenu = this.listOfDataStudent.filter((menuItem) => {
      const lowerCaseName = menuItem.SN.toLowerCase();
      return lowerCaseName.includes(lowerCaseSearch);
    });

    if (filteredMenu.length === 0) {
      this.checkboxDisableStudent = true;
      this.changeDetect.detectChanges();
    } else {
      this.checkboxDisableStudent = false;
      this.changeDetect.detectChanges();
    }
    this.searchDatastudentlist = filteredMenu;
  }
}


prepareSave(){
    if (this.commonForm.valid ) {
    this.modal.confirm({
      nzTitle: `Are you sure `,
      nzContent: `you want to Save`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: false,
      nzOnOk: () => this.SaveSubjectTemplateAssign(),
      nzCancelText: 'No',
    });

  }else{
    this.isSaveLoading = false;
      Object.values(this.commonForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

  }

SaveSubjectTemplateAssign() {
  if(this.commonForm.valid){
    this.isSaveLoading = true;
      this.studentSearchParameter.classCode =  this.commonForm.controls["CLASS_NAME"].value;
      this.studentSearchParameter.groupCode =  this.commonForm.controls["GROUP_NAME"].value;
      this.studentSearchParameter.versionCode =  this.commonForm.controls["VERSION_NAME"].value;
      this.studentSearchParameter.startsessionCode =  this.commonForm.controls["SESSION_NAME"].value;
      this.studentSearchParameter.yearCode =  this.commonForm.controls["YEAR_NAME"].value;
      this.studentSearchParameter.semesterCode =  this.commonForm.controls["SEMESTER_NAME"].value;
      this.studentSearchParameter.sectionCode =  this.commonForm.controls["SECTION_NAME"].value;
      this.studentSearchParameter.shiftCode =  this.commonForm.controls["SHIFT_CODE"].value;

      this.subjectTemplateAssign.STUDENT_CODE = [];
      this.subjectTemplateAssign.SUBJECT_CODE = [];
      this.subjectTemplateAssign.FOURTH_SUBJECT_CODE = [];



      this.subjectTemplateAssign.STUDENT_CODE = this.listOfDataStudent
      .filter((data) => this.setOfCheckedIdStudent.has(data.SC))
     .map((m: any) => m.SC);

     this.subjectTemplateAssign.SUBJECT_COMPUSARY = this.listOfDataCompusary
     .filter((data) => this.setOfCheckedIdCompusary.has(data.SUBJECT_CODE))
    .map((m: any) => m.SUBJECT_CODE);

    this.subjectTemplateAssign.SUBJECT_THIRD = this.listOfDataThird
    .filter((data) => this.setOfCheckedIdThird.has(data.SUBJECT_CODE))
   .map((m: any) => m.SUBJECT_CODE);

   for (let i = 0; i <  this.subjectTemplateAssign.SUBJECT_COMPUSARY.length; i++) {
    // Pushing elements from both arrays at the same index
    this.subjectTemplateAssign.SUBJECT_CODE.push( this.subjectTemplateAssign.SUBJECT_COMPUSARY[i]);
   }

for (let i = 0; i <  this.subjectTemplateAssign.SUBJECT_THIRD.length; i++) {
  // Pushing elements from both arrays at the same index
  this.subjectTemplateAssign.SUBJECT_CODE.push( this.subjectTemplateAssign.SUBJECT_THIRD[i]);
   }



   this.subjectTemplateAssign.FOURTH_SUBJECT_CODE = this.listOfDataFourth
   .filter((data) => this.setOfCheckedIdFourth.has(data.SUBJECT_CODE))
  .map((m: any) => m.SUBJECT_CODE);
    console.log(' this.subjectTemplateAssign', this.subjectTemplateAssign);



      this.subjectTemplateAssign.PROCESS_ID = 0;
      this.subjectTemplateAssign.USER_NAME = this.userCode;
      this.subjectTemplateAssign.ORG_CODE = this.organizationCode;
      this.subjectTemplateAssign.CAMPUS_CODE = this.campusCode;
      this.subjectTemplateAssign.CLASS_CODE = this.studentSearchParameter.classCode;
      this.subjectTemplateAssign.GROUP_CODE = this.studentSearchParameter.groupCode;
      this.subjectTemplateAssign.SECTION_CODE = null ? '' : this.studentSearchParameter.sectionCode;
      this.subjectTemplateAssign.SHIFT_CODE = this.studentSearchParameter.shiftCode;
      this.subjectTemplateAssign.VERSION_CODE = this.studentSearchParameter.versionCode;
      this.subjectTemplateAssign.SESSION_CODE = null ? '' : this.studentSearchParameter.startsessionCode;
      this.subjectTemplateAssign.YEAR_CODE = null ? '' : this.studentSearchParameter.yearCode;
      this.subjectTemplateAssign.SEMESTER_CODE = null ? '' : this.studentSearchParameter.semesterCode;

      if (this.subjectTemplateAssign.STUDENT_CODE.length !== 0){
        this.modal.confirm({
          nzTitle: `Confirmation`,
          nzContent: `<b style="color: red;">Are you sure you want to assign?</b>`,
          nzOkText: 'Yes',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () => {
        this.resultService.
        AssignSubjectTemplate(this.subjectTemplateAssign)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response:any) => {
          if (response.StatusCode === 1) {
        this.onAllCheckedCompusary(false);
        this.onAllCheckedThird(false);
        this.onAllCheckedFourth(false);
        this.isSaveLoading = false;
       this.changeDetect.detectChanges();
        this.modal.success({
          nzTitle: 'success!',
          nzContent: response.Message,
        });
          } else {
            this.modal.error({
              nzTitle: 'error!',
              nzContent:response.Message,
            });
          }

        });
       },
          nzCancelText: 'No',
        });
        this.isSaveLoading = false;
      }else{
        this.isSaveLoading=false;
        this.modal.warning({
          nzTitle: 'warning!',
          nzContent:'Please select at least one student',
        });
      }

}else{
  this.isSaveLoading = false;
    Object.values(this.commonForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
}


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
 }
}

