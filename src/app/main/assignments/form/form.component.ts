import { Component, OnInit, TemplateRef } from '@angular/core';
import { DocumentReference, getDoc, Timestamp, where } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/common/alert.service';
import { AuthService } from 'src/app/services/common/auth.service';
// import { FirebaseService } from 'src/app/services/endpoints/firebase.service';
import { FileStatusEnum, getFileStatus, getFileStatusList } from 'src/app/services/enums/file-status.enum';
import { getJobTypes, getJobTypesList, JobTypesEnum } from 'src/app/services/enums/job-types.enum';
import { getRoles, RolesEnum } from 'src/app/services/enums/roles.enum';
import { getTCPTypesList } from 'src/app/services/enums/tcp-types.enum';
import { getWorkTypesList, } from 'src/app/services/enums/work-types.enum';
import { EnumModel } from 'src/app/services/models/enum.model';
import { BaseComponent } from 'src/app/shared/classes/base.component';
import { NotificationsModel } from 'src/app/shared/component/header/notification/notification.model';
import { MembersModel } from '../../members/members.model';
import { ProjectsModel } from '../../projects/projects.model';
import { Assignments, AssignmentsModel, FileHistoryModel } from '../assignments.model';
import { AssignmentsService } from '../assignments.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent extends BaseComponent<AssignmentsModel> implements OnInit {

    formType: string = this.route.snapshot.params['id'] === 'new' ? 'new' : 'update';

    model: AssignmentsModel = new Assignments().init();
    assignmentsList: AssignmentsModel[] = [];

    jobTypesList: EnumModel[] = getJobTypesList();
    workTypesList: EnumModel[] = getWorkTypesList();
    tcpTypesList: EnumModel[] = getTCPTypesList();

    projectsList: ProjectsModel[] = [];
    membersList: EnumModel[] = [];

    override statusList: EnumModel[] = getFileStatusList();

    userID = this.auth.user?.uid;
    userRole = this.auth.user?.role;

    isRevision: boolean = false;
    isSubmit: boolean = false;
    isEdit: boolean = false;

    // history: FileHistoryModel = { updated: null, files: [], comments: '' };

    constructor(
        private router: Router,
        private modal: NgbModal,
        private alert: AlertService,
        private route: ActivatedRoute,
        private auth: AuthService,
        // private firebase: FirebaseService<AssignmentsModel | unknown>,
        private assignmentService: AssignmentsService<AssignmentsModel>,
    ) { super(); }

    override async ngOnInit(): Promise<void> {

        this.isRevision = this.route.snapshot.queryParams['isRevision'];
        this.isSubmit = this.route.snapshot.queryParams['isSubmit'];
        this.isEdit = this.route.snapshot.queryParams['isEdit'];

        // if (this.formType === 'new') {
        //     this.loading = false;
        //     this.firebase.getCollection('counts', 'assignments')
        //         .then(snap => {
        //             const data = snap.data();
        //             this.total = data ? data['total'] : 0;
        //         });
        // }

        // this.getProjects();

        // if (this.formType === 'update') {
        //     this.loading = true;
        //     await this.getAssignment();
        //     this.getMembers();

        //     if (this.userRole && this.userRole.id) {
        //         if (![getRoles(RolesEnum.admin).id, getRoles(RolesEnum.team_lead).id, getRoles(RolesEnum.executive).id, getRoles(RolesEnum.qc).id].includes(this.userRole.id)) {
        //             this.statusList = this.statusList.filter(x => x.id !== getFileStatus(FileStatusEnum.complete).id);
        //         }
        //     }
        // }


    }

    copyToClipboard(val: { select: () => void; setSelectionRange: (arg0: number, arg1: number) => void; }) {
        if (!this.model.link) return;
        val.select();
        document.execCommand('copy');
        val.setSelectionRange(0, 0);
        this.alert.success('Link copy to clipboard!');
    }

    async getAssignment(): Promise<void> {
        this.assignmentsList = this.assignmentService.assignmentsList.getValue();
        // if (this.assignmentService.assignmentsList.getValue().length === 0 || this.isRevision) {
        //     await this.firebase.getCollection('assignments', this.route.snapshot.params['id'])
        //         .then(async snap => {

        //             const data = snap.data();
        //             if (data) {
        //                 const assignmentObject: AssignmentsModel = {
        //                     id: snap.id,
        //                     name: data['name'],
        //                     locality: data['locality'],
        //                     status: data['status'],
        //                     tcpType: data['tcpType'],
        //                     consLayout: data['consLayout'],
        //                     link: data['link'],
        //                     deadLine: data['deadLine'],
        //                     members: await data['members'],
        //                     jobType: data['jobType'],
        //                     workType: data['workType'],
        //                     clientID: data['clientID'],
        //                     comments: data['comments'],
        //                     created: data['created'],
        //                     updated: data['updated'],
        //                     files: data['files'],
        //                     history: data['history'],
        //                     assignee: data['assignee'],
        //                     project: data['project'],
        //                 };

        //                 const membersList: unknown[] = [];
        //                 await assignmentObject.members.map(async (member: DocumentReference<unknown>) => {
        //                     await getDoc(member).then(data => {
        //                         const member: any = data.data();
        //                         membersList.push(member);
        //                         const fileIndex = assignmentObject.files.findIndex(x => x.memberID === member.id)
        //                         assignmentObject.files[fileIndex].memberName = member.name;
        //                     });
        //                 });
        //                 assignmentObject.members = membersList;
        //                 await getDoc(assignmentObject.assignee).then(data => assignmentObject.assignee = data.data());
        //                 await getDoc(assignmentObject.project).then(async data => {
        //                     assignmentObject.project = data.data()
        //                     assignmentObject.project.id = data.id;
        //                     await getDoc(assignmentObject.project.client).then(data => {
        //                         assignmentObject.project.client = data.data()
        //                         assignmentObject.project.client.id = data.id;
        //                     });
        //                     await getDoc(assignmentObject.project.team).then(data => {
        //                         assignmentObject.project.team = data.data()
        //                         assignmentObject.project.team.id = data.id;
        //                     });
        //                 });

        //                 this.assignmentsList.push(assignmentObject);

        //             }
        //         })
        //         .catch(() => this.router.navigate([this.isRevision ? '/submissions' : '/assignments']));
        // }
        // this.model = { ...this.assignmentsList.filter(x => x.id === this.route.snapshot.params['id'])[0] };
        // const date: Date = this.model?.deadLine?.toDate();
        // if (date) this.model.deadLine = { month: date.getMonth() + 1, day: date.getDate(), year: date.getFullYear(), };

        // // REVISION
        // if (this.model.status?.id === getFileStatus(FileStatusEnum.complete).id) {
        //     if (!this.model.name.includes('(rev.)')) this.model.name = this.model.name + ' (rev.)';
        //     this.model.jobType = getJobTypes(JobTypesEnum.revision);
        // }

        // // debugger
        // // if (this.isRevision) {
        // //   const model = JSON.parse(JSON.stringify(this.model));
        // //   this.history = { updated: model.updated, files: model.files, comments: model.comments };
        // // }

        // this.loading = false;
    }

    getProjects(): void {
        this.active = true;
        this.optLoading[0] = true;
        // this.firebase.getCollections('projects', ...this.query())
        //     .then(snap => {
        //         const projectsList: ProjectsModel[] = [];
        //         snap.docs.forEach(async (doc) => {

        //             const projectObject = {
        //                 id: doc.id,
        //                 name: doc.data()['name'],
        //                 description: '',
        //                 status: null,
        //                 team: doc.data()['team'],
        //                 client: doc.data()['client'],
        //                 created: null,
        //                 updated: null,
        //             };

        //             getDoc(projectObject.team).then(data => {
        //                 projectObject.team = data.data()
        //                 projectObject.team.id = data.id;
        //                 return projectObject.team;
        //             });
        //             getDoc(projectObject.client).then(data => {
        //                 projectObject.client = data.data()
        //                 projectObject.client.id = data.id;
        //                 return projectObject.client;
        //             });
        //             projectsList.push(projectObject);
        //         });
        //         this.projectsList = projectsList;
        //         this.optLoading[0] = false;
        //         this.active = false;
        //     })
        //     .catch(err => {
        //         this.alert.error(err.message);
        //         this.optLoading[0] = false;
        //         this.active = false;
        //     });
    }

    getMembers(): void {
        if (!this.model?.project?.team) return;
        this.active = true;
        this.optLoading[1] = true;

        // const teamRef = this.firebase.getReferenceDate('teams', this.model.project?.team.id);
        // this.firebase.getCollections('members', ...this.query(), where('team', '==', teamRef))
        //     .then(snap => {
        //         const membersList: EnumModel[] = [];
        //         snap.docs.forEach(async (doc) => membersList.push({
        //             id: doc.id,
        //             name: doc.data()['name'],
        //         }));
        //         this.membersList = membersList;
        //         this.optLoading[1] = false;
        //         this.active = false;
        //     })
        //     .catch(err => {
        //         this.alert.error(err.message);
        //         this.optLoading[1] = false;
        //         this.active = false;
        //     });
    }

    onSubmit(form: NgForm): void {

        if (form.invalid) {
            this.alert.warning('Please fill all required fields!');
            form.control.markAllAsTouched();
            return;
        }

        // return;
        this.loading = true;
        // const payload = { ...this.model };
        // payload.clientID = payload.project.client.id.toString();
        // payload.project = this.firebase.getReferenceDate('projects', payload.project.id);
        // payload.members = payload.members.map((data: { id: string; }) => this.firebase.getReferenceDate('members', data.id));
        // payload.assignee = this.firebase.getReferenceDate('members', this.auth?.user?.uid ?? '-1');

        // payload.members.forEach((member: { id: string | number; }) => {
        //     const index = payload.files.some(x => x.memberID === member.id);
        //     if (!index) payload.files.push({ units: { ft: '', pages: '' }, memberID: member.id, });
        // });

        // payload.files.forEach((file, i) => {
        //     const index = payload.members.some((x: { id: string | number; }) => x.id === file.memberID);
        //     if (!index) payload.files.slice(i, 1);
        // });

        // if (payload.deadLine) {
        //     const date: NgbDateStruct = <NgbDateStruct><unknown>payload.deadLine;
        //     payload.deadLine = Timestamp.fromDate(new Date(date?.year, date.month - 1, date.day))
        // }

        // if (this.formType === 'new') {
        //     payload.index = this.total + 1;
        //     payload.created = this.firebase.timestamp;
        // }

        // // if (this.isRevision || this.model.status?.id === getFileStatus(FileStatusEnum.complete).id) {
        // const history: FileHistoryModel = { updated: payload.updated, files: payload.files, comments: payload.comments, status: payload.status, actionBy: this.auth.user?.user?.name ?? 'N/a' };
        // payload.history = [{ ...history }, ...payload.history];
        // // payload.history = [{ ...this.history }, ...payload.history];
        // payload.created = this.firebase.timestamp;
        // // }

        // payload.updated = this.firebase.timestamp;

        // // // console.log(payload)
        // // return;

        // const api = this.formType === 'new'
        //     ? this.firebase.addCollection('assignments', payload)
        //     : this.firebase.updateCollection('assignments', payload, payload.id.toString());

        // api
        //     .then(() => {
        //         payload.project = { ...this.model.project };
        //         payload.members = [...this.model.members];
        //         payload.files = [...this.model.files];

        //         if (this.formType === 'new') {
        //             // this.assignmentsList.push(payload);
        //             this.firebase.setCollection('counts', { total: payload.index }, 'assignments');
        //         }

        //         // if (this.formType === 'update') {
        //         //   const index = this.assignmentsList.findIndex(x => x.id === payload.id);
        //         //   this.assignmentsList[index] = payload;
        //         // }

        //         // this.assignmentService.assignmentsList.next(this.assignmentsList);
        //         this.alert.success(
        //             this.formType === 'new'
        //                 ? 'New has been assignment added!'
        //                 : `${payload.name}'s record has been updated!`
        //         );

        //         const notification: NotificationsModel = {
        //             id: '',
        //             name: this.formType === 'new' ? 'Task assigned!' : 'Task updated!',
        //             description: `${payload.name}'s record has been ${this.formType === 'new' ? 'assigned' : 'updated'}.`,
        //             image: null,
        //             link: '/assignments',
        //             read: false,
        //             status: null,
        //             created: this.firebase.timestamp,
        //             updated: null,
        //         };

        //         payload.members.forEach((member: MembersModel) => this.firebase.addNotification(member.id.toString(), notification));

        //         this.router.navigate(['/assignments']);
        //         this.loading = false;
        //     })
        //     .catch(err => {
        //         this.alert.error(err.message);
        //         this.loading = false;
        //     });
    }

    // getMember(id: string | number): string {
    //   return this.model.members.filter((x: { id: string; }) => x.id === id)[0].name;
    // }

    openModal(modal: TemplateRef<unknown>): void {
        this.modal.open(modal, { ariaLabelledBy: this.model.name, backdrop: 'static', keyboard: false, size: 'lg' }).result;
    }

    onReset(form: NgForm): void {
        form.reset();
        this.model = new Assignments().init();
    }

}
