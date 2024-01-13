import { Component, OnInit } from '@angular/core';
import { onSnapshot, collection, query } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/common/alert.service';
import { AuthService } from 'src/app/services/common/auth.service';
// import { FirebaseService } from 'src/app/services/endpoints/firebase.service';
import { NotificationsModel } from './notification/notification.model';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ThisReceiver } from '@angular/compiler';
import { FilterService } from 'src/app/services/common/filter.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    value = '';

    name: string | undefined = undefined;
    email: string | undefined = undefined;
    list: NotificationsModel[] = [];
    subscriptionRoute: Subscription | undefined;
    classBackground: string = '';
    heading = 'Appointments'
    userData: any;
    constructor(
        private auth: AuthService,
        private alert: AlertService,
        private router: Router,
        private user: UserService,
        private filter: FilterService
    ) { }

    ngOnInit(): void {
        // // console.log(this.list)
        // this.list.push({
        //     id: 'asd',
        //     name: 'asd',
        //     description: 'asd',
        //     image: 'asd',
        //     link: 'asd',
        //     read: false,
        //     status: null,
        //     created: null,
        //     updated: null,
        // });
        // this.name = this.auth.user?.user?.name;
        // this.email = this.auth.user?.email;
        this.user.userData.subscribe(x => {
            this.userData = JSON.parse(x)

        })
        this.userData = JSON.parse(localStorage.getItem('User') || '')
        // // console.log('A: ')
        this.name = this.userData.Name
        this.email = this.userData.Email
        let event = this.router
        // console.log(event.url);
        if (event.url === '/dashboard/appointments') {
            this.heading = 'Appointments'
        }
        if (event.url === '/dashboard/doctors') {
            this.heading = 'Doctors'
        } if (event.url === '/dashboard/users') {
            this.heading = 'Users'
        }if (event.url === '/dashboard/user-analysis') {
            this.heading = 'Users-Analysis'
        }
        if (event.url === '/dashboard/staffs') {
            this.heading = 'Staffs'
        }
        if (event.url === '/dashboard/patients') {
            this.heading = 'Patients'
        }
        if (event.url === '/dashboard/patients/view') {
            this.heading = 'Patient Details'
        }
        if (event.url === '/dashboard/complaints') {
            this.heading = 'Complaints'
        }
        if (event.url === '/dashboard/clinics') {
            this.heading = 'Clinics'
        }
        if (event.url === '/dashboard/slots') {
            this.heading = 'Slots'
        }
        if (event.url === '/dashboard/tests') {
            this.heading = 'Tests'
        }

        this.subscriptionRoute = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // console.log(event.url);
                if (event.url === '/dashboard/appointments') {
                    this.heading = 'Appointments'
                }
                if (event.url === '/dashboard/doctors') {
                    this.heading = 'Doctors'
                }if (event.url === '/dashboard/users') {
                    this.heading = 'Users'
                }if (event.url === '/dashboard/user-analysis') {
                    this.heading = 'Analysis'
                }if (event.url === '/dashboard/record-analysis') {
                    this.heading = 'Analysis'
                }
                if (event.url === '/dashboard/record') {
                    this.heading = 'T-shirt Records'
                }
                if (event.url === '/dashboard/staffs') {
                    this.heading = 'Staffs'
                }
                if (event.url === '/dashboard/patients') {
                    this.heading = 'Patients'
                }
                if (event.url === '/dashboard/patients/view') {
                    this.heading = 'Patient Details'
                }
                if (event.url === '/dashboard/complaints') {
                    this.heading = 'Complaints'
                }
                if (event.url === '/dashboard/clinics') {
                    this.heading = 'Clinics'
                }
                if (event.url === '/dashboard/slots') {
                    this.heading = 'Slots'
                }
                if (event.url === '/dashboard/tests') {
                    this.heading = 'Tests'
                }
                //here set classBackground property
            }
        });
        // this.getList();
    }

    getInitials(): string {
        if (!this.auth.user) return '';
        if (!this.auth.user.user) return '';
        const name: string[] = this.auth.user.user.name.split(' ');
        return (name[0] ? name[0][0] : 'N/a') + (name[1] ? name[1][0] : '');
    }

    // getList(): void {
    //     onSnapshot(query(collection(this.firebase.db, 'notifications/list/' + this.auth.user?.uid)), { includeMetadataChanges: true }, (snap) => {

    //         this.list.splice(0);
    //         const notificationsList: NotificationsModel[] = [];

    //         snap.docs.forEach(async (doc) => {
    //             notificationsList.push({
    //                 id: doc.id,
    //                 name: doc.data()['name'],
    //                 description: doc.data()['description'],
    //                 image: doc.data()['image'],
    //                 link: doc.data()['link'],
    //                 read: doc.data()['read'],
    //                 status: doc.data()['status'],
    //                 created: doc.data()['created'],
    //                 updated: doc.data()['updated'],
    //             });

    //             this.list = notificationsList
    //                 .sort((a, b) => (a.created?.toDate() ?? 0) < (b.created?.toDate() ?? 0) ? 1 : -1);
    //         });

    //     });

    // }

    getCount(): number {
        // // console.log('length: ', [...this.list.filter(x => !x.read)].length)
        return [...this.list.filter(x => !x.read)].length;
    }

    test() {
        // console.log('test: ', this.value)
        this.filter.editValue(this.value)
    }

}
