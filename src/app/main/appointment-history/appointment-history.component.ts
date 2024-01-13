import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Appointments, Status } from '../appointment-doctor/appointment-doctor.model';
import { AppointmentDoctorService } from '../appointment-doctor/appointment-doctor.service';

@Component({
    selector: 'app-appointment-history',
    templateUrl: './appointment-history.component.html',
    styleUrls: ['./appointment-history.component.scss']
})
export class AppointmentHistoryComponent implements OnInit {

    constructor(private appointments: AppointmentDoctorService, private router: Router) { }

    showNO = false
    modellist: Appointments[] = []
    status: Status[] = [];
    selectedStatus: number = 0;
    selectedDate: Date = new Date();
    minDate: Date = new Date();
    id: string = '0';
    ngOnInit(): void {

        // this.selectedDate = new Date(this.selectedDate)
        // let tomorrow = new Date
        // this.getAllAppointments();
        this.minDate = new Date();
        this.minDate.setDate(this.minDate.getDate());


        const yyyy = this.minDate.getFullYear();
        let mm = (this.minDate.getMonth() + 1).toString(); // Months start at 0!
        let dd = this.minDate.getDate().toString();

        if (+dd < 10) dd = '0' + dd;
        if (+mm < 10) mm = '0' + mm;

        this.selectedDate = this.minDate
        const date = dd + '-' + mm + '-' + yyyy;
        this.id = JSON.parse(localStorage.getItem('User') || '').Id
        this.getAllHistory(3, this.selectedDate)
    }

    getAllAppointments(status: number, date: string) {
        let fd = new FormData();
        fd.append('appointmentDoctorId', this.id)
        fd.append('appointmentStatus', status.toString())
        fd.append('appointmentDate', date)
        this.appointments.getAppointments(fd).subscribe(res => {
            if (res['data'].length !== 0) {
                this.showNO = false
                // console.log(res['data'])
                // this.modellist = res['data'].sort((a: Appointments, b: Appointments) => (a.appointmentDate > b.appointmentDate ? -1 : 1))

                this.modellist = res['data'].sort((a: Appointments, b: Appointments) => (new Date(a.appointmentDate + ' ' + a.appointmentSession.sessionStartTime) > new Date(b.appointmentDate + ' ' + b.appointmentDate) ? -1 : 1))
            }
            else {
                this.showNO = true
            }
        })
    }

    getAllHistory(status: number, date: string | Date) {
        let fd = new FormData();
        fd.append('doctorId', this.id)
        this.appointments.getAppointmentsHistory(fd).subscribe(res => {
            if (res['data'].length !== 0) {
                this.showNO = false
                this.modellist = res['data']
                this.modellist = this.modellist.filter(x => new Date(x.appointmentDate.split('-')[2] + '-' + x.appointmentDate.split('-')[1] + '-' + x.appointmentDate.split('-')[0]) <= new Date(new Date(date).setDate(new Date(date).getDate() + 1)))
                // this.modellist = this.modellist.sort((a: Appointments, b: Appointments) => (a.appointmentDate > b.appointmentDate ? -1 : 1))

                this.modellist = res['data'].sort((a: Appointments, b: Appointments) => (new Date(a.appointmentDate + ' ' + a.appointmentSession.sessionStartTime) > new Date(b.appointmentDate + ' ' + b.appointmentDate) ? -1 : 1))
            }
            else {
                this.showNO = true
            }
        })
    }

    getAllStatus(date: string) {
        this.appointments.getAllStatus({}).subscribe(res => {
            if (res['data']) {
                this.status = res['data']
                // this.status = this.status.filter(x => x.id !== 3)
            }
        })

        // this.getAllAppointments(this.selectedStatus, date);
    }

    show() {
        this.selectedDate = new Date(this.selectedDate)

        const yyyy = this.selectedDate.getFullYear();
        let mm = (this.selectedDate.getMonth() + 1).toString(); // Months start at 0!
        let dd = this.selectedDate.getDate().toString();

        if (+dd < 10) dd = '0' + dd;
        if (+mm < 10) mm = '0' + mm;
        const date = dd + '-' + mm + '-' + yyyy;

        this.getAllHistory(3, this.selectedDate)
        // else {

        //     this.getAllAppointments(this.selectedStatus, date);
        // }
        // console.log(date)
        // let date = new Date(this.selectedDate).getDate() + '-' + (+new Date(this.selectedDate).getMonth() + 1) + '-' + new Date(this.selectedDate).getFullYear()
    }

    update(item: string) {
        let fd = new FormData();
        fd.append('appointmentId', item)
        fd.append('appointmentStatus', '2')
        Swal.fire({
            title: 'Cancel?',
            text: 'Are you sure want to mark Appointment as Cancel?',
            icon: 'warning',
            cancelButtonText: 'No',
            denyButtonText: 'yes',
            // confirmButtonColor: '#6e7881',
            showCancelButton: true,
            showDenyButton: true,
            showConfirmButton: false

        }).then(res => {
            if (res.isDenied) {
                this.appointments.updateAppStatus(fd).subscribe(res => {
                    if (res['status'] === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful!',
                            text: res['message'],
                            confirmButtonColor: '#0D67B5'
                        })
                        this.show()
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

    openDetails(item: Appointments) {
        localStorage.setItem('patient', JSON.stringify(item.appointmentPatient))
        localStorage.setItem('appointment', JSON.stringify(item))
        this.router.navigate(['/dashboard/appointments-history/details'])
    }

    test() {
        console.log("selectedStatus ", this.selectedStatus)
    }
}
