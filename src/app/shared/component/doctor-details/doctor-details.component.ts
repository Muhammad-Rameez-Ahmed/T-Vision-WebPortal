import { Component, Input, OnInit } from '@angular/core';
import { DoctorAddModel, DoctorAdd } from '../../modal/doctor-form/doctor-form.model';

@Component({
    selector: 'app-doctor-details',
    templateUrl: './doctor-details.component.html',
    styleUrls: ['./doctor-details.component.scss']
})
export class DoctorDetailsComponent implements OnInit {



    @Input() model: DoctorAddModel = new DoctorAdd().init();
    constructor() { }


    image: any;
    ngOnInit(): void {

        this.image = this.model.profile
    }

}
