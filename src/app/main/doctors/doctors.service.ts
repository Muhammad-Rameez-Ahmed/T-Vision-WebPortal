import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DoctorsService {

    constructor(private http: HttpClient) { }

    getAllDoctors(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/doctor/FetchAllDoctor', payload)
    }

    setInactiveDoctors(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/doctor/UpdateDoctorStatus', payload)
    }
}
