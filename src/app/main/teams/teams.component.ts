import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/classes/base.component';
import { AlertService } from 'src/app/services/common/alert.service';
// import { FirebaseService } from 'src/app/services/endpoints/firebase.service';
import { TeamsService } from './teams.service';
import { TeamsModel } from './teams.model';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.scss']
})
export class TeamsComponent extends BaseComponent<TeamsModel> implements OnInit {

    constructor(
        private alert: AlertService,
        // private firebase: FirebaseService<TeamsModel>,
        private teamsService: TeamsService<TeamsModel>,
    ) { super(); }

    // override getList(fetch?: boolean): void {
    //     this.firebase.getCollection('counts', 'teams')
    //         .then(snap => {
    //             const data = snap.data();
    //             this.total = data ? data['total'] : 0;
    //         });

    //     this.teamsService.teamsList.subscribe(res => this.list = res);
    //     if (this.teamsService.teamsList.getValue().length > 1 && !fetch) {
    //         this.loading = false;
    //         // return;
    //     }

    //     this.firebase.getCollections('teams', ...this.query())
    //         .then(snap => {
    //             // this.total = snap.size;
    //             const teamsList: TeamsModel[] = [];
    //             snap.docs.forEach(async (doc) => {

    //                 const teamObject: TeamsModel = {
    //                     id: doc.id,
    //                     name: doc.data()['name'],
    //                     status: doc.data()['status'],
    //                     created: doc.data()['created'],
    //                     updated: doc.data()['updated'],
    //                 };

    //                 teamsList.push(teamObject);

    //             });
    //             this.teamsService.teamsList.next(teamsList);
    //             this.loading = false;
    //         })
    //         .catch(err => {
    //             this.alert.error(err.message);
    //             this.loading = false;
    //         });
    // }

    colorsPalette: string[] = ['#b33dc632', '#27aeef32', '#87bc4532', '#bdcf3232', '#ede15b32', '#edbf3332', '#ef9b2032', '#f46a9b32', '#ea554532'];

    getColors(index: number): string {
        return this.colorsPalette[index % this.colorsPalette.length];
    }

}
