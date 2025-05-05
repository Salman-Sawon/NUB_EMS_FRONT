import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SubjectTemplateMaster } from '../../models/subject-template-master';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ResultService } from '../../services/result.service';
interface ItemData {
  MENU_ITEM_ID: number;
  SUBJECT_CODE: string;
  SUBJECT_NAME: string;
  PARENT_MENU_ITEM_ID: number;
  MENU_DESCRIPTION: string;
  MENU_URL: string;
}
@Component({
  selector: 'app-subject-template-entry',
  templateUrl: './subject-template-entry.component.html',
  styleUrl: './subject-template-entry.component.scss'
})
export class SubjectTemplateEntryComponent implements OnInit, OnDestroy{


  SubjectListCompusary:any[] = [];

  


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











private destroy$: Subject<void> = new Subject<void>();
  userCode:any = localStorage.getItem('userCode');
  organizationList = JSON.parse(localStorage.getItem("Organization")!);
  organizationCode = this.organizationList[0].CODE;
  SubjectTempForm: FormGroup;
  private unsubscribe: Subscription[] = [];
  subjectTemplateMaster: SubjectTemplateMaster = new SubjectTemplateMaster();
  isSaveLoading = false;
 
//// Compusary 
 
  setOfCheckedIdCompusary = new Set<string>();
  indeterminateCompusary = false;
  listOfCurrentPageDataCompusary: readonly ItemData[] = [];
  listOfDataCompusary: ItemData[] = [];
 // allMenu: any[] = [];
  checkboxDisableCompusary: boolean = true;

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

//// common 
  subjecTemptList:any;

allSubjectList:any=[];
  templateDataList:any = [];
  compulsoryArrSelectList:any = [];
  fourthArrSelectList:any = [];
  thirdArrSelectList:any = [];

  

  templatebtn:string='Create Template'

  constructor(private i18n: NzI18nService,
    private unfb: UntypedFormBuilder,
    private modal: NzModalService,
    private resultService: ResultService,
   
    private changeDetect: ChangeDetectorRef
  ) {
    this.i18n.setLocale(en_US);
    this.SubjectTempForm = this.unfb.group({
      SUBJECT_TEMPLATE_NAME:[, [ Validators.required]],
      SUBJECT_TEMPLATE_ID:[, []],
      SEARCH_1:[, []],
      SEARCH_2:[, [ ]],
      SEARCH_3:[, [ ]],
    });
     this.subjectTemplateList();
   
     this.subjectTemplateMaster.RowStatus = 1;
     this.subjectTemplateMaster.SUBJECT_TEMPLATE_ID = 0;
   }



   get registerFormControl() {
    return this.SubjectTempForm.controls;
  }
  get f() {
    return this.SubjectTempForm.controls;
  }

  ngOnInit(): void {
    //this.VersionVisibility();
   }


  subjectTemplateList() {
    this.resultService
    .SubjectTemplateList(this.organizationCode, this.userCode)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      this.subjecTemptList = response.ResponseObj;
      this.getAllSubjectList();
      this.changeDetect.detectChanges();
    })
  }



  selectSubjectTemplate(value:any) {
    this.onAllCheckedCompusary(false);
    this.onAllCheckedThird(false);
    this.onAllCheckedFourth(false);
   if(value){

    this.getSubjectTemplateGridList(value);
   // this.getThirdSubjectTemplateGridList(value);
    //this.getFourthSubjectTemplateGridList(value);
    this.subjectTemplateMaster.SUBJECT_TEMPLATE_ID =  this.SubjectTempForm.controls["SUBJECT_TEMPLATE_ID"].value;

   let data = this.subjecTemptList.filter((f:any)=>f.SUBJECT_TEMPLATE_ID === value)[0].COURSE_OUTLINE_TEMPLATE_DESC;
    this.SubjectTempForm.controls["SUBJECT_TEMPLATE_NAME"].setValue(data);
    this.changeDetect.detectChanges();
  }else if(!value){
    this.onAllCheckedCompusary(false);
    this.onAllCheckedThird(false);
    this.onAllCheckedFourth(false);
    this.subjectTemplateMaster.RowStatus = 1;
    this.subjectTemplateMaster.SUBJECT_TEMPLATE_ID=0;
    this.templatebtn='Create Template'
    this.SubjectTempForm.controls["SUBJECT_TEMPLATE_NAME"].setValue(' ');

  }
    this.changeDetect.detectChanges();
  }



  getSubjectTemplateGridList(subjectTemplateId:any) {
 
    this.resultService
    .getSubjectTemplateGridList(subjectTemplateId, this.organizationCode, this.userCode)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:any) => {
      this.templateDataList = response.ResponseObj[0];
     this.subjectTemplateMaster.RowStatus = 2;
     this.templatebtn='Update Template'
   
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
          this.onItemCheckedThird(subjectCode,true);
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
 
    this.resultService
    .GetResultSubjectList( this.organizationCode)
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
   
  }



forthSubjectLoad(){
//alert('ff')
  //this.SubjectListFourth = this.allSubjectList.filter((f:any)=>f.SUBJECT_DEFAULT_TYPE === 'O'  );
      this.listOfDataFourth.push(...this.SubjectListFourth);
      this.checkboxDisableFourth = false;


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
    this.changeDetect.detectChanges();
   this.SubjectListFourth.sort((a, b) => {
    return a.SUJBECT_SRLNO - b.SUJBECT_SRLNO;
  });
  this.changeDetect.detectChanges();
    this.listOfDataFourth=[];
    this.listOfDataFourth.push(...this.SubjectListFourth);   
    this.changeDetect.detectChanges();
}
else if(checked === false){
  this.listOfDataFourth.push(...this.SubjectListFourth); 
 
  let filterlist =   this.SubjectListThird.filter((f:any)=>f.SUBJECT_CODE === id  );

  this.SubjectListFourth.push(filterlist[0]);

 
  this.SubjectListFourth = this.SubjectListFourth.filter(subject => {
    return subject.SUBJECT_CODE;
  });
  this.changeDetect.detectChanges();

  this.SubjectListFourth.sort((a, b) => {
    return a.SUJBECT_SRLNO - b.SUJBECT_SRLNO;
  });
  this.changeDetect.detectChanges();
  this.listOfDataFourth=[];
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



Save() {

  if (this.SubjectTempForm.valid) {
   
    if (this.listOfDataCompusary.length === 0) {
      this.modal.error({
        nzTitle: 'Error!',
        nzContent: 'Please select at least one compulsory subject.',
      });
    } else {
     
      this.modal.confirm({
        nzTitle: `Confirmation`,
        nzContent: `Are you sure you want to save this template?`,
        nzOkText: 'Yes',
        nzOkType: 'primary',
        nzOkDanger: false,
        nzOnOk: () => this.saveData(),
        nzCancelText: 'No',
      });
    }
  } else {
   
    Object.values(this.SubjectTempForm.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
}




saveData() {
if(this.SubjectTempForm.valid){
 
      this.isSaveLoading = true;
      this.compulsoryArrSelectList = [];
      this.thirdArrSelectList = [];
      this.fourthArrSelectList = [];

      this.subjectTemplateMaster.COURSE_OUTLINE_TEMPLATE_DESC =  this.SubjectTempForm.controls["SUBJECT_TEMPLATE_NAME"].value;

      this.compulsoryArrSelectList = this.listOfDataCompusary
       .filter((data) => this.setOfCheckedIdCompusary.has(data.SUBJECT_CODE))
      .map((m: any) => m.SUBJECT_CODE);

      this.thirdArrSelectList = this.listOfDataThird
      .filter((data) => this.setOfCheckedIdThird.has(data.SUBJECT_CODE))
     .map((m: any) => m.SUBJECT_CODE);

     this.fourthArrSelectList = this.listOfDataFourth
     .filter((data) => this.setOfCheckedIdFourth.has(data.SUBJECT_CODE))
    .map((m: any) => m.SUBJECT_CODE);

  this.subjectTemplateMaster.COMPULSORY_SUBJECT_ID_LIST = this.compulsoryArrSelectList.join();
  this.subjectTemplateMaster.THIRD_SUBJECT_ID_LIST = this.thirdArrSelectList.join();
  this.subjectTemplateMaster.FOURTH_SUBJECT_ID_LIST = this.fourthArrSelectList.join();

  this.subjectTemplateMaster.ORG_CODE = this.organizationCode;
  this.subjectTemplateMaster.User_Name = this.userCode;
 
  this.resultService
  .saveUptDltSubjectTemplateMaster(this.subjectTemplateMaster)
  .pipe(takeUntil(this.destroy$))
.subscribe( (response:any) => {
    if (response.StatusCode === 1 && this.subjectTemplateMaster.RowStatus === 1) {
      this.subjectTemplateList();

      this.refreshCheckedStatusCompusary();
      this.refreshCheckedStatusThird();
      this.refreshCheckedStatusFourth();
      this.onAllCheckedCompusary(false);
    this.onAllCheckedThird(false);
    this.onAllCheckedFourth(false);
      this.isSaveLoading = false;
      this.subjectTemplateMaster.COURSE_OUTLINE_TEMPLATE_DESC = null;
    
      this.modal.success({
        nzTitle: 'success!',
        nzContent: response.Message,
      });

      this.SubjectTempForm.reset();
    }
    else if (response.StatusCode === 1 && this.subjectTemplateMaster.RowStatus === 2) {
      this.subjectTemplateList();
      this.refreshCheckedStatusCompusary();
      this.refreshCheckedStatusThird();
      this.refreshCheckedStatusFourth();
      this.onAllCheckedCompusary(false);
      this.onAllCheckedThird(false);
      this.onAllCheckedFourth(false);
      this.isSaveLoading = false;

      this.subjectTemplateMaster.COURSE_OUTLINE_TEMPLATE_DESC = null;
   
      this.modal.success({
        nzTitle: 'updated!',
        nzContent: response.Message,
      });
      this.SubjectTempForm.reset();
    } else {
     
      this.modal.error({
        nzTitle: 'error!',
        nzContent:response.Message,
      });
    }
  });
 
 
}else{
  this.isSaveLoading = false;
    Object.values(this.SubjectTempForm.controls).forEach((control) => {
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
