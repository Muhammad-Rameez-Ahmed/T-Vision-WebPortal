import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/common/alert.service';
import { AuthService } from 'src/app/services/common/auth.service';
// import { FirebaseService } from 'src/app/services/endpoints/firebase.service';
import { getRolesList } from 'src/app/services/enums/roles.enum';
import { EnumModel } from 'src/app/services/models/enum.model';
import { BaseComponent } from 'src/app/shared/classes/base.component';
import { Members, MembersModel } from '../members.model';
import { MembersService } from '../members.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent extends BaseComponent<MembersModel> implements OnInit {

    formType: string = this.route.snapshot.params['id'] === 'new' ? 'new' : 'update';

    model: MembersModel = new Members().init();
    membersList: MembersModel[] = [];
    rolesList: EnumModel[] = getRolesList();
    password: string = this.getPassword();

    teamsList: EnumModel[] = [];
    id: number = -1;

    constructor(
        private router: Router,
        private auth: AuthService,
        private alert: AlertService,
        private route: ActivatedRoute,
        // private firebase: FirebaseService<MembersModel | unknown>,
        private membersService: MembersService<MembersModel>,
    ) { super(); }

    override ngOnInit(): void {
        this.loading = false;

        // if (this.formType === 'new') {
        //     this.firebase.getCollection('counts', 'members')
        //         .then(snap => {
        //             const data = snap.data();
        //             this.total = data ? data['total'] : 0;
        //         });
        // }

        // if (this.formType === 'update') {
        //     this.getMember();
        // }

        // this.getTeams();
    }

    getMember(): void {
        this.membersList = this.membersService.membersList.getValue();
        if (this.membersService.membersList.getValue().length === 0) { this.router.navigate(['/members']); }
        this.model = { ...this.membersList.filter(x => x.id === this.route.snapshot.params['id'])[0] };
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

    copyToClipboard(val: { select: () => void; setSelectionRange: (arg0: number, arg1: number) => void; }) {
        if (!this.password) return;
        val.select();
        document.execCommand('copy');
        val.setSelectionRange(0, 0);
        this.alert.success('Password copy to clipboard!');
    }

    getPassword(): string {
        const head = Math.floor(Math.random() * 1000).toString(36);
        const body = Math.floor((new Date().getTime() / 1000)).toString(36);
        const tail = (new Date().getTime()).toString(36);
        return (head + body + tail);
    }

    onSubmit(): void {
        this.loading = true;
        const payload = { ...this.model };
        // payload.name = payload.name.toLowerCase();
        // payload.updated = this.firebase.timestamp;
        // payload.team = this.firebase.getReferenceDate('teams', payload.team?.id.toString() ?? '-1');

        // if (this.formType === 'new') {
        //     payload.index = this.total + 1;
        //     payload.created = this.firebase.timestamp;
        //     this.firebase.createUser(payload.email, this.password)
        //         .then(res => {
        //             payload.id = res.user.uid;
        //             this.firebase.setCollection('members', payload, res.user.uid)
        //             this.firebase.setCollection('counts', { total: payload.index }, 'members');
        //         })
        //         .then(() => {
        //             const membersList = this.membersService.membersList.getValue();
        //             payload.team = { ...this.model.team };
        //             membersList.push(payload);
        //             this.membersService.membersList.next(membersList);

        //             this.alert.success('New member has been added!');
        //             this.router.navigate(['/members']);
        //             this.loading = false;
        //         })
        //         .catch(err => {
        //             this.alert.error(err.message);
        //             this.loading = false;
        //         });
        // }

        // if (this.formType === 'update') {
        //     this.firebase.updateCollection('members', payload, payload.id.toString())
        //         .then(() => {
        //             const index = this.membersList.findIndex(x => x.id === payload.id);
        //             payload.team = { ...this.model.team };
        //             this.membersList[index] = payload;
        //             this.membersService.membersList.next(this.membersList);

        //             if (payload.id === this.auth.user?.uid) {
        //                 this.alert.warning('For security reason please log back in.');
        //                 setTimeout(() => this.auth.logout(), 1000);
        //                 return;
        //             }

        //             this.alert.success(`${payload.name}'s record has been updated!`);
        //             this.router.navigate(['/members']);
        //             this.loading = false;
        //         })
        //         .catch(err => {
        //             this.alert.error(err.message);
        //             this.loading = false;
        //         });
        // }
    }

    onReset(form: NgForm): void {
        form.reset();
        this.model = new Members().init();
        this.password = this.getPassword();
    }

}
