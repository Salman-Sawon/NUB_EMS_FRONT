import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RoomInfo } from '../../models/crud/room-info';
import { GlobalService } from 'src/app/shared-services/Global_Services/global.service';
import { SetupService } from '../../service/setup.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddRoomEntryComponent } from './add-room-entry/add-room-entry.component';
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
  ROOM_ID: number;
  ROOM_NAME: string;
  BUILDING_NAME: string;
  CAPACITY: number;
  NUMBER_OF_COLUMNS: number;
  NUMBER_OF_ROWS: number;
}
@Component({
  selector: 'app-class-room-entry',
  templateUrl: './class-room-entry.component.html',
  styleUrl: './class-room-entry.component.scss'
})
export class ClassRoomEntryComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  listOfColumn = [
    {
      title: 'SI',
      compare: (a: DataItem, b: DataItem) => a.NO - b.NO,
      priority: false,
      width:50
    },
    {
      title: 'Building Name',
      compare: (a: DataItem, b: DataItem) => a.BUILDING_NAME.localeCompare(b.BUILDING_NAME),
      priority: 1,
    },
    {
      title: 'Room Name',
      compare: (a: DataItem, b: DataItem) => a.ROOM_NAME.localeCompare(b.ROOM_NAME),
      priority: 1,
    },
    {
      title: 'Capacity',
      compare: (a: DataItem, b: DataItem) => a.CAPACITY - b.CAPACITY,
      priority: 2
     
    },
    {
      title: 'Number of Rows',
      compare: (a: DataItem, b: DataItem) => a.NUMBER_OF_COLUMNS - b.NUMBER_OF_COLUMNS,
      priority: 3
    
    },
    {
      title: 'Number of Columns',
      compare: (a: DataItem, b: DataItem) => a.NUMBER_OF_ROWS - b.NUMBER_OF_ROWS,
      priority: 4
      
    },
   
    {
      title: 'Action',
        compare: (a: DataItem, b: DataItem) => 0,
        priority: 5,
        width:150,
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
roomInfo: RoomInfo = new RoomInfo();
datalength:number;
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

  this.getRoomInfo();
}

ngOnInit(): void {
  const currentDate = new Date();
  this.formattedDate = currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

public getRoomInfo() {
  this.setupService
  .getRoomInfo(this.organizationCode)
  .pipe(takeUntil(this.destroy$))
    .subscribe((response:any) => {
      this.roomList = response.ResponseObj;
      this.datalength = this.roomList.length
      this.listOfData.push(...this.roomList);
      this.cdr.detectChanges();
    });
}


addEditRoom(action: string,data:any) {
  this.roomInfo.USER_CODE = this.userCode;
  this.roomInfo.ORG_CODE = this.organizationCode;
  this.roomInfo.ROOM_ID =data.ROOM_ID;

  if(action === 'Update'){
    this.roomInfo.ROOM_NAME = data.ROOM_NAME;
    this.roomInfo.BUILDING_ID = data.BUILDING_ID;
    this.roomInfo.CAPACITY = data.CAPACITY;
    this.roomInfo.NUM_OF_ROWS = data.NUMBER_OF_ROWS;
    this.roomInfo.NUM_OF_COLUMNS = data.NUMBER_OF_COLUMNS;
    this.roomInfo.RowStatus = 2;
  }else{
    this.roomInfo.RowStatus = 1;
  }
  const modalRef: NzModalRef = this.modal.create({
    nzTitle: `${action} Room`,
    nzContent: AddRoomEntryComponent,
    nzFooter: null,
    nzMaskClosable: false,
    nzWidth: '700px' 
  });
  modalRef.componentInstance.action = action;
  modalRef.componentInstance.data = this.roomInfo;
  modalRef.afterClose.subscribe((result: any) => {
    this.getRoomInfo();
  });
}

deleteItem(item:any){
  this.roomInfo.ROOM_ID = item.ROOM_ID;
  this.roomInfo.ORG_CODE = '';
  this.roomInfo.ROOM_NAME = '';
  this.roomInfo.CAPACITY = 0;
  this.roomInfo.NUM_OF_ROWS = 0;
  this.roomInfo.NUM_OF_COLUMNS = 0;
  this.roomInfo.USER_CODE = '';
  this.roomInfo.RowStatus = 3;
  this.modal.confirm({
    nzTitle: `Are you sure you want to delete this room?`,
    nzContent: `<b style="color: red;">${this.roomInfo.ROOM_NAME}</b>`,
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => this.deleteRoom(this.roomInfo),
    nzCancelText: 'No'
  });
}


deleteRoom(data:any){
if(data){
  this.setupService
  .SaveRoomentry(data)
  .pipe(takeUntil(this.destroy$))
  .subscribe((response:any) => {
    if(response.StatusCode == 1){
      this.modal.success({
        nzTitle: `${this.roomInfo.ROOM_NAME}`,
        nzContent: response.Message,
        nzOkDanger: true,
      });
      this.getRoomInfo();
    }else{
      this.modal.error({
        nzTitle: `${this.roomInfo.ROOM_NAME}`,
        nzContent: response.Message,
        nzOkDanger: true,
      });
    }
    this.cdr.detectChanges();
  });
}
}
onSearchInputChange(event: KeyboardEvent) {
  const searchValue = (event.target as HTMLInputElement).value;
  this.filterTableData(searchValue);
}
filterTableData(searchValue: string) {
  if (!searchValue) {
    this.roomList = [...this.listOfData];
    this.cdr.detectChanges();
  } else {
    const lowerCaseSearch = searchValue.toLowerCase();
    const filteredMenu = this.listOfData.filter((item) => {
      const lowerCaseRoomName = item.ROOM_NAME.toLowerCase();
      const lowerCaseBuilding = item.BUILDING_NAME.toLowerCase();
      const roomCapacity = item.CAPACITY.toString();
      const numberOfColumns = item.NUMBER_OF_COLUMNS.toString();
      const numberOfRows = item.NUMBER_OF_ROWS.toString();

      return lowerCaseRoomName.includes(lowerCaseSearch) ||
             lowerCaseBuilding.includes(lowerCaseSearch) ||
             roomCapacity.includes(lowerCaseSearch) ||
             numberOfColumns.includes(lowerCaseSearch) ||
             numberOfRows.includes(lowerCaseSearch);
    });
    this.roomList = filteredMenu;
  }
}

reportData(){
  this.reportgenerate(this.roomList);
  }
  reportgenerate(data: any) {
    const tableBody = [
      [
        { text: 'SI', alignment: 'center',  style: 'tableHeader' },
        { text: 'Room Name', alignment: 'center',  style: 'tableHeader' },
        { text: 'Capacity', alignment: 'center',   style: 'tableHeader' },
        { text: 'Number of Rows', alignment: 'center',  style: 'tableHeader' },
        { text: 'Number of Columns', alignment: 'center',  style: 'tableHeader' },
       
      ]
      
    ];
      
          data.forEach((item: any, index: number) => {
          
            tableBody.push([
              { text: (index + 1).toString(), alignment: 'center',   style: 'tableBody' },
              { text: item.ROOM_NAME, alignment: 'center',   style: 'tableBody' },
              { text: item.CAPACITY, alignment: 'center',  style: 'tableBody' },
              { text: item.NUMBER_OF_ROWS, alignment: 'center',  style: 'tableBody' },
              { text: item.NUMBER_OF_COLUMNS, alignment: 'center',  style: 'tableBody' },
            
  
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
              { text: 'Class Room List Report', bold: true, alignment: 'center', margin: [0, -15, 0, 15], fontSize: 12 },
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


ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
}
