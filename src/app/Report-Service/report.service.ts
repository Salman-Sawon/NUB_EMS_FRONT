import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { UrlConstants } from 'src/app/enums/UrlConstants';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
interface CustomDocDefinition {
  content: any[];
  styles?: { [key: string]: any };
  [key: string]: any; // Allow additional properties
}
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private units: string[] = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  private teens: string[] = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  private tens: string[] = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  organizationList = JSON.parse(localStorage.getItem('Organization')!);
  organizationName = this.organizationList[0].NAME;
  campusList = JSON.parse(localStorage.getItem('CampusList')!);
  campusName = this.campusList[0].NAME;
  orglogo = (localStorage.getItem('orgimgbyte')!);
  constructor() { }





Aseatplanreport(data: any) {
  console.log('rep',data);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const tableBody = [
    [
      { text: 'SI', alignment: 'center',  style: 'tableHeader' },
      { text: 'Student Code', alignment: 'center',  style: 'tableHeader' },
      { text: 'Student Name', alignment: 'center',   style: 'tableHeader' },
      { text: 'Class Roll', alignment: 'center',  style: 'tableHeader' },
      { text: 'Row', alignment: 'center',  style: 'tableHeader' },
      { text: 'Column', alignment: 'center',  style: 'tableHeader' },
     
    ]
    
  ];
    
        data.forEach((item: any, index: number) => {
        
          tableBody.push([
            { text: (index + 1).toString(), alignment: 'center',   style: 'tableBody' },
            { text: item.STUDENT_CODE, alignment: 'center',   style: 'tableBody' },
            { text: item.STUDENT_NAME, alignment: 'center',  style: 'tableBody' },
            { text: item.CLASS_ROLL, alignment: 'center',  style: 'tableBody' },
            { text: item.ROW_NO, alignment: 'center',  style: 'tableBody' },
            { text: item.COLUMN_NO, alignment: 'center',  style: 'tableBody' },
          

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
            { text: 'Seat Plan Report', bold: true, alignment: 'center', margin: [0, -15, 0, 15], fontSize: 12 },
            {
              columns: [
                {
                  width: '100%',
                  alignment: 'center',
                  stack: [
                    {
                      table: {
                        widths: ['5%', '15%', '35%','15%', '15%','15%',],
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
                  text: 'Print - ' + formattedDate,
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


   seatplanreport(data: any,roomName:any,termName:any,) {
    const totalcount = data.length;
    const groupedData = this.groupByMultipleKeys(data, ['CLASS_NAME', 'GROUP_NAME', 'VERSION_NAME', 'SESSION_NAME', 'YEAR_NAME', 'SEMESTER_NAME']);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    const pages: any[] = [];



    // Loop through each group and create the report content
    for (const [groupKey, students] of Object.entries(groupedData)) {
        const [classCode, groupCode, versionCode, sessionCode, yearCode, semesterCode] = groupKey.split('|');
        const studentCount = students.length;
        // Add group information as a title
        pages.push(
          {
            image: `data:image/png;base64,${this.orglogo}`,
            width: 60,
            height: 60,
            alignment: 'center',
            margin: [0, 5, 0, 0], // Adjusted margin to ensure spacing
        },
        {
            text: this.organizationName,
            bold: true,
            alignment: 'center',
            margin: [0, 5, 0, 0], // Adjusted margin for spacing
            fontSize: 16,
        },
        {
            text: this.campusName,
            bold: true,
            alignment: 'center',
            margin: [0, 5, 0, 0], // Adjusted margin for spacing
            fontSize: 14,
        },
        {
          text: `Seat plan for Term: ${termName}, Building: ${data[0].BUILDING_NAME}, Room: ${roomName} ( ${totalcount} )`,
          bold: true,
          alignment: 'center',
          margin: [0, 5, 0, 0], // Adjusted margin for spacing
          fontSize: 11,
      },
      {
        text: `Total Students: ${studentCount}`, // Display the student count
        bold: true,
        alignment: 'center',
        margin: [0, 5, 0, 0],
        fontSize: 12,
    },
      {
        text: 'Printing Date - ' + formattedDate,
        alignment: 'center',
        margin: [0, 5, 0, 0], // Adjusted margin for spacing
        fontSize: 10
      },
          {
            text: `Class: ${classCode} | Group: ${groupCode} | Version: ${versionCode} | Session: ${sessionCode} | Year: ${yearCode} | Semester: ${semesterCode}`,
            bold: true,
            alignment: 'center',
            margin: [0, 5, 0, 10],
            fontSize: 12,
          
        },
       
       
      );

        // Generate table body for each group
        const tableBody = [
            [
                { text: 'SI', alignment: 'center', style: 'tableHeader' },
                { text: 'Student Code', alignment: 'center', style: 'tableHeader' },
                { text: 'Student Name', alignment: 'center', style: 'tableHeader' },
                { text: 'Class Roll', alignment: 'center', style: 'tableHeader' },
                { text: 'Row', alignment: 'center', style: 'tableHeader' },
                { text: 'Column', alignment: 'center', style: 'tableHeader' },
            ],
        ];

        // Add students to the table body
        students.forEach((student: any, index: number) => {
            tableBody.push([
                { text: (index + 1).toString(), alignment: 'center', style: 'tableBody' },
                { text: student.STUDENT_CODE, alignment: 'center', style: 'tableBody' },
                { text: student.STUDENT_NAME, alignment: 'center', style: 'tableBody' },
                { text: student.CLASS_ROLL, alignment: 'center', style: 'tableBody' },
                { text: student.ROW_NO, alignment: 'center', style: 'tableBody' },
                { text: student.COLUMN_NO, alignment: 'center', style: 'tableBody' },
            ]);
        });

        // Push table for each group
        pages.push({
            table: {
                headerRows: 1,
                widths: ['5%', '15%', '35%', '15%', '15%', '15%'],
                body: tableBody,
            },
            layout: {
                hLineWidth: (i: number, node: any) => 1,
                vLineWidth: (i: number, node: any) => 1,
                hLineColor: (i: number, node: any) => '#ddd',
                vLineColor: (i: number, node: any) => '#ddd',
                paddingLeft: (i: number, node: any) => 4,
                paddingRight: (i: number, node: any) => 4,
                paddingTop: (i: number, node: any) => 2,
                paddingBottom: (i: number, node: any) => 2,
            },
            pageBreak: 'after', // Force page break after the table
        });
    }
    const pageHeight = 841.89; // Custom width in points (11.69 inches * 72 points per inch)
    const pageWidth = 595.28; // Custom height in points (8.27 inches * 72 points per inch)
    const imageWidth = 200; // Width of the watermark image
    const imageHeight = 200; // Height of the watermark image

    const centerX = (pageWidth - imageWidth) / 2;
    const centerY = (pageHeight - imageHeight) / 2;
    const docDefinition: CustomDocDefinition = {
        pageMargins: [10, 20, 10, 20], // Adjusted top margin for header (50px)
        content: pages,
       
        footer: (currentPage: number, pageCount: number) => {
            return {
                text: `Page ${currentPage} of ${pageCount}`,
                alignment: 'right',
                margin: [0, 10, 20, 0],
                fontSize: 8,
            };
        },
        background: {
          image: `data:image/png;base64,${this.orglogo}`,
          width: imageWidth,
          height: imageHeight,
          opacity: 0.1,
          absolutePosition: { x: centerX, y: centerY }
        },
        styles: {
            header: {
                fontSize: 22,
                bold: true,
            },
            tableHeader: {
                fontSize: 11,
                bold: true,
                alignment: 'center',
                margin: [0, 5, 0, 5],
            },
            tableBody: {
                fontSize: 10,
                alignment: 'center',
                margin: [0, 3, 0, 3],
            },
        },
    };

    // Open the PDF in a new window
    pdfMake.createPdf(docDefinition).open();
}

    
    
      
      
      
// Helper function to group data by multiple keys
groupByMultipleKeys(array: any[], keys: string[]): Record<string, any[]> {
  return array.reduce((result, currentValue) => {
    const groupKey = keys.map((key) => currentValue[key]).join('|');
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(currentValue);
    return result;
  }, {});
}
groupByMultipleKeysName(array: any[], keys: string[]): Record<string, any[]> {
  return array.reduce((result, currentValue) => {
    const groupKey = keys.map((key) => currentValue[key]).join('|');
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(currentValue);
    return result;
  }, {});
}


  genReportData(reportData: any) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const pageWidth = 595.28; // A4 page width in points (8.27 inches * 72 points per inch)
    const pageHeight = 841.89; // A4 page height in points (11.69 inches * 72 points per inch)
    const imageWidth = 200; // Width of the watermark image
    const imageHeight = 200; // Height of the watermark image

    const centerX = (pageWidth - imageWidth) / 2;
    const centerY = (pageHeight - imageHeight) / 2;
    const tableHeader = reportData.columns.map((col: { header: any; alignment: any; fontSize: any; bold: any; fillColor: any; }) => ({
      text: col.header,
      alignment: col.alignment,
      fontSize: col.fontSize,
      bold: col.bold,
      fillColor: col.fillColor || '#CCCCCC'
    }));
  
    const tableBody = [tableHeader];
    let totalAmount = 0;
  
    // Generate the table body
    reportData.data.forEach((item: { [x: string]: { toString: () => any; }; TOTAL_AMOUNT: { toString: () => string; }; }, index: number) => {
      const row = reportData.columns.map((col: { field: string; alignment: any; fontSize: any; bold: any; }) => ({
        
        text: col.field === 'index' ? (index + 1).toString() : item[col.field]?.toString(),
        alignment: col.alignment,
        fontSize: col.fontSize,
        bold: col.bold,
        fillColor: ''
      }));
      tableBody.push(row);
  
      if (item.TOTAL_AMOUNT) {
        totalAmount += parseFloat(item.TOTAL_AMOUNT.toString());
      }
    });
  
    const totalAmountWords: string = this.numberToWords(Math.round(totalAmount));
    // tableBody.push([
    //   { text: '', alignment: 'left', fontSize: 8, bold: false, fillColor: '' },
    //   { text: 'Total Amount', alignment: 'left', fontSize: 10, bold: true, fillColor: '' },
    //   { text: totalAmount.toFixed(0), alignment: 'right', fontSize: 10, bold: true, fillColor: '' }
    // ]);
  
    const docDefinition: CustomDocDefinition = {
      content: [
        { width: 40, image: `data:image/png;base64,${this.orglogo}`, height: 40, alignment: 'center', margin: [0, -20, 0, 20], fontSize: 18 },
        { text: this.organizationName, bold: true, alignment: 'center', margin: [0, -20, 0, 20], fontSize: 16 },
        { text: this.campusName, bold: true, alignment: 'center', margin: [0, -20, 0, 20], fontSize: 14 },
        { text:reportData.header[0].data1 , bold: true, alignment: 'center', margin: [0, -20, 0, 20], fontSize: 12 },

        {
          columns: [
            {
              width: '100%',
              alignment: 'center',
              stack: [
                {
                  table: {
                    widths: reportData.columns.map((col: { width: any; }) => col.width),
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
        },
        {
          text: 'In Word : ' + totalAmountWords + ' ( Taka Only )',
          alignment: 'left',
          margin: [0, 10, 0, 0],
          fontSize: 12,
          bold: true
        }
      ],
        footer: (currentPage: number, pageCount: number) => {
            if (currentPage === pageCount) {
                return {
                    columns: [
                        {
                            columns: [
                            //   {

                            //       alignment: 'center',
                            //       stack: [
                            //           { text: '------------------------------- ', alignment: 'center' ,fontSize: 8  },
                            //           { text: 'Sign Of Officer ', alignment: 'center' ,fontSize: 8  },

                            //       ]
                            //   },


                          ]
                           },

                         {
                            columns: [
                              {

                                  alignment: 'right',
                                  stack: [
                                      { text: '---------------------------------------------------- ', alignment: 'center' ,fontSize: 8  },
                                      { text: 'Authorized By ', alignment: 'center' , fontSize: 8 },

                                  ]
                              },


                          ]
                           },


                    ]
                };
            }
            return {};
        },

        styles: {
            header: {
                fontSize: 22,
                bold: true
            },
            anotherStyle: {
                italics: true
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








numberToWords(num: number): string {
  if (num === 0) {
    return 'zero';
  }

  if (num < 0) {
    return 'minus ' + this.numberToWords(Math.abs(num));
  }

  let words: string = '';

  if (Math.floor(num / 100000) > 0) {
    words += this.numberToWords(Math.floor(num / 100000)) + ' Lakh ';
    num %= 100000;
  }

  if (Math.floor(num / 1000) > 0) {
    words += this.numberToWords(Math.floor(num / 1000)) + ' thousand ';
    num %= 1000;
  }

  if (Math.floor(num / 100) > 0) {
    words += this.numberToWords(Math.floor(num / 100)) + ' hundred ';
    num %= 100;
  }

  if (num > 0) {
    if (num < 20) {
      words += (num < 10 ? this.units[num] : this.teens[num - 10]);
    } else {
      words += this.tens[Math.floor(num / 10)];
      if (num % 10 > 0) {
        words += '-' + this.units[num % 10];
      }
    }
  }

  return this.capitalizeWords(words.trim());
}

private capitalizeWords(words: string): string {
  return words.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

teacherListReport(data: any): void {
  const tableBody: any[] = [];

  const headerRow = [
    { text: 'SI', alignment: 'center', fontSize: 10, bold: true, margin: [0, 4, 0, 4] },
    { text: 'Teacher Code', alignment: 'center', fontSize: 10, bold: true, margin: [0, 4, 0, 4] },
    { text: 'Teacher Full Name', alignment: 'center', fontSize: 10, bold: true, margin: [0, 4, 0, 4] },
    { text: "Father's Name", alignment: 'center', fontSize: 10, bold: true, margin: [0, 4, 0, 4] },
    { text: 'Mobile Number', alignment: 'center', fontSize: 10, bold: true, margin: [0, 4, 0, 4] },
    { text: 'Joining Date', alignment: 'center', fontSize: 10, bold: true, margin: [0, 4, 0, 4] }
  ];

  tableBody.push(headerRow);

  data.forEach((item: any, index: number) => {
    const dataRow = [
      { text: (index + 1).toString(), alignment: 'center', fontSize: 9, margin: [0, 2, 0, 2] },
      { text: item.TEACHER_CODE || 'N/A', alignment: 'center', fontSize: 9, margin: [0, 2, 0, 2] }, // Teacher Code
      { text: item.TEACHER_NAME|| 'N/A', alignment: 'center', fontSize: 9, margin: [0, 2, 0, 2] }, // Teacher Name
      { text: item.FATHERS_NAME|| 'N/A', alignment: 'center', fontSize: 9, margin: [0, 2, 0, 2] }, // Father's Name
      { text: item.SMS_MOBILE_NUM || 'N/A', alignment: 'center', fontSize: 9, margin: [0, 2, 0, 2] }, // Mobile Number
      { text: item.JOINING_DATE || 'N/A', alignment: 'center', fontSize: 9, margin: [0, 2, 0, 2] }  // Joining Date (DOF)
    ];

    tableBody.push(dataRow);
  });
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const pageWidth = 595.28; // A4 page width in points (8.27 inches * 72 points per inch)
  const pageHeight = 841.89; // A4 page height in points (11.69 inches * 72 points per inch)
  const imageWidth = 200; // Width of the watermark image
  const imageHeight = 200; // Height of the watermark image

  const centerX = (pageWidth - imageWidth) / 2;
  const centerY = (pageHeight - imageHeight) / 2;

  const docDefinition: any = {
    pageOrientation: 'portrait',

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
      { text: 'Teacher Information Report', bold: true, alignment: 'center', margin: [0, -17, 0, 15], fontSize: 12 },
      { text: 'Printing Date : ' +formattedDate, bold: true, alignment: 'center', margin: [0, -10, 0, 15], fontSize: 10 },
      {
        width: '100%',
        alignment: 'center',
        stack: [
          {
            table: {
              headerRows: 1, // Include header row in every page
              widths: ['5%', '14%', '26%', '26%', '15%', '14%'], // Adjust relative widths here
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


}
