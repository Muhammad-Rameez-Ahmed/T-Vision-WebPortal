import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Clinics } from 'src/app/main/clinics/clinics.model';
import Swal from 'sweetalert2';
import { ClinicAdd, ClinicAddModel } from './clinic-form.model';
import { ClinicFormService } from './clinic-form.service';

@Component({
    selector: 'app-clinic-form',
    templateUrl: './clinic-form.component.html',
    styleUrls: ['./clinic-form.component.scss']
})
export class ClinicFormComponent implements OnInit {
    // image: any;
    constructor(private clinic: ClinicFormService, private modal: NgbModal) { }
    modellist: Clinics[] = [];
    gender: any[] = [{ id: 0, name: "Female" }, { id: 1, name: "Male" }]
    loading = false;
    confirm: string = "";

    clinicForm = new FormGroup({

        name: new FormControl<string>('', [Validators.required])
    })


    @Input() inputValue: string = '';
    @Input() updateValue: boolean = false;
    @Input() model: ClinicAddModel = new ClinicAdd().init();
    @Input() data: any;
    @Input() id: any;
    ngOnInit(): void {
        this.model.clinicBelongsTo = JSON.parse(localStorage.getItem('User') || '').siteID
        this.model.clinicCreatedBy = JSON.parse(localStorage.getItem('User') || '').Id
        // this.getAllPatients()
    }

    submit() {
        this.loading = true
        let fd = new FormData()
        // console.log(this.model)
        // fd.append("clinicName", this.model.clinicName)
        fd.append("clinicName", this.clinicForm.controls['name'].value || '')
        fd.append("clinicBelongsTo", this.model.clinicBelongsTo.toString())
        fd.append("clinicCreatedBy", this.model.clinicCreatedBy.toString())
        this.clinic.addClinic(fd).subscribe((res) => {
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





    // InputImage(img: any) {
    //     // this.image = false
    //     let image = <File>img.target.files[0];
    //     let reader = new FileReader();
    //     reader.onload = (e: any) => {
    //         this.model.patientImage = image
    //         this.image = e.target.result;
    //     }
    //     reader.readAsDataURL(image);
    //     // this.show = false
    // }



    // getFile() {
    //     document.getElementById('userimage')?.click()
    // }


    close() {

        this.modal.dismissAll();
    }

}