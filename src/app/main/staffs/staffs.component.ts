import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterService } from 'src/app/services/common/filter.service';
import { Profile } from 'src/app/shared/component/profile-card/profile-card.model';
import { StaffFormComponent } from 'src/app/shared/modal/staff-form/staff-form.component';
import { StaffAdd } from 'src/app/shared/modal/staff-form/staff-form.model';
import Swal from 'sweetalert2';
import { Staffs } from './staffs.model';
import { StaffsService } from './staffs.service';

@Component({
    selector: 'app-staffs',
    templateUrl: './staffs.component.html',
    styleUrls: ['./staffs.component.scss'],
})
export class StaffsComponent implements OnInit {


    page: number = 1;
    size: number = 10;
    total: number = 0;
    data: any;
    loading: boolean = true;
    notfound: boolean = false;
    field: string = 'index';
    inputValue: string = '';

    doctorslist: any[] = [{
        staffId: 1,
        staffName: "Fareed 2",
        staffEmail: "fareed@gmail.com",
        staffContact: "03412345678",
        staffDesignation: "ADMINISTRATOR",
        staffAddress: "Defence",
        staffProfile: "/Users/apple/Desktop/TCG/TCG/TCG_backend/src/Uploads/approved@3x.png",
        staffIsActive: true,
        staffCreatedAt: "02-12-2022 16:20:27",
        staffCreatedBy: 0
    }, {
        staffId: 1,
        staffName: "Fareed 2",
        staffEmail: "fareed@gmail.com",
        staffContact: "03412345678",
        staffDesignation: "ADMINISTRATOR",
        staffAddress: "Defence",
        staffProfile: "/Users/apple/Desktop/TCG/TCG/TCG_backend/src/Uploads/approved@3x.png",
        staffIsActive: true,
        staffCreatedAt: "02-12-2022 16:20:27",
        staffCreatedBy: 0
    },]

    modellist: Staffs[] = [];

    list: Staffs[] = []
    constructor(public modal: NgbModal, private staff: StaffsService, private filter: FilterService) {

    }

    searchdata: string = '';
    ngOnInit(): void {
        this.getAllStaff();

    }

    add(isUpdate: boolean) {
        const modalRef = this.modal.open(StaffFormComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        modalRef.componentInstance.inputValue = 'Add'
        modalRef.componentInstance.updateValue = isUpdate

        modalRef.result.then((data) => {
        }, (reason) => {
            this.getAllStaff();
        });
    }
    update(isUpdate: boolean, data: any) {
        const modalRef = this.modal.open(StaffFormComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        modalRef.componentInstance.inputValue = 'Update'
        let obj = {
            id: data.staffId,
            name: data.staffName,
            email: data.staffEmail,
            contact: data.staffContact,
            image: data.staffProfile,
            designation: data.staffDesignation,
            belongsTo: data.staffBelongsTo,
            role: data.staffRole,
            address: data.staffAddress,

        }
        modalRef.componentInstance.updateValue = isUpdate
        modalRef.componentInstance.model = obj;
        modalRef.componentInstance.data = data;
        modalRef.result.then((data) => {
        }, (reason) => {
            this.getAllStaff();
        });
    }

    pageChange(event: any) {
        // console.log(event)
        this.list = this.modellist.slice((event - 1) * this.size, event * this.size)
        // // console.log(this.list)
    }

    profiles: Profile[] = [];
    getAllStaff() {

        let user = JSON.parse(localStorage.getItem('User') || '').Id
        // // console.log(user)
        let fd = new FormData()
        fd.append('staffId', user)
        this.staff.getAllStaffs(fd).subscribe((res) => {
            if (res['status'] === 200) {
                this.modellist = res['data'].sort((a: any, b: any) => a.staffId > b.staffId ? -1 : 1)
                this.modellist.forEach(item => {
                    let profile: Profile = {};
                    profile['name'] = item.staffName
                    profile['email'] = item.staffEmail
                    profile['Contact Number'] = item.staffContact
                    profile['Address'] = item.staffAddress
                    profile['Role'] = item.staffDesignation
                    profile['Status'] = item.staffIsActive ? 'Active' : 'InActive'
                    this.profiles.push(profile)
                })
                this.data = res['data']
                this.loading = false
                // this.modellist = this.data.filter((x: any) => x.staffIsActive === true)
                // console.log(this.modellist)
                this.list = this.modellist.slice(0, 10);
                // this.page = 1;

                this.pageChange(this.page)
            }
            else {
                // console.log(res)
                Swal.fire({
                    title: 'Error Code' + res['status'],
                    text: res['message'],
                    icon: 'error',
                    confirmButtonText: 'Close',
                    confirmButtonColor: '#6e7881'
                })
                this.notfound = true
                this.loading = false
            }
        }, err => {
            // // console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Error Code ' + err['status'],
                text: err['message'],
                confirmButtonColor: '#0D67B5'
            })
            this.loading = false
            this.notfound = true
        })
    }


    delete(payload: any, active: any, event: any) {
        let fd = new FormData();
        Swal.fire({
            title: 'Change Status',
            text: 'Are you sure want to Change Status',
            icon: 'warning',
            denyButtonText: 'Change',
            // confirmButtonColor: '#6e7881',
            cancelButtonText: 'No',
            showCancelButton: true,
            showDenyButton: true,
            showConfirmButton: false
        }).then(res => {
            if (res.isDenied) {
                fd.append("staffId", payload)
                this.staff.deleteStaff(fd).subscribe((res) => {
                    if (res['status'] === 200) {
                        this.getAllStaff();
                    }
                    else {
                        Swal.fire({
                            title: 'Error Code' + res['status'],
                            text: res['message'],
                            icon: 'error',
                            confirmButtonText: 'Close',
                            confirmButtonColor: '#6e7881'
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
                    this.loading = false
                })
            }
            else {
                event.source.checked = !event.source.checked
                this.list[active].staffIsActive = !this.list[active].staffIsActive
                // // console.log(active)
            }
        })
    }



    Search() {
        // this.filter.castValue.subscribe((value: string) => {
        console.log('searched: ', this.inputValue)
        if (this.inputValue) {
            // this.inputValue = this.inputValue.trim().toLowerCase()
            this.list = this.modellist.filter((x: Staffs) => {
                return x.staffName?.trim().toLowerCase().includes(this.inputValue) || x.staffEmail?.trim().toLowerCase().includes(this.inputValue)
                    || x.staffContact?.trim().toLowerCase().includes(this.inputValue) || x.staffDesignation?.trim().toLowerCase().includes(this.inputValue)
                    || x.staffId.toString()?.trim().toLowerCase().includes(this.inputValue) || x.staffAddress.toString()?.trim().toLowerCase().includes(this.inputValue)
            })

        }
        else {
            this.list = this.modellist.slice(0, 10);
        }
        // }
        // );
    }
}
