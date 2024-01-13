import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/common/alert.service';
// import { FirebaseService } from 'src/app/services/endpoints/firebase.service';
import { getRolesList } from 'src/app/services/enums/roles.enum';
import { EnumModel } from 'src/app/services/models/enum.model';
import { BaseComponent } from 'src/app/shared/classes/base.component';
import { Teams, TeamsModel } from '../teams.model';
import { TeamsService } from '../teams.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent extends BaseComponent<TeamsModel> implements OnInit {

    formType: string = this.route.snapshot.params['id'] === 'new' ? 'new' : 'update';

    model: TeamsModel = new Teams().init();
    teamsList: TeamsModel[] = [];
    rolesList: EnumModel[] = getRolesList();

    constructor(
        private router: Router,
        private alert: AlertService,
        private route: ActivatedRoute,
        // private firebase: FirebaseService<TeamsModel | unknown>,
        private teamsService: TeamsService<TeamsModel>,
    ) { super(); }

    override ngOnInit(): void {
        this.loading = false;

        // if (this.formType === 'new') {
        //     this.firebase.getCollection('counts', 'teams')
        //         .then(snap => {
        //             const data = snap.data();
        //             this.total = data ? data['total'] : 0;
        //         });
        // }

        // if (this.formType === 'update') {
        //     this.getTeam();
        // }
    }

    getTeam(): void {
        this.teamsList = this.teamsService.teamsList.getValue();
        if (this.teamsService.teamsList.getValue().length === 0) { this.router.navigate(['/teams']); }
        this.model = { ...this.teamsList.filter(x => x.id === this.route.snapshot.params['id'])[0] };
    }

    onSubmit(): void {
        this.loading = true;
        const payload = { ...this.model };
        // payload.name = payload.name.toLowerCase();
        // payload.updated = this.firebase.timestamp;
        // if (this.formType === 'new') {
        //     payload.index = this.total + 1;
        //     payload.created = this.firebase.timestamp;
        // }

        // const api = this.formType === 'new'
        //     ? this.firebase.addCollection('teams', payload)
        //     : this.firebase.updateCollection('teams', payload, payload.id.toString());

        // api
        //     .then(() => {
        //         if (this.formType === 'new') {
        //             this.teamsList.push(payload);
        //             this.firebase.setCollection('counts', { total: payload.index }, 'teams');
        //         }

        //         if (this.formType === 'update') {
        //             const index = this.teamsList.findIndex(x => x.id === payload.id);
        //             this.teamsList[index] = payload;
        //         }

        //         this.teamsService.teamsList.next(this.teamsList);

        //         this.alert.success(
        //             this.formType === 'new'
        //                 ? 'New has been team added!'
        //                 : `${payload.name}'s record has been updated!`
        //         );
        //         this.router.navigate(['/teams']);
        //         this.loading = false;
        //     })
        //     .catch(err => {
        //         this.alert.error(err.message);
        //         this.loading = false;
        //     });
    }

    onReset(form: NgForm): void {
        form.reset();
        this.model = new Teams().init();
    }

}
