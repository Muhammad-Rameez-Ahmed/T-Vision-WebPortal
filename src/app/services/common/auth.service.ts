import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthModel } from 'src/app/auth/auth.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private auth: BehaviorSubject<AuthModel | null> = new BehaviorSubject<AuthModel | null>(
        JSON.parse(localStorage.getItem('authenticate') ?? '{}')
    );
    http: any;

    constructor(private router: Router) { }

    get user(): AuthModel | null {
        return this.auth.getValue();
    }




    get userObservable(): Observable<AuthModel | null> {
        return this.auth.asObservable();
    }

    set user(u: AuthModel | null) {
        this.auth.next(u);
        localStorage.setItem('authenticate', JSON.stringify(u));
    }

    logout(): void {
        this.auth.next(null);
        this.auth.complete();
        localStorage.removeItem('authenticate');
        window.location.reload();
    }

    login(payload: any): Observable<any> {
        return this.http.post(environment.apiUrl + "/staff/Login", payload)
    }
}
