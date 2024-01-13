import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientFormComponent } from 'src/app/shared/modal/patient-form/patient-form.component';
import Swal from 'sweetalert2';
import { Patients } from './patients.model';
import { PatientsService } from './patients.service';

@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

    value = '';

    page: number = 1;
    size: number = 10;
    total: number = 0;

    loading: boolean = true;
    notfound: boolean = false;
    field: string = 'index';
    modellist: Patients[] = [];
    list: Patients[] = [];
    type: any;
    doctorslist: any[] = [
        { id: '123123', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John 1Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John2 Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John Sn2ow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Sadnow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Sn3ow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John Sn3ow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John Sqwen4ow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John Snqweow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Sqewnow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John Snqweow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Sno32w', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Sn123ow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Sasnow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John q123weSnow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Sn123ow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John213 Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John 123Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Sn123ow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John Sno12w', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '123123', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }, { id: '124232', name: 'John Snow', age: '43 Years', phone: '03452596257', last: 'Oct 19, 2022', next: 'Oct 19, 2022' }
    ]
    inputValue: string = '';
    constructor(public modal: NgbModal, private patient: PatientsService, private router: Router) { }
    staffId: any;
    ngOnInit(): void {
        // console.log(this.list)
        // // console.log(this.doctorslist.length)
        this.type = localStorage.getItem('role') || ''
        this.staffId = JSON.parse(localStorage.getItem('User') || '')?.Id
        this.getAllPatients();
    }


    view(item: any) {
        localStorage.setItem('patient', JSON.stringify(item))
        this.router.navigate(['/dashboard/patients/view'])
    }
    form() {

        const modalRef = this.modal.open(PatientFormComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        modalRef.componentInstance.inputValue = 'Add'
        modalRef.componentInstance.updateValue = false

        modalRef.result.then((data) => {
        }, (reason) => {
            this.getAllPatients();
        });
    }

    pageChange(event: any) {
        // console.log(event)
        this.list = this.modellist.slice((event - 1) * this.size, event * this.size)
        // console.log(this.list)
    }

    test() {
        // console.log(this.value)
        // console.log(this.list)
        // console.log(this.doctorslist)
    }

    getAllPatients() {
        let fd = new FormData();
        fd.append('patientBelongsToSite', JSON.parse(localStorage.getItem('User') || '')?.siteID)
        this.patient.getAllPatients(fd).subscribe((res) => {
            if (res['status'] === 200) {
                let data = res['data']
                this.modellist = res['data'].sort((a: any, b: any) => a.patientId > b.patientId ? -1 : 1)
                // this.modellist = data.filter((x: any) => x.patientIsActive === true)
                // this.modellist = data
                this.list = this.modellist.slice(0, 10);
                this.loading = false
                this.pageChange(this.page)
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

    Search() {
        console.log('searched: ', this.inputValue)
        if (this.inputValue) {
            // this.inputValue = this.inputValue.trim().toLowerCase()
            this.list = this.modellist.filter((x: Patients) => {
                return x.patientUserName?.trim().toLowerCase().includes(this.inputValue) || x.patientLastName?.trim().toLowerCase().includes(this.inputValue)
                    || x.patientEmail?.trim().toLowerCase().includes(this.inputValue) || x.patientNhsId?.toString()?.trim().toLowerCase().includes(this.inputValue)
                    || x.patientUserAddress.toString()?.trim().toLowerCase().includes(this.inputValue) || x.patientUserPhone.toString()?.trim().toLowerCase().includes(this.inputValue)
            })

        }
        else {
            this.list = this.modellist.slice(0, 10);
        }
    }

    delete(id: any, active: any, event: any) {
        let fd = new FormData();
        fd.append('patientId', id)
        fd.append('patientIsActive', this.list[active].patientIsActive ? '1' : '0')
        fd.append('patientStatus', this.list[active].patientStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')
        // console.log(JSON.parse(localStorage.getItem('User') || ''))
        fd.append('staffId', this.staffId)
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
                this.patient.setInactivePatients(fd).subscribe((res) => {
                    if (res['status'] === 200) {
                        this.getAllPatients();
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
                this.list[active].patientIsActive = !this.list[active].patientIsActive
                // // console.log(active)
            }
        })
    }

    update(isUpdate: boolean, data: any) {

        const modalRef = this.modal.open(PatientFormComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        modalRef.componentInstance.inputValue = 'Update'
        modalRef.componentInstance.updateValue = true
        // console.log(data.patientUserProfile)
        let obj = {
            patientNhsId: data.patientNhsId,
            patientEmail: data.patientEmail,
            patientPassword: data.patientPassword,
            patientUserName: data.patientUserName,
            patientLastName: data.patientLastName,
            patientUserPhone: data.patientUserPhone,
            patientUserAge: data.patientUserAge,
            patientUserAddress: data.patientUserAddress,
            patientUserGender: data.patientUserGender,
            patientStatus: data.patientStatus,
            patientBelongsToSite: data.patientBelongsToSite,
            patientCreatedBy: data.patientCreatedBy,
            patientImage: data.patientUserProfile
        };

        modalRef.componentInstance.model = obj
        modalRef.componentInstance.data = data
        modalRef.componentInstance.id = data.patientId
        modalRef.result.then((data) => {
        }, (reason) => {
            this.getAllPatients();
        });
    }
}
