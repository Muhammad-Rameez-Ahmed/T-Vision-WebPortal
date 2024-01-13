import { Component, OnInit } from '@angular/core';
import { addRecordsService } from './add-records.service';

@Component({
    selector: 'app-add-records',
    templateUrl: './add-records.component.html',
    styleUrls: ['./add-records.component.scss']
})
export class AddRecordsComponent implements OnInit {

    constructor(
        private service: addRecordsService
    ) { }

    selected = "Medication";
    record: any[] = []
    recordTypes = ['Medication', 'Allergies', 'Immunization', 'Labs/Test', 'Problems']
    medicationList: any[] = [];
    allergiesList: any[] = [];
    displayAllergies: any[] = [];


    ngOnInit(): void {
        this.recordTypeSelected()
    }

    test() {
        // console.log(this.record)
    }


    recordTypeSelected() {
        if (this.selected === 'Medication') {
            this.getAllActiveMedication()
        }
        else if (this.selected === 'Allergies') {
            this.getAllActiveAllergies()
        }
        else if (this.selected === 'Immunization') {
            this.getAllActiveMedication()
        }
        else if (this.selected === 'Labs/Test') {
            this.getAllActiveMedication()
        }
        else if (this.selected === 'Problems') {
            this.getAllActiveMedication()
        }
    }


    getAllActiveMedication() {
        this.service.getAllActiveMedications('').subscribe(res => {
            if (res['status'] === 200) {
                this.medicationList = res['data']
            }
        })
    }
    getAllActiveAllergies() {
        this.service.getAllAllergies('').subscribe(res => {
            if (res['status'] === 200) {
                this.allergiesList = res['data']
            }
        })
    }

}
