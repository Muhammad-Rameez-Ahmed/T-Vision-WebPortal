import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../common/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService,
    ) { }

    canActivate(): boolean {
        // console.log('auth')
        // console.log(localStorage.getItem('User'))

        if (localStorage.getItem('User') !== undefined && localStorage.getItem('User') !== null) {
            if (localStorage.getItem('role') === 'staff') {
                this.router.navigate(['/dashboard/appointments']);
            }
            else {

                this.router.navigate(['/dashboard/doc-appointments']);
            }
            return false;
        }
        return true;
    }

}
