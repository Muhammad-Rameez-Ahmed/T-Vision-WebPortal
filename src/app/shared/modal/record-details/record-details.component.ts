import { Component, Input, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styleUrls: ['./record-details.component.scss'],
})
export class RecordDetailsComponent implements OnInit {
  @Input() inputValue: record = { name: '', info: '', des: '' };
  model: any;
  image: any;
  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    // console.log(this.inputValue)
    localStorage.setItem('modelData', JSON.stringify(this.model));
    console.log(this.model);
  }

  downloadCSV() {
    // Simulating API response data
    // const apiResponseData = [
    //   { id: 1, name: 'John Doe', email: 'john@example.com' },
    //   { id: 2, name: 'Jane Smith', email: 'jane@example.com' }

    //   // ... other API response data
    // ];

    // Format data to CSV

    let myArray = [];
    myArray.push(this.model);
    const csvData = this.convertToCSV(myArray);

    // Trigger file download
    this.downloadFile(csvData, 'Record.csv');
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

interface record {
  name: string;
  info: string;
  des: string;
}
