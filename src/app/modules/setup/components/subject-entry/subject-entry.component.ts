import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { SubjectCreation, SubjectCreationVM, SubjectEntry } from '../../models/crud/subject-entry';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetupService } from '../../service/setup.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
interface CustomDocDefinition {
content: any[];
styles?: { [key: string]: any };
[key: string]: any; // Allow additional properties
}
@Component({
  selector: 'app-subject-entry',
  templateUrl: './subject-entry.component.html',
  styleUrl: './subject-entry.component.scss'
})
export class SubjectEntryComponent implements OnInit, OnDestroy {
  isDisable:any = [1];
  rowList: any = [];
  subjectList: any;
  organizationList = JSON.parse(localStorage.getItem('Organization')!);
  campusList = JSON.parse(localStorage.getItem('CampusList')!);
  organizationCode = this.organizationList[0].CODE;
  organizationName = this.organizationList[0].NAME;
  campusCode = this.campusList[0].CODE;
  campusName = this.campusList[0].NAME;
  userCode:any = localStorage.getItem('userCode');
  private destroy$: Subject<void> = new Subject<void>();
  
  dmlCaption: string = 'Save';
  deleteButton: string;
  text:string;
  validateForm: FormGroup;
  selectedItem: string;
  classCode: string;
  studentCode: string;
  subjectEntry: SubjectEntry = new SubjectEntry();
  subjectCreationSave: SubjectCreation = new SubjectCreation();
  subjectCreationItem: SubjectCreationVM[] = [];
  filteredOptions: Observable<string[]>;
  isSearchLoading=false;
  isSaveLoading=false;
  isSkeletonShow=false; 
  reportbtnhide=false;
  formattedDate:any;
  orglogo = (localStorage.getItem('orgimgbyte')!);
  private unsubscribe: Subscription[] = [];
  data:any;

  constructor(
    private setupService: SetupService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private cdr: ChangeDetectorRef) {   
      this.validateForm = this.fb.group({
        subjectFormArray: this.fb.array([]),
      });
    }


    get subjectFormArray() {
      return this.validateForm.get('subjectFormArray') as FormArray;
    }
    ngOnInit(): void {
      const currentDate = new Date();
      this.formattedDate = currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  
    Add(){
      this.subjectFormArray.push(
        this.fb.group({
          SUBJECT_CODE: [null],
          SUBJECT_NAME: [null],
          SUBJECT_NAME_BANGLA: [null],
          SUBJECT_SHORT_NAME: [null],
          SUBJECT_PART: [null],
          SUBJECT_DEFAULT_TYPE: ['C'],
          SUJBECT_IS_PRACTICAL: ['N'],
          SUJBECT_SRLNO: [null],
        })
      ); 
  }
  delete(index: number) {
    this.subjectFormArray.removeAt(index);
    this.cdr.detectChanges();
  }

  alphaNumberOnly (e:any) {  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("^[0-9.]");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
  }

  alphaOnly (e:any) {  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
  }


  prepareSave(){
 
    let data: any = [];
    data = this.validateForm.controls.subjectFormArray.value;
    if (data.length > 0) {
      let subjectCode: any[] = [];
      let subjectName: any[] = [];
      let sortName: any[] = [];
      let part: any[] = [];
      let type: any[] = [];
      let isPractical: any[] = [];
      let siNo: any[] = [];
    
      for (let i = 0; i < data.length; i++) {
        subjectCode.push(data[i].SUBJECT_CODE);
        subjectName.push(data[i].SUBJECT_NAME);
       // holidayType.push(data[i].SUBJECT_NAME_BANGLA);
       sortName.push(data[i].SUBJECT_SHORT_NAME);
       part.push(data[i].SUBJECT_PART);
       type.push(data[i].SUBJECT_DEFAULT_TYPE);
       isPractical.push(data[i].SUJBECT_IS_PRACTICAL);
       siNo.push(data[i].SUJBECT_SRLNO);
      
        if (subjectCode[i] == null) {
          this.modal.warning({
            nzTitle: 'Error!',
            nzContent: `Please enter subject code for Row No- ${i + 1} `,
            nzOkDanger: true,
          });
          return;
        }
        if (subjectName[i] == null) {
          this.modal.warning({
            nzTitle: 'Error!',
            nzContent: `Please enter subject name for Row No- ${
              i + 1
            } `,
            nzOkDanger: true,
          });
          return;
        }
        if (sortName[i] == null) {
          this.modal.warning({
            nzTitle: 'Error!',
            nzContent: `Please enter sort name for Row No- ${
              i + 1
            } `,
            nzOkDanger: true,
          });
          return;
        }
        if (part[i] == null) {
          this.modal.warning({
            nzTitle: 'Error!',
            nzContent: `Please enter subject part for Row No- ${
              i + 1
            } `,
            nzOkDanger: true,
          });
          return;
        }
        if (type[i] == null) {
          this.modal.warning({
            nzTitle: 'Error!',
            nzContent: `Please enter type for Row No- ${
              i + 1
            } `,
            nzOkDanger: true,
          });
          return;
        }
        if (isPractical[i] == null) {
          this.modal.warning({
            nzTitle: 'Error!',
            nzContent: `Please enter status for Row No- ${
              i + 1
            } `,
            nzOkDanger: true,
          });
          return;
        }
        if (siNo[i] == null) {
          this.modal.warning({
            nzTitle: 'Error!',
            nzContent: `Please enter serial number for Row No- ${
              i + 1
            } `,
            nzOkDanger: true,
          });
          return;
        }
       
       
      }

      this.modal.confirm({
        nzTitle: `Confirmation`,
        nzContent: `<b style="color: red;">Are you sure you want to save subject?</b>`,
        nzOkText: 'Yes',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => {
         
          this.subjectCreationSave.ORG_CODE = this.organizationCode;
          this.subjectCreationSave.User_Name = this.userCode;
          this.subjectCreationSave.SUBJECT_CODE = [];
          this.subjectCreationSave.SUBJECT_NAME = [];
          this.subjectCreationSave.SUBJECT_NAME_BANGLA = [];
          this.subjectCreationSave.SUBJECT_SHORT_NAME = [];
          this.subjectCreationSave.SUBJECT_PART = [];
          this.subjectCreationSave.SUBJECT_DEFAULT_TYPE = [];
          this.subjectCreationSave.SUJBECT_IS_PRACTICAL = [];
          this.subjectCreationSave.SUJBECT_SRLNO = [];

          for (let i = 0; i < data.length; i++) {
            this.subjectCreationSave.SUBJECT_CODE.push(data[i].SUBJECT_CODE);
            this.subjectCreationSave.SUBJECT_NAME.push(data[i].SUBJECT_NAME);
            this.subjectCreationSave.SUBJECT_NAME_BANGLA.push(data[i].SUBJECT_NAME_BANGLA);
            this.subjectCreationSave.SUBJECT_SHORT_NAME.push(data[i].SUBJECT_SHORT_NAME);
            this.subjectCreationSave.SUBJECT_PART.push(data[i].SUBJECT_PART);
            this.subjectCreationSave.SUBJECT_DEFAULT_TYPE.push(data[i].SUBJECT_DEFAULT_TYPE);
            this.subjectCreationSave.SUJBECT_IS_PRACTICAL.push(data[i].SUJBECT_IS_PRACTICAL);
            this.subjectCreationSave.SUJBECT_SRLNO.push(data[i].SUJBECT_SRLNO);

          }
          this.save(this.subjectCreationSave);
        },
        nzCancelText: 'No',
      });
    } else {
      this.modal.warning({
        nzTitle: 'Error!',
        nzContent: `Please add  information then try again...`,
      });
    }
 
}



save(data: any) {
  if (data) {
    
    this.setupService
      .SubjectCreation(data)
      .pipe(takeUntil(this.destroy$))
.subscribe((response:any) => {
  if(response.StatusCode == 1){
          this.modal.success({
            nzTitle: `Success`,
            nzContent: response.Message,
            nzOkDanger: true,
          });
          this.reportbtnhide=false;
          this.isSaveLoading = false;
          this.subjectFormArray.clear();
          this.validateForm.reset();
          this.cdr.detectChanges();
        } else {
          this.isSaveLoading = false;
          this.modal.error({
            nzTitle: `Failed`,
            nzContent: response.Message,
            nzOkDanger: true,
          });
          this.cdr.detectChanges();
        }
      });
    this.cdr.detectChanges();
  }
}

  public onSearchItem() {
    this.subjectFormArray.clear();
    this.isSearchLoading=true;
    this.reportbtnhide=false;
    this.setupService
    .GetSubjectList(this.organizationCode)
    .pipe(takeUntil(this.destroy$))
      .subscribe((response:any) => {
        let data:any = [];
              data = response.ResponseObj;
              this.data=data;
              this.isSearchLoading=false;
              if (data.length == 0) {
                this.modal.warning({
                  nzTitle: `Subject not found`,
                  nzContent: 'please try again',
                  nzOkDanger: true,
                });
                this.subjectFormArray.clear();
                this.cdr.detectChanges();
               
              } else {
                this.isSearchLoading=false;
                this.reportbtnhide=true;
                this.subjectFormArray.clear();
                for (let i = 0; i < data.length; i++) {
                  this.subjectFormArray.push(
                    this.fb.group({
                      SUBJECT_CODE: [data[i].SUBJECT_CODE,[Validators.required]],
                      SUBJECT_NAME: [data[i].SUBJECT_NAME, [Validators.required]],
                      SUBJECT_NAME_BANGLA: [data[i].SUBJECT_NAME_BANGLA],
                      SUBJECT_SHORT_NAME: [data[i].SUBJECT_SHORT_NAME, [Validators.required]],
                      SUBJECT_PART: [data[i].SUBJECT_PART, [Validators.required]],
                      SUBJECT_DEFAULT_TYPE: [data[i].SUBJECT_DEFAULT_TYPE, [Validators.required]],
                      SUJBECT_IS_PRACTICAL: [data[i].SUJBECT_IS_PRACTICAL, [Validators.required]],
                      SUJBECT_SRLNO: [data[i].SUJBECT_SRLNO, [Validators.required]],
                    })
                  );
                  this.cdr.detectChanges();
                }
              }
              
            });
           
          }

   reportData(){
    this.reportgenerate(this.data);
    }

   reportgenerate(data: any) {

      
      const tableBody = [
        [
          { text: 'SI', alignment: 'center',  style: 'tableHeader' },
          { text: 'Subject Code', alignment: 'center',  style: 'tableHeader' },
          { text: 'Subject Name', alignment: 'center',   style: 'tableHeader' },
          { text: 'Subject Name Bangla', alignment: 'center',  style: 'tableHeader' },
          { text: 'Short Name', alignment: 'center',  style: 'tableHeader' },
          { text: 'Subject Part', alignment: 'center',  style: 'tableHeader' },
          { text: 'Type', alignment: 'center', style: 'tableHeader' },
          { text: 'Is Practical?', alignment: 'center',  style: 'tableHeader' }
        ]
        
      ];
        
            data.forEach((item: any, index: number) => {
            
        
              tableBody.push([
                { text: (index + 1).toString(), alignment: 'center',   style: 'tableBody' },
                { text: item.SUBJECT_CODE, alignment: 'center',   style: 'tableBody' },
                { text: item.SUBJECT_NAME, alignment: 'center',  style: 'tableBody' },
                { text: item.SUBJECT_NAME_BANGLA, alignment: 'center',  style: 'tableBody' },
                { text: item.SUBJECT_SHORT_NAME, alignment: 'center',  style: 'tableBody' },
                { text: item.SUBJECT_PART, alignment: 'center',   style: 'tableBody' },
                { text: item.SUBJECT_DEFAULT_TYPE ==='O' ? 'Optional' : 'Compulsory', alignment: 'center',   style: 'tableBody' },
                { text: item.SUJBECT_IS_PRACTICAL === 'N' ? 'No' : 'Yes', alignment: 'center', style: 'tableBody' }

              ]);
              
              
            });
        
            const pageWidth = 841.89; // Custom width in points (11.69 inches * 72 points per inch)
            const pageHeight = 595.28; // Custom height in points (8.27 inches * 72 points per inch)
            const imageWidth = 200; // Width of the watermark image
            const imageHeight = 200; // Height of the watermark image
          
            const centerX = (pageWidth - imageWidth) / 2;
            const centerY = (pageHeight - imageHeight) / 2;
            const docDefinition: CustomDocDefinition = {
              pageMargins: [10, 20, 10, 20], 
              pageOrientation: 'landscape', 
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
                { text: ' Subject Report', bold: true, alignment: 'center', margin: [0, -15, 0, 15], fontSize: 12 },
                {
                  columns: [
                    {
                      width: '100%',
                      alignment: 'center',
                      stack: [
                        {
                          table: {
                            widths: ['5%', '10%', '24%','20%', '13%', '10%', '9%', '9%'],
                            body: tableBody
                          },
                          layout: {
                            hLineWidth: (i: number, node: any) => 1,
                            vLineWidth: (i: number, node: any) => 1,
                            hLineColor: (i: number, node: any) => '#ddd',
                            vLineColor: (i: number, node: any) => '#ddd',
                            paddingLeft: (i: number, node: any) => 4,
                            paddingRight: (i: number, node: any) => 4,
                            paddingTop: (i: number, node: any) => 2,
                            paddingBottom: (i: number, node: any) => 2
                          }
                        }
                      ]
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
                tableHeader: {
                  fontSize: 11,
                  bold: true,
                  alignment: 'center',
                  margin: [0, 5, 0, 5]
                },
                tableBody: {
                  fontSize: 10,
                  alignment: 'center',
                  margin: [0, 3, 0, 3] // Optional: control padding for rows
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

 

 


