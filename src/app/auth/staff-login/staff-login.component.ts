import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/common/alert.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { AuthLogin, User, UserAdd } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-staff-login',
    templateUrl: './staff-login.component.html',
    styleUrls: ['./staff-login.component.scss']
})
export class StaffLoginComponent implements OnInit {

    visibility: boolean = false;
    loading: boolean = false;
    // model: AuthModel = new Auth().init();
    model: AuthLogin = { email: '', password: '' };
    userType = 'staff';
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
        // if (this.userType === 'staff') {
        form.append('staffEmail', this.model.email);
        form.append('staffPassword', this.model.password);
        this.auth.login(form).subscribe((res: any) => {
            if (res['status'] === 200) {
                // console.log(res['data'])
                let data = res['data']
                data['siteID'] = res['siteId']
                this.users.Id = data['staffId']
                this.users.Name = data['staffName']
                this.users.Email = data['staffEmail']
                this.users.Profile = data['staffProfile']
                this.users.Address = data['staffAddress']
                this.users.Contact = data['staffContact']
                this.users.Designation = data['staffDesignation']
                this.users.IsActive = data['staffIsActive']
                this.users.CreatedAt = data['staffCreatedAt']
                this.users.CreatedBy = data['staffCreatedBy']
                this.users.siteID = data['siteID']
                localStorage.setItem('User', JSON.stringify(this.users))
                this.user.setUserData(res['data'])
                this.router.navigate(['/dashboard/slots'])
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
