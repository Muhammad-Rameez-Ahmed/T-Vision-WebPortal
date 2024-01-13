import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/common/alert.service';
import { ClinicFormComponent } from 'src/app/shared/modal/clinic-form/clinic-form.component';
import { DoctorAppointmentsComponent } from 'src/app/shared/modal/doctor-appointments/doctor-appointments.component';
import { DoctorFormComponent } from 'src/app/shared/modal/doctor-form/doctor-form.component';
import Swal from 'sweetalert2';
import { Clinics } from '../clinics/clinics.model';
import { ClinicsService } from '../clinics/clinics.service';

@Component({
    selector: 'app-clinics',
    templateUrl: './clinics.component.html',
    styleUrls: ['./clinics.component.scss']
})
export class ClinicsComponent implements OnInit {

    // clinicslist: any[] = [{ name: 'Dr john doe', description: 'some description', client: 'Someone', status: 'Active', created: 'Wed, 9:00 AM, 3: 43 PM', updated: 'Wed, 9:00 AM, 3: 43 PM' }, { name: 'Dr john doe', description: 'some description', client: 'Someone', status: 'Active', created: 'Wed, 9:00 AM, 3: 43 PM', updated: 'Wed, 9:00 AM, 3: 43 PM' },]



    page: number = 1;
    size: number = 10;
    total: number = 0;

    loading: boolean = true;
    notfound: boolean = false;
    field: string = 'index';
    // list = [{ name: 'John Doe', email: 'john@doe.com', contact: '0678368773', role: 'clerk', clinicName: 'XYZ Clinic', clinicTime: '9:00 AM' }, { name: 'John Doe', email: 'john@doe.com', contact: '0678368773', role: 'clerk', clinicName: 'XYZ Clinic', clinicTime: '9:00 AM' }, { name: 'John Doe', email: 'john@doe.com', contact: '0678368773', role: 'clerk', clinicName: 'XYZ Clinic', clinicTime: '9:00 AM' }, { name: 'John Doe', email: 'john@doe.com', contact: '0678368773', role: 'clerk', clinicName: 'XYZ Clinic', clinicTime: '9:00 AM' }, { name: 'John Doe', email: 'john@doe.com', contact: '0678368773', role: 'clerk', clinicName: 'XYZ Clinic', clinicTime: '9:00 AM' }, { name: 'John Doe', email: 'john@doe.com', contact: '0678368773', role: 'clerk', clinicName: 'XYZ Clinic', clinicTime: '9:00 AM' },]

    list: Clinics[] = [];
    modellist: Clinics[] = [];

    constructor(
        private alert: AlertService,
        public modal: NgbModal,
        private clinic: ClinicsService
    ) {
    }
    ngOnInit(): void {
        this.getAllclinics();
    }


    showView() {

        const modalRef = this.modal.open(DoctorAppointmentsComponent, { windowClass: 'modal-animate', centered: true, size: 'sm' })
    }



    show() {
        const modalRef = this.modal.open(ClinicFormComponent, { windowClass: 'modal-animate', centered: true, size: 'md' })
        modalRef.componentInstance.inputValue = 'Add'
        modalRef.componentInstance.updateValue = false

        modalRef.result.then((data) => {
        }, (reason) => {
            this.getAllclinics();
        });
    }

    update(isUpdate: boolean, data: any) {

        const modalRef = this.modal.open(ClinicFormComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        modalRef.componentInstance.inputValue = 'Update'
        modalRef.componentInstance.updateValue = true

        let obj = {

            clinicId: data.clinicId,
            clinicCreatedAt: data.clinicCreatedAt,
            clinicName: data.clinicName,
            clinicEmail: data.clinicEmail,
            clinicContact: data.clinicContact,
            profile: data.profile,
            clinicIsActive: data.clinicIsActive,
            clinicGender: data.clinicGender
        }

        modalRef.componentInstance.model = obj
        modalRef.componentInstance.data = data
        modalRef.componentInstance.id = data.clinicId
        modalRef.result.then((data) => {
        }, (reason) => {
            this.getAllclinics();
        });
    }

    pageChange(event: any) {
        // console.log(event)
        this.list = this.list.slice((event - 1) * this.size, event * this.size)
        // console.log(this.list)
    }

    getAllclinics() {
        let fd = new FormData();
        fd.append('clinicBelongsTo', JSON.parse(localStorage.getItem('User') || '')?.siteID)
        this.clinic.getAllCLinics(fd).subscribe((res) => {
            if (res['status'] === 200) {
                let data = res['data']
                this.modellist = res['data']
                // this.modellist = data.filter((x: any) => x.clinicIsActive === true)
                // this.modellist = data
                this.list = this.modellist
                this.loading = false
            }
            else {
                this.notfound = true
                this.loading = false
            }
            // console.log(res)
        }, err => {
            this.loading = false
            this.notfound = true
        })
    }

    delete(id: any, active: any, event: any) {
        let fd = new FormData();
        fd.append('clinicId', id)
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
                this.clinic.setInactiveClinics(fd).subscribe((res) => {
                    if (res['status'] === 200) {
                        this.getAllclinics();
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
                this.list[active].clinicIsActive = !this.list[active].clinicIsActive
                // // console.log(active)
            }
        })
    }


    inputValue: string = '';

    Search() {
        console.log('searched: ', this.inputValue)
        if (this.inputValue) {
            // this.inputValue = this.inputValue.trim().toLowerCase()
            this.list = this.modellist.filter((x: Clinics) => {
                return x.clinicName?.trim().toLowerCase().includes(this.inputValue)
            })

        }
        else {
            this.list = this.modellist
        }
    }
}
