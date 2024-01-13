import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 

  constructor(private http: HttpClient) { }



  getAllUser(): Observable<any> {
    return this.http.get<any>(environment.url + '/api/v1/user/allUsers')
}
setInactiveUsers(payload: any): Observable<any> {
  return this.http.post<any>(environment.url + '/api/v1/user/delete', payload)
}

}
