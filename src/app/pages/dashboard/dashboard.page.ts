import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  inputValues: string = '';
  processedValues: string[] = [];
  fileSelected: boolean = false;
  viewButtonClicked: boolean = false;
  uploadedFile: File | null = null; // Track the uploaded file
  uploadedFileName: string = ''; // Display the uploaded file name
  

  constructor(private router: Router) { }

  

  removeValue(index: number) {
    if (index >= 0 && index < this.processedValues.length) {
      this.processedValues.splice(index, 1);
    }
  }

  processValues() {
    if (this.processedValues.length > 0) {
      const remainingValues = this.processedValues.join(', ');
      alert('Remaining values:\n' + remainingValues);
      this.processedValues = [];
    } else {
      console.log('No values remaining to generate report.');
    }
  }

  isValidFormat(value: string): boolean {
    const regex = /^FAN-(WI|EA|SC)-\d{4}-\d+$/;
    return regex.test(value);
  }

  isValidInput(): boolean {
    if (!this.inputValues) {
      return false;
    }

    const valuesArray = this.inputValues.split(',').map((value: string) => value.trim());
    return valuesArray.every((value: string) => this.isValidFormat(value));
  }

  handleFileInput(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile: File = fileList[0];
      if (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls')) {
        this.fileSelected = true;
        this.uploadedFile = selectedFile;
        this.uploadedFileName = selectedFile.name;
        this.processExcelFile(selectedFile);
      } else {
        console.log('Invalid file format. Please select an Excel file.');
        this.fileSelected = false;
      }
    }
  }

  processExcelFile(file: File): void {
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const data: ArrayBuffer = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      const excelData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Extract values starting with "FAN" and add to processedValues
      const excelValues = excelData.reduce((acc: string[], row: any) => {
        const fanValues = row.filter((value: string) => value.startsWith('FAN'));
        return acc.concat(fanValues);
      }, []);
      this.processedValues = excelValues;
      this.viewButtonClicked = false; 
    };
    fileReader.readAsArrayBuffer(file);
  }

  viewListFromExcel() {
    if (this.uploadedFile) {
      const fileReader: FileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const data: ArrayBuffer = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
        const sheetName: string = workbook.SheetNames[0];
        const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
        const excelData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

       
        const excelValues = excelData.reduce((acc: string[], row: any) => {
          const fanValues = row.filter((value: string) => value.startsWith('FAN'));
          return acc.concat(fanValues);
        }, []);

        
        const inputValuesArray = this.inputValues.split(',').map((value: string) => value.trim());
        this.processedValues = [...inputValuesArray, ...excelValues];
        this.viewButtonClicked = true;
      };
      fileReader.readAsArrayBuffer(this.uploadedFile);
    } else {
      console.log('No uploaded file.');
      
      if (this.inputValues) {
        const inputValuesArray = this.inputValues.split(',').map((value: string) => value.trim());
        this.processedValues = inputValuesArray;
        this.viewButtonClicked = true;
      } else {
        console.log('No input values.');
      }
    }
  }


 

  ngOnInit() {
    // Initialization code goes here if needed
  }
}
  