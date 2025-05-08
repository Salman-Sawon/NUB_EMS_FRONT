import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { StudentListParams } from '../../../models/fee-bill-generation-process';
import { StudentBulkEntryService } from '../../../services/student-bulk-entry.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
interface CustomDocDefinition {
  content: any[];
  styles?: { [key: string]: any };
  [key: string]: any; // Allow additional properties
}
@Component({
  selector: 'app-student-list-report',
  templateUrl: './student-list-report.component.html',
  styleUrl: './student-list-report.component.scss'
})
export class StudentListReportComponent implements OnInit, OnDestroy {
  organizationList = JSON.parse(localStorage.getItem('Organization')!);
  orglogo = (localStorage.getItem('orgimgbyte')!);
  campusList = JSON.parse(localStorage.getItem('CampusList')!);
  organizationCode = this.organizationList[0].CODE;
  organizationName = this.organizationList[0].NAME;
  campusCode = this.campusList[0].CODE;
  campusName= this.campusList[0].NAME;
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


  isVersionVisible: boolean = false;
  isSemesterVisible: boolean = false;
  isSectionVisible: boolean = false;
  isYearVisible: boolean = false;

  isSearchLoading = false;
  isSkeletonShow = false;
  yearList: any[];
  semesterList: any[];
  visibilityList: any[];
  sectionlist: any;

  StudentList: any[] = [];
  filteredStudentList: any[] = [];
  reportBtnHide=false;

  parameterData: StudentListParams = new StudentListParams();
  formattedDate:any;


  constructor(
    private changeDetect: ChangeDetectorRef,
    private globalService: GlobalService,
      private quickEntryService: StudentBulkEntryService,
    private modal: NzModalService,
    private fb: FormBuilder,
  ) {
    this.isVersionVisible = globalService.isVisible('VERSION','');
    this.commonForm = this.fb.group({
      GROUP_NAME: [null, [Validators.required]],
      CLASS_NAME: [null, [Validators.required]],
      SECTION_NAME: [null, [Validators.required]],
      VERSION_NAME: [null, [Validators.required]],
      SESSION_NAME: [null, [Validators.required]],
      YEAR_NAME: [null, [Validators.required]],
      SEMESTER_NAME: [null, [Validators.required]],
      SHIFT_NAME: [null, [Validators.required]],
      SEARCH:[null,]
    });

  }

  ngOnInit(): void {
    this.VersionVisibility();
    const currentDate = new Date();
  this.formattedDate = currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
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
  //this.stdBulkEntry.SECTION_CODE =  this.sectionlist[0].CODE;
  this.commonForm.patchValue({ SECTION_NAME: this.sectionlist[0].CODE });
  this.commonForm.controls.SECTION_NAME.disable();
}
else{
  this.commonForm.controls.SECTION_NAME.enable();
}
  this.changeDetect.detectChanges();
 }
 Search(){
  if(this.commonForm.valid){
  this.parameterData.ORG_CODE =  this.organizationCode;
  this.parameterData.CAMPUS_CODE =  this.campusCode;
  this.parameterData.CLASS_CODE =  this.commonForm.controls["CLASS_NAME"].value;
  this.parameterData.GROUP_CODE =  this.commonForm.controls["GROUP_NAME"].value;
  this.parameterData.VERSION_CODE =  this.commonForm.controls["VERSION_NAME"].value;
  this.parameterData.SESSION_CODE =  this.commonForm.controls["SESSION_NAME"].value;
  this.parameterData.SECTION_CODE =  this.commonForm.controls["SECTION_NAME"].value;
  this.parameterData.YEAR_CODE =  this.commonForm.controls["YEAR_NAME"].value;
  this.parameterData.SEMESTER_CODE =  this.commonForm.controls["SEMESTER_NAME"].value;
  this.parameterData.SHIFT_CODE =  this.commonForm.controls["SHIFT_NAME"].value;
  this.parameterData.USER_CODE = this.userCode;
      this.StudentList = [];
      this.filteredStudentList = [];
      this.isSearchLoading = false;
      this.isSkeletonShow = true;
      this.reportBtnHide=false;
     
      this.quickEntryService
      .getStudentListReports( this.parameterData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if(data.ResponseObj.length > 0){
        this.StudentList = data.ResponseObj;
        this.reportBtnHide=true;
        this.isSearchLoading=false;
        this.isSkeletonShow=false;
        this.filteredStudentList = [...this.StudentList];
        this.changeDetect.detectChanges();
      }else{
        this.isSearchLoading = false;
        this.isSkeletonShow = false;
        this.modal.error({
          nzTitle:'Student not found',
          nzContent:'Student not found given information',
          nzOkDanger: true,
        });
        this.changeDetect.detectChanges();
      }
      });
      }else{
        Object.values(this.commonForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }

    }

    onSearchInputChange(event: KeyboardEvent) {
      const searchValue = (event.target as HTMLInputElement).value;
      this.filterTableData(searchValue);
    }

    filterTableData(searchValue: string) {
      if (!searchValue) {
          this.filteredStudentList = [...this.StudentList]; // Reset to original list if no search value
      } else {
          const lowerCaseSearch = searchValue.toLowerCase(); // Convert the search value to lowercase
  
          this.filteredStudentList = this.StudentList.filter(student => {
              // Convert all fields to lowercase for case-insensitive comparison
              const studentName = student.STUDENT_NAME ? student.STUDENT_NAME.toLowerCase() : '';
              const studentCode = student.STUDENT_CODE ? student.STUDENT_CODE.toLowerCase() : '';
              const classRoll = student.CLASS_ROLL ? student.CLASS_ROLL.toString().toLowerCase() : ''; // Convert class roll to string
              const fathersName = student.FATHERS_NAME ? student.FATHERS_NAME.toLowerCase() : '';
              const smsMobileNum = student.SMS_MOBILE_NUM ? student.SMS_MOBILE_NUM.toString().toLowerCase() : ''; // Convert mobile number to string
  
              // Check if any of the fields contain the search value
              return studentName.includes(lowerCaseSearch) || 
                     studentCode.includes(lowerCaseSearch) || 
                     classRoll.includes(lowerCaseSearch) || 
                     fathersName.includes(lowerCaseSearch) ||
                     smsMobileNum.includes(lowerCaseSearch);
          });
      }
      this.changeDetect.detectChanges();
  }
  
    reportData(){
      this.StudentListReport( this.StudentList);
    }

    StudentListReport(data: any): void {
      const tableBody: any[] = [];

      const headerRow = [
        { text: 'SI', alignment: 'center', fontSize: 9, bold: true, margin: [0, 4, 0, 4]},
        { text: 'Student Code', alignment: 'center', fontSize: 9, bold: true,margin: [0, 4, 0, 4]},
        { text: 'Student Name', alignment: 'center', fontSize: 9, bold: true,margin: [0, 4, 0, 4]},
        { text: 'Class Roll', alignment: 'center', fontSize: 9, bold: true,margin: [0, 4, 0, 4]},
        { text: "Father's Name", alignment: 'center', fontSize: 9, bold: true,margin: [0, 4, 0, 4]},
        { text: 'Mobile Number', alignment: 'center', fontSize: 9, bold: true,margin: [0, 4, 0, 4]},
        { text: 'Admission Date', alignment: 'center', fontSize: 9, bold: true,margin: [0, 4, 0, 4]}
      ];

      tableBody.push(headerRow);

      data.forEach((item: any, index: number) => {
        const dataRow = [
          { text: (index + 1).toString(), alignment: 'center',  fontSize: 9, bold: false,margin: [0, 2, 0, 2]},
          { text: item.STUDENT_CODE || 'N/A', alignment: 'center', fontSize: 9, bold: false,margin: [0, 2, 0, 2]},
          { text: item.STUDENT_NAME || 'N/A', alignment: 'center', fontSize: 9, bold: false,margin: [0, 2, 0, 2]},
          { text: item.CLASS_ROLL || 'N/A', alignment: 'center', fontSize: 9, bold: false,margin: [0, 2, 0, 2]},
          { text: item.FATHERS_NAME || 'N/A', alignment: 'center', fontSize: 9, bold: false,margin: [0, 2, 0, 2]},
          { text: item.SMS_MOBILE_NUM || 'N/A', alignment: 'center', fontSize: 9, bold: false,margin: [0, 2, 0, 2]},
          { text: item.ADMISSION_DATE || 'N/A', alignment: 'center', fontSize: 9, bold: false,margin: [0, 2, 0, 2]},
        ];

        tableBody.push(dataRow); // Push data rows into tableBody
      });
      const pageWidth = 595.28; // A4 page width in points (8.27 inches * 72 points per inch)
      const pageHeight = 841.89; // A4 page height in points (11.69 inches * 72 points per inch)
      const imageWidth = 200; // Width of the watermark image
      const imageHeight = 200; // Height of the watermark image
    
      const centerX = (pageWidth - imageWidth) / 2;
      const centerY = (pageHeight - imageHeight) / 2;
      const docDefinition: any = {
        pageOrientation: 'portrait',
        pageMargins: [10, 20, 10, 20], 
        content: [
          {
            width: '13%',
            stack: [{
              image: `data:image/png;base64,${this.orglogo}`,
              width: 60,
              height: 60,
              alignment: 'center',
              margin: [0, -10, 0, 20],
            }]
          },
          { text: this.organizationName, bold: true, alignment: 'center', margin: [0, -20, 0, 20], fontSize: 16 },
          { text: this.campusName, bold: true, alignment: 'center', margin: [0, -20, 0, 20], fontSize: 14 },
          { text: 'Student List Report', bold: true, alignment: 'center', margin: [0, -15, 0, 15], fontSize: 12 },
          {
            columns: [
              {
                width: '*',
                stack: [
                  {
                    columns: [
                      {
                        width: '30%',
                        stack: [

                          {
                            columns: [
                              { text: `Group`, width: 50, margin: [0, 3, 0, 0], style: 'label' },
                              { text: `:  ${data[0].GROUP_NAME}`, width: '*', margin: [0, 3, 0, 0], style: 'value' }
                            ]
                          },
                          {
                            columns: [
                              { text: `Session`, width: 50, margin: [0, 3, 0, 0], style: 'label' },
                              { text: `:  ${data[0].SESSION_NAME}`, width: '*', margin: [0, 3, 0, 0], style: 'value' }
                            ]
                          },
                          {
                            columns: [
                              { text: `Semester`, width: 50, margin: [0, 3, 0, 0], style: 'label' },
                              { text: `:  ${data[0].SEMESTER_NAME}`, width: '*', margin: [0, 3, 0, 0], style: 'value' }
                            ]
                          }

                        ]

                      },
                      {
                        width: '40%',
                        stack: [
                          {
                            columns: [
                              { text: `Class`, width: 40, margin: [0, 3, 0, 0], style: 'label' },
                              { text: `:  ${data[0].CLASS_NAME}`, width: '*', margin: [0, 3, 0, 0], style: 'value' }
                            ]
                          },
                          {
                            columns: [
                              { text: `Version`, width: 40, margin: [0, 3, 0, 0], style: 'label' },
                              { text: `:  ${data[0].VERSION_NAME}`, width: '*', margin: [0, 3, 0, 0], style: 'value' }
                            ]
                          },

                          {
                            columns: [
                              { text: `Shift`, width: 40, margin: [0, 3, 0, 0], style: 'label' },
                              { text: `:  ${data[0].SHIFT_NAME}`, width: '*', margin: [0, 3, 0, 0], style: 'value' }
                            ]
                          }

                        ]

                      },
                      {
                        width: '30%',
                        stack: [
                          {
                            columns: [
                              { text: `Section`, width: 40, margin: [0, 3, 0, 0], style: 'label' },
                              { text: `:  ${data[0].SECTION_NAME}`, width: '*', margin: [0, 3, 0, 0], style: 'value' }
                            ]
                          },
                          {
                            columns: [
                              { text: `Year`, width: 40, margin: [0, 3, 0, 0], style: 'label' },
                              { text: `:  ${data[0].YEAR_NAME}`, width: '*', margin: [0, 3, 0, 0], style: 'value' }
                            ]
                          }

                        ]

                      }



                    ]
                  },

                ]
              },

            ],
            columnGap: 10, // Adjust gap between columns
            marginBottom: 10 // Adjust margin as needed
          },
          {
            width: '100%',
            alignment: 'center',
            stack: [
              {
                table: {
                  headerRows: 1, // Include header row in every page
                   widths: ['5%', '12%', '23%', '9%', '24%', '14%', '14%'], // Adjust relative widths here
                  body: tableBody
                },
                layout: {
                  hLineWidth: (i: number, node: any) => (i === 0 || i === 1) ? 2 : 1, // Thicker lines for header and first data row
                  vLineWidth: (i: number, node: any) => 1,
                  hLineColor: (i: number, node: any) => i === 1 ? '#CCCCCC' : '#DDD', // Color for header row and first data row
                  vLineColor: (i: number, node: any) => '#DDD',
                  paddingLeft: (i: number, node: any) => 4,
                  paddingRight: (i: number, node: any) => 4,
                  paddingTop: (i: number, node: any) => 2,
                  paddingBottom: (i: number, node: any) => 2
                }
              }
            ]
          }
        ],
        header: (currentPage: number, pageCount: number) => {
          return {
            columns: [
              {
                text: 'Print - ' + this.formattedDate,
                alignment: 'left',
                margin: [10, 10, 20, 0],
                fontSize: 6
              },
              {
                text: `Page ${currentPage} of ${pageCount}`,
                alignment: 'right',
                margin: [0, 10, 20, 0],
                fontSize: 8
              }
            ]
          };
        },
        styles: {
          header: {
            fontSize: 22,
            bold: true
          },
          anotherStyle: {
            italics: true
          },
          label: {
            fontSize: 11,
            alignment: 'left'
          },
          value: {
            fontSize: 11,
            alignment: 'left'
          }
        },
        background: {
          image: `data:image/png;base64,${this.orglogo}`,
          width: imageWidth,
          height: imageHeight,
          opacity: 0.1,
          absolutePosition: { x: centerX, y: centerY }
        }
      };

      pdfMake.createPdf(docDefinition).open();
    }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
