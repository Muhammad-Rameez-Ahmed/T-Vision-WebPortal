import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRecordsComponent } from 'src/app/shared/modal/add-records/add-records.component';
import { AppointmentDetailsComponent } from 'src/app/shared/modal/appointment-details/appointment-details.component';
import { Patients } from '../patients.model';
import { DetailsService } from './details.service';
import { RecordsTableService } from 'src/app/shared/component/tables/records-table/records-table.service';
import csvDownload from 'json-to-csv-export'

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

    active = 1;
    constructor(
        public modal: NgbModal,
        private details: DetailsService,
        private service: RecordsTableService,

        private cdref: ChangeDetectorRef
    ) { }

    patient: Patients | null = null;
    patientId: string | number = '0';
    notesList: any[] = [];
    upcoming: any[] = [];
    history: any[] = [];
    ngOnInit(): void {
        this.patient = (JSON.parse(localStorage.getItem('patient') || ''))
        this.patientId = this.patient?.patientId || 0
        this.getAppointmentHistory();
        this.getAppointmentUpcoming();
        this.getAllRecords()
    }

    addRecord() {

        this.modal.open(AddRecordsComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
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
            Object.keys(currentObject).forEach(key => {
                mergedObject[key] = true; // You can assign any value you prefer here
            });
            return mergedObject;
        }, {});
    }

    export() {
        let list: any[] = []
        let header: any[] = []
        Object.keys(this.data).forEach(x => {
            if (x !== 'status') {
                list = [...list, ...this.data[x]]
                header = [...header, Object.keys(this.data[x][0])]
            }
        })
        let d = list.map((obj: any) => this.flattenObject(obj));
        let dataToConvert = {
            data: d,
            filename: 'ip_addresses_report',
            delimiter: ','
        }
        csvDownload(dataToConvert)

    }



    convertJsonToCsv(jsonData: any[]): string {
        const csvRows = [];
        const headers = Object.keys(jsonData[0]);
        let d: any[] = [];
        headers.forEach(e => {
            if (e.includes('.')) {

                d.push(e.split('.')[e.split('.').length - 1])
            }
            else {
                d.push(e)
            }
        })
        // Add headers to the CSV rows
        csvRows.push(d.join(','));

        // Iterate over the JSON data and convert each object to a CSV row
        for (const data of jsonData) {
            const values = headers.map(header => {
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
        // const csvData = this.convertJsonToCsv(this.data.diagnosesDiseases.map((obj: any) => this.flattenObject(obj)));

        let csvData = ''

        csvData = csvData + this.convertJsonToCsv([this.patient].map((obj: any) => this.flattenObject(obj))) + '\n\n'
        Object.keys(this.data).forEach(x => {
            if (x !== 'status' && x !== 'LabTests') {
                csvData = this.data[x].length != 0 ? csvData + this.convertJsonToCsv(this.data[x].map((obj: any) => this.flattenObject(obj))) + '\n\n' : csvData;
            }
            if (x === 'LabTests') {
                let copydata = this.data[x]
                copydata.forEach((y: any) => {
                    if (y.testResult) {
                        const transformed_data: { [key: string]: any[] } = {};
                        // Iterate over the list of objects
                        for (const obj of y.testResult) {
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
                        y.testResult = transformed_data

                        const transformedData: any[] = [];

                        y.testResult.Description.forEach((desc: any, index: string | number) => {
                            const transformedItem = {
                                testID: y.testID,
                                testName: y.testName,
                                doctorId: y.testRecommendedBy.doctorId,
                                doctorName: y.testRecommendedBy.doctorName,
                                testCreatedAt: y.testCreatedAt,
                                Description: desc,
                                Result: y.testResult.Result[index],
                                NormalRange: y.testResult.NormalRange[index],
                            };

                            transformedData.push(transformedItem)

                        });
                        // transformedData.forEach(p => {
                        csvData = csvData + this.convertJsonToCsv(transformedData)
                        // })
                        csvData = csvData + '\n\n'

                    }
                })


                this.data[x]
            }
        });
        csvData = this.history.length != 0 ? csvData + this.convertJsonToCsv(this.history.map((obj: any) => this.flattenObject(obj))) + '\n\n' : csvData
        csvData = this.upcoming.length != 0 ? csvData + this.convertJsonToCsv(this.upcoming?.map((obj: any) => this.flattenObject(obj))) + '\n\n' : csvData
        // csvData = this.notesList ? csvData + this.convertJsonToCsv(this.notesList.map((obj: any) => this.flattenObject(obj))) + '\n\n' : ''
        // Create a temporary anchor element to download the CSV file
        const link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData));
        link.setAttribute('download', 'data.csv');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }



    addAppointment() {


        this.modal.open(AppointmentDetailsComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
    }


    getAppointmentHistory() {
        let fd = new FormData()
        fd.append('appointmentPatient', JSON.stringify(this.patientId))
        fd.append('appointmentDate', this.dateFormatter())
        this.details.getPatientAppoitmentHistory(fd).subscribe(res => {
            this.history = res['data']
            res['data'].forEach((x: any) => {
                if (x.appointCheckupNotes && x.appointCheckupNotes !== '-') {
                    this.notesList.push({ note: x.appointCheckupNotes, doctor: x.appointmentDoctorId.doctorName, date: x.appointmentDate })
                }
            });
        })
    }
    getAppointmentUpcoming() {
        let fd = new FormData()
        fd.append('appointmentPatient', JSON.stringify(this.patientId))
        fd.append('appointmentDate', this.dateFormatter())
        this.details.getPatientAppoitmentUpcoming(fd).subscribe(res => {
            this.upcoming = res['data']
            // res['data'].forEach((x: any) => {
            //     if (x.appointCheckupNotes && x.appointCheckupNotes !== '-') {
            //         this.notesList.push({ note: x.appointCheckupNotes, doctor: x.appointmentDoctorId.doctorName, date: x.appointmentDate })
            //     }
            // });
        })
    }

    dateFormatter() {
        let date = new Date();
        const yyyy = date.getFullYear();
        let mm = (date.getMonth() + 1).toString();
        let dd = date.getDate().toString();

        if (+dd < 10) dd = '0' + dd;
        if (+mm < 10) mm = '0' + mm;

        return dd + '-' + mm + '-' + yyyy;
    }


    data: any;
    sdata: any;
    getAllRecords() {
        let fd = new FormData()
        fd.append('patientId', this.patientId.toString())
        this.service.getAllRecords(fd).subscribe(x => {
            this.data = x
            this.sdata = this.data

            this.sdata['LabTests'].forEach((x: any) => {
                x.testResult = JSON.parse(x.testResult)
            })
        })
    }

    // ngAfterContentChecked() {
    //     this.cdref.detectChanges();
    // }




}
