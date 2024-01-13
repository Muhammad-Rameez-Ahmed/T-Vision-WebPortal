import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/classes/base.component';
import { AlertService } from 'src/app/services/common/alert.service';
// import { FirebaseService } from 'src/app/services/endpoints/firebase.service';
import { ClientsService } from './clients.service';
import { ClientsModel } from './clients.model';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss']
})
export class ClientsComponent extends BaseComponent<ClientsModel> implements OnInit {

    constructor(
        private alert: AlertService,
        // private firebase: FirebaseService<ClientsModel>,
        private clientsService: ClientsService<ClientsModel>,
    ) { super(); }

    override getList(fetch?: boolean): void {

        // this.firebase.getCollection('counts', 'clients')
        //     .then(snap => {
        //         const data = snap.data();
        //         this.total = data ? data['total'] : 0;
        //     });

        // this.clientsService.clientsList.subscribe(res => this.list = res);
        // if (this.clientsService.clientsList.getValue().length > 1 && !fetch) {
        //     this.loading = false;
        //     // return;
        // }

        // this.firebase.getCollections('clients', ...this.query())
        //     .then(snap => {
        //         // this.total = snap.docs.length;
        //         const clientsList: ClientsModel[] = [];
        //         snap.docs.forEach(async (doc) => {

        //             const clientObject = {
        //                 id: doc.id,
        //                 name: doc.data()['name'],
        //                 email: doc.data()['email'],
        //                 // phone: doc.data()['phone'],
        //                 contact: doc.data()['contact'],
        //                 status: doc.data()['status'],
        //                 created: doc.data()['created'],
        //                 updated: doc.data()['updated'],
        //             }

        //             clientsList.push(clientObject);

        //         });
        //         this.clientsService.clientsList.next(clientsList);
        //         this.loading = false;
        //     })
        //     .catch(err => {
        //         this.alert.error(err.message);
        //         this.loading = false;
        //     });
    }

    colorsPalette: string[] = ['#00bfa032', '#b3d4ff32', '#dc0ab432', '#ffa30032', '#9b19f532', '#e6d80032', '#50e99132', '#0bb4ff32', '#e6004932'];

    getColors(index: number): string {
        return this.colorsPalette[index % this.colorsPalette.length];
    }

}
