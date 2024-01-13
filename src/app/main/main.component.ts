import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthModel } from '../auth/auth.model';
import { AlertService } from '../services/common/alert.service';
import { AuthService } from '../services/common/auth.service';
// // import { FirebaseService } from '../services/endpoints/firebase.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private auth: AuthService,
        private alert: AlertService,
        // private firebase: FirebaseService<AuthModel>,
    ) { }

    ngOnInit(): void {
        // this.getUser();
    }

    getUser(): void {
        this.route.data.pipe(map(data => data['routeResolver']), take(1)).subscribe(res => {
            const data = res.data();
            if (!data) return;
            if (!this.auth.user) return;
            this.auth.user.user = { id: data['id'], name: data['name'] };
            this.auth.user.role = data['role'];
            this.auth.user.status = data['status'];
            this.auth.user = this.auth.user;
        });
        // if (!this.auth.user) return;
        // this.firebase.getCollection('members', this.auth.user.uid)
        //   .then(snap => {
        //     const data = snap.data();
        //     if (!data) return;
        //     if (!this.auth.user) return;
        //     this.auth.user.user = { id: data['id'], name: data['name'] };
        //     this.auth.user.role = data['role'];
        //     this.auth.user.status = data['status'];
        //     this.auth.user = this.auth.user;
        //   })
        //   .catch(err => {
        //     this.alert.error(err.message);
        //   });
    }

}
