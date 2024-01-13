import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CommonPatientsService {

    constructor(protected http: HttpClient) { }

    getAllPatients(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/patient/GetAllPatients', payload)
    }
}
