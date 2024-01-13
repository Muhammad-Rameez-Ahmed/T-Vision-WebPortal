import { Component, Input, OnInit } from '@angular/core';
import { AppointmentsTableService } from './appointments-table.service';

@Component({
    selector: 'app-appointments-table',
    templateUrl: './appointments-table.component.html',
    styleUrls: ['./appointments-table.component.scss']
})
export class AppointmentsTableComponent implements OnInit {


    // @Input() inputValue: string = "";
    // @Input() patientId: number | undefined = 0;
    Upcoming = [{ id: 0, name: 'Clinic A', date: '11/11/2222 09:00 pm' }, { id: 0, name: 'Clinic B', date: '11/11/2222 09:00 pm' }, { id: 0, name: 'Clinic A', date: '11/11/2222 09:00 pm' }, { id: 0, name: 'Clinic B', date: '11/11/2222 09:00 pm' }, { id: 0, name: 'Clinic A', date: '11/11/2222 09:00 pm' }, { id: 0, name: 'Clinic B', date: '11/11/2222 09:00 pm' }, { id: 0, name: 'Clinic A', date: '11/11/2222 09:00 pm' }, { id: 0, name: 'Clinic B', date: '11/11/2222 09:00 pm' }, { id: 0, name: 'Clinic A', date: '11/11/2222 09:00 pm' }, { id: 0, name: 'Clinic B', date: '11/11/2222 09:00 pm' }, { id: 0, name: 'Clinic A', date: '11/11/2222 09:00 pm' }, { id: 0, name: 'Clinic B', date: '11/11/2222 09:00 pm' }]
    history = [{ id: 0, name: 'Clinic C', date: '11/11/2222 09:00 pm' }, { id: 0, name: 'Clinic D', date: '11/11/2222 09:00 pm' }]
    @Input() list: any;


    constructor(private details: AppointmentsTableService) { }

    ngOnInit(): void {
        // // console.log('id:', this.patientId)
        // if (this.inputValue === 'upcoming') {
        //     this.getAppointmentUpcoming()
        // }
        // else {
        //     this.getAppointmentHistory()
        // }
    }


    dateFormatter() {
        let date = new Date();
        const yyyy = date.getFullYear();
        let mm = (date.getMonth() + 1).toString();
        let dd = date.getDate().toString();

        if (+dd < 10) dd = '0' + dd;
        if (+mm < 10) mm = '0' + mm;

        return dd + '-' + mm + '-' + yyyy;
    }



    getAppointmentHistory() {
        let fd = new FormData()
        // fd.append('appointmentPatient', this.patientId?.toString() || '')
        fd.append('appointmentDate', this.dateFormatter())
        this.details.getPatientAppoitmentHistory(fd).subscribe(res => {
            if (res['status'] === 200) {
                this.list = res['data']
            }
        })
    }
    getAppointmentUpcoming() {
        let fd = new FormData()
        // fd.append('appointmentPatient', this.patientId?.toString() || '')
        fd.append('appointmentDate', this.dateFormatter())
        this.details.getPatientAppoitmentUpcoming(fd).subscribe(res => {
            if (res['status'] === 200) {
                this.list = res['data']
            }
        })
    }
}
