import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DetailsService {

    constructor(private http: HttpClient) { }

    getPatientAppoitmentHistory(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/appointment/getAppointmentHistory', payload)
    }
    getPatientAppoitmentUpcoming(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/appointment/getUpComingAppointment', payload)
    }
}
