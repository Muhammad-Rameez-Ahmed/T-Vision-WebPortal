import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/common/alert.service';
import { AuthService } from 'src/app/services/common/auth.service';
// import { FirebaseService } from 'src/app/services/endpoints/firebase.service';
import { getRoles, RolesEnum } from 'src/app/services/enums/roles.enum';
import { EnumModel } from 'src/app/services/models/enum.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    role = RolesEnum;

    userRole: string | null = 'admin';
    constructor(
        private auth: AuthService,
        private alert: AlertService,
        private router: Router
        // private firebase: FirebaseService<unknown>
    ) { }

    ngOnInit(): void {
        this.userRole = localStorage.getItem('role');
    }

    getPermissions(role: RolesEnum): EnumModel {
        return getRoles(role);
    }
    navSize = 'nav'



    navOpen = false;
    openNav() {
        this.navOpen = !this.navOpen;
    }

    closeNav() {
        this.navOpen = false;
    }

    signOut(): void {
        localStorage.clear()
        this.router.navigate(['/auth'])
        // this.firebase.signOut()
        //     .then(() => this.auth.logout())
        //     .catch(err => this.alert.error(err.message));
    }

    nav__width = '19rem'
    close() {
        this.nav__width = '5rem'
    }
}
