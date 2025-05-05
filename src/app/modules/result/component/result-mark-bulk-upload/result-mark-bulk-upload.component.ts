import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ResultSubjectWiseDetail } from '../../models/examResultSubjectWiseDtl';
import { TermListEntry } from '../../models/term-list-entry';
import { ResultService } from '../../services/result.service';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { AssignSubjectList } from '../../models/assign-subject-list';
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-result-mark-bulk-upload',
  templateUrl: './result-mark-bulk-upload.component.html',
  styleUrl: './result-mark-bulk-upload.component.scss'
})
export class ResultMarkBulkUploadComponent implements OnInit, OnDestroy {
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
  termList = JSON.parse(localStorage.getItem('TermGridList')!);
  ExamCaptionGridList = JSON.parse(localStorage.getItem('ExamCaptionGridList')!);
  SubjectGridList = JSON.parse(localStorage.getItem('SubjectGridList')!);
  private destroy$: Subject<void> = new Subject<void>();
  private unsubscribe: Subscription[] = [];
  commonForm: FormGroup;

  examTermList:any;
  isVersionVisible: boolean = false;
  isSemesterVisible: boolean = false;
  isSectionVisible: boolean = false;
  isYearVisible: boolean = false;
  rowList: any = [];
  isSearchLoading = false;
  isSaveLoading = false;
  yearList: any[];
  semesterList: any[];
  visibilityList: any[];
  assignsubject: any[];
  sectionlist: any;
  examCaptionList: any;
  studentCodeList: any;
  studentList: any[];
  tablestudentdataList: any[];


  termListEntrySave: TermListEntry = new TermListEntry();
  assignSubjectList: AssignSubjectList = new AssignSubjectList();
  examResultSubjectWiseDetail: ResultSubjectWiseDetail = new ResultSubjectWiseDetail();
  savebtnshow=false;
  selectedFile: File | null = null;
  originalData: any[];
  data: any[] = [];
  isDownload = false;



  constructor(
    private fb: FormBuilder,
   
    private modal: NzModalService,
    private globalService: GlobalService,
    private resultService: ResultService,
    private changeDetect: ChangeDetectorRef)

    {
    
      this.isVersionVisible = globalService.isVisible("VERSION",'');
      this.examResultSubjectWiseDetail.STUDENT_CODE = [];
     this.examResultSubjectWiseDetail.EXAM_TYPE = [];
      this.examResultSubjectWiseDetail.MARK = [];

      this.commonForm = this.fb.group({
        GROUP_NAME: [null, [Validators.required]],
        CLASS_NAME: [null, [Validators.required]],
        VERSION_NAME: [null, [Validators.required]],
        SESSION_NAME: [null, [Validators.required]],
        YEAR_NAME: [null, [Validators.required]],
        SEMESTER_NAME: [null, [Validators.required]],
        TERM_NAME: [null, [Validators.required]],
        SECTION_NAME: [null, [Validators.required]],
        SHIFT_CODE: [null, [Validators.required]],
        SUBJECT_CODE: [null, Validators.required],
        EXAM_TYPE_ID: [[]],
        MarkFormArray: new FormArray([]),
      });

    }
    ngOnInit(): void {
     this.VersionVisibility();
    }

    onTermLoad(){
      this.LoadTermList();

     }




    get commonFormControl() {
      return this.commonForm.controls;
    }

    get f() {
      return this.commonForm.controls;
    }
    get MarkFormArray() {
      return this.f.MarkFormArray as FormArray;
    }
    onSelectedClass(classCode: any) {
      this.yearList = [];
      this.semesterList = [];
      this.isYearVisible = false;
      this.isSemesterVisible = false;
      this.commonForm.controls['YEAR_NAME'].reset();
      this.commonForm.controls['SEMESTER_NAME'].reset();
      this.commonForm.controls['SEMESTER_NAME'].reset();
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
    //this.stdBulkEntry.SECTION_CODE =  this.sectionlist[0].CODE;
    this.commonForm.patchValue({ SECTION_NAME: this.sectionlist[0].CODE });
    this.commonForm.controls.SECTION_NAME.disable();
  }
  else{
    this.commonForm.controls.SECTION_NAME.enable();
  }
    this.changeDetect.detectChanges();
   }


   onSessionChange(value:any){
    this.examTermList=[];
    if(value!=null){
    if(!this.isYearVisible){
    this.commonForm.controls["TERM_NAME"].reset();
      this.LoadTermList();
    }
  }
  }
  onYearChange(value:any){
    this.examTermList=[];
    if(value!=null){
    if(!this.isSemesterVisible){
    this.commonForm.controls["TERM_NAME"].reset();
      this.LoadTermList();
    }
  }
  }
  onSemesterChange(value:any){
    this.examTermList=[];
    if(value!=null){
   
    this.commonForm.controls["TERM_NAME"].reset();
      this.LoadTermList();
   
  }
  }
//   public LoadTermList() {

//     this.termListEntrySave.ORG_CODE = this.organizationCode;
//     this.termListEntrySave.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
//     this.termListEntrySave.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
//     this.termListEntrySave.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
//     this.termListEntrySave.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
//     this.termListEntrySave.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
//     this.termListEntrySave.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;

//   this.resultService
//   .getExamTermList(this.termListEntrySave)
//   .pipe(takeUntil(this.destroy$))
//   .subscribe((response: any) => {

//     this.examTermList = response.ResponseObj;
//     this.changeDetect.detectChanges();

//   });

// }

public LoadTermList() {

  this.termListEntrySave.ORG_CODE = this.organizationCode;
  this.termListEntrySave.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
  this.termListEntrySave.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
  this.termListEntrySave.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
  this.termListEntrySave.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
  this.termListEntrySave.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
  this.termListEntrySave.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
  //this.termListEntrySave.SECTION_CODE =  this.commonForm.controls["sectionName"].value;
  this.examTermList = this.termList.filter((item: { CLASS_CODE: string; GROUP_CODE: string; ORG_CODE: string; SEMESTER_CODE: string; SESSION_CODE: string; VERSION_CODE: string; YEAR_CODE: string; }) => 
    item.CLASS_CODE ===  this.termListEntrySave.CLASS_CODE &&
  item.GROUP_CODE ===  this.termListEntrySave.GROUP_CODE && 
  item.SEMESTER_CODE ===  this.termListEntrySave.SEMESTER_CODE &&
  item.SESSION_CODE ===  this.termListEntrySave.SESSION_CODE &&
  item.VERSION_CODE ===  this.termListEntrySave.VERSION_CODE &&
  item.YEAR_CODE ===  this.termListEntrySave.YEAR_CODE
);

this.Loadsubjectassign();
if ( this.examTermList.length == 0) {
   
        this.modal.warning({
          nzTitle: 'Error!',
          nzContent: `Given information no exam term found...`,
          nzOkDanger:true
        });
      }
}

  public Loadsubjectassign() {
    this.assignSubjectList.ORG_CODE = this.organizationCode;
    this.assignSubjectList.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
    this.assignSubjectList.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
    this.assignSubjectList.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
    this.assignSubjectList.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
   this.assignSubjectList.CAMPUS_CODE =  this.campusCode;
    this.assignSubjectList.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
    this.assignSubjectList.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
  // this.resultService
  // .getsubjectassignList(this.assignSubjectList)
  // .pipe(takeUntil(this.destroy$))
  // .subscribe((response: any) => {
  //   this.assignsubject = response.ResponseObj;
  //   this.changeDetect.detectChanges();
  // });
  this.assignsubject = this.SubjectGridList.filter((item: { CLASS_CODE: string; GROUP_CODE: string; ORG_CODE: string; SEMESTER_CODE: string; SESSION_CODE: string; VERSION_CODE: string; YEAR_CODE: string; }) => 
    item.CLASS_CODE ===  this.assignSubjectList.CLASS_CODE &&
  item.GROUP_CODE ===  this.assignSubjectList.GROUP_CODE && 
  item.SEMESTER_CODE ===  this.assignSubjectList.SEMESTER_CODE &&
  item.SESSION_CODE ===  this.assignSubjectList.SESSION_CODE &&
  item.VERSION_CODE ===  this.assignSubjectList.VERSION_CODE &&
  item.YEAR_CODE ===  this.assignSubjectList.YEAR_CODE 
  
  );

  }


  onexamType(value:any) {
  if(value !== null){
    this.examResultSubjectWiseDetail.ORG_CODE = this.organizationCode;
    this.examResultSubjectWiseDetail.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
    this.examResultSubjectWiseDetail.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
    this.examResultSubjectWiseDetail.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
    this.examResultSubjectWiseDetail.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
   this.examResultSubjectWiseDetail.CAMPUS_CODE =  this.campusCode;
    this.examResultSubjectWiseDetail.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
    this.examResultSubjectWiseDetail.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;

  // this.resultService
  //   .getExamCaptionList(
  //     value,
  //     this.examResultSubjectWiseDetail.CLASS_CODE,
  //     this.examResultSubjectWiseDetail.SESSION_CODE,
  //     this.examResultSubjectWiseDetail.GROUP_CODE,
  //     this.examResultSubjectWiseDetail.VERSION_CODE,
  //     this.examResultSubjectWiseDetail.YEAR_CODE,
  //     this.examResultSubjectWiseDetail.SEMESTER_CODE,
  //     this.campusCode,
  //     this.organizationCode
  //   )
  //   .pipe(takeUntil(this.destroy$))
  //   .subscribe((response: any) => {
  //     this.examCaptionList = response.ResponseObj;
  //      if(this.examCaptionList.length>0){
  //      this.commonForm.get('EXAM_TYPE_ID')?.setValue(this.examCaptionList.map((item:any) => item.EXAM_TYPE_ID));
  //      }
  //   });


    this.examCaptionList = this.ExamCaptionGridList.filter((item: {TERM_ID:number; CLASS_CODE: string; GROUP_CODE: string; ORG_CODE: string; SEMESTER_CODE: string; SESSION_CODE: string; VERSION_CODE: string; YEAR_CODE: string; }) => 
      item.CLASS_CODE ===  this.examResultSubjectWiseDetail.CLASS_CODE &&
    item.GROUP_CODE ===  this.examResultSubjectWiseDetail.GROUP_CODE && 
    item.SEMESTER_CODE ===  this.examResultSubjectWiseDetail.SEMESTER_CODE &&
    item.SESSION_CODE ===  this.examResultSubjectWiseDetail.SESSION_CODE &&
    item.VERSION_CODE ===  this.examResultSubjectWiseDetail.VERSION_CODE &&
    item.YEAR_CODE ===  this.examResultSubjectWiseDetail.YEAR_CODE &&
    item.TERM_ID ===  value
  );




          if(this.examCaptionList.length>0){
          this.commonForm.get('EXAM_TYPE_ID')?.setValue(this.examCaptionList.map((item:any) => item.CODE));
          }



    this.changeDetect.detectChanges();
  }

  }
  filedownload() {
    this.examResultSubjectWiseDetail.STUDENT_CODE =[];
    this.studentCodeList=[];

      if(this.commonForm.valid){
        this.savebtnshow=true;
        this.isSearchLoading = true;
        this.examResultSubjectWiseDetail.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
      this.examResultSubjectWiseDetail.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
      this.examResultSubjectWiseDetail.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
      this.examResultSubjectWiseDetail.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
      this.examResultSubjectWiseDetail.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
      this.examResultSubjectWiseDetail.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
      this.examResultSubjectWiseDetail.SECTION_CODE =  this.commonForm.controls["SECTION_NAME"].value;
      this.examResultSubjectWiseDetail.SHIFT_CODE =  this.commonForm.controls["SHIFT_CODE"].value;
      this.examResultSubjectWiseDetail.TERM_ID =  this.commonForm.controls["TERM_NAME"].value;
      this.examResultSubjectWiseDetail.SUBJECT_CODE =  this.commonForm.controls["SUBJECT_CODE"].value;
        this.examResultSubjectWiseDetail.ORG_CODE = this.organizationCode;

       this.resultService
      .GetResultMarkStudentList( this.examResultSubjectWiseDetail)
      .pipe(takeUntil(this.destroy$))
        .subscribe((response:any) =>  {
        this.studentList = response.ResponseObj;
        
        this.isSearchLoading = false;
        if(this.studentList.length == 0){
         
          this.modal.warning({
            nzTitle: 'Worning!',
            nzContent: `Given information student not found...`,
            nzOkDanger:true
          });
          this.isSearchLoading = false;
          this.changeDetect.detectChanges();
        } else {
          this.isSearchLoading = false;
          const workbook = new Workbook();
          const worksheet = workbook.addWorksheet("Bulk Data");

          //  // Single Data Row
          let className = this.classList
            .filter(
              (w: any) => w.CODE == this.commonForm.controls["CLASS_NAME"].value
            )
            .map((m: any) => m.NAME);
          let groupName = this.groupList
            .filter(
              (w: any) => w.CODE == this.commonForm.controls["GROUP_NAME"].value
            )
            .map((m: any) => m.NAME);
          let versionName = this.versionList
            .filter(
              (w: any) =>
                w.CODE == this.commonForm.controls["VERSION_NAME"].value
            )
            .map((m: any) => m.NAME);

          let sessionName = this.sessionList
            .filter(
              (w: any) =>
                w.CODE == this.commonForm.controls["SESSION_NAME"].value
            )
            .map((m: any) => m.NAME);

            let yearName = this.yearList
              .filter(
                (w: any) =>
                  w.CODE == this.commonForm.controls["YEAR_NAME"].value
              )
            .map((m: any) => m.NAME);

            let semesterName = this.semesterList
            .filter(
              (w: any) =>
                w.CODE == this.commonForm.controls["SEMESTER_NAME"].value
            )
          .map((m: any) => m.NAME);

          let subjectName = this.assignsubject
          .filter(
            (w: any) =>
              w.SUBJECT_CODE == this.commonForm.controls["SUBJECT_CODE"].value
          )
        .map((m: any) => m.NAME);

          let termName = this.examTermList
            .filter((w:any) => w.ID == this.commonForm.controls["TERM_NAME"].value)
            .map((m:any) => m.NAME);
          let sectionName = this.sectionlist
            .filter(
              (w: any) =>
                w.CODE == this.commonForm.controls["SECTION_NAME"].value
            )
            .map((m: any) => m.NAME);

          let shiftName = this.shiftList
            .filter(
              (w: any) => w.CODE == this.commonForm.controls["SHIFT_CODE"].value
            )
            .map((m: any) => m.NAME);

          worksheet.addRow([
            "Organization",
            this.organizationCode + "-" + this.organizationName,
          ]);
          worksheet.addRow([
            "Class",
            this.commonForm.controls["CLASS_NAME"].value + "-" + className,
          ]);
          worksheet.addRow([
            "Group",
            this.commonForm.controls["GROUP_NAME"].value + "-" + groupName,
          ]);
          worksheet.addRow([
            "Version",
            this.commonForm.controls["VERSION_NAME"].value + "-" + versionName,
          ]);
          worksheet.addRow([
            "Session",
            this.commonForm.controls["SESSION_NAME"].value + "-" + sessionName,
          ]);
          worksheet.addRow([
            "Year",
            this.commonForm.controls["YEAR_NAME"].value + "-" + yearName,
          ]);
          worksheet.addRow([
            "Semester",
            this.commonForm.controls["SEMESTER_NAME"].value + "-" + semesterName,
          ]);
          worksheet.addRow([
            "Section",
            this.commonForm.controls["SECTION_NAME"].value + "-" + sectionName,
          ]);
          worksheet.addRow([
            "Shift",
            this.commonForm.controls["SHIFT_CODE"].value + "-" + shiftName,
          ]);
          worksheet.addRow([
            "Subject",
            this.commonForm.controls["SUBJECT_CODE"].value + "-" + subjectName,
          ]);
          worksheet.addRow([
            "Term",
            this.commonForm.controls["TERM_NAME"].value + "-" + termName,
          ]);

          // this.data.forEach((d) => {
          //   const row = worksheet.addRow(d);
          // });
          worksheet.getColumn(1).width = 15;
          worksheet.getColumn(2).width = 15;
          worksheet.getColumn(3).width = 30;
          worksheet.getColumn(4).width = 30;
          worksheet.addRow([]);




          let excelHeader: any = [];
          excelHeader.push("No");
          excelHeader.push("STUDENT CODE");
          excelHeader.push("STUDENT NAME");
          excelHeader.push("CLASS ROLL");
          for (let i = 0; i < this.examCaptionList.length; i++) {
              excelHeader.push(this.examCaptionList[i].NAME);
          }
          this.examResultSubjectWiseDetail.MARK = [];
          worksheet.addRow(excelHeader);
          for (let i = 0; i < this.studentList.length; i++) {
              let studentMarks:any = [];
              for (let j = 0; j < this.examCaptionList.length; j++) {
                  // Push marks for each exam dynamically
                  studentMarks.push(this.studentList[i]['EXAM_' + (j + 1) + '_MARK']);
              }

              this.examResultSubjectWiseDetail.MARK.push(studentMarks);

              worksheet.addRow([
                  (i+1),
                  this.studentList[i].STUDENT_CODE,
                  this.studentList[i].STUDENT_NAME,
                  this.studentList[i].CLASS_ROLL,
                  ...studentMarks
              ]);
          }

           // Generate Excel File with given name
          workbook.xlsx.writeBuffer().then((data: any) => {
            const blob = new Blob([data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            fs.saveAs(
              blob,
              className + " " + sessionName + " " + subjectName + " " + termName + " " + " Mark.xlsx"
            );
          });

        }

        this.isSearchLoading = false;
        this.changeDetect.detectChanges();
      });
       this.isSearchLoading = false;
      this.changeDetect.detectChanges();

    }else{
      this.isSearchLoading = false;
        Object.values(this.commonForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }


   }
   onFileChange(ev:any) {
    this.selectedFile = ev.target.files[0];
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>ev.target;
    if (target.files.length !== 1) throw new Error("Cannot use multiple files");
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      let AOA: any[][];
      /* save data */
      this.data = <typeof AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
      let studentResult: any[];
      this.studentList = [];
      let k = 0;
      let excelHeader: any = [];

      for (let i = 0; i < this.data.length; i++) {
        if (i == 1) {
          this.commonForm.controls["CLASS_NAME"].setValue(this.data[1][1].split("-")[0]);

        }
        if (i ==2) {
          this.commonForm.controls["GROUP_NAME"].setValue(this.data[2][1].split("-")[0]);

        }
        if (i == 3) {
          this.commonForm.controls["VERSION_NAME"].setValue(this.data[3][1].split("-")[0]);
        }
        if (i == 4) {
          this.commonForm.controls["SESSION_NAME"].setValue(this.data[4][1].split("-")[0]);
        }
        if (i == 5) {
          this.commonForm.controls["YEAR_NAME"].setValue(this.data[5][1].split("-")[0]);
          //  this.LoadTermList();

        }
        if (i == 6) {
          this.commonForm.controls["SEMESTER_NAME"].setValue(this.data[6][1].split("-")[0]);
        }

        if (i == 7) {
          this.commonForm.controls["SECTION_NAME"].setValue(this.data[7][1].split("-")[0]);
        }
        if (i == 8) {
          this.commonForm.controls["SHIFT_CODE"].setValue(this.data[8][1].split("-")[0]);

        }
        if (i == 9) {
          this.commonForm.controls["SUBJECT_CODE"].setValue(this.data[9][1].split("-")[0]);
         // let subject = +this.data[9][1].split("-")[0];

          //this.registerForm.patchValue({ subjectName:subject});
          this.changeDetect.detectChanges();
        }
        if (i == 10) {
           this.commonForm.controls["TERM_NAME"].setValue(this.data[10][1].split("-")[0]);

          let termId = +this.data[10][1].split("-")[0];

         this.commonForm.patchValue({ TERM_NAME: termId });

          this.changeDetect.detectChanges();
        }
        this.changeDetect.detectChanges();

    // if(this.registerForm.valid){


        if (i == 12) {

          excelHeader = this.data[12];
          this.changeDetect.detectChanges();

        }

        if (i >= 13) {
          studentResult = [];
          for (let j = 0; j < excelHeader.length; j++) {
            studentResult.push(this.data[i][j]);
          }

          this.studentList.push(studentResult);
          ++k;
        }
      
        
        this.changeDetect.detectChanges();
      }

      this.tablestudentdataList=this.studentList



      this.changeDetect.detectChanges();
    }
    reader.readAsBinaryString(target.files[0]);
  }
  removeFile(){
    this.selectedFile = null;
    this.data = [];
}


prepareSave(){

  if (this.commonForm.valid  ) {
   this.examResultSubjectWiseDetail.ORG_CODE = this.organizationCode;
   this.examResultSubjectWiseDetail.CAMPUS_CODE = this.campusCode;
 this.examResultSubjectWiseDetail.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
 this.examResultSubjectWiseDetail.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
 this.examResultSubjectWiseDetail.SECTION_CODE =  this.commonForm.controls["SECTION_NAME"].value;
 this.examResultSubjectWiseDetail.SHIFT_CODE =  this.commonForm.controls["SHIFT_CODE"].value;
  this.examResultSubjectWiseDetail.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
 this.examResultSubjectWiseDetail.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
 this.examResultSubjectWiseDetail.SUBJECT_CODE =  this.commonForm.controls["SUBJECT_CODE"].value;
 this.examResultSubjectWiseDetail.TERM_ID =  this.commonForm.controls["TERM_NAME"].value;





 let data: any = [];
 


data = this.studentList;


 if(data !== undefined){
 
 this.examResultSubjectWiseDetail.STUDENT_CODE = [];
 this.examResultSubjectWiseDetail.MARK = [];
 this.examResultSubjectWiseDetail.EXAM_TYPE = [];

 for (let i = 0; i < data.length; i++) {


   for(let j = 0; j < this.examCaptionList.length;j++){
  // this.examResultSubjectWiseDetail.STUDENT_CODE.push(data[i].STUDENT_CODE);
   this.examResultSubjectWiseDetail.EXAM_TYPE.push(this.examCaptionList[j].CODE);
  // this.examResultSubjectWiseDetail.MARK.push(data[i]['EXAM_'+(j+1)+'_MARK']);

  this.examResultSubjectWiseDetail.MARK.push(this.studentList[i][j+4]);
  this.examResultSubjectWiseDetail.STUDENT_CODE.push(this.studentList[i][1]);
 }
 }

this.examResultSubjectWiseDetail.User_Name = this.userCode;
this.examResultSubjectWiseDetail.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
this.examResultSubjectWiseDetail.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;



this.modal.confirm({
 nzTitle: `Confirmation `,
 nzContent: `Are you sure you want to Save`,
 nzOkText: 'Yes',
 nzOkType: 'primary',
 nzOkDanger: false,
 nzOnOk: () => this.createExamResultEntry(),
 nzCancelText: 'No',
});
}else{

  this.modal.warning({
    nzTitle: 'Error!',
    nzContent: `Given  student mark not found...`,
    nzOkDanger:true
  });

}





}else{
this.isSearchLoading = false;
 Object.values(this.commonForm.controls).forEach((control) => {
   if (control.invalid) {
     control.markAsDirty();
     control.updateValueAndValidity({ onlySelf: true });
   }
 });
}
}



   createExamResultEntry() {
         this.resultService
           .saveResultMarkBulkInfo(this.examResultSubjectWiseDetail)
           .pipe(takeUntil(this.destroy$))
           .subscribe((response:any) => {
             if (response.StatusCode === 1) {
               this.modal.success({
                 nzTitle: 'success!',
                 nzContent: response.Message,
               });
               this.isSaveLoading = false;
               this.MarkFormArray.clear();
               this.examResultSubjectWiseDetail.STUDENT_CODE =[];
               this.studentCodeList=[];
               this.VersionVisibility();
               this.changeDetect.detectChanges();
             }
             else {

               this.modal.warning({
                 nzTitle: 'error!',
                 nzContent:response.Message,
               });
               this.isSaveLoading = false;
             }
           });
           this.changeDetect.detectChanges();


     }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
 }
}
