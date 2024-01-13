import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClinicsService {

    constructor(private http: HttpClient) { }

    getAllCLinics(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/clinic/FetchAllClinic', payload)
    }

    setInactiveClinics(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/clinic/UpdateClinicStatus', payload)
    }
}
