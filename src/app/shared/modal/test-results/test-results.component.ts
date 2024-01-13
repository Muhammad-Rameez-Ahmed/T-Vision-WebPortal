import { Component, Input, OnInit } from '@angular/core';
import { TestResultsService } from './test-results.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-test-results',
    templateUrl: './test-results.component.html',
    styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit {

    @Input() data: any;
    constructor(
        private testService: TestResultsService,
        private modal: NgbModal
    ) { }

    loading = false;
    display: any;
    recordList: any[] = [
        {
            Description: '',
            Result: '',
            NormalRange: ''
        }
    ]
    ngOnInit(): void {
        if (this.data.testResult && this.data.testResult !== '') {
            this.display = JSON.parse(this.data.testResult)
        }
    }

    add() {
        this.recordList.push({

            Description: '',
            Result: '',
            NormalRange: ''
        })
    }
    submit() {
        let fd = new FormData()
        fd.append('appointmentId', this.data.appointmentId.appointmentId)
        fd.append('staffId', JSON.parse(localStorage.getItem('User') || '')?.Id)
        fd.append('labTestResult', JSON.stringify(this.recordList))
        fd.append('testID', this.data.testID)
        Swal.fire({
            title: 'Confirm?',
            text: 'Are you sure you want to add Test Results?',
            icon: 'warning',
            cancelButtonText: 'No',
            denyButtonText: 'yes',
            // confirmButtonColor: '#6e7881',
            showCancelButton: true,
            showDenyButton: true,
            showConfirmButton: false

        }).then(res => {
            this.loading = true
            if (res.isDenied) {
                this.testService.updateTest(fd).subscribe(x => {
                    if (x.status === 200) {

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful!',
                            text: x['message'],
                            confirmButtonColor: '#0D67B5'
                        })
                        this.modal.dismissAll(true);
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error Code ' + x['status'],
                            text: x['message'],
                            confirmButtonColor: '#0D67B5'
                        })
                    }
                    this.loading = false
                }, err => {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error Code ' + err['status'],
                        text: err['message'],
                        confirmButtonColor: '#0D67B5'
                    })
                    this.loading = false
                })
            }
            else {

                this.loading = false
            }

        })
    }
    remove(i: number) {
        if (i >= 0 && i < this.recordList.length) {
            this.recordList.splice(i, 1);
        }
    }

    export() {
        const transformed_data: { [key: string]: any[] } = {};

        // Iterate over the list of objects
        for (const obj of this.display) {
            // Iterate over each key-value pair in the object
            for (const [key, value] of Object.entries(obj)) {
                // If the key is not present in transformed_data, create a new array
                if (!transformed_data[key]) {
                    transformed_data[key] = [];
                }
                // Push the value to the corresponding array
                transformed_data[key].push(value);
            }
        }
        // console.log(transformed_data)
        const keys = Object.keys(transformed_data);

        // Create the CSV header
        const header = keys.join(',');

        // Create the CSV rows
        const rows = transformed_data[keys[0]].map((_, index) => {
            return keys.map(key => transformed_data[key][index]).join(',');
        });

        // Combine the header and rows
        const csv = `${header}\n${rows.join('\n')}`;

        // console.log(csv)
        const link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
        link.setAttribute('download', this.data.testName + '.csv');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
