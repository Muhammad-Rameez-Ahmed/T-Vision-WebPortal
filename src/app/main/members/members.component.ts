import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/classes/base.component';
import { AlertService } from 'src/app/services/common/alert.service';
// import { FirebaseService } from 'src/app/services/endpoints/firebase.service';
import { MembersService } from './members.service';
import { MembersModel } from './members.model';
import { getDoc } from '@firebase/firestore';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss']
})
export class MembersComponent extends BaseComponent<MembersModel> implements OnInit {

    constructor(
        private alert: AlertService,
        // private firebase: FirebaseService<MembersModel>,
        private membersService: MembersService<MembersModel>,
    ) { super(); }

    override getList(fetch?: boolean): void {
        // this.firebase.getCollection('counts', 'members')
        //     .then(snap => {
        //         const data = snap.data();
        //         this.total = data ? data['total'] : 0;
        //     });

        // this.membersService.membersList.subscribe(res => this.list = res);
        // if (this.membersService.membersList.getValue().length > 1 && !fetch) {
        //     this.loading = false;
        //     // return;
        // }

        // this.firebase.getCollections('members', ...this.query())
        //     .then(snap => {
        //         // this.total = snap.docs.length;
        //         const membersList: MembersModel[] = [];
        //         snap.docs.forEach(async (doc) => {

        //             const memberObject: MembersModel = {
        //                 id: doc.id,
        //                 name: doc.data()['name'],
        //                 email: doc.data()['email'],
        //                 phone: doc.data()['phone'],
        //                 role: doc.data()['role'],
        //                 team: doc.data()['team'],
        //                 status: doc.data()['status'],
        //                 created: doc.data()['created'],
        //                 updated: doc.data()['updated'],
        //             };

        //             getDoc(memberObject.team).then(data => {
        //                 memberObject.team = data.data()
        //                 if (memberObject.team) memberObject.team.id = data.id;
        //             });
        //             membersList.push(memberObject);

        //         });

        //         this.membersService.membersList.next(membersList);
        //         this.loading = false;
        //     })
        //     .catch(err => {
        //         this.alert.error(err.message);
        //         this.loading = false;
        //     });
    }

}
