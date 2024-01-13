import { Component, Input, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/common/app.service';
import { AuthService } from 'src/app/services/common/auth.service';
// import { FirebaseService } from 'src/app/services/endpoints/firebase.service';
import { NotificationsModel } from './notification.model';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

    @Input() list: NotificationsModel[] = [];
    unread: boolean = false;

    constructor(
        private router: Router,
        private app: AppService,
        private auth: AuthService,
        // private firebase: FirebaseService<NotificationsModel>
    ) { }

    ngOnInit(): void {
    }

    getRelativeTime(date: Timestamp | null): string {
        if (!date) return '';
        return this.app.relativeTime(new Date(date.toDate()))
    }

    redirectTo(item: NotificationsModel): void {
        this.router.navigate([item.link])
            .then(() => this.maskAsRead(item));
    }

    maskAsRead(item: NotificationsModel): void {
        // if (!this.auth.user) return;
        // const payload = { ...item };
        // payload.read = true;
        // this.firebase.updateCollection('notifications/list/' + this.auth.user?.uid, payload, payload.id.toString())

    }

    viewUnread(): void {
        this.list = this.unread
            ? this.list.sort((a, b) => (a.created?.toDate() ?? 0) < (b.created?.toDate() ?? 0) ? 1 : -1)
            : this.list.sort((a, b) => a.read > b.read ? 1 : -1);
        this.unread = !this.unread;
    }

}
