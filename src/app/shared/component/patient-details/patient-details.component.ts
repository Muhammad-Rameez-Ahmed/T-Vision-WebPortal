import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsService } from 'src/app/main/patients/details/details.service';
import { AddRecordsComponent } from '../../modal/add-records/add-records.component';
import { AppointmentDetailsComponent } from '../../modal/appointment-details/appointment-details.component';
import { Patients } from '../../modal/appointment-details/appointment-details.model';

@Component({
    selector: 'app-patient-details',
    templateUrl: './patient-details.component.html',
    styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {


    active = 1;
    constructor(public modal: NgbModal, private details: DetailsService) { }

    patient: Patients | null = null;
    ngOnInit(): void {
        this.patient = (JSON.parse(localStorage.getItem('patient') || ''))
        // this.getAppointmentHistory();
        // this.getAppointmentUpcoming();
        // // console.log(this.patient?.patientUserProfile)
    }

    addRecord() {

        this.modal.open(AddRecordsComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
    }

    addAppointment() {


        this.modal.open(AppointmentDetailsComponent, { windowClass: 'modal-animate', centered: true, size: 'lg' })
    }


    getAppointmentHistory() {
        let fd = new FormData()
        fd.append('appointmentPatient', '1')
        fd.append('appointmentDate', '22-02-2023')
        this.details.getPatientAppoitmentHistory(fd).subscribe(res => {
            // console.log(res)
        })
    }
    getAppointmentUpcoming() {
        let fd = new FormData()
        fd.append('appointmentPatient', '1')
        fd.append('appointmentDate', '22-02-2023')
        this.details.getPatientAppoitmentUpcoming(fd).subscribe(res => {
            // console.log(res)
        })
    }

}
