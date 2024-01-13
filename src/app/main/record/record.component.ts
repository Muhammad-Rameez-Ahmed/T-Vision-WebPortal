import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RecordService } from './record.service';
import { Record } from './record.model';
import { RecordDetailsComponent } from 'src/app/shared/modal/record-details/record-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import csvDownload from 'json-to-csv-export';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit {
  apiResponseData: any;
  delete() {
    throw new Error('Method not implemented.');
  }
  update() {
    throw new Error('Method not implemented.');
  }
  inputValue: any;

  add() {
    throw new Error('Method not implemented.');
  }
  loading: boolean = true;
  notfound: boolean = false;
  modellist: Record[] = [];
  field: string = 'index';
  page: number = 1;
  size: number = 10;
  total: number = 0;
  data: any;
  list: Record[] = [];
  constructor(private record: RecordService, public modal: NgbModal) {}

  ngOnInit(): void {
    this.getAllShirts();
    console.log();
  }

  pageChange(event: any) {
    // console.log(event)
    this.list = this.modellist.slice(
      (event - 1) * this.size,
      event * this.size
    );
    // // console.log(this.list)
  }

  getAllShirts() {
    this.record.getAllShirts().subscribe(
      (res: any) => {
        if (res['status'] === 302) {
          this.apiResponseData = res.data;
          console.log(this.apiResponseData);

          this.modellist = res['data'].sort((a: any, b: any) =>
            a.staffId > b.staffId ? -1 : 1
          );
          // this.modellist.forEach(item => {
          //     let profile: Profile = {};
          //     profile['name'] = item.staffName
          //     profile['email'] = item.staffEmail
          //     profile['Contact Number'] = item.staffContact
          //     profile['Address'] = item.staffAddress
          //     profile['Role'] = item.staffDesignation
          //     profile['Status'] = item.staffIsActive ? 'Active' : 'InActive'
          //     this.profiles.push(profile)
          // })
          this.data = res['data'];
          this.loading = false;
          // this.modellist = this.data.filter((x: any) => x.staffIsActive === true)
          // console.log(this.modellist)
          this.list = this.modellist.slice(0, 10);
          // this.page = 1;

          this.pageChange(this.page);
        } else {
          // console.log(res)
          Swal.fire({
            title: 'Error Code' + res['status'],
            text: res['message'],
            icon: 'error',
            confirmButtonText: 'Close',
            confirmButtonColor: '#6e7881',
          });
          this.notfound = true;
          this.loading = false;
        }
      },
      (err) => {
        // // console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error Code ' + err['status'],
          text: err['message'],
          confirmButtonColor: '#0D67B5',
        });
        this.loading = false;
        this.notfound = true;
      }
    );
  }

  showView(data: Record) {
    // const modalRef = this.modal.open(AppointmentsViewComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
    const modalRef = this.modal.open(RecordDetailsComponent, {
      windowClass: 'modal-animate',
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;

    let obj = {
      widthTop: data.widthTop,
      widthCenter: data.widthCenter,
      sleevesLengthLeft: data.sleevesLengthLeft,
      sleevesLengthRight: data.sleevesLengthRight,
      sleevesLeftWidth: data.sleevesLeftWidth,
      sleevesRightWidth: data.sleevesRightWidth,
      averageVariance: data.averageVariance,
      submittedTime: data.submittedTime,
      imageURL: data.imageURL,
      shirtStatus: data.shirtStatus,
      userName: data.userName,
      length: data.length,
    };

    modalRef.componentInstance.model = obj;
  }

  Search() {
    // this.filter.castValue.subscribe((value: string) => {
    console.log('searched: ', this.inputValue);
    if (this.inputValue) {
      // this.inputValue = this.inputValue.trim().toLowerCase()
      this.list = this.modellist.filter((x: Record) => {
        return (
          x.userName?.trim().toLowerCase().includes(this.inputValue) ||
          x.shirtStatus?.trim().toLowerCase().includes(this.inputValue)
        );
      });
    } else {
      this.list = this.modellist.slice(0, 10);
    }
    // }
    // );
  }

  flattenObject(obj: object): object {
    const flattened: any = {};

    function flattenHelper(currentObj: any, prefix = '') {
      for (const key in currentObj) {
        if (currentObj.hasOwnProperty(key)) {
          const value = currentObj[key];
          const flattenedKey = prefix ? `${prefix}.${key}` : key;

          if (typeof value === 'object' && value !== null) {
            flattenHelper(value, flattenedKey);
          } else {
            flattened[flattenedKey] = value ? value : '-';
          }
        }
      }
    }

    flattenHelper(obj);

    return flattened;
  }

  mergeAndAddKeys(objects: any[]): any {
    return objects.reduce((mergedObject, currentObject) => {
      Object.keys(currentObject).forEach((key) => {
        mergedObject[key] = true; // You can assign any value you prefer here
      });
      return mergedObject;
    }, {});
  }

  export() {
    let list: any[] = [];
    let header: any[] = [];
    Object.keys(this.data).forEach((x) => {
      if (x !== 'status') {
        list = [...list, ...this.data[x]];
        header = [...header, Object.keys(this.data[x][0])];
      }
    });
    let d = list.map((obj: any) => this.flattenObject(obj));
    let dataToConvert = {
      data: d,
      filename: 'ip_addresses_report',
      delimiter: ',',
    };
    csvDownload(dataToConvert);
  }

  convertJsonToCsv(jsonData: any[]): string {
    const csvRows = [];
    const headers = Object.keys(jsonData[0]);
    let d: any[] = [];
    headers.forEach((e) => {
      if (e.includes('.')) {
        d.push(e.split('.')[e.split('.').length - 1]);
      } else {
        d.push(e);
      }
    });
    // Add headers to the CSV rows
    csvRows.push(d.join(','));

    // Iterate over the JSON data and convert each object to a CSV row
    for (const data of jsonData) {
      const values = headers.map((header) => {
        const value = data[header];
        // Handle cases where the value contains a comma
        // if (value && value.includes(',')) {
        // return `"${value}"`;
        // }
        return `"${value}"`;
      });
      csvRows.push(values.join(','));
    }

    // Join all CSV rows with a new line character
    return csvRows.join('\n');
  }

  convertToJson() {
    let csvData = '';

    csvData =
      csvData +
      this.convertJsonToCsv(
        [this.modellist].map((obj: any) => this.flattenObject(obj))
      ) +
      '\n\n';
  }

  downloadCSV() {
    // Simulating API response data
    // const apiResponseData = [
    //   { id: 1, name: 'John Doe', email: 'john@example.com' },
    //   { id: 2, name: 'Jane Smith', email: 'jane@example.com' }

    //   // ... other API response data
    // ];

    // Format data to CSV
    const csvData = this.convertToCSV(this.apiResponseData);

    // Trigger file download
    this.downloadFile(csvData, 'Data.csv');

    setTimeout(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your csv has been download',
        showConfirmButton: false,
        timer: 1500,
      });
    }, 500);
  }

  convertToCSV(data: any[]): string {
    const csvHeader = Object.keys(data[0]).join(',');
    const csvRows = data.map((row) => Object.values(row).join(','));
    return csvHeader + '\n' + csvRows.join('\n');
  }

  downloadFile(data: string, filename: string) {
    const blob = new Blob([data], { type: 'text/csv' });

    if ((window.navigator as any)?.msSaveOrOpenBlob) {
      // For IE
      (window.navigator as any).msSaveOrOpenBlob(blob, filename);
    } else {
      // For other browsers
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;

      link.click();

      // Clean up
      window.URL.revokeObjectURL(blobUrl);
      link.remove();
    }
  }
}
