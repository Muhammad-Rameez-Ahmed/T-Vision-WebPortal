import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthLogin } from '../auth.model';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupService } from './sign-up.service';
import { MatStepper } from '@angular/material/stepper';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    visibility: boolean = false;
    loading: boolean = false;
    // model: AuthModel = new Auth().init();
    model: AuthLogin = { email: '', password: '' };

    @ViewChild('stepper') stepper!: MatStepper;
    infoForm = this.fb.group({
        name: ['', Validators.required],
        contact: ['', (Validators.required, Validators.pattern('([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])'))],
        category: ['', Validators.required],
        gender: ['', Validators.required],
        belongs: ['', Validators.required],
        address: ['', Validators.required],
        profile: ['', Validators.required]
    });

    codeForm = this.fb.group({
        email: ['', (Validators.required, Validators.pattern('[^@ \t\r\n]+@[^@.\t\r\n]+\.[^@.\t\r\n][^@ \t\r\n]+'))],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
    });

    isLinear = false;
    image: any;
    constructor(
        private fb: FormBuilder,
        private service: SignupService,
        private route: Router
    ) { }

    ngOnInit(): void {
        this.getCategories()
        this.getSites()
    }

    ngAfterViewInit() {
        this.stepper._getIndicatorType = () => 'number';
    }

    onSubmit(): void {
        this.formError('code')
        if (!this.codeForm.invalid) {
            let fd = new FormData()
            fd.append('doctorName', this.infoForm.controls.name.value || '');
            fd.append('doctorContact', this.infoForm.controls.contact.value || '');
            fd.append('doctorCategory', this.infoForm.controls.category.value || '');
            fd.append('doctorGender', this.infoForm.controls.gender.value || '');
            fd.append('doctorBelongsTo', this.infoForm.controls.belongs.value || '');
            fd.append('doctorAddress', this.infoForm.controls.address.value || '');
            fd.append('profile', this.profile || '');
            fd.append('doctorEmail', this.codeForm.controls.email.value || '');
            fd.append('doctorPassword', this.codeForm.controls.password.value || '');
            // fd.append('confirmPassword', this.codeForm.controls.confirmPassword.value || '');
            this.loading = true
            this.service.signUpDoctor(fd).subscribe(x => {
                // console.log(x)
                if (x["status"] === 200) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Sign Up Successful',
                        text: x['message'],
                    })
                    this.login()
                }
                else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error Code ' + x['status'],
                        text: x['message'],
                        confirmButtonColor: '#0D67B5'
                    })
                }

                this.loading = false
            }, err => {

                Swal.fire({
                    icon: 'error',
                    title: 'Error Code ' + err['status'],
                    text: err['message'],
                    confirmButtonColor: '#0D67B5'
                })
                this.loading = false
            })

        }
    }

    roles: any[] = []
    getStaffRoles() {
        this.service.getStaffRoles().subscribe((res) => {
            if (res['status'] == 200) {
                this.roles = res['data']
            }
        })
    }



    categories: any[] = []
    getCategories() {
        this.loading = true
        this.service.getDoctorCategories().subscribe(res => {
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

    sites: any[] = []
    getSites() {
        this.loading = true
        this.service.getAllSites().subscribe(res => {
            if (res['status'] === 200) {
                this.sites = res['data']
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

    getFile() {
        document.getElementById('userimage')?.click()
    }

    profile: any;
    InputImage(img: any) {
        // this.image = false
        let image = <File>img.target.files[0];
        let reader = new FileReader();
        reader.onload = (e: any) => {
            this.profile = image
            this.image = e.target.result;
        }
        reader.readAsDataURL(image);
        // this.show = false
    }

    login() {
        this.route.navigate(['/auth'])
    }

    infoError = false
    formError(form: string) {
        if (this.infoForm.invalid && form === 'info') {
            Object.keys(this.infoForm.controls).forEach(field => {
                const control = this.infoForm.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
        }

        if (this.codeForm.invalid && form === 'code') {
            Object.keys(this.codeForm.controls).forEach(field => {
                const control = this.codeForm.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
        }
    }
}
