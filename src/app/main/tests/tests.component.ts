import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../patients/patients.service';
import { Patients } from '../patients/patients.model';
import { TestService } from './tests.service';
import { RecordsTableService } from 'src/app/shared/component/tables/records-table/records-table.service';
import { TestResultsComponent } from 'src/app/shared/modal/test-results/test-results.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-tests',
    templateUrl: './tests.component.html',
    styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {


    page: number = 1;
    size: number = 10;
    total: number = 0;
    id: any = 0;
    date: any;


    loading: boolean = true;
    notfound: boolean = false;
    field: string = 'index';
    modellist: Patients[] = [];

    perList: any[] = []
    list: any[] = [
        {
            patient: 'Demo Patient',
            name: 'Blood test',
            recommendedOn: '21-12-2023',
            result: 'https://www.africau.edu/images/default/sample.pdf'
        },
        {
            patient: 'Demo Patient',
            name: 'Blood test',
            recommendedOn: '21-12-2023',
            result: ''
        },
        {
            patient: 'Demo Patient',
            name: 'Blood test',
            recommendedOn: '21-12-2023',
            result: ''
        }
    ]

    testList: any[] = []

    constructor(
        private patient: PatientsService,
        private testSer: TestService,
        private service: RecordsTableService,
        private modal: NgbModal,
    ) { }

    ngOnInit(): void {
        // this.getAllPatients()
        this.getTests()
    }


    getTests() {
        this.testSer.getTests().subscribe(x => {
            if (x.status === 200) {
                // this.testList = x.LabTests
                let testList = x.LabTests.sort((a: any, b: any) => (new Date(a.appointmentId.appointmentDate.split('-')[2], a.appointmentId.appointmentDate.split('-')[1], a.appointmentId.appointmentDate.split('-')[0]) > new Date(b.appointmentId.appointmentDate.split('-')[2], b.appointmentId.appointmentDate.split('-')[1], b.appointmentId.appointmentDate.split('-')[0])) ? -1 : 1)
                // this.testList = testList.filter((x: any) => x.patientIsActive === true)
                this.testList = testList.slice(0, 10);
                this.list = testList
                this.perList = this.list
                this.loading = false
                if (this.modellist.length === 0) {

                    this.modellist = x.PatientList
                    console.log('working')
                }
                this.pageChange(this.page)
            } else {
                this.notfound = true
                this.loading = false
            }
            // console.log(res)
        }, err => {
            this.loading = false
            this.notfound = true
        })
    }

    pageChange(event: any) {
        // console.log(event)
        this.testList = this.list.slice((event - 1) * this.size, event * this.size)
        // console.log(this.doctorslist)
    }


    updateTest(item: any) {
        const modalRef = this.modal.open(TestResultsComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        console.log('tests')
        modalRef.componentInstance.data = item
        // modalRef.componentInstance.updateValue = isUpdate

        modalRef.result.then((data) => {
        }, (reason) => {
            if (reason) {
                this.getTests()
            }
        });
    }

    getPatientTest() {
        if (!this.date && this.id === 0) {
            this.list = this.perList
        }
        else if (this.id === 0) {
            this.list = this.perList.filter(x => new Date(x.appointmentId.appointmentDate.split('-')[2], x.appointmentId.appointmentDate.split('-')[1] - 1, x.appointmentId.appointmentDate.split('-')[0]) <= new Date(this.date))
        }
        else if (!this.date) {
            this.list = this.perList.filter(x => x.appointmentId.appointmentPatient.patientId == this.id)
        }
        else {
            this.list = this.perList.filter(x => x.appointmentId.appointmentPatient.patientId == this.id && new Date(x.appointmentId.appointmentDate.split('-')[2], x.appointmentId.appointmentDate.split('-')[1] - 1, x.appointmentId.appointmentDate.split('-')[0]) <= new Date(this.date))
        }
        this.page = 1
        this.pageChange(1)
    }

    openFile(url: any) {
        window.open(url, "_blank");
    }

    getSpecificPatientRecord() {

        let fd = new FormData()
        fd.append('patientId', this.id.toString())
        this.service.getAllRecords(fd).subscribe(x => {
            if (x.status === 200) {
                let testList = x.LabTests
                this.testList = testList.slice(0, 10);
                this.list = testList
                this.loading = false
                this.pageChange(this.page)
            } else {
                this.notfound = true
                this.loading = false
            }
            // console.log(res)
        }, err => {
            this.loading = false
            this.notfound = true
        })
    }

}
