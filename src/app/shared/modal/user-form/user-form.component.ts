import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserFormService } from './user-form.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { log } from 'console';
import { UserAddModel } from './user-form.model';
import { UserAdd } from 'src/app/auth/auth.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  image: any;

  InputImage($event: Event) {
    throw new Error('Method not implemented.');
  }
  getFile() {
    throw new Error('Method not implemented.');
  }

  close() {
    this.modal.dismissAll();
  }
  @Input() updateValue: boolean = false;
  loading = false;
  inputValue: any;

  @Input() model!: UserAddModel;
  @Input() data: any;

  userRole: any[] = [
    { roleId: 2, roleName: 'Mobile User' },
    { roleId: 1, roleName: 'Desktop User' },
  ];
  city: any[] = [{ id: 0, name: 'Karachi' }];

  constructor(private user: UserFormService, private modal: NgbModal) {}

  ngOnInit(): void {
    this.userForm.controls['name'].setValue(this.model.Name);
    this.userForm.controls['contact'].setValue(this.model.Contact);
    this.userForm.controls['password'].setValue(this.model.Password);
    this.userForm.controls['userRole'].setValue(this.model.userRole);

    console.log(this.model, 'name');

    // console.log(this.model.userId);
  }

  userForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('[^@ \t\r\n]+@[^@.\t\r\n]+.[^@.\t\r\n][^@ \t\r\n]+'),
    ]),
    contact: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(
        '([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])'
      ),
    ]),
    userRole: new FormControl<string>('', [Validators.required]),
    city: new FormControl<string>('', [Validators.required]),
    category: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  submit() {
    this.loading = true;
    // console.log(this.model)
    let fd = new FormData();
    // if (this.model.profile === '') {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Error',
    //         text: 'Please Upload Profile Picture',
    //         confirmButtonColor: '#0D67B5'
    //     })
    //     this.loading = false
    //     return
    // }

    let obj = {
      name: this.userForm.controls.name.value,
      email: this.userForm.controls.email.value,
      password: this.userForm.controls.password.value,
      contact: this.userForm.controls.contact.value,
      city: 'Karachi',
      roleId: this.userForm.controls.userRole.value,
    };
    console.log(obj);

    this.user.addUser(obj).subscribe(
      (res) => {
        if (res['status'] === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Successfully Added!',
            text: 'New User successfully Added!',
            confirmButtonColor: '#0D67B5',
          });
          this.modal.dismissAll();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error Code ' + res['status'],
            text: res['message'],
            confirmButtonColor: '#0D67B5',
          });
        }
        this.loading = false;
      },
      (err) => {
        // // console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error Code ' + err['status'],
          text: err['message'],
          confirmButtonColor: '#0D67B5',
        });
        this.loading = false;
      }
    );
  }

  update() {
    let obj1 = {
      name: this.userForm.controls.name.value,

      password: this.userForm.controls.password.value,
      contact: this.userForm.controls.contact.value,
      roleId: this.userForm.controls.userRole.value,
      userId: this.model.userId,
    };
    this.loading = true;
    console.log(obj1);

    this.user.updateUser(obj1).subscribe(
      (res) => {
        if (res['status'] === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Successfully Added!',
            text: 'Staff member successfully Added!',
            confirmButtonColor: '#0D67B5',
          });
          this.modal.dismissAll();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error Code ' + res['status'],
            text: res['message'],
            confirmButtonColor: '#0D67B5',
          });
        }
        this.loading = false;
      },
      (err) => {
        // // console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error Code ' + err['status'],
          text: err['message'],
          confirmButtonColor: '#0D67B5',
        });
        this.loading = false;
      }
    );
  }
}
