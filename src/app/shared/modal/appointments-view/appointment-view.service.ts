import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppointmentViewService {

    constructor(private http: HttpClient) { }


    getAppointments(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/appointment/getAllPendingAppointments', payload);
    }

    getAllStatus(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/appointment/getAllStatus', {});
    }
    updateAppStatus(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/appointment/updateAppointmentStatus', payload);
    }
}
