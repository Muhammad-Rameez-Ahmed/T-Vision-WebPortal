import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StaffFormService {

    constructor(private http: HttpClient) { }


    getStaffRoles(): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/role/getAllRoles', '')
    }

    addStaff(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/staff/AddNewStaff', payload)
    }

    updateStaff(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/staff/UpdateStaff', payload)
    }

}
