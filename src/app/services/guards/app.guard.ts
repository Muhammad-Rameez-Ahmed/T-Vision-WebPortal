import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../common/auth.service';


@Injectable({ providedIn: 'root' })
export class AppGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService,
    ) { }

    canActivate(): boolean {
        // console.log('app')
        if (localStorage.getItem('User') === undefined || localStorage.getItem('User') === null) {
            this.router.navigate(['/auth']);
            return false;
        }

        // this.router.navigate(['/appointments']);
        return true;
    }

}
