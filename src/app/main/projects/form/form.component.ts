import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/common/alert.service';
// import { FirebaseService } from 'src/app/services/endpoints/firebase.service';
import { getRolesList } from 'src/app/services/enums/roles.enum';
import { EnumModel } from 'src/app/services/models/enum.model';
import { BaseComponent } from 'src/app/shared/classes/base.component';
import { Projects, ProjectsModel } from '../projects.model';
import { ProjectsService } from '../projects.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent extends BaseComponent<ProjectsModel> implements OnInit {

    formType: string = this.route.snapshot.params['id'] === 'new' ? 'new' : 'update';

    model: ProjectsModel = new Projects().init();
    projectsList: ProjectsModel[] = [];
    rolesList: EnumModel[] = getRolesList();

    teamsList: EnumModel[] = [];
    clientsList: EnumModel[] = [];

    constructor(
        private router: Router,
        private alert: AlertService,
        private route: ActivatedRoute,
        // private firebase: FirebaseService<ProjectsModel | unknown>,
        private projectsService: ProjectsService<ProjectsModel>,
    ) { super(); }

    // override ngOnInit(): void {
    //     this.loading = false;

    //     if (this.formType === 'new') {
    //         this.firebase.getCollection('counts', 'projects')
    //             .then(snap => {
    //                 const data = snap.data();
    //                 this.total = data ? data['total'] : 0;
    //             });
    //     }

    //     if (this.formType === 'update') {
    //         this.getProject();
    //     }

    //     this.getTeams();
    //     this.getClients();
    // }

    getProject(): void {
        this.projectsList = this.projectsService.projectsList.getValue();
        if (this.projectsService.projectsList.getValue().length === 0) { this.router.navigate(['/projects']); }
        this.model = { ...this.projectsList.filter(x => x.id === this.route.snapshot.params['id'])[0] };
    }

    getTeams(): void {
        this.active = true;
        this.optLoading[0] = true;
        // this.firebase.getCollections('teams', ...this.query())
        //     .then(snap => {
        //         const teamsList: EnumModel[] = [];
        //         snap.docs.forEach(async (doc) => teamsList.push({
        //             id: doc.id,
        //             name: doc.data()['name'],
        //         }));
        //         this.teamsList = teamsList;
        //         this.optLoading[0] = false;
        //         this.active = false;
        //     })
        //     .catch(err => {
        //         this.alert.error(err.message);
        //         this.optLoading[0] = false;
        //         this.active = false;
        //     });
    }

    getClients(): void {
        this.active = true;
        this.optLoading[1] = true;
        // this.firebase.getCollections('clients', ...this.query())
        //     .then(snap => {
        //         const clientsList: EnumModel[] = [];
        //         snap.docs.forEach(async (doc) => clientsList.push({
        //             id: doc.id,
        //             name: doc.data()['name'],
        //         }));
        //         this.clientsList = clientsList;
        //         this.optLoading[1] = false;
        //         this.active = false;
        //     })
        //     .catch(err => {
        //         this.alert.error(err.message);
        //         this.optLoading[1] = false;
        //         this.active = false;
        //     });
    }

    onSubmit(): void {
        this.loading = true;
        const payload = { ...this.model };
        // payload.name = payload.name.toLowerCase();
        // payload.updated = this.firebase.timestamp;
        // payload.team = this.firebase.getReferenceDate('teams', payload.team.id);
        // payload.client = this.firebase.getReferenceDate('clients', payload.client.id);

        // if (this.formType === 'new') {
        //     payload.index = this.total + 1;
        //     payload.created = this.firebase.timestamp;
        // }

        // const api = this.formType === 'new'
        //     ? this.firebase.addCollection('projects', payload)
        //     : this.firebase.updateCollection('projects', payload, payload.id.toString());

        // api
        //     .then(() => {
        //         payload.team = { ...this.model.team };
        //         payload.client = { ...this.model.client };

        //         if (this.formType === 'new') {
        //             this.projectsList.push(payload);
        //             this.firebase.setCollection('counts', { total: payload.index }, 'projects');
        //         }

        //         if (this.formType === 'update') {
        //             const index = this.projectsList.findIndex(x => x.id === payload.id);
        //             this.projectsList[index] = payload;
        //         }

        //         this.projectsService.projectsList.next(this.projectsList);

        //         this.alert.success(
        //             this.formType === 'new'
        //                 ? 'New has been project added!'
        //                 : `${payload.name}'s record has been updated!`
        //         );
        //         this.router.navigate(['/projects']);
        //         this.loading = false;
        //     })
        //     .catch(err => {
        //         this.alert.error(err.message);
        //         this.loading = false;
        //     });
    }

    onReset(form: NgForm): void {
        form.reset();
        this.model = new Projects().init();
    }

}
