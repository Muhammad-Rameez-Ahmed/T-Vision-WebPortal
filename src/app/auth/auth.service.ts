import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }


    doctorLogin(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/doctor/Login', payload);
    }

    login(payload: any): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/staff/Login', payload);
    }

}
