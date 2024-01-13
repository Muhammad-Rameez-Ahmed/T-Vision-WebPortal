import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExportService {

  constructor() { }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const sheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json,);
    const book: XLSX.WorkBook = { Sheets: { 'data': sheet }, SheetNames: ['data'] };
    const excelBuffer: unknown = XLSX.write(book, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  exportClientAsExcelFile(json: any[], excelFileName: string): void {
    const sheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    XLSX.utils.sheet_add_aoa(sheet, [['S NO', 'PARTICULARS', 'FT', 'PAGES', 'DATE', 'JOB TYPE', 'STATUS']], { origin: "A1" });
    const wscols = [{ wch: 10 }, { wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 20 }, { wch: 20 },];
    sheet['!cols'] = wscols;

    const merge: XLSX.Range[] | undefined = [];

    json.forEach((el, i) => {
      if (!el.name && !el.created && !el.status) {
        merge.push({ s: { r: i + 1, c: 0 }, e: { r: i + 1, c: 6 } },);
      }
    });

    sheet["!merges"] = merge;

    const book: XLSX.WorkBook = { Sheets: { 'data': sheet }, SheetNames: ['data'], };
    const excelBuffer: unknown = XLSX.write(book, { bookType: 'xlsx', type: 'array', });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  // exportTeamClientAsExcelFile(json: any[], excelFileName: string): void {
  //   const sheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

  //   XLSX.utils.sheet_add_aoa(sheet, [['', 'FT', 'PAGES']], { origin: "A2" });
  //   // const wscols = [{ wch: 10 }, { wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 20 },];
  //   // sheet['!cols'] = wscols;

  //   // const merge: XLSX.Range[] | undefined = [];

  //   // json.forEach((el, i) => {
  //   //   if (!el.name && !el.created && !el.status) {
  //   //     merge.push({ s: { r: i + 1, c: 0 }, e: { r: i + 1, c: 5 } },);
  //   //   }
  //   // });

  //   // sheet["!merges"] = merge;

  //   const book: XLSX.WorkBook = { Sheets: { 'data': sheet }, SheetNames: ['data'], };
  //   const excelBuffer: unknown = XLSX.write(book, { bookType: 'xlsx', type: 'array', });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_exported' + EXCEL_EXTENSION);
  }

}
