import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/common/alert.service';
// import { FirebaseService } from 'src/app/services/endpoints/firebase.service';
import { getRolesList } from 'src/app/services/enums/roles.enum';
import { EnumModel } from 'src/app/services/models/enum.model';
import { BaseComponent } from 'src/app/shared/classes/base.component';
import { Clients, ClientsModel } from '../clients.model';
import { ClientsService } from '../clients.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent extends BaseComponent<ClientsModel> implements OnInit {

    formType: string = this.route.snapshot.params['id'] === 'new' ? 'new' : 'update';

    model: ClientsModel = new Clients().init();
    clientsList: ClientsModel[] = [];
    rolesList: EnumModel[] = getRolesList();

    constructor(
        private router: Router,
        private alert: AlertService,
        private route: ActivatedRoute,
        // private firebase: FirebaseService<ClientsModel | unknown>,
        private clientsService: ClientsService<ClientsModel>,
    ) { super(); }

    override ngOnInit(): void {
        this.loading = false;

        // if (this.formType === 'new') {
        //     this.firebase.getCollection('counts', 'clients')
        //         .then(snap => {
        //             const data = snap.data();
        //             this.total = data ? data['total'] : 0;
        //         });
        // }

        // if (this.formType === 'update') {
        //     this.getClient();
        // }
    }

    getClient(): void {
        this.clientsList = this.clientsService.clientsList.getValue();
        if (this.clientsService.clientsList.getValue().length === 0) { this.router.navigate(['/clients']); }
        this.model = { ...this.clientsList.filter(x => x.id === this.route.snapshot.params['id'])[0] };
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
        //     ? this.firebase.addCollection('clients', payload)
        //     : this.firebase.updateCollection('clients', payload, payload.id.toString());

        // api
        //     .then(() => {
        //         if (this.formType === 'new') {
        //             this.clientsList.push(payload);
        //             this.firebase.setCollection('counts', { total: payload.index }, 'clients');
        //         }

        //         if (this.formType === 'update') {
        //             const index = this.clientsList.findIndex(x => x.id === payload.id);
        //             this.clientsList[index] = payload;
        //         }

        //         this.clientsService.clientsList.next(this.clientsList);

        //         this.alert.success(
        //             this.formType === 'new'
        //                 ? 'New has been client added!'
        //                 : `${payload.name}'s record has been updated!`
        //         );
        //         this.router.navigate(['/clients']);
        //         this.loading = false;
        //     })
        //     .catch(err => {
        //         this.alert.error(err.message);
        //         this.loading = false;
        //     });
    }

    onReset(form: NgForm): void {
        form.reset();
        this.model = new Clients().init();
    }

}
