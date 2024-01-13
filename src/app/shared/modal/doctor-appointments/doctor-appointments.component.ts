import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-doctor-appointments',
    templateUrl: './doctor-appointments.component.html',
    styleUrls: ['./doctor-appointments.component.scss']
})
export class DoctorAppointmentsComponent implements OnInit {

    constructor() { }



    @Input() data: any;
    timings = [{
        time: '9:00 AM',
        booked: true,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Completed'
    },
    {
        time: '9:00 AM',
        booked: true,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Scheduled'
    },
    {
        time: '9:00 AM',
        booked: true,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Canceled'
    },
    {
        time: '9:00 AM',
        booked: false,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Scheduled'
    }, {
        time: '9:00 AM',
        booked: true,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Canceled'
    },
    {
        time: '9:00 AM',
        booked: false,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Canceled'
    },
    {
        time: '9:00 AM',
        booked: true,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Scheduled'
    },
    {
        time: '9:00 AM',
        booked: false,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Canceled'
    }, {
        time: '9:00 AM',
        booked: true,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Canceled'
    },
    {
        time: '9:00 AM',
        booked: false,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Scheduled'
    },
    {
        time: '9:00 AM',
        booked: true,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Scheduled'
    },
    {
        time: '9:00 AM',
        booked: false,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Scheduled'
    }, {
        time: '9:00 AM',
        booked: true,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Canceled'
    },
    {
        time: '9:00 AM',
        booked: false,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Completed'
    },
    {
        time: '9:00 AM',
        booked: true,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Completed'
    },
    {
        time: '9:00 AM',
        booked: false,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Completed'
    }, {
        time: '9:00 AM',
        booked: true,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Scheduled'
    },
    {
        time: '9:00 AM',
        booked: false,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Completed'
    },
    {
        time: '9:00 AM',
        booked: false,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Scheduled'
    },
    {
        time: '9:00 AM',
        booked: false,
        patientName: 'john snow',
        reason: 'monthly check up for no reason', status: 'Canceled'
    },]

    ngOnInit(): void {
        // console.log(this.data)
    }


}
