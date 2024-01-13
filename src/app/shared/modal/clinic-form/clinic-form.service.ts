import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClinicFormService {

    constructor(private http: HttpClient) { }

    addClinic(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/clinic/AddNewClinic', payload)
    }
}
