import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAnalysisService {

  constructor(private http: HttpClient) { }
  getAnalytics(): Observable<any> {
    return this.http.get<any>(environment.url + '/api/v1/user/analytics')
}
}
