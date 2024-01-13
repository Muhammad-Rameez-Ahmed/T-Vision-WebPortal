import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonPatientsService } from 'src/app/services/common/patient.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TestService {

    constructor(private http: HttpClient) { }

    // getAllPatients(payload: any): Observable<any> {
    //     return this.http.post<any>(environment.apiUrl + '/patient/GetAllPatients', payload)
    // }
    // }
    getTests(): Observable<any> {
        return this.http.get<any>(environment.apiUrl + '/Prescription/getAllLabsForPatients')
    }



}


