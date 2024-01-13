import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../common/auth.service';


@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService,
    ) { }

    canActivate(): boolean {

        if (localStorage.getItem('role') === 'staff') {
            return true;
        }
        return false;
    }

}
