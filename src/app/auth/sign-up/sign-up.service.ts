import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SignupService {

    constructor(private http: HttpClient) { }

    getStaffRoles(): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/role/getAllRoles', '')
    }

    signUpDoctor(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/doctor/AddNewDoctor', payload)
    }

    getDoctorCategories(): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/docCategory/GetAllActiveCategory', {})
    }


    getAllSites(): Observable<any> {
        return this.http.get<any>(environment.apiUrl + '/site/FetchAllSites')
    }

}