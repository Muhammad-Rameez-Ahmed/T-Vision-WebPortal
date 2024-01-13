import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, startWith, Subject } from 'rxjs';
import { AppointmentDetailsService } from './appointment-details.service';
import { Patients } from './appointment-details.model'
import Swal from 'sweetalert2';
// import { DateFormat, DateType, DateValidators } from 'ngx-mat-calendar';


export interface User {
    name: string;
}
@Component({
    selector: 'app-appointment-details',
    templateUrl: './appointment-details.component.html',
    styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent implements OnInit {


    myControl = new FormControl<string | User>('');
    options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
    filteredOptions!: Observable<User[]>;
    reason: string = '';

    d = {
        year: 2020,
        month: 5,
        day: 16,
    }

    appointmentForm = new FormGroup({
        date: new FormControl(this.d, [Validators.required]),
        patient: new FormControl('', [Validators.required]),
        session: new FormControl('', [Validators.required]),
        reason: new FormControl(''),
        doctor: new FormControl(0),
    });


    @Input() data: any;
    @Input() modelDate: any;
    model: NgbDateStruct | undefined;
    date: { year: number; month: number; } | undefined;

    activeId = 1;
    constructor(
        private modal: NgbModal,
        private calendar: NgbCalendar,
        private appointment: AppointmentDetailsService,
    ) { }




    chat = '../../../../assets/images/Group 18383.png';
    doc = '../../../../assets/images/Group  18451.png';
    video = '../../../../assets/images/Group  18383(1).png';



    minDate: NgbDateStruct = {

        year: 2000,
        month: 1,
        day: 1
    };
    maxDate: NgbDateStruct = {

        year: 2000,
        month: 1,
        day: 1
    };
    list: Patients[] = [];

    ngOnInit(): void {
        let temp = new Date(this.modelDate).toLocaleDateString().split('/')
        this.model = {
            year: +temp[2],
            month: +temp[0],
            day: +temp[1]
        }



        this.appointmentForm.controls['date'].setValue(this.model)
        this.appointmentForm.controls['doctor'].setValue(this.data.slotDoctorId.doctorId)
        const current = new Date(new Date().setDate(this.modelDate.getDate()));
        this.minDate = { year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate() };
        this.maxDate = { year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate() };
        this.getAllPatients()
    }

    patientDetails: any;
    disabled = true;
    selectedPatient(e: any) {
        // console.log(e)
        this.disabled = false
        this.patientDetails = e;
    }


    getAllPatients() {
        // console.log('patient')
        let fd = new FormData();
        fd.append('patientBelongsToSite', JSON.parse(localStorage.getItem('User') || '')?.siteID)
        this.appointment.getAllPatients(fd).subscribe((res: any) => {
            if (res['status'] === 200) {
                this.list = res['data']
            }
            // console.log(res)
        })
    }
    activeButton: any;
    setActive(buttonName: any) {
        this.activeButton = buttonName;
        this.appointmentForm.controls['session'].setValue(this.data.sessions.filter((x: any) => x.sessionStartTime === this.activeButton)[0].sessionId)
    }
    isActive(buttonName: any) {
        return this.activeButton === buttonName;
    }


    submit() {
        let fd = new FormData()


        // console.log(this.appointmentForm.value)
        fd.append('appointmentDate', this.dateFormatter())
        fd.append('appointmentPatient', this.appointmentForm.controls['patient'].value?.toString() || '')
        fd.append('appointmentSession', this.appointmentForm.controls['session'].value?.toString() || '')
        fd.append('appointmentSpecialDescription', this.appointmentForm.controls['reason'].value + ' (Appointment set by staff)')
        fd.append('appointmentDoctorId', this.appointmentForm.controls['doctor'].value?.toString() || '')

        this.appointment.addNewAppointment(fd).subscribe(res => {
            if (res['status'] === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Added!',
                    text: 'Appointment successfully Added!',
                    confirmButtonColor: '#0D67B5'
                })
                this.modal.dismissAll(true)
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



    dateFormatter() {

        const yyyy = this.modelDate.getFullYear();
        let mm = (this.modelDate.getMonth() + 1).toString();
        let dd = this.modelDate.getDate().toString();

        if (+ dd < 10) dd = '0' + dd;
        if (+mm < 10) mm = '0' + mm;

        return dd + '-' + mm + '-' + yyyy;
    }
}
