import { Component, Input, OnInit, PACKAGE_ROOT_URL } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { PatientAdd, PatientAddModel, Patients } from './patient-form.model';
import { PatientsService } from './patient-form.service';

@Component({
    selector: 'app-patient-form',
    templateUrl: './patient-form.component.html',
    styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

    image: any;
    constructor(private patient: PatientsService, private modal: NgbModal) { }
    modellist: Patients[] = [];
    gender: any[] = [{ id: 0, name: "Female" }, { id: 1, name: "Male" }]
    loading = false;
    confirm: string = "";

    patientForm = new FormGroup({
        firstName: new FormControl<string>('', [Validators.required]),
        lastName: new FormControl<string>('', [Validators.required]),
        email: new FormControl<string>('', [Validators.required, Validators.pattern('[^@ \t\r\n]+@[^@ . \t\r\n]+\.[^@. \t\r\n][^@ \t\r\n]+')]),
        contact: new FormControl<string>('', [Validators.required, Validators.pattern('([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])')]),
        gender: new FormControl<string | number>('', [Validators.required]),
        related: new FormControl<string>(''),
        password: new FormControl<string>('', [Validators.required]),
        address: new FormControl<string>('', [Validators.required]),
        age: new FormControl<string>('', [Validators.required]),
        nhsId: new FormControl<string>('', [Validators.required]),
    });


    @Input() inputValue: string = '';
    @Input() updateValue: boolean = false;
    @Input() model: PatientAddModel = new PatientAdd().init();
    @Input() data: any;
    @Input() id: any;
    ngOnInit(): void {
        // console.log(this.model.patientImage)
        this.patientForm.controls['firstName'].setValue(this.model.patientUserName)
        this.patientForm.controls['lastName'].setValue(this.model.patientLastName)
        this.patientForm.controls['email'].setValue(this.model.patientEmail)
        this.patientForm.controls['contact'].setValue(this.model.patientUserPhone)
        this.patientForm.controls['gender'].setValue(this.model.patientUserGender)
        this.patientForm.controls['password'].setValue(this.model.patientPassword)
        this.patientForm.controls['address'].setValue(this.model.patientUserAddress)
        this.patientForm.controls['age'].setValue(this.model.patientUserAge.toString())
        this.patientForm.controls['nhsId'].setValue(this.model.patientNhsId)
        if (this.updateValue) {
            this.image = this.model.patientImage
            this.patientForm.controls['password'].removeValidators([Validators.required, Validators.pattern('([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])')])
            this.patientForm.controls['email'].removeValidators([Validators.required, Validators.pattern('[^@ \t\r\n]+@[^@ . \t\r\n]+\.[^@. \t\r\n][^@ \t\r\n]+')])
        }
        this.model.patientBelongsToSite = JSON.parse(localStorage.getItem('User') || '').siteID
        this.model.patientCreatedBy = JSON.parse(localStorage.getItem('User') || '').Id
        this.getAllPatients()
    }

    submit() {


        this.loading = true
        if (this.model.patientImage === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please Upload Profile Picture',
                confirmButtonColor: '#0D67B5'
            })
            this.loading = false
            return
        }
        let fd = new FormData()
        // console.log(this.model)
        fd.append("patientNhsId", this.patientForm.controls['nhsId'].value || '')
        fd.append("patientEmail", this.patientForm.controls['email'].value || '')
        fd.append("patientPassword", this.patientForm.controls['password'].value || '')
        fd.append("patientUserName", this.patientForm.controls['firstName'].value || '')
        // fd.append("patient", this.model.patientUserName)
        fd.append("patientLastName", this.patientForm.controls['lastName'].value || '')
        fd.append("patientUserPhone", this.patientForm.controls['contact'].value || '')
        fd.append("patientUserAge", this.patientForm.controls['age'].value || '')
        fd.append("patientUserAddress", this.patientForm.controls['address'].value || '')
        fd.append("patientUserGender", this.patientForm.controls['gender'].value?.toString() || '')
        fd.append("patientStatus", this.model.patientStatus)
        fd.append("patientBelongsToSite", this.model.patientBelongsToSite.toString())
        fd.append("patientCreatedBy", this.model.patientCreatedBy.toString())
        fd.append("patient_profile", this.model.patientImage)
        if (this.patientForm.controls['related'].value) {
            fd.append("patientParentId", this.patientForm.controls['related'].value || '')
        }
        // fd.append("patientNhsId", this.model.patientNhsId)
        // fd.append("patientEmail", this.model.patientEmail)
        // fd.append("patientPassword", this.model.patientPassword)
        // fd.append("patientUserName", this.model.patientUserName)
        // // fd.append("patient", this.model.patientUserName)
        // fd.append("patientLastName", this.model.patientLastName)
        // fd.append("patientUserPhone", this.model.patientUserPhone)
        // fd.append("patientUserAge", this.model.patientUserAge.toString())
        // fd.append("patientUserAddress", this.model.patientUserAddress)
        // fd.append("patientUserGender", this.model.patientUserGender.toString())
        // fd.append("patientStatus", this.model.patientStatus)
        // fd.append("patientBelongsToSite", this.model.patientBelongsToSite.toString())
        // fd.append("patientCreatedBy", this.model.patientCreatedBy.toString())
        // fd.append("patient_profile", this.model.patientImage)
        this.patient.addPatient(fd).subscribe((res) => {
            if (res['status'] === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Added!',
                    text: 'Patient successfully Added!',
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
        fd.append("patientId", this.id)
        // fd.append("patientNhsId", this.patientForm.controls['nhsId'].value || '')
        // fd.append("patientEmail", this.patientForm.controls['email'].value || '')
        // fd.append("patientPassword", this.patientForm.controls['password'].value || '')
        fd.append("patientUserName", this.patientForm.controls['firstName'].value || '')
        // fd.append("patient", this.model.patientUserName)
        fd.append("patientLastName", this.patientForm.controls['lastName'].value || '')
        fd.append("patientUserPhone", this.patientForm.controls['contact'].value || '')
        fd.append("patientUserAge", this.patientForm.controls['age'].value || '')
        fd.append("patientUserAddress", this.patientForm.controls['address'].value || '')
        fd.append("patientUserGender", this.patientForm.controls['gender'].value?.toString() || '')
        // fd.append("patientStatus", this.model.patientStatus)
        // fd.append("patientBelongsToSite", this.model.patientBelongsToSite.toString())
        // fd.append("patientCreatedBy", this.model.patientCreatedBy.toString())
        fd.append("patient_profile", this.model.patientImage)
        // fd.append("patientNhsId", this.model.patientNhsId)
        // fd.append("patientEmail", this.model.patientEmail)
        // fd.append("patientPassword", this.model.patientPassword)
        // fd.append("patientUserName", this.model.patientUserName)
        // fd.append("patientLastName", this.model.patientLastName)
        // fd.append("patientUserPhone", this.model.patientUserPhone)
        // fd.append("patientUserAge", this.model.patientUserAge.toString())
        // fd.append("patientUserAddress", this.model.patientUserAddress)
        // fd.append("patientUserGender", this.model.patientUserGender.toString())
        // fd.append("patientStatus", this.model.patientStatus)
        // fd.append("patientBelongsToSite", this.model.patientBelongsToSite.toString())
        // fd.append("patientCreatedBy", this.model.patientCreatedBy.toString())
        // fd.append("patient_profile", this.model.patientImage)

        this.patient.updatePatient(fd).subscribe((res) => {
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



    InputImage(img: any) {
        // this.image = false
        let image = <File>img.target.files[0];
        let reader = new FileReader();
        reader.onload = (e: any) => {
            this.model.patientImage = image
            this.image = e.target.result;
        }
        reader.readAsDataURL(image);
        // this.show = false
    }



    getFile() {
        document.getElementById('userimage')?.click()
    }


    getAllPatients() {
        let fd = new FormData();
        fd.append('patientBelongsToSite', JSON.parse(localStorage.getItem('User') || '')?.siteID)
        this.patient.getAllPatients(fd).subscribe((res) => {
            if (res['status'] === 200) {
                this.modellist = res['data']
            }
            // console.log(res)
        })
    }

    close() {

        this.modal.dismissAll();
    }
}
