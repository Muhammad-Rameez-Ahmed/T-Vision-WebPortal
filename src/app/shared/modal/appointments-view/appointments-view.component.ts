import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Categories, DoctorAdd, DoctorAddModel } from '../doctor-form/doctor-form.model';
import { DoctorFormService } from '../doctor-form/doctor-form.service';
import { AppointmentViewService } from './appointment-view.service';
import { Appointments } from './appointments-view.model';

@Component({
    selector: 'app-appointments-view',
    templateUrl: './appointments-view.component.html',
    styleUrls: ['./appointments-view.component.scss']
})
export class AppointmentsViewComponent implements OnInit {

    constructor(private appointments: AppointmentViewService, private doctor: DoctorFormService, private modal: NgbModal) { }

    image: any;
    showNO = false;
    modellist: Appointments[] = []
    gender: any[] = [{ id: 0, name: "Female" }, { id: 1, name: "Male" }]
    status: any[] = [];
    selectedStatus: any = 0;
    selectedDate: any = '';
    minDate: any;
    id: any;
    categories: Categories[] = [];

    @Input() model: DoctorAddModel = new DoctorAdd().init();
    @Input() data: any;
    ngOnInit(): void {

        this.image = this.model.profile
        // this.selectedDate = new Date(this.selectedDate)
        // let tomorrow = new Date
        // this.getAllAppointments();
        this.getCategories();
        this.minDate = new Date();
        // this.minDate.setDate(this.minDate.getDate() + 1);
        this.minDate.setDate(this.minDate.getDate());


        const yyyy = this.minDate.getFullYear();
        let mm = this.minDate.getMonth() + 1; // Months start at 0!
        let dd = this.minDate.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        this.selectedDate = this.minDate
        const date = dd + '-' + mm + '-' + yyyy;
        this.id = JSON.parse(localStorage.getItem('User') || '').Id
        this.getAllStatus(date);
    }

    getAllAppointments(status: any, date: any) {
        let fd = new FormData();
        fd.append('appointmentDoctorId', this.data.doctorId)
        fd.append('appointmentStatus', status)
        fd.append('appointmentDate', date)
        this.appointments.getAppointments(fd).subscribe(res => {
            if (res['data'].length !== 0) {
                this.showNO = false
                this.modellist = res['data']
                // this.modellist.push(res['data'])
            }
            else {
                this.showNO = true
            }
            // this.modellist.push(this.modellist[0])
            // // console.log(this.modellist)
        })
    }

    getAllStatus(date: any) {
        this.appointments.getAllStatus({}).subscribe(res => {
            if (res['data']) {
                this.status = res['data']
            }
        })

        this.getAllAppointments(this.selectedStatus, date);
    }

    show() {
        this.selectedDate = new Date(this.selectedDate)

        const yyyy = this.selectedDate.getFullYear();
        let mm = this.selectedDate.getMonth() + 1; // Months start at 0!
        let dd = this.selectedDate.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const date = dd + '-' + mm + '-' + yyyy;
        // let date = new Date(this.selectedDate).getDate() + '-' + (+new Date(this.selectedDate).getMonth() + 1) + '-' + new Date(this.selectedDate).getFullYear()
        this.getAllAppointments(this.selectedStatus, date);
    }

    update(item: any, status: any, type: any) {
        let fd = new FormData();
        fd.append('appointmentId', item)
        fd.append('appointmentStatus', status)
        Swal.fire({
            title: '' + type + '?',
            text: 'Are you sure want to mark Appointment as ' + type + '?',
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


    getCategories() {
        this.doctor.getDoctorCategories().subscribe(res => {
            if (res['status'] === 200) {
                this.categories = res['data']
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


    InputImage(img: any) {
        // this.image = false
        let image = <File>img.target.files[0];
        let reader = new FileReader();
        reader.onload = (e: any) => {
            this.model.profile = image
            this.image = e.target.result;
        }
        reader.readAsDataURL(image);
        // this.show = false
    }



    getFile() {
        document.getElementById('userimage')?.click()
    }

}
