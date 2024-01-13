import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StaffsService {

    constructor(private http: HttpClient) { }


    getAllStaffs(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/staff/FetchAllStaff', payload)
    }
    deleteStaff(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/staff/UpdateStaffStatus', payload)
    }
}
