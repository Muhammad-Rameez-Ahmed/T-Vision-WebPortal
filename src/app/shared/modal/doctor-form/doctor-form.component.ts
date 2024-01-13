import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Categories, DoctorAdd, DoctorAddModel, Doctors } from './doctor-form.model';
import { DoctorFormService } from './doctor-form.service';

@Component({
    selector: 'app-doctor-form',
    templateUrl: './doctor-form.component.html',
    styleUrls: ['./doctor-form.component.scss']
})
export class DoctorFormComponent implements OnInit {

    constructor(private doctor: DoctorFormService, private modal: NgbModal) { }

    image: any;
    // modellist: Doctors[] = [];
    gender: any[] = [{ id: 0, name: "Female" }, { id: 1, name: "Male" }]
    categories: Categories[] = [];
    loading = false;
    confirm: string = "";
    doctorForm = new FormGroup({
        name: new FormControl<string>('', [Validators.required]),
        email: new FormControl<string>('', [Validators.required, Validators.pattern('[^@ \t\r\n]+@[^@.\t\r\n]+\.[^@.\t\r\n][^@ \t\r\n]+')]),
        contact: new FormControl<string>('', [Validators.required, Validators.pattern('([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])')]),
        gender: new FormControl<string>('', [Validators.required]),
        category: new FormControl<string>('', [Validators.required]),
        password: new FormControl<string>('', [Validators.required])
    });

    @Input() inputValue: string = '';
    @Input() updateValue: boolean = false;
    @Input() model: DoctorAddModel = new DoctorAdd().init();
    @Input() data: any;
    @Input() id: any;
    ngOnInit(): void {

        this.image = this.model.profile
        this.doctorForm.controls['name'].setValue(this.model.doctorName)
        this.doctorForm.controls['email'].setValue(this.model.doctorEmail)
        this.doctorForm.controls['category'].setValue(this.model.doctorCategory)
        this.doctorForm.controls['contact'].setValue(this.model.doctorContact)
        this.doctorForm.controls['gender'].setValue(this.model.doctorGender)
        this.doctorForm.controls['password'].setValue(this.model.doctorPassword)
        // console.log('doctor image', this.image)
        this.model.doctorBelongsTo = JSON.parse(localStorage.getItem('User') || '').siteID
        this.model.doctorCreatedBy = JSON.parse(localStorage.getItem('User') || '').Id
        this.getCategories()
        if (this.updateValue) {

            this.doctorForm.controls['password'].removeValidators([Validators.required])
        }
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

    test() {
        
    }
    submit() {
        this.loading = true
   
        let fd = new FormData()
        if (this.model.profile === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please Upload Profile Picture',
                confirmButtonColor: '#0D67B5'
            })
            this.loading = false
            return
        }
   
       

        fd.append("doctorName", this.doctorForm.controls['name'].value || '')
        fd.append("doctorEmail", this.doctorForm.controls['email'].value || '')
        fd.append("doctorPassword", this.doctorForm.controls['password'].value || '')
        fd.append("doctorContact", this.doctorForm.controls['contact'].value || '')
        fd.append("profile", this.model.profile)
        fd.append("doctorCreatedBy", this.model.doctorCreatedBy)
        fd.append("doctorBelongsTo", this.model.doctorBelongsTo)
        fd.append("doctorGender", this.doctorForm.controls['gender'].value?.toString() || '')
        fd.append("DoctorCategory", this.doctorForm.controls['category'].value || '')
        this.doctor.addDoctor(fd).subscribe((res) => {
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
        let fd = new FormData()
        fd.append("doctorId", this.id)

        fd.append("doctorName", this.doctorForm.controls['name'].value || '')
        // fd.append("doctorEmail", this.doctorForm.controls['email'].value || '')
        // fd.append("doctorPassword", this.doctorForm.controls['password'].value || '')
        fd.append("doctorContact", this.doctorForm.controls['contact'].value || '')
        fd.append("profile", this.model.profile)
        // fd.append("doctorIsActive", this.model.doctorIsActive)
        // fd.append("doctorCreatedBy", this.model.doctorCreatedBy)
        // fd.append("doctorBelongsTo", this.model.doctorBelongsTo)
        // fd.append("doctorGender", this.doctorForm.controls['gender'].value?.toString() || '')
        // fd.append("DoctorCategory", this.doctorForm.controls['category'].value || '')
        // fd.append("doctorName", this.model.doctorName)
        // fd.append("doctorEmail", this.model.doctorEmail)
        // // fd.append("doctorPassword", this.model.doctorPassword)
        // fd.append("doctorContact", this.model.doctorContact)
        // fd.append("profile", this.model.profile)
        // // fd.append("doctorIsActive", this.model.doctorIsActive)
        // fd.append("doctorCreatedBy", this.model.doctorCreatedBy)
        // fd.append("doctorBelongsTo", this.model.doctorBelongsTo)
        // fd.append("doctorGender", this.model.doctorGender)
        // fd.append("DoctorCategory", this.model.doctorCategory)
        this.doctor.updateDoctor(fd).subscribe((res) => {
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

    close() {

        this.modal.dismissAll();
    }
}
