import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Periodinfo } from '../../models/crud/classRoutine';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { SetupService } from '../../service/setup.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { AddPeriodEntryComponent } from './add-period-entry/add-period-entry.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
interface CustomDocDefinition {
content: any[];
styles?: { [key: string]: any };
[key: string]: any; // Allow additional properties
}
interface DataItem {
  NO: number;
  PERIOD_ID: number;
  PERIOD_NAME: string;
  START_TIME: string;
  END_TIME: string;
  DURATION: string;
}
@Component({
  selector: 'app-period-entry',
  templateUrl: './period-entry.component.html',
  styleUrl: './period-entry.component.scss'
})


export class PeriodEntryComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  listOfColumn = [
    {
      title: 'SI',
      compare: (a: DataItem, b: DataItem) => a.NO - b.NO,
      priority: false,
      width:50
    },
    {
      title: 'Period Name',
      compare: (a: DataItem, b: DataItem) => a.PERIOD_NAME.localeCompare(b.PERIOD_NAME),
      priority: 1,
    },
    {
      title: 'Start Time',
      compare: (a: DataItem, b: DataItem) => a.START_TIME.localeCompare(b.START_TIME),
      priority: 2
     
    },
    {
      title: 'End Time',
      compare: (a: DataItem, b: DataItem) => a.END_TIME.localeCompare(b.END_TIME),
      priority: 3
    
    },
    {
      title: 'Duration (Minutes)',
      compare: (a: DataItem, b: DataItem) => a.DURATION.localeCompare(b.DURATION),
      priority: 4
      
    },
   
    {
      title: 'Action',
        compare: (a: DataItem, b: DataItem) => 0,
        priority: 5,
        width:180,
    }
  ];
 userCode: any = localStorage.getItem('userCode');
roomList: any[];
organizationList = JSON.parse(localStorage.getItem('Organization')!);
campusList = JSON.parse(localStorage.getItem('CampusList')!);
orglogo = (localStorage.getItem('orgimgbyte')!);
organizationCode = this.organizationList[0].CODE;
organizationName = this.organizationList[0].NAME;
campusCode = this.campusList[0].CODE;
campusName = this.campusList[0].NAME;
periodinfo: Periodinfo = new Periodinfo();
PeriodList:any;
listOfData: DataItem[] = [];
ValidateForm: FormGroup;
formattedDate:any;
constructor(
  private globalService: GlobalService,
  private setupService: SetupService,
  private cdr: ChangeDetectorRef,
  private fb: FormBuilder,
  private modal: NzModalService
) { 
  this.ValidateForm = this.fb.group({
    SEARCH: [null],
  });

  this.getPeriodGrid();
}

ngOnInit(): void {
  const currentDate = new Date();
  this.formattedDate = currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

public getPeriodGrid() {
  this.setupService
  .getPeriodGrid(this.organizationCode,this.campusCode)
  .pipe(takeUntil(this.destroy$))
    .subscribe((response:any) => {
      this.PeriodList = response.ResponseObj;
      this.listOfData.push(...this.PeriodList);
      this.cdr.detectChanges();
    });
}

addEditPeriod(action: string,data:any) {
  this.periodinfo.USER_CODE = this.userCode;
  this.periodinfo.ORG_CODE = this.organizationCode;
  this.periodinfo.CAMPUS_CODE = this.campusCode;
  this.periodinfo.PERIOD_ID=  data.PERIOD_ID;

  if(action === 'Update'){
    
    this.periodinfo.PERIOD_NAME = data.PERIOD_NAME;
    this.periodinfo.START_TIME = data.START_TIME;
    this.periodinfo.END_TIME = data.END_TIME;
    this.periodinfo.DURATION =data.DURATION;
    this.periodinfo.ROW_STATUS = 2;
  }else{
    this.periodinfo.ROW_STATUS = 1;
  }
  const modalRef: NzModalRef = this.modal.create({
    nzTitle: `${action} Period`,
    nzContent: AddPeriodEntryComponent,
    nzFooter: null,
    nzMaskClosable: false,
    nzWidth: '700px' 
  });
  modalRef.componentInstance.action = action;
  modalRef.componentInstance.data = this.periodinfo;
  modalRef.afterClose.subscribe((result: any) => {
    this.getPeriodGrid();
  });
}

deleteItem(item:any){
  this.periodinfo.PERIOD_ID = item.PERIOD_ID;
  this.periodinfo.ORG_CODE = '';
  this.periodinfo.CAMPUS_CODE = '';
  this.periodinfo.PERIOD_NAME = '';
  this.periodinfo.START_TIME = '';
  this.periodinfo.END_TIME = '';
  this.periodinfo.DURATION = '';
  this.periodinfo.USER_CODE = '';
  this.periodinfo.ROW_STATUS = 3;
  this.modal.confirm({
    nzTitle: `Are you sure you want to delete this Period?`,
    nzContent: `<b style="color: red;">${this.periodinfo.PERIOD_NAME}</b>`,
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => this.deleteRoom(this.periodinfo),
    nzCancelText: 'No'
  });
}


deleteRoom(data:any){
if(data){
  this.setupService
  .SavePeriodentry(data)
  .pipe(takeUntil(this.destroy$))
  .subscribe((response:any) => {
    if(response.StatusCode == 1){
      this.modal.success({
        nzTitle: `${this.periodinfo.PERIOD_NAME}`,
        nzContent: response.Message,
        nzOkDanger: true,
      });
      this.getPeriodGrid();
    }else{
      this.modal.error({
        nzTitle: `${this.periodinfo.PERIOD_NAME}`,
        nzContent: response.Message,
        nzOkDanger: true,
      });
    }
    this.cdr.detectChanges();
  });
}
}

reportData(){
this.reportgenerate(this.PeriodList);
}
reportgenerate(data: any) {
  const tableBody = [
    [
      { text: 'SI', alignment: 'center',  style: 'tableHeader' },
      { text: 'Period Name', alignment: 'center',  style: 'tableHeader' },
      { text: 'Start Time', alignment: 'center',   style: 'tableHeader' },
      { text: 'End Time', alignment: 'center',  style: 'tableHeader' },
      { text: 'Duration (Min.)', alignment: 'center',  style: 'tableHeader' },
     
    ]
    
  ];
    
        data.forEach((item: any, index: number) => {
        
          tableBody.push([
            { text: (index + 1).toString(), alignment: 'center',   style: 'tableBody' },
            { text: item.PERIOD_NAME, alignment: 'center',   style: 'tableBody' },
            { text: item.START_TIME, alignment: 'center',  style: 'tableBody' },
            { text: item.END_TIME, alignment: 'center',  style: 'tableBody' },
            { text: item.DURATION, alignment: 'center',  style: 'tableBody' },
          

          ]);
          
          
        });
    
        const pageWidth = 595.28; // A4 page width in points (8.27 inches * 72 points per inch)
        const pageHeight = 841.89; // A4 page height in points (11.69 inches * 72 points per inch)
        const imageWidth = 200; // Width of the watermark image
        const imageHeight = 200; // Height of the watermark image
      
        const centerX = (pageWidth - imageWidth) / 2;
        const centerY = (pageHeight - imageHeight) / 2;
        const docDefinition: CustomDocDefinition = {
          pageMargins: [10, 20, 10, 20], 
          //pageOrientation: 'landscape', 
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
            { text: 'Period List Report', bold: true, alignment: 'center', margin: [0, -15, 0, 15], fontSize: 12 },
            {
              columns: [
                {
                  width: '100%',
                  alignment: 'center',
                  stack: [
                    {
                      table: {
                        widths: ['5%', '35%', '20%','20%', '20%'],
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
onSearchInputChange(event: KeyboardEvent) {
  const searchValue = (event.target as HTMLInputElement).value;
  this.filterTableData(searchValue);
}
filterTableData(searchValue: string) {
  if (!searchValue) {
    this.PeriodList = [...this.listOfData];
    this.cdr.detectChanges();
  } else {
    const lowerCaseSearch = searchValue.toLowerCase();
    const filteredMenu = this.listOfData.filter((item) => {
      const lowerCasePeriodName = item.PERIOD_NAME.toLowerCase();
      const lowerCaseStartTime = item.START_TIME.toLowerCase();
      const lowerCaseEndTime = item.END_TIME.toLowerCase();
      const lowerCaseDuration = item.DURATION.toLowerCase();

      return lowerCasePeriodName.includes(lowerCaseSearch) ||
             lowerCaseStartTime.includes(lowerCaseSearch) ||
             lowerCaseEndTime.includes(lowerCaseSearch) ||
             lowerCaseDuration.includes(lowerCaseSearch);
    });
    this.PeriodList = filteredMenu;
    this.cdr.detectChanges();
  }
}











ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();

}

}
