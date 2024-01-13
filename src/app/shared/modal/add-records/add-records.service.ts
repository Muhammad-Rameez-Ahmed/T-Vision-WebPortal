import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonPatientsService } from 'src/app/services/common/patient.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class addRecordsService {

    constructor(private http: HttpClient) { }

    addNewRecord(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/appointment/AddNewAppointments', payload)
    }

    getAllActiveMedications(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/medicine/GetAllActiveMedicine', payload)
    }
    getAllMedications(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/medicine/GetAllMedicine', payload)
    }
    getAllAllergies(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/Allergy/GetAllActiveAllergy', payload)
    }
    getAllTest(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/labTests/GetAllActiveLabTest', payload)
    }
    getAllProblem(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/diseases/GetAllActiveDiseases', payload)
    }

}
