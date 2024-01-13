import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/classes/base.component';
import { AlertService } from 'src/app/services/common/alert.service';
// import { FirebaseService } from 'src/app/services/endpoints/firebase.service';
import { ProjectsService } from './projects.service'
import { ProjectsModel } from './projects.model';
import { getDoc } from '@angular/fire/firestore';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent extends BaseComponent<ProjectsModel> implements OnInit {

    constructor(
        private alert: AlertService,
        // private firebase: FirebaseService<ProjectsModel>,
        private projectsService: ProjectsService<ProjectsModel>,
    ) { super(); }

    // override getList(fetch?: boolean): void {
    //     this.firebase.getCollection('counts', 'projects')
    //         .then(snap => {
    //             const data = snap.data();
    //             this.total = data ? data['total'] : 0;
    //         });

    //     this.projectsService.projectsList.subscribe(res => this.list = res);
    //     if (this.projectsService.projectsList.getValue().length > 1 && !fetch) {
    //         this.loading = false;
    //         // return;
    //     }

    //     this.firebase.getCollections('projects')
    //         .then(snap => {
    //             // this.total = snap.docs.length;
    //             const projectsList: ProjectsModel[] = [];
    //             snap.docs.forEach(async (doc) => {

    //                 const projectObject: ProjectsModel = {
    //                     id: doc.id,
    //                     name: doc.data()['name'],
    //                     description: doc.data()['description'],
    //                     team: doc.data()['team'],
    //                     client: doc.data()['client'],
    //                     status: doc.data()['status'],
    //                     created: doc.data()['created'],
    //                     updated: doc.data()['updated'],
    //                 };

    //                 getDoc(projectObject.team).then(data => {
    //                     projectObject.team = data.data()
    //                     projectObject.team.id = data.id;
    //                 });
    //                 getDoc(projectObject.client).then(data => {
    //                     projectObject.client = data.data()
    //                     projectObject.client.id = data.id;
    //                 });
    //                 projectsList.push(projectObject);

    //             });
    //             this.projectsService.projectsList.next(projectsList);
    //             this.loading = false;
    //         })
    //         .catch(err => {
    //             this.alert.error(err.message);
    //             this.loading = false;
    //         });
    // }

}
