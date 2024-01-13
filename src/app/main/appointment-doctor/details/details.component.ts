import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { addRecordsService } from 'src/app/shared/modal/add-records/add-records.service';
import Swal from 'sweetalert2';
import { AppointmentDoctorService } from '../appointment-doctor.service';
import { DetailsService } from './details.service';
import { RecordsTableService } from 'src/app/shared/component/tables/records-table/records-table.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


    constructor(
        private service: addRecordsService,
        private patientservice: RecordsTableService,
        private appoint: DetailsService,
        private appointments: AppointmentDoctorService,
        private router: Router
    ) { }

    selected = "Medication";
    record: any[] = []
    recordTypes = ['Medication', 'Allergies', 'Immunization', 'Labs/Test', 'Problems']
    medicationList: any[] = [];
    allergiesList: any[] = [];
    testList: any[] = [];
    problemList: any[] = [];
    displayAllergies: any[] = [];
    medicines: any[] = []
    allergies: any[] = []
    tests: any[] = []
    problems: any[] = []
    patientId: string | number = 0;
    notes: string = '';
    appointment: any;
    appointDate: any = '';
    currentDate: any = '';
    dateCheck = true;
    ngOnInit(): void {
        // this.recordTypeSelected()

        this.appointment = JSON.parse(localStorage.getItem('appointment') || '')
        this.patientId = this.appointment.appointmentPatient.patientId
        this.appointDate = this.appointment.appointmentDate.split('-')
        this.appointDate = new Date(this.appointDate[2], this.appointDate[1] - 1, this.appointDate[0])
        this.currentDate = new Date()

        // if (this.appointDate.getMilliseconds() < this.currentDate.getMilliseconds()) {
        //     console.log('lesser')
        // }
        // if (new Date(this.appointDate).toDateString() > new Date(this.currentDate).toDateString()) {
        //     this.dateCheck = true;
        //     console.log(true)
        // } else {
        //     this.dateCheck = false;
        //     console.log(false)
        // }
        this.currentDate.setDate(this.currentDate.getDate() + 1)
        const appointDate = new Date(this.appointDate);
        appointDate.setHours(0, 0, 0, 0);

        const currentDate = new Date(this.currentDate);
        currentDate.setHours(0, 0, 0, 0);

        if (currentDate.getTime() < appointDate.getTime()) {
            this.dateCheck = false;
        }
        console.log(this.dateCheck)
        console.log('appoint date', appointDate)
        console.log('current date', currentDate)
        this.getAllActiveMedication()
        this.getAllActiveAllergies()
        this.getAllActiveTest()
        this.getAllActiveProblems()
        this.getAllRecords()
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
        csvRows.push(d.join(','));

        for (const data of jsonData) {
            const values = headers.map(header => {
                const value = data[header];
                return `"${value}"`;
            });
            csvRows.push(values.join(','));
        }

        return csvRows.join('\n');
    }

    convertToJson() {

        let csvData = ''

        csvData = csvData + this.convertJsonToCsv([this.appointment].map((obj: any) => this.flattenObject(obj))) + '\n\n'
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
        // csvData = this.history.length != 0 ? csvData + this.convertJsonToCsv(this.history.map((obj: any) => this.flattenObject(obj))) + '\n\n' : csvData
        // csvData = this.upcoming.length != 0 ? csvData + this.convertJsonToCsv(this.upcoming?.map((obj: any) => this.flattenObject(obj))) + '\n\n' : csvData
        const link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData));
        link.setAttribute('download', 'data.csv');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }



    form = new FormGroup({
        bankMultiFilterCtrl: new FormControl('')
    })
    try: any;

    filterMyOptions(item: any) {
        // console.log(item)
    }

    test2() {
        // console.log(this.medicines)
    }


    meds: any;
    setMedicines() {
        // console.log(this.medicines)
    }

    recordTypeSelected() {
        if (this.selected === 'Medication') {
            this.getAllActiveMedication()
        }
        else if (this.selected === 'Allergies') {
            this.getAllActiveAllergies()
        }
        else if (this.selected === 'Immunization') {
            this.getAllActiveMedication()
        }
        else if (this.selected === 'Labs/Test') {
            this.getAllActiveMedication()
        }
        else if (this.selected === 'Problems') {
            this.getAllActiveMedication()
        }
    }
    displayList: any = {
        // medicineName: [],
        // testName: [],
        // allergyName: [],
        // diseaseName: []
    }
    filter(list: any[], event: any, key: string) {
        if (event.target.value) {
            // console.log(list)
            // console.log(event.target.value)
            this.displayList[key] = list.filter(x => x[key].toLowerCase().trim().includes(event.target.value.toLowerCase().trim()))
        }
        else {
            this.displayList[key] = list
        }

    }

    getAllActiveMedication() {
        this.service.getAllActiveMedications('').subscribe(res => {
            if (res['status'] === 200) {
                this.medicationList = res['data']

                this.medicationList = this.medicationList.map(x => ({
                    ...x,

                    prescribeMedicineMorning: false,
                    prescribeMedicineNotes: '',
                    prescribeMedicineDosage: '30mg',
                    prescribeMedicineTimeTaken: '1',
                    prescribeMedicineIsDailyDosage: false,
                    prescribeMedicineEvening: false,
                    prescribeMedicineNight: true
                }))
                this.displayList['medicineName'] = this.medicationList
            }
        })
    }
    getAllActiveAllergies() {
        this.service.getAllAllergies('').subscribe(res => {
            if (res['status'] === 200) {
                this.allergiesList = res['data']
                this.displayList['allergyName'] = this.allergiesList
            }
        })
    }

    getAllActiveTest() {
        this.service.getAllTest('').subscribe(res => {
            if (res['status'] === 200) {
                this.testList = res['data']
                this.displayList['testName'] = this.testList
            }
        })
    }
    getAllActiveProblems() {
        this.service.getAllProblem('').subscribe(res => {
            if (res['status'] === 200) {
                this.problemList = res['data']
                this.displayList['diseaseName'] = this.problemList
            }
        })
    }

    des = 'Are you sure want to mark Appointment as Completed?'
    forever: any;
    check() {
        let obj: any;
        let aler: any[] = [];
        let meds: any[] = [];
        let dis: any[] = [];
        let test: any[] = [];
        this.allergies.forEach(x => {
            aler.push(x.allergyId)
        })

        this.problems.forEach(x => {
            dis.push(x.diseaseID)
        })

        this.tests.forEach(x => {
            test.push(x.testID)
        })

        this.medicines.forEach(x => {
            meds.push({
                medicineId: x.medicineId,
                prescribeMedicineMorning: x.prescribeMedicineMorning,
                prescribeMedicineNotes: x.prescribeMedicineNotes,
                prescribeMedicineDosage: x.prescribeMedicineDosage,
                prescribeMedicineTimeTaken: x.prescribeMedicineTimeTaken,
                prescribeMedicineIsDailyDosage: x.prescribeMedicineIsDailyDosage,
                prescribeMedicineEvening: x.prescribeMedicineEvening,
                prescribeMedicineNight: x.prescribeMedicineNight
            })
        })
        obj = {
            sessionId: this.appointment.appointmentSession.sessionId,
            patientId: this.appointment.appointmentPatient.patientId,
            appointmentId: this.appointment.appointmentId,
            Allergies: aler,
            Medicines: meds,
            diseases: dis,
            tests: test,
            notes: this.notes
        }
        Swal.fire({
            title: 'Completed?',
            text: this.appointDate > this.currentDate ? 'Are you sure want to mark a future Appointment as Completed?' : 'Are you sure want to mark Appointment as Completed?',
            icon: 'warning',
            cancelButtonText: 'No',
            confirmButtonText: 'yes',
            // confirmButtonColor: '#6e7881',
            showCancelButton: true,
            showDenyButton: false,
            showConfirmButton: true

        }).then(res => {
            // console.log(res)
            if (res.isConfirmed) {

                let fd = new FormData()
                fd.append('data', JSON.stringify(obj))
                this.appoint.setAppointment(fd).subscribe(res => {
                    if (res['status'] === 200) {
                        let fd = new FormData();
                        fd.append('appointmentId', this.appointment.appointmentId)
                        fd.append('appointmentStatus', '3')
                        this.appointments.updateAppStatus(fd).subscribe(resp => {
                            if (resp['status'] === 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Successful!',
                                    text: resp['message'],
                                    confirmButtonColor: '#0D67B5'
                                })
                                this.router.navigate(['/dashboard/doc-appointments'])
                            }
                            else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error Code ' + resp['status'],
                                    text: resp['message'],
                                    confirmButtonColor: '#0D67B5'
                                })
                            }
                        }, err => {
                            // // console.log(err);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error Code ' + err['status'],
                                text: err['message'],
                                confirmButtonColor: '#0D67B5'
                            })
                        })
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error Code ' + res['status'],
                            text: res['message'],
                            confirmButtonColor: '#0D67B5'
                        })
                    }
                }, err => {
                    // // console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Code ' + err['status'],
                        text: err['message'],
                        confirmButtonColor: '#0D67B5'
                    })
                })
            }
        })
    }

    data: any;
    sdata: any;
    getAllRecords() {
        let fd = new FormData()
        fd.append('patientId', this.patientId.toString())
        this.patientservice.getAllRecords(fd).subscribe(x => {
            this.data = x
            this.sdata = this.data

            this.sdata['LabTests'].forEach((x: any) => {
                x.testResult = JSON.parse(x.testResult)
            })
        })
    }
}
