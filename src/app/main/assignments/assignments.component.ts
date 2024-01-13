import { Component, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from 'src/app/shared/classes/base.component';
import { AlertService } from 'src/app/services/common/alert.service';
// import { FirebaseService } from 'src/app/services/endpoints/firebase.service';
import { AssignmentsService } from './assignments.service';
import { AssignmentsModel, FilesModel } from './assignments.model';
import { DocumentReference, getDoc, QueryConstraint, where } from '@angular/fire/firestore';
import { MembersModel } from '../members/members.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientsService } from '../clients/clients.service';
import { ClientsModel } from '../clients/clients.model';
import { Router } from '@angular/router';
import { ExportService } from 'src/app/services/common/export.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { FileStatusEnum, getFileStatus, getFileStatusList } from 'src/app/services/enums/file-status.enum';
import { EnumModel } from 'src/app/services/models/enum.model';
import { getRoles, RolesEnum } from 'src/app/services/enums/roles.enum';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent extends BaseComponent<AssignmentsModel> implements OnInit {

    model: AssignmentsModel | undefined = undefined;
    clientList: ClientsModel[] | null = null;
    fileStatus = FileStatusEnum;

    override statusList: EnumModel[] = getFileStatusList();

    userID = this.auth.user?.uid;
    userRole = this.auth.user?.role;

    constructor(
        private router: Router,
        private modal: NgbModal,
        private auth: AuthService,
        private alert: AlertService,
        private _export: ExportService,
        // private firebase: FirebaseService<AssignmentsModel | unknown>,
        private clientsService: ClientsService<ClientsModel>,
        private assignmentsService: AssignmentsService<AssignmentsModel>,
    ) { super(); }

    override ngOnInit(): void {
        this.submission = this.router.url.split('/')[1] === 'submissions';
        this.getClient();
        this.getList();

        if (this.userRole && this.userRole.id) {
            if (![getRoles(RolesEnum.admin).id, getRoles(RolesEnum.team_lead).id, getRoles(RolesEnum.executive).id, getRoles(RolesEnum.qc).id].includes(this.userRole.id)) {
                this.statusList = this.statusList.filter(x => x.id !== getFileStatus(FileStatusEnum.complete).id);
            }
        }
    }

    getClient(): void {
        this.clientsService.clientsList.subscribe(res => this.clientList = res);
        if (this.clientsService.clientsList.getValue().length > 1 && !fetch) {
            this.loading = false;
            return;
        }

        // this.firebase.getCollections('clients', ...this.query())
        //   .then(snap => {
        //     this.total = snap.docs.length;
        //     const clientsList: ClientsModel[] = [];
        //     snap.docs.forEach(async (doc) => clientsList.push({
        //       id: doc.id,
        //       name: doc.data()['name'],
        //       email: doc.data()['email'],
        //       contact: doc.data()['contact'],
        //       status: doc.data()['status'],
        //       created: doc.data()['created'],
        //       updated: doc.data()['updated'],
        //     }));
        //     this.clientsService.clientsList.next(clientsList);
        //     this.loading = false;
        //   })
        //   .catch(err => {
        //     this.alert.error(err.message);
        //     this.loading = false;
        //   });
    }

    override getList(fetch?: boolean): void {
        // this.firebase.getCollection('counts', 'assignments')
        //   .then(snap => {
        //     const data = snap.data();
        //     this.total = data ? data['total'] : 0;
        //   });

        // this.assignmentsService.assignmentsList.subscribe(res => this.list = res);
        // // if (this.assignmentsService.assignmentsList.getValue().length > 1 && !fetch) {
        // //   this.loading = false;
        // //   return;
        // // }

        // const query: QueryConstraint[] = [...this.query()];

        // if (this.submission) {
        //   query.push(where('status.id', 'in', [getFileStatus(FileStatusEnum.qc).id, getFileStatus(FileStatusEnum.complete).id]));
        // }

        // if (this.auth.user && this.auth.user.role && this.auth.user.role.id) {

        //   // QC
        //   if (this.auth.user.role.id === this.getPermissions(this.role.qc).id) {
        //     query.splice(0);
        //     query.push(where('status.id', 'in', [getFileStatus(FileStatusEnum.qc).id, getFileStatus(FileStatusEnum.complete).id]));
        //   }

        //   // !ADMIN & !TEAM_LEAD  & !EXECUTIVE & !QC 
        //   if ([this.getPermissions(this.role.admin).id, this.getPermissions(this.role.team_lead).id, this.getPermissions(this.role.executive).id, this.getPermissions(this.role.qc).id].indexOf(this.auth.user.role.id) === -1) {
        //     query.splice(0);
        //     query.push(where('members', 'array-contains', this.firebase.getReferenceDate('members', this.auth.user.uid)));
        //   }
        // }

        // this.firebase.getCollections('assignments', ...query)
        //   .then(snap => {
        //     let increment = 0;
        //     const total = snap.docs.length;
        //     let assignmentsList: AssignmentsModel[] = [];

        //     snap.docs.forEach(async (doc) => {
        //       const assignmentObject: AssignmentsModel = {
        //         id: doc.id,
        //         name: doc.data()['name'],
        //         index: doc.data()['index'],
        //         locality: doc.data()['locality'],
        //         status: doc.data()['status'],
        //         tcpType: doc.data()['tcpType'],
        //         consLayout: doc.data()['consLayout'],
        //         link: doc.data()['link'],
        //         deadLine: doc.data()['deadLine'],
        //         members: await doc.data()['members'],
        //         jobType: doc.data()['jobType'],
        //         workType: doc.data()['workType'],
        //         clientID: doc.data()['clientID'],
        //         comments: doc.data()['comments'],
        //         created: doc.data()['created'],
        //         updated: doc.data()['updated'],
        //         files: doc.data()['files'],
        //         history: await doc.data()['history'],
        //         assignee: doc.data()['assignee'],
        //         project: doc.data()['project'],
        //       };

        //       const membersList: unknown[] = [];
        //       await assignmentObject.members.map(async (member: DocumentReference<unknown>) => {
        //         await getDoc(member).then(data => {
        //           const member: any = data.data();
        //           membersList.push(member);
        //           const fileIndex = assignmentObject.files.findIndex(x => x.memberID === member.id)
        //           assignmentObject.files[fileIndex].memberName = member.name;
        //         });
        //       });
        //       assignmentObject.members = membersList;
        //       await getDoc(assignmentObject.assignee).then(data => assignmentObject.assignee = data.data());
        //       await getDoc(assignmentObject.project).then(async data => {
        //         assignmentObject.project = data.data()
        //         assignmentObject.project.id = data.id;
        //         await getDoc(assignmentObject.project.client).then(data => {
        //           assignmentObject.project.client = data.data()
        //           assignmentObject.project.client.id = data.id;
        //         });
        //         await getDoc(assignmentObject.project.team).then(data => {
        //           assignmentObject.project.team = data.data()
        //           assignmentObject.project.team.id = data.id;
        //         });
        //       });


        //       setTimeout(() => {
        //         assignmentsList.push(assignmentObject);
        //         assignmentsList = assignmentsList.sort((a, b) => b.index! - a.index!);
        //       }, 300);

        //       increment = increment + 1;
        //       setTimeout(() => this.loading = !(total === increment), 300);
        //     });

        //     // assignmentsList = assignmentsList.sort((a, b) => a.created.toDate() - b.created.toDate());
        //     // // console.log(assignmentsList);
        //     this.assignmentsService.assignmentsList.next(assignmentsList);
        //   })
        //   .catch(err => {
        //     this.alert.error(err.message);
        //     this.loading = false;
        //   });
    }

    getMember(data: MembersModel | null): MembersModel | null {
        if (!data) return null;
        return data;
    }

    openModal(modal: TemplateRef<unknown>, item: AssignmentsModel): void {
        this.model = item;
        this.modal.open(modal, { ariaLabelledBy: item.name, backdrop: 'static', keyboard: false, size: 'lg' }).result;
    }

    getFileStatus(status: FileStatusEnum): EnumModel {
        return getFileStatus(status);
    }

    // export(): void {
    //   const name = `assignment - ${(new Date().toUTCString())}`;
    //   // const list = [...this.list.map(data => {
    //   //   return {
    //   //     ID: data.id,
    //   //     NAME: data.name,
    //   //     LOCALITY: data.locality,
    //   //     TCP_TYPE: data.tcpType?.name,
    //   //     JOB_TYPE: data.jobType?.name,
    //   //     WORK_TYPE: data.workType?.name,
    //   //     MEMBERS: data.members.map((member: { name: string; }) => member.name).toString(),
    //   //     PROJECT: data.project.name,
    //   //     CLIENT: data.project.client.name,
    //   //     TEAM: data.project.team.name,
    //   //     LINK: data.link,
    //   //     COMMENTS: data.comments,
    //   //     CONS_LAYOUT: data.consLayout,
    //   //     UNITS: data.files.map(file => `FT: ${file.units.ft}, Pages: ${file.units.pages}`).toString(),
    //   //     ASSIGNEE: data.assignee.name,
    //   //     DEADLINE: data.deadLine?.toDate(),
    //   //     STATUS: data.status?.name,
    //   //     CREATED: data.created?.toDate(),
    //   //     UPDATED: data.updated?.toDate(),
    //   //   };
    //   // })];

    //   // this._export.exportAsExcelFile(list, name);
    //   let list = [
    //     ...this.list.map((data, index) => {
    //       return {
    //         serial_no: (index + 1),
    //         particulars: data.name,
    //         layouts: data.consLayout,
    //         date: data.created?.toDate(),
    //         status: data.status?.name,
    //       }
    //     })
    //   ];
    //   this._export.exportAsExcelFile(list, name);
    // }

    getDeadline(item: AssignmentsModel): boolean {
        if (item.status && item.status.id !== getFileStatus(FileStatusEnum.complete).id) {
            const deadline = item.deadLine.toDate();
            const today = new Date();
            // // console.log((new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate())).getTime(), (new Date(today.getFullYear(), today.getMonth(), today.getDate())).getTime())
            // // console.log((new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate())).getTime() === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).getTime())
            if ((new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate())).getTime() === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).getTime()) {
                return true;
            }
            // const deadLine = new Date(d.getFullYear(), d.getMonth(), d.getDate(), )
        }

        return false;
        // return [...item
        //   .filter(x => x.status?.id !== getFileStatus(FileStatusEnum.complete).id)
        //   .filter(x => x.updated && x.updated?.toDate().getTime() >= (new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate(), 0, 0, 0).getTime()))
        //   .sort((a, b) => (a.deadLine?.toDate() ?? 0) < (b.deadLine?.toDate() ?? 0) ? 1 : -1)
        // ];
    }

    async updateStatus(id: string | number, status: EnumModel): Promise<void> {
        // await this.firebase.updateCollection('assignments', { status: status, }, id.toString());
        // let index = this.assignmentsService.assignmentsList.getValue().findIndex(x => x.id === id);
        // this.assignmentsService.assignmentsList.getValue()[index].status = status;
        // this.assignmentsService.assignmentsList.next(this.assignmentsService.assignmentsList.getValue());
    }

    getMemberUnit(id: string | number, type: 'FT' | 'PAGES'): number {
        const file = this.model?.files.find(x => x.memberID === id);

        if (type === 'FT' && file?.units) return +file?.units.ft;
        if (type === 'PAGES' && file?.units) return +file?.units.pages;

        return 0;
    }

}
