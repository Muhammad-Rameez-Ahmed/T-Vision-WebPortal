import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SlotsFormService {

    constructor(private http: HttpClient) { }

    addSlot(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/slot/AddNewSlot', payload)
    }

    getAllDoctors(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/doctor/FetchAllDoctor', payload)
    }


}