import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Users } from './users.model';
import { UsersService } from './users.service';
import { log } from 'console';
import { UserFormComponent } from 'src/app/shared/modal/user-form/user-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsComponent } from 'src/app/shared/component/user-details/user-details.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  showApp() {
    throw new Error('Method not implemented.');
  }

  inputValue: any;

  show() {
    const modalRef = this.modal.open(UserFormComponent, {
      windowClass: 'modal-animate',
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.inputValue = 'Add';
    modalRef.componentInstance.updateValue = false;

    modalRef.result.then(
      (data) => {},
      (reason) => {
        this.getAllUser();
      }
    );
  }

  list: Users[] = [];
  modellist: Users[] = [];
  loading: boolean = true;
  notfound: boolean = false;

  page: number = 1;
  size: number = 10;
  total: number = 0;
  field: string = 'index';

  constructor(private user: UsersService, public modal: NgbModal) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  pageChange(event: any) {
    this.list = this.modellist.slice(
      (event - 1) * this.size,
      event * this.size
    );
  }

  getAllUser() {
    this.user.getAllUser().subscribe(
      (res: any) => {
        if (res['status'] === 302) {
          let data = res['data'];
          this.modellist = data;

          // this.modellist = data.filter((x: any) => x.doctorIsActive === true)
          // this.modellist = data
          // this.list = this.modellist.slice(0, 10);
          this.list = this.modellist.slice(0, 10);
          console.log(this.list);

          this.pageChange(this.page);
          // console.log(this.list)
          this.loading = false;
        } else {
          this.loading = false;
          this.notfound = true;
        }
        // console.log(res)
      },
      (err) => {
        this.loading = false;
        this.notfound = true;
      }
    );
  }

  showView(data: any) {
    // const modalRef = this.modal.open(AppointmentsViewComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
    const modalRef = this.modal.open(UserDetailsComponent, {
      windowClass: 'modal-animate',
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.data = data;

    console.log(data);
    let obj = {
      // doctorId: data.doctorId,
      // doctorCreatedAt: data.doctorCreatedAt,
      userId: data.userId,
      Name: data.name,
      Email: data.email,
      Contact: data.contact,
      // profile: data.doctorProfile,
      // userIsActive: data.userIsActive,
      userRole: data.userId,
      // doctorCategory: data.doctorCategory
    };

    modalRef.componentInstance.model = obj;
  }

  update(isUpdate: boolean, data: Users) {
    console.log(data);

    const modalRef = this.modal.open(UserFormComponent, {
      windowClass: 'modal-animate',
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.inputValue = 'Update';
    modalRef.componentInstance.updateValue = true;

    let obj = {
      userId: data.userId,
      Name: data.name,
      Email: data.email,
      Contact: data.contact,
      Password: data.password,
      // profile: data.doctorProfile,
      userIsActive: 'ACTIVE',
      userRole: data.roleId,
      // doctorCategory: data.doctorCategory.docCategoryId
    };

    modalRef.componentInstance.model = obj;
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.id = data.userId;
    modalRef.result.then(
      (data) => {},
      (reason) => {
        this.getAllUser();
      }
    );
  }

  delete(userId: any, active: any, event: any) {
    let fd = new FormData();
    fd.append('userId', userId);
    Swal.fire({
      title: 'Delete User',
      text: 'Are you sure want to Delete User',
      icon: 'warning',
      denyButtonText: 'Delete',
      // confirmButtonColor: '#6e7881',
      cancelButtonText: 'No',
      showCancelButton: true,
      showDenyButton: true,
      showConfirmButton: false,
    }).then((res) => {
      if (res.isDenied) {
        this.user.setInactiveUsers(fd).subscribe(
          (res) => {
            if (res['status'] === 200) {
              this.getAllUser();
            } else {
              Swal.fire({
                title: 'Error Code' + res['status'],
                text: res['message'],
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: '#6e7881',
              });
            }
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
      } else {
        event.source.checked = !event.source.checked;
        this.list[active].userIsActive = !this.list[active].userIsActive;
        // // console.log(active)
      }
    });
  }

  Search() {
    console.log('searched: ', this.inputValue);
    if (this.inputValue) {
      // this.inputValue = this.inputValue.trim().toLowerCase()
      this.list = this.modellist.filter((x: Users) => {
        return (
          x.name?.trim().toLowerCase().includes(this.inputValue) ||
          x.email?.trim().toLowerCase().includes(this.inputValue) ||
          x.contact.toString()?.trim().toLowerCase().includes(this.inputValue)
        );
      });
    } else {
      this.list = this.modellist.slice(0, 10);
    }
  }
}
