import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnyAaaaRecord } from 'dns';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertService } from 'src/app/services/common/alert.service';
import { BaseComponent } from 'src/app/shared/classes/base.component';
import { AppointmentsViewComponent } from 'src/app/shared/modal/appointments-view/appointments-view.component';
import { DoctorAppointmentsComponent } from 'src/app/shared/modal/doctor-appointments/doctor-appointments.component';
import { DoctorFormComponent } from 'src/app/shared/modal/doctor-form/doctor-form.component';
import { StaffFormComponent } from 'src/app/shared/modal/staff-form/staff-form.component';
import Swal from 'sweetalert2';
import { ProjectsModel } from '../projects/projects.model';
import { ProjectsService } from '../projects/projects.service';
import { Doctors } from './doctors.model';
import { DoctorsService } from './doctors.service';
import { DoctorDetailsComponent } from 'src/app/shared/component/doctor-details/doctor-details.component';

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent implements OnInit {

    // doctorslist: any[] = [{ name: 'Dr john doe', description: 'some description', client: 'Someone', status: 'Active', created: 'Wed, 9:00 AM, 3: 43 PM', updated: 'Wed, 9:00 AM, 3: 43 PM' }, { name: 'Dr john doe', description: 'some description', client: 'Someone', status: 'Active', created: 'Wed, 9:00 AM, 3: 43 PM', updated: 'Wed, 9:00 AM, 3: 43 PM' },]



    page: number = 1;
    size: number = 10;
    total: number = 0;

    loading: boolean = true;
    field: string = 'index';
    notfound: boolean = false
    inputValue: string = '';
    // list = [{ name: 'John Doe', email: 'john@doe.com', contact: '0678368773', role: 'clerk', clinicName: 'XYZ Clinic', clinicTime: '9:00 AM' }, { name: 'John Doe', email: 'john@doe.com', contact: '0678368773', role: 'clerk', clinicName: 'XYZ Clinic', clinicTime: '9:00 AM' }, { name: 'John Doe', email: 'john@doe.com', contact: '0678368773', role: 'clerk', clinicName: 'XYZ Clinic', clinicTime: '9:00 AM' }, { name: 'John Doe', email: 'john@doe.com', contact: '0678368773', role: 'clerk', clinicName: 'XYZ Clinic', clinicTime: '9:00 AM' }, { name: 'John Doe', email: 'john@doe.com', contact: '0678368773', role: 'clerk', clinicName: 'XYZ Clinic', clinicTime: '9:00 AM' }, { name: 'John Doe', email: 'john@doe.com', contact: '0678368773', role: 'clerk', clinicName: 'XYZ Clinic', clinicTime: '9:00 AM' },]

    list: Doctors[] = [];
    modellist: Doctors[] = [];

    constructor(
        private alert: AlertService,
        public modal: NgbModal,
        private doctor: DoctorsService,
    ) {
    }
    ngOnInit(): void {
        this.getAllDoctors();
    }


    showView(data: Doctors) {

        // const modalRef = this.modal.open(AppointmentsViewComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        const modalRef = this.modal.open(DoctorDetailsComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        modalRef.componentInstance.data = data

        let obj = {

            doctorId: data.doctorId,
            doctorCreatedAt: data.doctorCreatedAt,
            doctorName: data.doctorName,
            doctorEmail: data.doctorEmail,
            doctorContact: data.doctorContact,
            profile: data.doctorProfile,
            doctorIsActive: data.doctorIsActive,
            doctorGender: data.doctorGender,
            doctorCategory: data.doctorCategory
        }

        modalRef.componentInstance.model = obj
    }
    showApp(data: Doctors) {

        const modalRef = this.modal.open(AppointmentsViewComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        // const modalRef = this.modal.open(DoctorDetailsComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        modalRef.componentInstance.data = data

        let obj = {

            doctorId: data.doctorId,
            doctorCreatedAt: data.doctorCreatedAt,
            doctorName: data.doctorName,
            doctorEmail: data.doctorEmail,
            doctorContact: data.doctorContact,
            profile: data.doctorProfile,
            doctorIsActive: data.doctorIsActive,
            doctorGender: data.doctorGender,
            doctorCategory: data.doctorCategory
        }

        modalRef.componentInstance.model = obj
    }



    show() {
        const modalRef = this.modal.open(DoctorFormComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        modalRef.componentInstance.inputValue = 'Add'
        modalRef.componentInstance.updateValue = false

        modalRef.result.then((data) => {
        }, (reason) => {
            this.getAllDoctors();
        });
    }

    update(isUpdate: boolean, data: Doctors) {

        const modalRef = this.modal.open(DoctorFormComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        modalRef.componentInstance.inputValue = 'Update'
        modalRef.componentInstance.updateValue = true

        let obj = {

            doctorId: data.doctorId,
            doctorCreatedAt: data.doctorCreatedAt,
            doctorName: data.doctorName,
            doctorEmail: data.doctorEmail,
            doctorContact: data.doctorContact,
            profile: data.doctorProfile,
            doctorIsActive: 'ACTIVE',
            doctorGender: data.doctorGender,
            doctorCategory: data.doctorCategory.docCategoryId
        }

        modalRef.componentInstance.model = obj
        modalRef.componentInstance.data = data
        modalRef.componentInstance.id = data.doctorId
        modalRef.result.then((data) => {
        }, (reason) => {
            this.getAllDoctors();
        });
    }


    pageChange(event: any) {
        // console.log('event: ', event)
        this.list = this.modellist.slice((event - 1) * this.size, event * this.size)
        // console.log(this.list)
    }

    getAllDoctors() {
        let fd = new FormData();
        fd.append('doctorBelongsTo', JSON.parse(localStorage.getItem('User') || '')?.siteID)
        this.doctor.getAllDoctors(fd).subscribe((res) => {
            if (res['status'] === 200) {
                let data = res['data']
                this.modellist = res['data'].sort((a: any, b: any) => a.doctorId > b.doctorId ? -1 : 1)
                // this.modellist = data.filter((x: any) => x.doctorIsActive === true)
                // this.modellist = data
                // this.list = this.modellist.slice(0, 10);
                this.list = this.modellist.slice(0, 10);
                this.pageChange(this.page)
                // console.log(this.list)
                this.loading = false
            }
            else {
                this.loading = false
                this.notfound = true
            }
            // console.log(res)
        }, err => {

            this.loading = false
            this.notfound = true
        })
    }

    delete(id: any, active: any, event: any) {
        let fd = new FormData();
        fd.append('doctorId', id)
        // fd.append('staffId', JSON.parse(localStorage.getItem('User') || '')?.staffId)
        Swal.fire({
            title: 'Change Status',
            text: 'Are you sure want to Change Status',
            icon: 'warning',
            denyButtonText: 'Change',
            // confirmButtonColor: '#6e7881',
            cancelButtonText: 'No',
            showCancelButton: true,
            showDenyButton: true,
            showConfirmButton: false
        }).then(res => {
            if (res.isDenied) {
                this.doctor.setInactiveDoctors(fd).subscribe((res) => {
                    if (res['status'] === 200) {
                        this.getAllDoctors();
                    }
                    else {
                        Swal.fire({
                            title: 'Error Code' + res['status'],
                            text: res['message'],
                            icon: 'error',
                            confirmButtonText: 'Close',
                            confirmButtonColor: '#6e7881'
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
                    this.loading = false
                })
            }
            else {
                event.source.checked = !event.source.checked
                this.list[active].doctorIsActive = !this.list[active].doctorIsActive
                // // console.log(active)
            }
        })
    }




    Search() {
        console.log('searched: ', this.inputValue)
        if (this.inputValue) {
            // this.inputValue = this.inputValue.trim().toLowerCase()
            this.list = this.modellist.filter((x: Doctors) => {
                return x.doctorName?.trim().toLowerCase().includes(this.inputValue) || x.doctorEmail?.trim().toLowerCase().includes(this.inputValue)
                    || x.doctorBelongsTo.siteAddress?.trim().toLowerCase().includes(this.inputValue) || x.doctorBelongsTo.siteName?.toString()?.trim().toLowerCase().includes(this.inputValue)
                    || x.doctorCategory.docCategoryName.toString()?.trim().toLowerCase().includes(this.inputValue) || x.doctorContact.toString()?.trim().toLowerCase().includes(this.inputValue)
            })

        }
        else {
            this.list = this.modellist.slice(0, 10);
        }
    }
}