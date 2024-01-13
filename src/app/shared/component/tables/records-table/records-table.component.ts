import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecordsTableService } from './records-table.service';

@Component({
    selector: 'app-records-table',
    templateUrl: './records-table.component.html',
    styleUrls: ['./records-table.component.scss']
})
export class RecordsTableComponent implements OnInit {

    @Input() inputValue: string = "";
    @Input() inputList: any;
    @Input() patientId: string | number = 0;
    isReadMore: boolean[] = [];
    list: any[] = [
        // {
        //     name: 'Blood Pressure', info: '', des: 'Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiutaliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillumdolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa quiofficiadeserunt mollit anim id est laborum.'
        // }, {
        //     name: 'Headaches', info: '', des: 'Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiutaliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillumdolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa quiofficiadeserunt mollit anim id est laborum.'
        // },
    ]


    problems: any = []
    current = [
        {
            name: 'Blood Pressure', info: '', des: 'Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiutaliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillumdolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa quiofficiadeserunt mollit anim id est laborum.'
        }, {
            name: 'Headaches', info: '', des: 'Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiutaliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillumdolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa quiofficiadeserunt mollit anim id est laborum.'
        },
    ]

    past = [
        {
            name: 'flu', info: '', des: 'Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiutaliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillumdolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa quiofficiadeserunt mollit anim id est laborum.'
        }, {
            name: 'cough', info: '', des: 'Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisiutaliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillumdolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa quiofficiadeserunt mollit anim id est laborum.'
        },
    ]

    allergies: any[] = []

    immunization: any[] = []
    medication: any[] = []
    labs: any[] = []
    constructor(
        public modal: NgbModal,
        private service: RecordsTableService,
        private cdref: ChangeDetectorRef
    ) { }


    ngOnChanges() {

        console.log('inputlist', this.inputList)
        if (this.inputList) {
            this.medication = this.inputList.prescribeMedicines.filter((x: any) => x.prescribeMedicineIsDailyDosage === true)
            // this.immunization = x.prescribeMedicines.filter((x: any) => x.prescribeMedicineIsDailyDosage !== true)
            this.medication = this.inputList.prescribeMedicines
            this.problems = this.inputList.diagnosesDiseases
            this.labs = this.inputList.LabTests
            this.allergies = this.inputList.diagnosesAllergies

        }
    }
    ngOnInit(): void {

        // console.log('inputlist', this.inputList)
        if (this.inputList) {
            this.medication = this.inputList.prescribeMedicines.filter((x: any) => x.prescribeMedicineIsDailyDosage === true)
            // this.immunization = x.prescribeMedicines.filter((x: any) => x.prescribeMedicineIsDailyDosage !== true)
            this.medication = this.inputList.prescribeMedicines
            this.problems = this.inputList.diagnosesDiseases
            this.labs = this.inputList.LabTests
            this.allergies = this.inputList.diagnosesAllergies

        }

        if (this.inputValue === 'problems') {
            this.list = this.problems
        }
        // if (this.inputValue === 'past') {
        //     this.list = this.problems
        // }
        if (this.inputValue === 'labs') {
            this.list = this.labs
        }
        if (this.inputValue === 'medication') {
            this.list = this.medication
        }
        if (this.inputValue === 'immunization') {
            this.list = this.immunization
        }
        if (this.inputValue === 'allergies') {
            this.list = this.allergies
        }
        // if(this.inputValue === 'current'){
        //     this.list = this.current
        // }
        this.list.forEach(x => {
            this.isReadMore.push(true);
            // console.log(x.info)
        })
        // this.getAllRecords()


    }

    // ngAfterContentChecked() {
    //     this.cdref.detectChanges();
    //     // console.log('change', this.inputList)
    // }

    getAllRecords() {
        let fd = new FormData()
        fd.append('patientId', this.patientId.toString())
        this.service.getAllRecords(fd).subscribe(x => {
            this.medication = x.prescribeMedicines.filter((x: any) => x.prescribeMedicineIsDailyDosage === true)
            // this.immunization = x.prescribeMedicines.filter((x: any) => x.prescribeMedicineIsDailyDosage !== true)
            this.medication = x.prescribeMedicines
            this.problems = x.diagnosesDiseases
            this.labs = x.LabTests
            this.allergies = x.diagnosesAllergies

        })
    }

    showText(i: number) {
        this.isReadMore[i] = !this.isReadMore[i]
    }
    show() {

        const modalRef = this.modal.open(RecordsTableComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
        // modalRef.componentInstance.inputValue = item;
        // // console.log(item)
    }

    jsonParser(item: any) {
        return JSON.parse(item.testResult ? item.testResult : '')
    }
}
