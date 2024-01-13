import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComplaintsService } from 'src/app/main/complaints/complaints.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-complain-modal',
    templateUrl: './complain-modal.component.html',
    styleUrls: ['./complain-modal.component.scss']
})
export class ComplainModalComponent implements OnInit {

    notes: string = '';
    loading: boolean = false;
    @Input() inputValue: any;
    constructor(
        private modal: NgbModal,
        private complain: ComplaintsService
    ) { }

    ngOnInit(): void {
        this.notes = this.inputValue.complainResponse || ''
    }

    close() {

        this.modal.dismissAll();
    }

    submit() {
        let fd = new FormData()
        this.loading = true
        fd.append('staffId', JSON.parse(localStorage.getItem('User') || '').Id)
        fd.append('complainResponse', this.notes)
        fd.append('complainId', this.inputValue.complainId)
        this.complain.update(fd).subscribe((res) => {
            if (res['status'] === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully Updated!',
                    text: 'Complain successfully Updated!',
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
}
