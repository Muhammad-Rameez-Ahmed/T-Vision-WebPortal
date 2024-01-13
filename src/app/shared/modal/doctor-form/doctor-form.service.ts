import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DoctorFormService {

    constructor(private http: HttpClient) { }
    addDoctor(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/doctor/AddNewDoctor', payload)
    }

    updateDoctor(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/doctor/UpdateDoctor', payload)
    }

    getDoctorCategories(): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/docCategory/GetAllActiveCategory', {})
    }
}
