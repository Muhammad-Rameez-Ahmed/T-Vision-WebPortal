import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  constructor(private http: HttpClient) { }



  addUser(payload: any): Observable<any> {
    return this.http.post<any>(environment.url + '/api/v1/user/register', payload)
}

updateUser(payload: any): Observable<any> {
  return this.http.post<any>(environment.url + '/api/v1/user/update', payload)
}


}
