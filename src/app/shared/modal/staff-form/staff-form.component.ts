import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffFormService } from './staff-form.service';
import { StaffAdd, StaffAddModel, StaffUpdate, StaffUpdateModel } from './staff-form.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-staff-form',
    templateUrl: './staff-form.component.html',
    styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit {

    constructor(private modal: NgbModal, private staff: StaffFormService) { }
    staffupdate: StaffUpdateModel = new StaffUpdate().init();
    // model: StaffModel = new Staff().init();
    image: any;
    roles: any[] = []
    loading = false;
    staffForm = new FormGroup({
        name: new FormControl<string>('', [Validators.required]),
        email: new FormControl<string>('', [Validators.required, Validators.pattern('[^@ \t\r\n]+@[^@ . \t\r\n]+\.[^@. \t\r\n][^@ \t\r\n]+')]),
        contact: new FormControl<string>('', [Validators.required, Validators.pattern('([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])')]),
        designation: new FormControl<string>('', [Validators.required]),
        role: new FormControl<string>('', [Validators.required]),
        address: new FormControl<string>('', [Validators.required]),
        password: new FormControl<string>('', [Validators.required])
    });


    @Input() inputValue: string = '';
    @Input() updateValue: boolean = false;
    @Input() model: StaffAddModel = new StaffAdd().init();
    @Input() data: any;
    ngOnInit(): void {
        this.getStaffRoles();
        this.staffForm.controls['name'].setValue(this.model.name)
        this.staffForm.controls['email'].setValue(this.model.email)
        this.staffForm.controls['address'].setValue(this.model.address)
        this.staffForm.controls['contact'].setValue(this.model.contact)
        this.staffForm.controls['role'].setValue(this.model.role)
        this.staffForm.controls['password'].setValue(this.model.password)
        this.staffForm.controls['designation'].setValue(this.model.designation)
        // // console.log(this.data)
        if (this.updateValue) {

            this.staffForm.controls['password'].removeValidators([Validators.required])
            this.staffForm.controls['email'].removeValidators([Validators.required, Validators.pattern('[^@ \t\r\n]+@[^@ . \t\r\n]+\.[^@. \t\r\n][^@ \t\r\n]+')])
            this.staffForm.controls['role'].removeValidators([Validators.required])
        }
        this.model.belongsTo = JSON.parse(localStorage.getItem('User') || '')?.siteID
    }

    test() {
        // console.log(this.model.role)
    }
    submit() {
        this.loading = true
        if (this.model.image === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please Upload Profile Picture',
                confirmButtonColor: '#0D67B5'
            })
            this.loading = false
            return
        }
        // // console.log(this.model)
        let fd = new FormData()
        // fd.append('staffName', this.model.name)
        // fd.append('staffEmail', this.model.email)
        // fd.append('staffPassword', this.model.password)
        // fd.append('staffAddress', this.model.address)
        // fd.append('staffBelongsTo', this.model.belongsTo)
        // fd.append('staffDesignation', this.model.designation)
        // fd.append('staffRole', this.model.role)
        // fd.append('profile', this.model.image)
        // fd.append('staffContact', this.model.contact)

        fd.append('staffName', this.staffForm.controls['name'].value || '')
        fd.append('staffEmail', this.staffForm.controls['email'].value || '')
        fd.append('staffPassword', this.staffForm.controls['password'].value || '')
        fd.append('staffAddress', this.staffForm.controls['address'].value || '')
        fd.append('staffBelongsTo', this.model.belongsTo)
        fd.append('staffDesignation', this.staffForm.controls['designation'].value || '')
        fd.append('staffRole', this.staffForm.controls['role'].value || '')
        fd.append('profile', this.model.image)
        fd.append('staffContact', this.staffForm.controls['contact'].value || '')
        this.staff.addStaff(fd).subscribe((res) => {
            if (res['status'] === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Added!',
                    text: 'Staff member successfully Added!',
                    confirmButtonColor: '#0D67B5'
                })
                this.modal.dismissAll();
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Code ' + res['status'],
                    text: res['message'],
                    confirmButtonColor: '#0D67B5'
                })
            }
            this.loading = false
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


    update() {
        this.loading = true
        let fd = new FormData();
        fd.append("staffName", this.staffForm.controls['name'].value || '')
        fd.append("staffAddress", this.staffForm.controls['address'].value || '')
        fd.append("staffPassword", '')
        fd.append("staffContact", this.staffForm.controls['contact'].value || '')
        fd.append("staffDesignation", this.staffForm.controls['designation'].value || '')
        fd.append("profile", this.model.image)
        fd.append("staffId", this.data.staffId)
        this.staff.updateStaff(fd).subscribe((res) => {
            if (res['status'] === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Updated!',
                    text: 'Staff member successfully Updated!',
                    confirmButtonColor: '#0D67B5'
                })
                this.modal.dismissAll();

            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Code ' + res['status'],
                    text: res['message'],
                    confirmButtonColor: '#0D67B5'
                })
            }
            this.loading = false
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


    getStaffRoles() {
        this.staff.getStaffRoles().subscribe((res) => {
            if (res['status'] == 200) {
                this.roles = res['data']
            }
        })
    }


    InputImage(img: any) {
        // this.image = false
        let image = <File>img.target.files[0];
        let reader = new FileReader();
        reader.onload = (e: any) => {
            this.model.image = image
            this.image = e.target.result;
        }
        reader.readAsDataURL(image);
        // this.show = false
    }

    getFile() {
        document.getElementById('userimage')?.click()
    }

    close() {

        this.modal.dismissAll();
    }
}

