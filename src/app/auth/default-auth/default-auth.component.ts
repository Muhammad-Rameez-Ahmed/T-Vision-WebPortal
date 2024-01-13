import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/common/alert.service';
import { BaseComponent } from 'src/app/shared/classes/base.component';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { AuthModel, AuthLogin, User, UserAdd } from '../auth.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-default-auth',
  templateUrl: './default-auth.component.html',
  styleUrls: ['./default-auth.component.scss'],
})
export class DefaultAuthComponent
  extends BaseComponent<AuthModel[]>
  implements OnInit
{
  visibility: boolean = false;
  loadings: boolean = false;

  // model: AuthModel = new Auth().init();
  model: AuthLogin = { email: '', password: '' };
  userType = 'staff';
  userList: any[] = [
    { name: 'staff' },
    { name: 'doctor' },
    //  { name: 'admin' }
  ];
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
    public modal: NgbModal // private firebase: FirebaseService<AuthModel>,
  ) {
    super();
  }

  override ngOnInit(): void {}

  onSubmit(): void {
    this.loadings = true;

    //     this.firebase.authenticate(this.model)
    //       .then(res => {
    //         this.model.uid = res.user.uid;
    //         this.auth.user = this.model;
    //         this.router.navigate(['/analytics']);
    //       })
    //       .catch(err => {
    //         this.alert.error(err.message);
    //         this.loadings = false;
    //       });
    //   }

    localStorage.setItem('role', this.userType);
    // console.log(this.userType)
    let form = new FormData();
    if (this.userType === 'staff') {
      form.append('staffEmail', this.model.email);
      form.append('staffPassword', this.model.password);
      this.auth.login(form).subscribe(
        (res: any) => {
          if (res['status'] === 200) {
            // console.log(res['data'])
            let data = res['data'];
            data['siteID'] = res['siteId'];
            this.users.Id = data['staffId'];
            this.users.Name = data['staffName'];
            this.users.Email = data['staffEmail'];
            this.users.Profile = data['staffProfile'];
            this.users.Address = data['staffAddress'];
            this.users.Contact = data['staffContact'];
            this.users.Designation = data['staffDesignation'];
            this.users.IsActive = data['staffIsActive'];
            this.users.CreatedAt = data['staffCreatedAt'];
            this.users.CreatedBy = data['staffCreatedBy'];
            this.users.siteID = data['siteID'];
            localStorage.setItem('User', JSON.stringify(this.users));
            this.user.setUserData(res['data']);
            this.router.navigate(['/dashboard/users']);
            this.loadings = false;
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Login Successfull',
              showConfirmButton: false,
              timer: 1500,
            });
            // Swal.fire({
            //   icon: 'error',
            //   title: 'Error Code ' + res['status'],
            //   text: res['message'],
            // });
            // this.loadings = false;
          }
        },
        (err) => {
          // // console.log(err);
          this.loadings = false;
          Swal.fire({
            icon: 'error',
            title: 'Error Code ' + err['status'],
            text: err['message'],
            confirmButtonColor: '#0D67B5',
          });
        }
      );
      this.loadings = true;
    } else if (this.userType === 'doctor') {
      form.append('doctorEmail', this.model.email);
      form.append('doctorPassword', this.model.password);
      this.auth.doctorLogin(form).subscribe(
        (res: any) => {
          if (res['status'] === 200) {
            // console.log(res['data'])
            let data = res['data'];
            data['siteID'] = res['siteId'];
            this.users.Id = data['doctorId'];
            this.users.Name = data['doctorName'];
            this.users.Email = data['doctorEmail'];
            this.users.Profile = data['doctorProfile'];
            this.users.Contact = data['doctorContact'];
            this.users.IsActive = data['doctorIsActive'];
            this.users.CreatedAt = data['doctorCreatedAt'];
            this.users.Category = data['doctorCategory'];
            this.users.siteID = data['doctorBelongsTo']['siteId'];
            this.users.BelongsTo = data['doctorBelongsTo'];
            this.users.Gender = data['doctorGender'] == 0 ? 'Female' : 'Male';
            localStorage.setItem('User', JSON.stringify(this.users));
            this.user.setUserData(res['data']);
            this.router.navigate(['/dashboard/doc-appointments']);
            this.loadings = false;
          } else {
            this.loadings = false;
            Swal.fire({
              icon: 'error',
              title: 'Error Code ' + res['status'],
              text: res['message'],
            });
          }
        },
        (err) => {
          // // console.log(err);
          this.loadings = false;
          Swal.fire({
            icon: 'error',
            title: 'Error Code ' + err['status'],
            text: err['message'],
            confirmButtonColor: '#0D67B5',
          });
        }
      );
      this.loadings = false;
    } else {
      this.loadings = false;
      Swal.fire({
        icon: 'error',
        title: 'Error Code 400',
        text: 'invalid Username or password',
      });
    }
  }

  clicked = false;
  settype(type: string) {
    this.userType = type;
  }

  register() {
    this.router.navigate(['/auth/sign-up']);
  }
}
