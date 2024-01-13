import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AppointmentViewService } from '../appointments-view/appointment-view.service';

@Component({
    selector: 'app-appointment-marking',
    templateUrl: './appointment-marking.component.html',
    styleUrls: ['./appointment-marking.component.scss']
})
export class AppointmentMarkingComponent implements OnInit {



    @Input() data: any;
    constructor(private modal: NgbModal, private appointments: AppointmentViewService,) { }

    ngOnInit(): void {
        // console.log('asd: ', this.data)
    }


    update(item: any, status: any, type: any) {
        let fd = new FormData();
        fd.append('appointmentId', item)
        fd.append('appointmentStatus', status)
        Swal.fire({
            title: '' + type + '?',
            text: 'Are you sure want to mark Appointment as ' + type + '?',
            icon: 'warning',
            cancelButtonText: 'No',
            denyButtonText: 'yes',
            // confirmButtonColor: '#6e7881',
            showCancelButton: true,
            showDenyButton: true,
            showConfirmButton: false

        }).then(res => {
            if (res.isDenied) {
                this.appointments.updateAppStatus(fd).subscribe(res => {
                    if (res['status'] === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful!',
                            text: res['message'],
                            confirmButtonColor: '#0D67B5'
                        })
                        this.modal.dismissAll(true);
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error Code ' + res['status'],
                            text: res['message'],
                            confirmButtonColor: '#0D67B5'
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
            }
        })
    }


}
