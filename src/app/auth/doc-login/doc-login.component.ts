import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/common/alert.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { AuthLogin, User, UserAdd } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-doc-login',
    templateUrl: './doc-login.component.html',
    styleUrls: ['./doc-login.component.scss']
})
export class DocLoginComponent implements OnInit {

    visibility: boolean = false;
    loading: boolean = false;
    // model: AuthModel = new Auth().init();
    model: AuthLogin = { email: '', password: '' };
    userType = 'doctor';
    userList: any[] = [{ name: 'staff' }, { name: 'doctor' },
        //  { name: 'admin' }
    ]
    users: User = new UserAdd().init();

    // LoginForm = new FormGroup({
    //     Email: new FormControl('', [Validators.required]),
    //     Password: new FormControl()

    // });



    constructor(
        private router: Router,
        private auth: AuthService,
        private alert: AlertService,
        private user: UserService,
        public modal: NgbModal,
        // private firebase: FirebaseService<AuthModel>,
    ) { }
    ngOnInit(): void {

        // const modalRef = this.modal.open(SlotsFormComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        // modalRef.componentInstance.inputValue = 'Add'
        // modalRef.componentInstance.updateValue = false

        // modalRef.result.then((data) => {
        // }, (reason) => {
        //     // this.getAllclinics();
        // });
    }


    onSubmit(): void {
        this.loading = true;
        //     this.firebase.authenticate(this.model)
        //       .then(res => {
        //         this.model.uid = res.user.uid;
        //         this.auth.user = this.model;
        //         this.router.navigate(['/analytics']);
        //       })
        //       .catch(err => {
        //         this.alert.error(err.message);
        //         this.loading = false;
        //       });
        //   }

        localStorage.setItem('role', this.userType)
        // console.log(this.userType)
        let form = new FormData();
        form.append('doctorEmail', this.model.email);
        form.append('doctorPassword', this.model.password);
        this.auth.doctorLogin(form).subscribe((res: any) => {
            if (res['status'] === 200) {
                // console.log(res['data'])
                let data = res['data']
                data['siteID'] = res['siteId']
                this.users.Id = data['doctorId']
                this.users.Name = data['doctorName']
                this.users.Email = data['doctorEmail']
                this.users.Profile = data['doctorProfile']
                this.users.Contact = data['doctorContact']
                this.users.IsActive = data['doctorIsActive']
                this.users.CreatedAt = data['doctorCreatedAt']
                this.users.Category = data['doctorCategory']
                this.users.siteID = data['doctorBelongsTo']['siteId']
                this.users.BelongsTo = data['doctorBelongsTo']
                this.users.Gender = (data['doctorGender'] == 0 ? 'Female' : 'Male')
                localStorage.setItem('User', JSON.stringify(this.users))
                this.user.setUserData(res['data'])
                this.router.navigate(['/dashboard/doc-appointments'])
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Code ' + res['status'],
                    text: res['message']
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
        this.loading = false

    }
}