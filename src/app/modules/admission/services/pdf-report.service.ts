import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
interface CustomDocDefinition {
  content: any[];
  styles?: { [key: string]: any };
  [key: string]: any; // Allow additional properties
}
@Injectable({
  providedIn: 'root'
})
export class PdfReportService {

  constructor() {
    this.loadCustomFonts();
  }
  async loadCustomFonts() {
    const fontPath = 'assets/fonts/Kalpurush.ttf';
    const fontBase64 = await this.loadFont(fontPath);
    const robotoFontPath = 'assets/fonts/Roboto.ttf';
    const robotoFontBase64 = await this.loadFont(robotoFontPath);
    pdfMake.vfs['Kalpurush.ttf'] = fontBase64;
    pdfMake.vfs['Roboto.ttf'] = robotoFontBase64;
    (pdfMake as any).fonts = {
      ...pdfMake.fonts,
      Kalpurush: {
        normal: 'Kalpurush.ttf',
        bold: 'Kalpurush.ttf',
        italics: 'Kalpurush.ttf',
        bolditalics: 'Kalpurush.ttf'
      },
      Roboto:{
        normal: 'Roboto.ttf',
        bold: 'Roboto.ttf',
        italics: 'Roboto.ttf',
        bolditalics: 'Roboto.ttf'
      }
    };
  }

  private loadFont(url: string): Promise<string> {
    return fetch(url)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const binary = new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '');
        return btoa(binary);
      });
  }

  generateStudentReport(student: any) {


    const logoImageUrl = '../../assets/kmc.jpeg';
    const logoImageBase64 = this.getBase64Image(logoImageUrl);
    const documentDefinition: CustomDocDefinition = this.getDocumentDefinition(student,logoImageBase64);
    pdfMake.createPdf(documentDefinition).open();
  }

  getDocumentDefinition(student: any, logo: string): CustomDocDefinition {
    return {
      content: [
        {
          columns: [
            {
              image: logo,
              width: 40,
              height: 40,
              alignment: 'center'
            },
            {
              width: '*',
              stack: [
                { text: `${student?.DD?.BASIC_INFO?.ORG_NAME}`, style: 'header' },
                {
                  text: `${student?.DD?.BASIC_INFO?.CAMPUS_NAME}\nADMISSION FORM`,
                  style: 'subheader'
                }
              ]
            }
          ],
          columnGap: 10, // Adjust gap between columns
          marginBottom: 10 // Adjust margin as needed
        },

        {
          columns: [
            {
              width: '*',
              stack: [
                {
                  columns: [
                    {
                      width: '*',
                      stack: [
                        { text: `Form No: ${student?.DD?.BASIC_INFO?.FORM_NO}`, margin: [0, 3, 0, 0] },
                        { text: `Board Admission Roll: ${student?.DD?.BASIC_INFO?.ADMISSION_ROLL}`, margin: [0, 3, 0, 0] },
                        { text: `Class Name: ${student?.DD?.BASIC_INFO?.CLASS_NAME}`, margin: [0, 3, 0, 0] },
                        { text: `Group Name: ${student?.DD?.BASIC_INFO?.GROUP_NAME}`, margin: [0, 3, 0, 0] },
                        { text: `Session Name: ${student?.DD?.BASIC_INFO?.SESSION_NAME}`, margin: [0, 3, 0, 0] },
                        { text: `Student Code: ${student?.DD?.BASIC_INFO?.STUDENT_CODE}`, margin: [0, 3, 0, 0] },
                        { text: `Student Name: ${student?.DD?.BASIC_INFO?.STUDENT_NAME}`, margin: [0, 3, 0, 0] }
                      ]
                    },
                    

                    {
                      width: 90,
                      image: `data:image/png;base64,${student?.DD?.BASIC_INFO?.ImageByte}`,
                      height: 90,
                      alignment: 'center'
                    }
                  ]
                },

              ]
            },

          ],
          columnGap: 10, // Adjust gap between columns
        },


        {
          columns: [
            {
              width: '*',
              stack: [
                {
                  columns: [
                    {
                      width: '*',
                      stack: [
                        { text: `Sms Mobile Number: ${student?.DD?.BASIC_INFO?.SMS_MOBILE_NUM}`, margin: [0, 3, 0, 0] },
                        { text: `Admission Date: ${student?.DD?.BASIC_INFO?.ADMISSION_DATE}`, margin: [0, 3, 0, 0] },
                        { text: `Date of Birth: ${student?.DD?.BASIC_INFO?.DATE_OF_BIRTH}`, margin: [0, 3, 0, 0] },
                        { text: `Gender: ${student?.DD?.BASIC_INFO?.GENDER_NAME}`, margin: [0, 3, 0, 0] },
                        { text: `Religion: ${student?.DD?.BASIC_INFO?.RELIGION_NAME}`, margin: [0, 3, 0, 0] },
                        { text: `Nationality: ${student?.DD?.BASIC_INFO?.NATIONALITY_NAME}`, margin: [0, 3, 0, 0] },
                        { text: `Blood Group: ${student?.DD?.BASIC_INFO?.BLOOD_GROUP_NAME}`, margin: [0, 3, 0, 0] },
                        {
                          text: `Present Address: ${student?.DD?.BASIC_INFO?.PRESENT_ADDR}`,
                          margin:  [0, 3, 0, 0]
                        },
                        {
                          text: `Permanent Address: ${student?.DD?.BASIC_INFO?.PERMANENT_ADDR}`,
                          margin:  [0, 3, 0, 0]
                        }

                      ]
                    },
                  ]
                },

              ]
            },

          ],
          columnGap: 10, // Adjust gap between columns
          marginBottom: 10 // Adjust margin as needed
        },

        {
          columns: [
            {
              width: '*',
              stack: [
                {
                  columns: [
                    {
                      width: '*',
                      stack: [
                        { text: `Father's Name:  ${student?.DD?.BASIC_INFO?.FATHERS_NAME}`, margin: [0, 3, 0, 0] },
                        { text: `Father's Contact Number: ${student?.DD?.BASIC_INFO?.FATHER_CONTACT_NO}`, margin: [0, 3, 0, 0] },
                        { text: `Father's Occupation: ${student?.DD?.BASIC_INFO?.FATHER_OCCUPATION_NAME}`, margin: [0, 3, 0, 0] },
                        { text: `Parent's Monthly Income:  ${student?.DD?.BASIC_INFO?.PARENTS_MON_INCOME}`, margin: [0, 3, 0, 0] },
                      ]
                    },


                    {
                      width: '*',
                      stack: [
                        { text: `Mother's Name: ${student?.DD?.BASIC_INFO?.MOTHERS_NAME}`, margin: [0, 3, 0, 0] },
                        { text: `Mother's Contact Number: ${student?.DD?.BASIC_INFO?.MOTHER_CONTACT_NO}`, margin: [0, 3, 0, 0] },
                        { text: `Mother's Occupation: ${student?.DD?.BASIC_INFO?.MOTHER_OCCUPATION_NAME}`, margin: [0, 3, 0, 0] },
                      ]
                    },
                  ]
                },

              ]
            },

          ],
          columnGap: 10, // Adjust gap between columns
        //  marginBottom: 10 // Adjust margin as needed
        },




        {
          width: '*',
          stack: [
            { text: 'Previous Education Information:', marginTop: 20 ,marginBottom:5,
              italics:true },
            this.getEducationTable(student.DD.EDUCATION_INFO)
          ]
        },
        {
          text: 'Subject to Acceptance:',
          marginTop: 15 ,
          italics:true// Adjust margin as needed
        },
        this.getSubjectsList(student.DD.SUBJECT_INFO),
        

          { text: `I, the undersigned, hereby declare that the information provided in the admission form is completely true. If any information is found to be false, the admission will be considered cancelled. I also undertake to attend classes regularly, participate in exams, pay the college dues on time, and abide by all the rules and regulations. I accept that I shall be bound by any decisions made by the college authorities.`, margin: [0, 10, 0, 0] },

      ],
      
      styles: {

        header: {
          fontSize: 16,
          bold: true,
          alignment:'center',
          margin: [0, 0, 0, 0]
        },
        subheader: {
          fontSize: 12,
          alignment:'center',
          margin: [0, 0, 0, 5]
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'black'
        }
      }
      
    };
    
  }

  getEducationTable(previousEducation: any[]) {

    
    return {
      table: {
        widths: [65,110, '*','*', 40, 70,35],
        body: [
          [
            { text: 'Exam Name', style: 'tableHeader' },
            { text: 'Institute', style: 'tableHeader' },
            { text: 'Roll No', style: 'tableHeader' },
            { text: 'Reg No', style: 'tableHeader' },
            { text: 'Board', style: 'tableHeader' },
            { text: 'Passing Year', style: 'tableHeader' },
            { text: 'Result', style: 'tableHeader' },
          ],
          ...previousEducation.map(ed => [ed?.EXAM_NAME, ed?.INSTITUTE, ed?.ROLL_NO,ed?.REG_NO,ed?.BOARD,ed?.PASSING_YEAR,ed?.RESULT])
       
        ]
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
    };
  }


  getSubjectsList(subjects: any[]) {
    subjects.sort((a, b) => a.SUBJECT_CODE - b.SUBJECT_CODE);
    const subjectNames = subjects.map(subject => subject?.SUBJECT_NAME || '');

    const numColumns = 3;
    const subjectsPerColumn = Math.ceil(subjectNames.length / numColumns);

    const columns = [];
    for (let i = 0; i < numColumns; i++) {
        const columnSubjects = subjectNames.slice(i * subjectsPerColumn, (i + 1) * subjectsPerColumn);
        columns.push({
            ul: columnSubjects.map(subject => ({
                text: subject,
                font: 'Kalpurush'
            }))
        });
    }

    const formattedColumns = columns.map(column => ({
        stack: column.ul.map(item => ({ ul: [item] })) // Wrap each item in ul to create bullet points
    }));

    return {
        columns: formattedColumns,
        margin: [0, 5] // Adjust margins as needed
    };
  }



  private getBase64Image(imageUrl: string): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageUrl;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx!.drawImage(img, 0, 0);
    return canvas.toDataURL('image/jpeg');
  }
}
