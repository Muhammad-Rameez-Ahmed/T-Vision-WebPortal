import { Component, OnInit } from '@angular/core';
import { ComplaintsService } from './complaints.service';
import { ComplainModalComponent } from 'src/app/shared/modal/complain-modal/complain-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientsService } from '../patients/patients.service';

@Component({
    selector: 'app-complaints',
    templateUrl: './complaints.component.html',
    styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {



    page: number = 1;
    size: number = 10;
    total: number = 0;
    modellist: any[] = [];
    list: any[] = [];
    loading: boolean = true;
    notfound: boolean = false;
    field: string = 'index';
    id: any = 0;
    date: any;

    doctorslist: any[] = [{ name: 'Dr john doe', description: 'some description', client: 'Someone', status: 'Active', created: 'Wed, Oct 19, 2022, 3: 43 PM', updated: 'Wed, Oct 19, 2022, 3: 43 PM' }, { name: 'Dr john doe', description: 'some description', client: 'Someone', status: 'Active', created: 'Wed, Oct 19, 2022, 3: 43 PM', updated: 'Wed, Oct 19, 2022, 3: 43 PM' },]

    constructor(
        private complaints: ComplaintsService,
        public modal: NgbModal,
        private patient: PatientsService
    ) { }

    ngOnInit(): void {
        console.log('test')
        this.getAllPatients()
        this.getAllComplains()
    }

    patientList: any;
    getAllComplains() {
        this.complaints.getAllComplains().subscribe((res: any) => {
            if (res['status'] === 200) {
                let data = res['Complains']
                this.modellist = res['Complains'].sort((a: any, b: any) => (new Date(a.complainUpdatedAt) > new Date(b.complainUpdatedAt)) ? -1 : 1)
                // this.modellist = data.filter((x: any) => x.patientIsActive === true)
                // this.modellist = data
                this.list = this.modellist.slice(0, 10);
                this.loading = false
                this.pageChange(this.page)
            }
            else {
                this.notfound = true
                this.loading = false
            }
            // console.log(res)
        }, err => {
            this.loading = false
            this.notfound = true
        })
    }




    getAllPatients() {
        let fd = new FormData();
        fd.append('patientBelongsToSite', JSON.parse(localStorage.getItem('User') || '')?.siteID)
        this.patient.getAllPatients(fd).subscribe((res) => {
            if (res['status'] === 200) {
                let data = res['data']
                this.patientList = res['data']
            }
            else {
                this.notfound = true
                this.loading = false
            }
            // console.log(res)
        }, err => {
            this.loading = false
            this.notfound = true
        })
    }

    update(x: any, y: any) {

    }

    view(x: any) {
        const modalRef = this.modal.open(ComplainModalComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        modalRef.componentInstance.inputValue = x
        modalRef.result.then((data) => {
        }, (reason) => {
            this.getAllComplains();
        });
    }

    pageChange(event: any) {
        // console.log(event)
        this.list = this.modellist.slice((event - 1) * this.size, event * this.size)
        // console.log(this.doctorslist)
    }


    getPatientTest() {
        if (!this.date && this.id === 0) {
            this.list = this.modellist.slice(0, 10);
        }
        else if (this.id === 0) {
            this.list = this.modellist.filter(x => new Date(x.complainUpdatedAt).setHours(0, 0, 0, 0) <= new Date(this.date).setHours(0, 0, 0, 0))
        }
        else if (!this.date) {
            this.list = this.modellist.filter(x => x.patientId.patientId == this.id)
        }
        else {
            this.list = this.modellist.filter(x => x.patientId.patientId == this.id && new Date(x.complainUpdatedAt).setHours(0, 0, 0, 0) <= new Date(this.date).setHours(0, 0, 0, 0))
        }
        this.page = 1
    }
}
