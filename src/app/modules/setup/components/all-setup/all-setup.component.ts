
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd/i18n';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/modules/auth';
import { ClassService } from 'src/app/shared-services/class.service';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { SetupService } from '../../service/setup.service';
import { AllSetupNew } from '../../models/crud/all-setup';
import { Subject, Subscription, takeUntil } from 'rxjs';
@Component({
  selector: 'app-all-setup',
  templateUrl: './all-setup.component.html',
  styleUrl: './all-setup.component.scss'
})
export class AllSetupComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private unsubscribe: Subscription[] = [];
  setUpForm: FormGroup;
  submitted = false;
  commonTableInfoList: any[];
  classList: any[];
  value_5_List: any[];
  tableDataList: any[];
  userCode:any = localStorage.getItem('userCode');
  organizationList = JSON.parse(localStorage.getItem('Organization')!);
  organizationCode = this.organizationList[0].CODE;
  VALUE_1 :string;
  VALUE_2 :string;
  VALUE_3 :string;
  VALUE_4 :string;
  VALUE_5 :string;
  VALUE_6 :string;
  VALUE_7 :string;
  VALUE_8 :string;
  VALUE_9 :string;
  VALUE_10 :string;
  IS_SHOW_VALUE_1 = false;
  IS_SHOW_VALUE_2 =false;
  IS_SHOW_VALUE_3 =false;
  IS_SHOW_VALUE_4 =false;
  IS_SHOW_VALUE_5 =false;
  IS_SHOW_VALUE_6 =false;
  IS_SHOW_VALUE_7 =false;
  IS_SHOW_VALUE_8 =false;
  IS_SHOW_VALUE_9 =false;
  IS_SHOW_VALUE_10 =false;
  IS_SHOW_NO =false;
  IS_SHOW_ACTION =false;

  IS_SHOW_VALUE_1_MODAL = false;
  IS_SHOW_VALUE_3_MODAL =false;
  IS_SHOW_VALUE_4_MODAL =false;
  IS_SHOW_VALUE_5_MODAL =false;
  IS_SHOW_VALUE_6_MODAL =false;
  IS_SHOW_VALUE_7_MODAL =false;
  IS_SHOW_VALUE_8_MODAL =false;
  IS_SHOW_VALUE_9_MODAL =false;
  IS_SHOW_VALUE_10_MODAL =false;

  addDynamicBtn :string;
  addDynamicBtnShow =false;
  VALUE_1_LABEL : string;
  VALUE_1_PLACEHOLDER: string;
  VALUE_1_ERRORTEXT:string;




  VALUE_3_LABEL : string;
  VALUE_3_PLACEHOLDER: string;
  VALUE_3_ERRORTEXT:string;

  VALUE_4_LABEL : string;
  VALUE_4_PLACEHOLDER: string;
  VALUE_4_ERRORTEXT:string;


  VALUE_5_LABEL : string;
  VALUE_5_PLACEHOLDER: string;
  VALUE_5_ERRORTEXT:string;

  VALUE_6_LABEL = "Class Name";
  VALUE_6_PLACEHOLDER = "Select class";
  VALUE_6_ERRORTEXT = "Please select class";

  VALUE_7_LABEL = "Unique Code(2 digit)";
  VALUE_7_PLACEHOLDER = "Enter unique code";
  VALUE_7_ERRORTEXT = "Please enter unique code";

  VALUE_9_LABEL = "Status";
  VALUE_9_PLACEHOLDER = "Select status";
  VALUE_9_ERRORTEXT = "Please select status";

  VALUE_10_LABEL = "Visibility Key";
  VALUE_10_PLACEHOLDER = "Select Visibility Key";
  VALUE_10_ERRORTEXT = "Please select visibility key";
  allSetUpNew : AllSetupNew = new AllSetupNew();
  isVisible = false;
  validateForm!: UntypedFormGroup;

  btnDialog : string;
  addDynamicTitle:string;
  isUpdate = false;
constructor(private fb: FormBuilder,
  private globalService: GlobalService,
  private setUpService: SetupService,
  private cdr: ChangeDetectorRef,
  private unfb: UntypedFormBuilder,
  private i18n: NzI18nService,
  private authService: AuthService,
  private classService: ClassService,
  private modal: NzModalService,
  ) {
  this.setUpForm = this.fb.group({
    SETUP_OPTION: [null,Validators.required],
  });
  this.validateForm = this.unfb.group({
    VALUE_1:[null],
    VALUE_2:[null],
    VALUE_3:[null],
    VALUE_4:[null],
    VALUE_5:[null],
    VALUE_6:[null],
    VALUE_7:[null],
    VALUE_8:[null],
    VALUE_9:[null],
    VALUE_10:[null],
  });
  this.loadCommonTableInfoList();
  this.useEnglish();
}
useEnglish(): void {
  this.i18n.setLocale(en_US);
}
get commonFormControl() {
  return this.setUpForm.controls;
}
ngOnInit(): void {

}
loadCommonTableInfoList() {
  this.globalService.GetSetUpInfoList()
  .pipe(takeUntil(this.destroy$))
  .subscribe((response: any) => {
    this.commonTableInfoList = response.ResponseObj;
    this.setUpForm.controls["SETUP_OPTION"].setValue(this.commonTableInfoList[0].ID);
    this.DynamicBtnPrepare(this.commonTableInfoList[0].ID);
    this.cdr.detectChanges();
  });
}
DynamicBtnPrepare(value:any){
if(this.setUpForm.controls["SETUP_OPTION"].value == 1){
  this.addDynamicBtn = "Add New Campus";
  this.addDynamicTitle = "Add New Campus";
  this.addDynamicBtnShow = true;
}
if(this.setUpForm.controls["SETUP_OPTION"].value == 2){
  this.addDynamicBtn = "Add New Group";
  this.addDynamicTitle = "Add New Group";
  this.addDynamicBtnShow = true;

}
if(this.setUpForm.controls["SETUP_OPTION"].value == 3){
  this.addDynamicBtn = "Add New Class";
  this.addDynamicTitle = "Add New Class";
  this.addDynamicBtnShow = true;

}
if(this.setUpForm.controls["SETUP_OPTION"].value == 4){
  this.addDynamicBtn = "Add New Section";
  this.addDynamicTitle = "Add New Section";
  this.addDynamicBtnShow = true;

}
if(this.setUpForm.controls["SETUP_OPTION"].value == 5){
  this.addDynamicBtn = "Add New Version";
  this.addDynamicTitle = "Add New Version";
  this.addDynamicBtnShow = true;

}
if(this.setUpForm.controls["SETUP_OPTION"].value == 6){
  this.addDynamicBtn = "Add New Shift";
  this.addDynamicTitle = "Add New Shift";
  this.addDynamicBtnShow = true;

}
if(this.setUpForm.controls["SETUP_OPTION"].value == 7){
  this.addDynamicBtn = "Add New Year";
  this.addDynamicTitle = "Add New Year";
  this.addDynamicBtnShow = true;

}
if(this.setUpForm.controls["SETUP_OPTION"].value == 8){
  this.addDynamicBtn = "Add New Semester";
  this.addDynamicTitle = "Add New Semester";
  this.addDynamicBtnShow = true;

}

if(this.setUpForm.controls["SETUP_OPTION"].value == 9){
  this.addDynamicBtn = "Add New Year Class Map";
  this.addDynamicTitle = "Add New Year Class Map";
  this.addDynamicBtnShow = true;

}

if(this.setUpForm.controls["SETUP_OPTION"].value == 10){
  this.addDynamicBtn = "Add New Semester Class Map";
  this.addDynamicTitle = "Add New Semester Class Map";
  this.addDynamicBtnShow = true;

}

if(this.setUpForm.controls["SETUP_OPTION"].value == 11){
  this.addDynamicBtn = "Add New Visibility";
  this.addDynamicTitle = "Add New Visibility";
  this.addDynamicBtnShow = true;

}
if(this.setUpForm.controls["SETUP_OPTION"].value == 12){
  this.addDynamicBtn = "Add New Religion";
  this.addDynamicTitle = "Add New Religion";
  this.addDynamicBtnShow = true;

}
if(this.setUpForm.controls["SETUP_OPTION"].value == 13){
  this.addDynamicBtn = "Add New Nationality";
  this.addDynamicTitle = "Add New Nationality";
  this.addDynamicBtnShow = true;

}
if(this.setUpForm.controls["SETUP_OPTION"].value == 14){
  this.addDynamicBtn = "Add New Blood Group";
  this.addDynamicTitle = "Add New Blood Group";
  this.addDynamicBtnShow = true;

}
if(this.setUpForm.controls["SETUP_OPTION"].value == 15){
  this.addDynamicBtn = "Add New Gender";
  this.addDynamicTitle = "Add New Gender";
  this.addDynamicBtnShow = true;

}
}
DynamicEditBtnPrepare(value:any){
  if(this.setUpForm.controls["SETUP_OPTION"].value == 1){
    this.addDynamicTitle = "Edit Campus";
    this.addDynamicBtnShow = true;
  }
  if(this.setUpForm.controls["SETUP_OPTION"].value == 2){
    this.addDynamicTitle = "Edit Group";
    this.addDynamicBtnShow = true;

  }
  if(this.setUpForm.controls["SETUP_OPTION"].value == 3){
    this.addDynamicTitle = "Edit Class";
    this.addDynamicBtnShow = true;

  }
  if(this.setUpForm.controls["SETUP_OPTION"].value == 4){
    this.addDynamicTitle = "Edit Section";
    this.addDynamicBtnShow = true;

  }
  if(this.setUpForm.controls["SETUP_OPTION"].value == 5){
    this.addDynamicTitle = "Edit Version";
    this.addDynamicBtnShow = true;

  }
  if(this.setUpForm.controls["SETUP_OPTION"].value == 6){
    this.addDynamicTitle = "Edit Shift";
    this.addDynamicBtnShow = true;

  }
  if(this.setUpForm.controls["SETUP_OPTION"].value == 7){
    this.addDynamicTitle = "Edit Year";
    this.addDynamicBtnShow = true;

  }
  if(this.setUpForm.controls["SETUP_OPTION"].value == 8){
    this.addDynamicTitle = "Edit Semester";
    this.addDynamicBtnShow = true;

  }

  if(this.setUpForm.controls["SETUP_OPTION"].value == 9){
    this.addDynamicTitle = "Edit Year Class Map";
    this.addDynamicBtnShow = true;

  }

  if(this.setUpForm.controls["SETUP_OPTION"].value == 10){
    this.addDynamicTitle = "Edit Semester Class Map";
    this.addDynamicBtnShow = true;

  }
  if(this.setUpForm.controls["SETUP_OPTION"].value == 11){
    this.addDynamicTitle = "Edit Visibility";
    this.addDynamicBtnShow = true;

  }

  if(this.setUpForm.controls["SETUP_OPTION"].value == 12){
    this.addDynamicTitle = "Edit Religion";
    this.addDynamicBtnShow = true;

  }

  if(this.setUpForm.controls["SETUP_OPTION"].value == 13){
    this.addDynamicTitle = "Edit Nationality";
    this.addDynamicBtnShow = true;

  }

  if(this.setUpForm.controls["SETUP_OPTION"].value == 14){
    this.addDynamicTitle = "Edit Blood Group";
    this.addDynamicBtnShow = true;

  }

  if(this.setUpForm.controls["SETUP_OPTION"].value == 15){
    this.addDynamicTitle = "Edit Gender";
    this.addDynamicBtnShow = true;

  }
  }


LoadDataList(value: any){
  this.tableDataList = [];
  this.IS_SHOW_NO = false;
  this.IS_SHOW_VALUE_1 = false;
  this.IS_SHOW_VALUE_2 = false;
  this.IS_SHOW_VALUE_3 = false;
  this.IS_SHOW_VALUE_4 = false;
  this.IS_SHOW_VALUE_5 = false;
  this.IS_SHOW_VALUE_6 = false;
  this.IS_SHOW_VALUE_7 = false;
  this.IS_SHOW_VALUE_8 = false;
  this.IS_SHOW_VALUE_9 = false;
  this.IS_SHOW_VALUE_10 = false;
  this.IS_SHOW_VALUE_1_MODAL = false;
  this.IS_SHOW_VALUE_3_MODAL = false;
  this.IS_SHOW_VALUE_4_MODAL = false;
  this.IS_SHOW_VALUE_5_MODAL = false;
  this.IS_SHOW_VALUE_6_MODAL = false;
  this.IS_SHOW_VALUE_7_MODAL = false;
  this.IS_SHOW_VALUE_8_MODAL = false;
  this.IS_SHOW_VALUE_9_MODAL = false;
  this.IS_SHOW_VALUE_10_MODAL = false;
  this.IS_SHOW_ACTION = false;
  this.addDynamicBtnShow = false;
  if(value){
    this.prepareTable(value);
    this.DynamicBtnPrepare(value);
    this.setUpService.getAllSetupList(this.organizationCode,value)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:any) => {
      this.tableDataList = response.ResponseObj;
      this.cdr.detectChanges();
    });
  }
}

prepareTable(value: any){
  if(value == 1){
    this.VALUE_1 = "Campus Name";
    this.VALUE_3 = "Campus Head";
    this.VALUE_4 = "Address";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_VALUE_3 = true;
    this.IS_SHOW_VALUE_4 = true;
    this.IS_SHOW_ACTION = true;
  }

  if(value == 2){
    this.VALUE_1 = "Group Name";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_ACTION = true;
  }
  if(value == 3){
    this.VALUE_1 = "Class Name";
    this.VALUE_4 = "Class Name Bangla";
    this.VALUE_7 = "Unique Code";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_VALUE_4 = true;
    this.IS_SHOW_VALUE_7 = true;
    this.IS_SHOW_ACTION = true;
  }
  if(value == 4){
    this.VALUE_1 = "Section Name";
    this.VALUE_3 = "Class Name";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_VALUE_3 = true;
    this.IS_SHOW_ACTION = true;
  }
  if(value == 5){
    this.VALUE_1 = "Version Name";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_ACTION = true;
  }

  if(value == 6){
    this.VALUE_1 = "Shift Name";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_ACTION = true;
  }

  if(value == 7){
    this.VALUE_1 = "Year Name";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_ACTION = true;
  }

  if(value == 8){
    this.VALUE_1 = "Semester Name";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_ACTION = true;
  }

  if(value == 9){
    this.VALUE_1 = "Year Name";
    this.VALUE_3 = "Class Name";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_VALUE_3 = true;
    this.IS_SHOW_ACTION = true;
  }

  if(value == 10){
    this.VALUE_1 = "Semester Name";
    this.VALUE_3 = "Class Name";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_VALUE_3 = true;
    this.IS_SHOW_ACTION = true;
  }

  if(value == 11){
    this.VALUE_1 = "Visibility Key";
    this.VALUE_3 = "Class Name";
    this.VALUE_8 = "Status";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_VALUE_3 = true;
    this.IS_SHOW_VALUE_8 = true;
    this.IS_SHOW_ACTION = true;
  }

  if(value == 12){
    this.VALUE_1 = "Religion Name";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_ACTION = true;
  }

  if(value == 13){
    this.VALUE_1 = "Nationality Name";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_ACTION = true;
  }

  if(value == 14){
    this.VALUE_1 = "Blood Group Name";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_ACTION = true;
  }

  if(value == 15){
    this.VALUE_1 = "Gender Name";
    this.IS_SHOW_NO = true;
    this.IS_SHOW_VALUE_1 = true;
    this.IS_SHOW_ACTION = true;
  }

}

validateForCampus(){
  this.validateForm = this.unfb.group({
    VALUE_1:[null, [ Validators.required]],
    VALUE_2:[null,],
    VALUE_3:[null, [Validators.required]],
    VALUE_4:[null, [Validators.required]],
    VALUE_5:[null, ],
    VALUE_6:[null, ],
    VALUE_7:[null, ],
    VALUE_8:[null],
    VALUE_9:[null],
    VALUE_10:[null],
  });
}

validateForCommon(){
  this.validateForm = this.unfb.group({
    VALUE_1:[null, [ Validators.required]],
    VALUE_2:[null,],
    VALUE_3:[null, ],
    VALUE_4:[null, ],
    VALUE_5:[null, ],
    VALUE_6:[null, ],
    VALUE_7:[null, ],
    VALUE_8:[null],
    VALUE_9:[null],
    VALUE_10:[null],
  });
}

validateForClass(){
  this.validateForm = this.unfb.group({
    VALUE_1:[null, [ Validators.required]],
    VALUE_2:[null,],
    VALUE_3:[null, ],
    VALUE_4:[null, ],
    VALUE_5:[null, ],
    VALUE_6:[null, ],
    VALUE_7:[null,[Validators.required]],
    VALUE_8:[null],
    VALUE_9:[null],
    VALUE_10:[null],
  });
}

validateForSection(){
  this.validateForm = this.unfb.group({
    VALUE_1:[null, [ Validators.required]],
    VALUE_2:[null,],
    VALUE_3:[null, ],
    VALUE_4:[null, ],
    VALUE_5:[null, ],
    VALUE_6:[null,[ Validators.required] ],
    VALUE_7:[null, ],
    VALUE_8:[null],
    VALUE_9:[null],
    VALUE_10:[null],
  });
}

validateForMapper(){
  this.validateForm = this.unfb.group({
    VALUE_1:[null, ],
    VALUE_2:[null,],
    VALUE_3:[null, ],
    VALUE_4:[null, ],
    VALUE_5:[null, [ Validators.required]],
    VALUE_6:[null,[ Validators.required] ],
    VALUE_7:[null],
    VALUE_8:[null],
    VALUE_9:[null],
    VALUE_10:[null],
  });
}

validateForVisibility(){
  this.validateForm = this.unfb.group({
    VALUE_1:[null, ],
    VALUE_2:[null,],
    VALUE_3:[null, ],
    VALUE_4:[null, ],
    VALUE_5:[null, ],
    VALUE_6:[null,[ Validators.required] ],
    VALUE_7:[null],
    VALUE_8:[null],
    VALUE_9:[null,[ Validators.required]],
    VALUE_10:[null,[ Validators.required]],
  });
}



addNew(){
this.isVisible = true;
this.isUpdate = false;
this.btnDialog = "Add";
this.allSetUpNew.ROW_STATUS = 1;
this.allSetUpNew.ORG_CODE = this.organizationCode;
this.allSetUpNew.USER_CODE = this.userCode;
this.DynamicBtnPrepare(this.setUpForm.controls["SETUP_OPTION"].value);
this.prepareLabelTitle(this.setUpForm.controls["SETUP_OPTION"].value);
}
prepareLabelTitle(value: any){
if(value == 1){
this.VALUE_1_LABEL = "Campus Name";
this.VALUE_1_PLACEHOLDER = "Enter campus name";
this.VALUE_1_ERRORTEXT = "Please enter campus name";

this.VALUE_3_LABEL = "Head of Campus";
this.VALUE_3_PLACEHOLDER = "Enter head of campus";
this.VALUE_3_ERRORTEXT = "Please enter head of campus";

this.VALUE_4_LABEL = "Address";
this.VALUE_4_PLACEHOLDER = "Enter campus address";
this.VALUE_4_ERRORTEXT = "Please enter campus address";
this.IS_SHOW_VALUE_1_MODAL = true;
this.IS_SHOW_VALUE_3_MODAL = true;
this.IS_SHOW_VALUE_4_MODAL = true;

this.validateForCampus();


}
if(value == 2){
  this.VALUE_1_LABEL = "Group Name";
  this.VALUE_1_PLACEHOLDER = "Enter group name";
this.VALUE_1_ERRORTEXT = "Please enter group name";
this.IS_SHOW_VALUE_1_MODAL = true;
this.validateForCommon();
}
if(value == 3){
  this.VALUE_1_LABEL = "Class Name";
  this.VALUE_1_PLACEHOLDER = "Enter class name";
this.VALUE_1_ERRORTEXT = "Please enter class name";

this.VALUE_4_LABEL = "Class Name Bangla";
  this.VALUE_4_PLACEHOLDER = "Enter class name Bangla";
this.VALUE_4_ERRORTEXT = "Please enter class name Bangla";

this.IS_SHOW_VALUE_1_MODAL = true;
this.IS_SHOW_VALUE_4_MODAL = true;
this.IS_SHOW_VALUE_7_MODAL = true;
this.validateForCommon();


}
if(value == 4){
  this.VALUE_1_LABEL = "Section Name";
  this.VALUE_1_PLACEHOLDER = "Enter section name";
this.VALUE_1_ERRORTEXT = "Please enter section name";
this.IS_SHOW_VALUE_6_MODAL = true;
this.IS_SHOW_VALUE_1_MODAL = true;
  this.getClassList();
  this.validateForSection();
}
if(value == 5){
  this.VALUE_1_LABEL = "Version Name";
  this.VALUE_1_PLACEHOLDER = "Enter version name";
this.VALUE_1_ERRORTEXT = "Please enter version name";
this.IS_SHOW_VALUE_1_MODAL = true;
this.validateForCommon();


}
if(value == 6){
  this.VALUE_1_LABEL = "Shift Name";
  this.VALUE_1_PLACEHOLDER = "Enter shift name";
this.VALUE_1_ERRORTEXT = "Please enter shift name";
this.IS_SHOW_VALUE_1_MODAL = true;
this.validateForCommon();


}
if(value == 7){
  this.VALUE_1_LABEL = "Year Name";
  this.VALUE_1_PLACEHOLDER = "Enter year name";
this.VALUE_1_ERRORTEXT = "Please enter year name";
this.IS_SHOW_VALUE_1_MODAL = true;
this.validateForCommon();


}
if(value == 8){
  this.VALUE_1_LABEL = "Semester Name";
  this.VALUE_1_PLACEHOLDER = "Enter semester name";
  this.VALUE_1_ERRORTEXT = "Please enter semester name";
  this.IS_SHOW_VALUE_1_MODAL = true;

  this.validateForCommon();

}
if(value == 9){
this.getYearList();
this.getClassList();
this.VALUE_5_LABEL = "Year Name";
  this.VALUE_5_PLACEHOLDER = "Select year";
  this.VALUE_5_ERRORTEXT = "Please select year";
  this.IS_SHOW_VALUE_5_MODAL = true;
  this.IS_SHOW_VALUE_6_MODAL = true;
  this.validateForMapper();
}
if(value == 10){
  this.getSemesterList();
  this.getClassList();
  this.VALUE_5_LABEL = "Semester Name";
    this.VALUE_5_PLACEHOLDER = "Select semester";
    this.VALUE_5_ERRORTEXT = "Please select semester";
    this.IS_SHOW_VALUE_5_MODAL = true;
    this.IS_SHOW_VALUE_6_MODAL = true;
  this.validateForMapper();

}

if(value == 11){
    this.IS_SHOW_VALUE_10_MODAL = true;
    this.IS_SHOW_VALUE_9_MODAL = true;
    this.validateForVisibility();

}
if(value == 12){
  this.VALUE_1_LABEL = "Religion Name";
  this.VALUE_1_PLACEHOLDER = "Enter religion name";
this.VALUE_1_ERRORTEXT = "Please enter religion name";
this.IS_SHOW_VALUE_1_MODAL = true;
this.validateForCommon();


}

if(value == 13){
  this.VALUE_1_LABEL = "Nationality Name";
  this.VALUE_1_PLACEHOLDER = "Enter nationality name";
this.VALUE_1_ERRORTEXT = "Please enter nationality name";
this.IS_SHOW_VALUE_1_MODAL = true;
this.validateForCommon();


}

if(value == 14){
  this.VALUE_1_LABEL = "Blood Group Name";
  this.VALUE_1_PLACEHOLDER = "Enter blood group name";
this.VALUE_1_ERRORTEXT = "Please enter blood group name";
this.IS_SHOW_VALUE_1_MODAL = true;
this.validateForCommon();


}

if(value == 15){
  this.VALUE_1_LABEL = "Gender Name";
  this.VALUE_1_PLACEHOLDER = "Enter gender name";
this.VALUE_1_ERRORTEXT = "Please enter gender name";
this.IS_SHOW_VALUE_1_MODAL = true;
this.validateForCommon();


}

}
OnKeySelection(value:any){
  this.IS_SHOW_VALUE_6_MODAL = false;
  if(value){
    if(value == 'VERSION'|| value == 'GROUP' || value == 'SHIFT'){
      this.IS_SHOW_VALUE_6_MODAL = false;
      this.validateForm.get('VALUE_6')!.clearValidators();
      this.validateForm.get('VALUE_6')!.updateValueAndValidity();
      this.cdr.detectChanges();
    }else{
      this.getClassList();
      this.IS_SHOW_VALUE_6_MODAL = true;

    }
  }

}
edit(value:any){
this.isVisible = true;
this.isUpdate = true;
this.btnDialog = "Update";
this.DynamicEditBtnPrepare(value);
this.prepareLabelTitle(this.setUpForm.controls["SETUP_OPTION"].value);
this.allSetUpNew.ROW_STATUS = 2;
this.allSetUpNew.ORG_CODE = this.organizationCode;
this.allSetUpNew.USER_CODE = this.userCode;
this.allSetUpNew.ID = value.ID;
this.validateForm.controls["VALUE_1"].setValue(value.VALUE_1);
this.validateForm.controls["VALUE_2"].setValue(value.VALUE_2);
this.validateForm.controls["VALUE_3"].setValue(value.VALUE_3);
this.validateForm.controls["VALUE_4"].setValue(value.VALUE_4);
this.validateForm.controls["VALUE_5"].setValue(value.VALUE_5);
this.validateForm.controls["VALUE_6"].setValue(value.VALUE_6);
this.validateForm.controls["VALUE_7"].setValue(value.VALUE_7);
this.validateForm.controls["VALUE_8"].setValue(value.VALUE_8);
this.validateForm.controls["VALUE_9"].setValue(value.VALUE_9);
this.validateForm.controls["VALUE_10"].setValue(value.VALUE_10);
if(value.VALUE_10 == 'VERSION'|| value.VALUE_10 == 'GROUP' || value.VALUE_10 == 'SHIFT'){
  this.validateForm.get('VALUE_6')!.clearValidators();
  this.validateForm.get('VALUE_6')!.updateValueAndValidity();
  this.cdr.detectChanges();
}else{
   if(this.setUpForm.controls["SETUP_OPTION"].value == 11){
    this.getClassList();
    this.IS_SHOW_VALUE_6_MODAL = true;
   }
}

}


delete(data:any){
  this.allSetUpNew.ORG_CODE = this.organizationCode;
  this.allSetUpNew.USER_CODE = this.userCode;
  this.allSetUpNew.SET_UP_ID = this.setUpForm.controls['SETUP_OPTION'].value;
  this.allSetUpNew.VALUE_1 = data.VALUE_1;
  this.allSetUpNew.VALUE_2 = data.VALUE_2;
  this.allSetUpNew.VALUE_3 = data.VALUE_3;
  this.allSetUpNew.VALUE_4 = data.VALUE_4;
  this.allSetUpNew.VALUE_5 = data.VALUE_5;
  this.allSetUpNew.VALUE_6 = data.VALUE_6;
  this.allSetUpNew.VALUE_7 = data.VALUE_7;
  this.allSetUpNew.VALUE_8 = data.VALUE_8;
  this.allSetUpNew.VALUE_9 = data.VALUE_9;
  this.allSetUpNew.VALUE_10 = data.VALUE_10;
  this.allSetUpNew.VALUE_KEY = data.VALUE_KEY;
  this.allSetUpNew.ROW_STATUS = 3;
  this.allSetUpNew.ID = data.ID;
  this.modal.confirm({
    nzTitle: 'Are you sure delete this task?',
    nzContent: `<b style="color: red;">${data.VALUE_1}</b>`,
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () =>
      this.setUpService
    .crtUptDltAllSetupNew(this.allSetUpNew)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response:any) => {
       if (response.StatusCode === 1 ) {
        this.modal.success({
          nzTitle: `${data.VALUE_1}`,
          nzContent: `${response.Message}`
        });
        this.LoadDataList(this.setUpForm.controls['SETUP_OPTION'].value);
        this.cdr.detectChanges();
         }
       else{
        this.modal.error({
          nzTitle: `${data.VALUE_1}`,
          nzContent: `${response.Message}`
        });
       }
     }),
    nzCancelText: 'No'
  });
}

handleOk(): void {
  if (this.validateForm.valid) {
    this.allSetUpNew.SET_UP_ID = this.setUpForm.controls['SETUP_OPTION'].value;
    this.allSetUpNew.VALUE_1 = this.validateForm.controls["VALUE_1"].value;
    this.allSetUpNew.VALUE_2 = this.validateForm.controls["VALUE_2"].value;
    this.allSetUpNew.VALUE_3 = this.validateForm.controls["VALUE_3"].value;
    this.allSetUpNew.VALUE_4 = this.validateForm.controls["VALUE_4"].value;
    this.allSetUpNew.VALUE_5 = this.validateForm.controls["VALUE_5"].value;
    this.allSetUpNew.VALUE_6 = this.validateForm.controls["VALUE_6"].value;
    this.allSetUpNew.VALUE_7 = this.validateForm.controls["VALUE_7"].value;
    this.allSetUpNew.VALUE_8 = this.validateForm.controls["VALUE_8"].value;
    this.allSetUpNew.VALUE_9 = this.validateForm.controls["VALUE_9"].value;
    this.allSetUpNew.VALUE_10 = this.validateForm.controls["VALUE_10"].value;

    let VALUE_5: string | undefined;
    let VALUE_6: string | undefined;
    let VALUE_10: string | undefined;

    if (this.allSetUpNew.SET_UP_ID == 9 || this.allSetUpNew.SET_UP_ID == 10) {
      VALUE_5 = this.value_5_List.filter((w: any) => w.CODE == this.allSetUpNew.VALUE_5).map((m: any) => m.NAME)[0];
      VALUE_6 = this.classList.filter((w: any) => w.CLASS_CODE == this.allSetUpNew.VALUE_6).map((m: any) => m.CLASS_NAME)[0];
    }

    if (this.allSetUpNew.SET_UP_ID == 11) {
      if (this.allSetUpNew.VALUE_6) {
        VALUE_6 = this.classList.filter((w: any) => w.CLASS_CODE == this.allSetUpNew.VALUE_6).map((m: any) => m.CLASS_NAME)[0];
      } else {
        VALUE_6 = '';
      }
      let convertedString = this.allSetUpNew.VALUE_10;
      VALUE_10 = convertedString.charAt(0) + convertedString.slice(1).toLowerCase();
    }

    const confirmMessage = (content: string) => this.modal.confirm({
      nzTitle: 'Are you sure you want to ' + (this.isUpdate ? 'update' : 'save') + ' this task?',
      nzContent: `<b style="color: red;">${content}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: false,
      nzOnOk: () => this.saveSetUpInfo(this.allSetUpNew, VALUE_5, VALUE_6, VALUE_10),
      nzCancelText: 'No'
    });

    if (this.isUpdate) {
      if (this.allSetUpNew.SET_UP_ID == 9 || this.allSetUpNew.SET_UP_ID == 10) {
        confirmMessage(`${VALUE_5} and ${VALUE_6}`);
      } else if (this.allSetUpNew.SET_UP_ID == 11) {
        confirmMessage(`${VALUE_10} - ${VALUE_6}`);
      } else {
        confirmMessage(this.allSetUpNew.VALUE_1);
      }
    } else {
      if (this.allSetUpNew.SET_UP_ID == 9 || this.allSetUpNew.SET_UP_ID == 10) {
        confirmMessage(`${VALUE_5} and ${VALUE_6}`);
      } else if (this.allSetUpNew.SET_UP_ID == 11) {
        confirmMessage(`${VALUE_10} - ${VALUE_6}`);
      } else {
        confirmMessage(this.allSetUpNew.VALUE_1);
      }
    }
  } else {
    Object.values(this.validateForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

}

handleCancel(): void {
  this.validateForm.reset();
  this.isVisible = false;
}


saveSetUpInfo(data:any,VALUE_5:any,VALUE_6:any, VALUE_10:any){
  this.setUpService.crtUptDltAllSetupNew(data)
  .pipe(takeUntil(this.destroy$))
  .subscribe((response:any) => {
     if (response.StatusCode === 1 ) {

      if(data.SET_UP_ID == 9 || data.SET_UP_ID == 10){
        if(this.isUpdate){
      this.modal.success({
        nzTitle: `${VALUE_5} and ${VALUE_6}`,
        nzContent: `${VALUE_5} and ${VALUE_6} successfully map update.`
      });
    }else{
      this.modal.success({
        nzTitle: `${VALUE_5} and ${VALUE_6}`,
        nzContent: `${VALUE_5} and ${VALUE_6} successfully mapped.`
      });
    }
    }
    else if(data.SET_UP_ID == 11){
      if(this.isUpdate){
        this.modal.success({
          nzTitle: `${VALUE_10} - ${VALUE_6}`,
          nzContent: `${VALUE_10} - ${VALUE_6} successfully updated.`
        });
      }else{
        this.modal.success({
          nzTitle: `${VALUE_10} - ${VALUE_6}`,
          nzContent: `${VALUE_10} - ${VALUE_6} successfully saved.`
        });
      }

    }
    else{
      this.modal.success({
        nzTitle: `${data.VALUE_1}`,
        nzContent: `${response.Message}`
      });
    }
      // localStorage.removeItem('myData');
      this.authService.getOrganization(this.userCode);
      this.isVisible = false;
      this.LoadDataList(this.setUpForm.controls['SETUP_OPTION'].value);
      this.validateForm.reset();
      this.cdr.detectChanges();
       }
     else{
      if(data.SET_UP_ID == 9 || data.SET_UP_ID == 10){
      this.modal.error({
        nzTitle: `${VALUE_5} and ${VALUE_6}`,
        nzContent: `${VALUE_5} and ${VALUE_6} failed to map.`
      });
    }
      else if(data.SET_UP_ID == 11){
        this.modal.error({
          nzTitle: `${VALUE_10} - ${VALUE_6}`,
          nzContent: `${VALUE_10} - ${VALUE_6} can not add because already have visibility setup given class and visibility key.`
        });
      }
    else{
      this.modal.error({
        nzTitle: `${data.VALUE_1}`,
        nzContent: `${response.Message}`
      });
    }
     }
});
}





getClassList() {
  this.classList = [];
  this.classService.GetClassList(this.organizationCode)
  .pipe(takeUntil(this.destroy$))
  .subscribe((res:any) => {
    this.classList = res.ResponseObj;
    this.cdr.detectChanges();
  });
}

getYearList() {
  this.value_5_List = [];
  this.classService.GetYearList(this.organizationCode)
  .pipe(takeUntil(this.destroy$))
  .subscribe((res:any) => {
    this.value_5_List = res.ResponseObj;
    this.cdr.detectChanges();
  });
}
getSemesterList() {
  this.value_5_List = [];
   this.classService.GetSemesterList(this.organizationCode)
  .pipe(takeUntil(this.destroy$))
  .subscribe((res:any) => {
    this.value_5_List = res.ResponseObj;
    this.cdr.detectChanges();
  });
}
numberOnly (e:any) {  // Accept only alpha numerics, not special characters
    var regex = new RegExp("^[0-9.]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
