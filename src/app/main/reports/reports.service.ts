import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { onSnapshot, collection, where, DocumentReference, getDoc, query, QueryConstraint } from '@angular/fire/firestore';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration } from 'chart.js';
// import { FirebaseService } from 'src/app/services/endpoints/firebase.service';
import { getFileStatus, FileStatusEnum } from 'src/app/services/enums/file-status.enum';
import { EnumModel } from 'src/app/services/models/enum.model';
import { ClientUnitsModel, ClientTeamUnitModel, MembersPerformanceModel } from '../analytics/analytics.model';
import { AssignmentsModel, FilesModel } from '../assignments/assignments.model';

@Injectable()
export class ReportsService {

    assignmentsList: AssignmentsModel[] = [];

    clientsList: EnumModel[] = [];
    teamsList: EnumModel[] = [];
    membersList: EnumModel[] = [];

    dailyClientsUnits: ClientUnitsModel[] = [];
    dailyTeamsUnits: ClientTeamUnitModel[] = [];
    monthlyClientsUnits: ClientUnitsModel[] = [];
    monthlyClientsTeamsUnits: ClientTeamUnitModel[] = [];
    monthlyMembersPerformance: MembersPerformanceModel[] = [];

    loading: boolean = true;
    loadingContent: string = 'Loading...';

    fromDate: NgbDateStruct | null = null;
    toDate: NgbDateStruct | null = null;

    // BAR GRAPH
    barChartLegend = true;
    barChartPlugins = [];

    barChartData: ChartConfiguration<'bar'>['data'] = {
        labels: [],
        datasets: [
            {
                data: [],
                stack: 'a',
                label: 'FT',
                backgroundColor: ["#ea5545", "#f46a9b", "#ef9b20", "#edbf33", "#ede15b", "#bdcf32", "#87bc45", "#27aeef", "#b33dc6"],
                hoverBackgroundColor: ["#ea554564", "#f46a9b64", "#ef9b2064", "#edbf3364", "#ede15b64", "#bdcf3264", "#87bc4564", "#27aeef64", "#b33dc664"],
            },
            {
                data: [],
                stack: 'a',
                label: 'PAGES',
                backgroundColor: ["#ea554580", "#f46a9b80", "#ef9b2080", "#edbf3380", "#ede15b80", "#bdcf3280", "#87bc4580", "#27aeef80", "#b33dc680"],
                hoverBackgroundColor: ["#ea554532", "#f46a9b32", "#ef9b2032", "#edbf3332", "#ede15b32", "#bdcf3232", "#87bc4532", "#27aeef32", "#b33dc632"],
            }
        ],
    };

    barChartOptions: ChartConfiguration<'bar'>['options'] = { color: '#868e96', responsive: false, };

    constructor(
        private datePipe: DatePipe,
        // private firebase: FirebaseService<unknown>,
    ) { }

    getAssignments(): void {
        const range = new Date();
        range.setMonth(range.getMonth() - 2);
        const q: QueryConstraint[] = [];
        if (!this.fromDate && !this.toDate) {
            q.push(where('created', '>=', range))
        }

        // onSnapshot(query(collection(this.firebase.db, 'assignments'), ...q), (snap) => {
        //     // // console.log("Data came from " + snap.metadata.fromCache ? "local cache" : "server");
        //     // if (snap.metadata.fromCache) return;
        //     this.clientsList.splice(0);
        //     this.teamsList.splice(0);
        //     this.membersList.splice(0);

        //     this.dailyClientsUnits.splice(0);
        //     this.monthlyClientsUnits.splice(0);
        //     this.monthlyClientsTeamsUnits.splice(0);
        //     this.monthlyMembersPerformance.splice(0);

        //     const total = snap.docs.length;
        //     let increment = 0;

        //     if (total === 0) this.loadingContent = 'no data available!';

        //     snap.docs.forEach(async (doc) => {

        //         const assignmentObject: AssignmentsModel = {
        //             id: doc.id,
        //             name: doc.data()['name'],
        //             locality: doc.data()['locality'],
        //             tcpType: doc.data()['tcpType'],
        //             jobType: doc.data()['jobType'],
        //             link: doc.data()['link'],
        //             workType: doc.data()['workType'],
        //             comments: doc.data()['comments'],
        //             consLayout: doc.data()['consLayout'],
        //             members: doc.data()['members'],
        //             project: doc.data()['project'],
        //             files: doc.data()['files'],
        //             clientID: doc.data()['clientID'],
        //             assignee: doc.data()['assignee'],
        //             deadLine: doc.data()['deadLine'],
        //             history: doc.data()['history'],
        //             status: doc.data()['status'],
        //             created: doc.data()['created'],
        //             updated: doc.data()['updated'],
        //         };

        //         const membersList: unknown[] = [];
        //         assignmentObject.members.map((member: DocumentReference<unknown>) => {
        //             getDoc(member).then(data => membersList.push(data.data()));
        //         });
        //         assignmentObject.members = membersList;
        //         await getDoc(assignmentObject.assignee).then(data => assignmentObject.assignee = data.data());
        //         await getDoc(assignmentObject.project).then(async (data) => {
        //             assignmentObject.project = data.data();
        //             assignmentObject.project.id = data.id;
        //             await getDoc(assignmentObject.project.client).then(data => {
        //                 assignmentObject.project.client = data.data();
        //                 assignmentObject.project.client.id = data.id;
        //             });
        //             await getDoc(assignmentObject.project.team).then(data => {
        //                 assignmentObject.project.team = data.data();
        //                 assignmentObject.project.team.id = data.id;
        //             });
        //         });

        //         const index = this.assignmentsList.findIndex(x => x.id === assignmentObject.id);
        //         index === -1 ? this.assignmentsList.push(assignmentObject) : this.assignmentsList[index] = assignmentObject;

        //         // CLIENTS LIST
        //         const clientIndex = this.clientsList.findIndex(x => x.id === assignmentObject.project.client.id);
        //         if (clientIndex !== -1) this.clientsList[clientIndex] = { id: assignmentObject.project.client.id, name: assignmentObject.project.client.name };
        //         else this.clientsList.push({ id: assignmentObject.project.client.id, name: assignmentObject.project.client.name });

        //         // TEAMS LIST
        //         const teamIndex = this.teamsList.findIndex(x => x.id === assignmentObject.project.team.id);
        //         if (teamIndex !== -1) this.teamsList[teamIndex] = { id: assignmentObject.project.team.id, name: assignmentObject.project.team.name };
        //         else this.teamsList.push({ id: assignmentObject.project.team.id, name: assignmentObject.project.team.name });

        //         // MEMBERS LIST
        //         assignmentObject.members.forEach((member: EnumModel) => {
        //             const memberIndex = this.membersList.findIndex(x => x.id === member.id);
        //             if (memberIndex !== -1) this.membersList[memberIndex] = { id: member.id, name: member.name };
        //             else this.membersList.push({ id: member.id, name: member.name });
        //         });

        //         // DAILY CLIENTS UNITS
        //         if (this.datePipe.transform(assignmentObject.created?.toDate(), 'yyyy-MM-dd') === this.datePipe.transform(new Date(), 'yyyy-MM-dd')) {
        //             const dailyClientsUnitsIndex: number = this.dailyClientsUnits.findIndex(x => x.client.id === assignmentObject.project.client.id);
        //             const dailyCLientUnitsObject: ClientUnitsModel = {
        //                 client: {
        //                     id: assignmentObject.project.client.id,
        //                     name: assignmentObject.project.client.name,
        //                 },
        //                 units: {
        //                     ft: assignmentObject.files.reduce((sum, current) => sum + +current.units.ft, 0),
        //                     pages: assignmentObject.files.reduce((sum, current) => sum + +current.units.pages, 0)
        //                 },
        //             };

        //             if (dailyClientsUnitsIndex === -1) {
        //                 this.dailyClientsUnits.push(dailyCLientUnitsObject);
        //             } else {
        //                 this.dailyClientsUnits[dailyClientsUnitsIndex].units.ft =
        //                     +this.dailyClientsUnits[dailyClientsUnitsIndex].units.ft + +dailyCLientUnitsObject.units.ft;
        //                 this.dailyClientsUnits[dailyClientsUnitsIndex].units.pages =
        //                     + this.dailyClientsUnits[dailyClientsUnitsIndex].units.pages + +dailyCLientUnitsObject.units.pages;
        //             }
        //         }

        //         // DAILY TEAMS UNITS
        //         if (this.datePipe.transform(assignmentObject.created?.toDate(), 'yyyy-MM-dd') === this.datePipe.transform(new Date(), 'yyyy-MM-dd')) {
        //             const dailyTeamsUnitsIndex: number = this.dailyTeamsUnits.findIndex(x => x.team.id === assignmentObject.project.team.id);
        //             const dailyTeamsUnitsObject: ClientTeamUnitModel = {
        //                 client: {
        //                     id: assignmentObject.project.client.id,
        //                     name: assignmentObject.project.client.name,
        //                 },
        //                 team: { id: assignmentObject.project.team.id, name: assignmentObject.project.team.name, },
        //                 units: {
        //                     ft: assignmentObject.files.reduce((sum, current) => sum + +current.units.ft, 0),
        //                     pages: assignmentObject.files.reduce((sum, current) => sum + +current.units.pages, 0)
        //                 },
        //             };

        //             if (dailyTeamsUnitsIndex === -1) {
        //                 this.dailyTeamsUnits.push(dailyTeamsUnitsObject);
        //             } else {
        //                 this.dailyTeamsUnits[dailyTeamsUnitsIndex].units.ft =
        //                     +this.dailyTeamsUnits[dailyTeamsUnitsIndex].units.ft + +dailyTeamsUnitsObject.units.ft;
        //                 this.dailyTeamsUnits[dailyTeamsUnitsIndex].units.pages =
        //                     + this.dailyTeamsUnits[dailyTeamsUnitsIndex].units.pages + +dailyTeamsUnitsObject.units.pages;
        //             }
        //         }

        //         let date = new Date();
        //         let fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
        //         let toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59);
        //         let fromDatePrevious = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        //         let toDatePrevious = new Date(date.getFullYear(), date.getMonth(), 0, 23, 59);

        //         if (this.fromDate) fromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
        //         if (this.toDate) toDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);

        //         if (assignmentObject.created) {
        //             // CURRENT MONTH
        //             if (assignmentObject.created?.toDate().getTime() >= fromDate.getTime() && assignmentObject.created?.toDate().getTime() <= toDate.getTime()) {

        //                 // MONTHLY CLIENTS UNITS
        //                 const monthlyClientsUnitsIndex = this.monthlyClientsUnits.findIndex(x => x.client.id === assignmentObject.project.client.id);
        //                 const monthlyCLientUnitsObject = {
        //                     id: assignmentObject.id,
        //                     client: {
        //                         id: assignmentObject.project.client.id,
        //                         name: assignmentObject.project.client.name,
        //                     },
        //                     units: {
        //                         ft: this.getUnits(assignmentObject.files, 'ft', assignmentObject) ?? 0,
        //                         pages: this.getUnits(assignmentObject.files, 'pages', assignmentObject) ?? 0
        //                     },
        //                     currentMonthUnits: {
        //                         ft: this.getUnits(assignmentObject.files, 'ft', assignmentObject) ?? 0,
        //                         pages: this.getUnits(assignmentObject.files, 'pages', assignmentObject) ?? 0
        //                     },
        //                     lastMonthUnits: { ft: 0, pages: 0 },
        //                 };

        //                 if (monthlyClientsUnitsIndex === -1) {
        //                     this.monthlyClientsUnits.push(monthlyCLientUnitsObject);
        //                 } else {
        //                     this.monthlyClientsUnits[monthlyClientsUnitsIndex].units.ft =
        //                         +this.monthlyClientsUnits[monthlyClientsUnitsIndex].units.ft + +monthlyCLientUnitsObject.units.ft;
        //                     this.monthlyClientsUnits[monthlyClientsUnitsIndex].units.pages =
        //                         +this.monthlyClientsUnits[monthlyClientsUnitsIndex].units.pages + +monthlyCLientUnitsObject.units.pages;

        //                     this.monthlyClientsUnits[monthlyClientsUnitsIndex].currentMonthUnits.ft =
        //                         +this.monthlyClientsUnits[monthlyClientsUnitsIndex].currentMonthUnits.ft + +monthlyCLientUnitsObject.currentMonthUnits.ft;
        //                     this.monthlyClientsUnits[monthlyClientsUnitsIndex].currentMonthUnits.pages =
        //                         +this.monthlyClientsUnits[monthlyClientsUnitsIndex].currentMonthUnits.pages + +monthlyCLientUnitsObject.currentMonthUnits.pages;
        //                 }

        //                 // MONTHLY CLIENTS TEAMS UNITS
        //                 const monthlyClientsTeamsUnitsIndex = this.monthlyClientsTeamsUnits.findIndex(x => x.client.id === assignmentObject.project.client.id && x.team.id === assignmentObject.project.team.id);
        //                 const monthlyClientsTeamsUnitsObject = {
        //                     id: assignmentObject.id,
        //                     client: { id: assignmentObject.project.client.id, name: assignmentObject.project.client.name, },
        //                     team: { id: assignmentObject.project.team.id, name: assignmentObject.project.team.name, },
        //                     units: {
        //                         ft: this.getUnits(assignmentObject.files, 'ft', assignmentObject) ?? 0,
        //                         pages: this.getUnits(assignmentObject.files, 'pages', assignmentObject) ?? 0
        //                     },
        //                 };

        //                 if (monthlyClientsTeamsUnitsIndex === -1) {
        //                     this.monthlyClientsTeamsUnits.push(monthlyClientsTeamsUnitsObject);
        //                 } else {
        //                     this.monthlyClientsTeamsUnits[monthlyClientsTeamsUnitsIndex].units.ft =
        //                         +this.monthlyClientsTeamsUnits[monthlyClientsTeamsUnitsIndex].units.ft + +monthlyClientsTeamsUnitsObject.units.ft;
        //                     this.monthlyClientsTeamsUnits[monthlyClientsTeamsUnitsIndex].units.pages =
        //                         +this.monthlyClientsTeamsUnits[monthlyClientsTeamsUnitsIndex].units.pages + +monthlyClientsTeamsUnitsObject.units.pages;
        //                 }

        //                 // MONTHLY MEMBERS PERFORMANCE
        //                 assignmentObject.members.forEach((member: EnumModel) => {
        //                     const monthlyMembersPerformanceIndex = this.monthlyMembersPerformance.findIndex(x => x.member.id === member.id);
        //                     const monthlyMembersPerformanceObject = {
        //                         member: { id: member.id, name: member.name },
        //                         units: {
        //                             ft: assignmentObject.files.find(x => x.memberID === member.id)?.units.ft ?? 0,
        //                             pages: assignmentObject.files.find(x => x.memberID === member.id)?.units.pages ?? 0,
        //                         },
        //                     };

        //                     if (monthlyMembersPerformanceIndex === -1) {
        //                         this.monthlyMembersPerformance.push(monthlyMembersPerformanceObject);
        //                     } else {
        //                         this.monthlyMembersPerformance[monthlyMembersPerformanceIndex].units.ft =
        //                             +this.monthlyMembersPerformance[monthlyMembersPerformanceIndex].units.ft + +monthlyMembersPerformanceObject.units.ft;
        //                         this.monthlyMembersPerformance[monthlyMembersPerformanceIndex].units.pages =
        //                             +this.monthlyMembersPerformance[monthlyMembersPerformanceIndex].units.pages + +monthlyMembersPerformanceObject.units.pages;
        //                     }
        //                 });

        //                 // // console.log(this.monthlyMembersPerformance);
        //                 // // console.log(assignmentObject.files)
        //                 this.barChartData.labels = [...this.monthlyMembersPerformance.map(data => data.member.name)];
        //                 this.barChartData.datasets[0].data = [...this.monthlyMembersPerformance.map(data => +data.units.ft)];
        //                 this.barChartData.datasets[1].data = [...this.monthlyMembersPerformance.map(data => +data.units.pages)];

        //             }

        //             // LAST MONTH
        //             if (assignmentObject.created?.toDate().getTime() >= fromDatePrevious.getTime() && assignmentObject.created?.toDate().getTime() <= toDatePrevious.getTime()) {
        //                 // MONTHLY CLIENTS UNITS
        //                 const monthlyClientsUnitsIndex = this.monthlyClientsUnits.findIndex(x => x.client.id === assignmentObject.project.client.id);
        //                 const monthlyCLientUnitsObject = {
        //                     id: assignmentObject.id,
        //                     client: {
        //                         id: assignmentObject.project.client.id,
        //                         name: assignmentObject.project.client.name,
        //                     },
        //                     units: {
        //                         ft: this.getUnits(assignmentObject.files, 'ft', assignmentObject) ?? 0,
        //                         pages: this.getUnits(assignmentObject.files, 'pages', assignmentObject) ?? 0
        //                     },
        //                     currentMonthUnits: { ft: 0, pages: 0 },
        //                     lastMonthUnits: {
        //                         ft: this.getUnits(assignmentObject.files, 'ft', assignmentObject) ?? 0,
        //                         pages: this.getUnits(assignmentObject.files, 'pages', assignmentObject) ?? 0
        //                     },
        //                 };

        //                 if (monthlyClientsUnitsIndex === -1) {
        //                     this.monthlyClientsUnits.push(monthlyCLientUnitsObject);
        //                 } else {
        //                     this.monthlyClientsUnits[monthlyClientsUnitsIndex].units.ft =
        //                         +this.monthlyClientsUnits[monthlyClientsUnitsIndex].units.ft + +monthlyCLientUnitsObject.units.ft;
        //                     this.monthlyClientsUnits[monthlyClientsUnitsIndex].units.pages =
        //                         +this.monthlyClientsUnits[monthlyClientsUnitsIndex].units.pages + +monthlyCLientUnitsObject.units.pages;

        //                     this.monthlyClientsUnits[monthlyClientsUnitsIndex].lastMonthUnits.ft =
        //                         +this.monthlyClientsUnits[monthlyClientsUnitsIndex].lastMonthUnits.ft + +monthlyCLientUnitsObject.lastMonthUnits.ft;
        //                     this.monthlyClientsUnits[monthlyClientsUnitsIndex].lastMonthUnits.pages =
        //                         +this.monthlyClientsUnits[monthlyClientsUnitsIndex].lastMonthUnits.pages + +monthlyCLientUnitsObject.lastMonthUnits.pages;
        //                 }
        //             }
        //         }

        //         increment = increment + 1;
        //         this.loading = !(total === increment);
        //     });

        // });
    }

    getClientTeamUnits(team: EnumModel, client: EnumModel, type?: 'FT' | 'PAGES'): number {
        const object = {
            ...this.monthlyClientsTeamsUnits
                .filter(x => x.client.id === client.id && x.team.id === team.id)[0]
        };
        if (!object.units) return 0;

        if (type === 'FT') {
            const total = +object.units?.ft ?? 0;
            return total;
        }

        if (type === 'PAGES') {
            const total = +object.units?.pages ?? 0;
            return total;
        }

        const total = (+object.units?.ft ?? 0) + (+object.units?.pages ?? 0);
        return total;
    }

    getClientTeamUnitsTotal(team: EnumModel, type?: 'FT' | 'PAGES'): number {
        const total = [
            ...this.monthlyClientsTeamsUnits
                .filter(x => x.team.id === team.id)
        ];

        if (type === 'FT') {
            return total.reduce((sum, current) => sum + +current.units.ft, 0);
        }

        if (type === 'PAGES') {
            return total.reduce((sum, current) => sum + +current.units.pages, 0);
        }

        return total.reduce((sum, current) => sum + (+current.units.ft + +current.units.pages), 0);
    }

    getAssignmentsListByDeadline(): AssignmentsModel[] {
        return [...this.assignmentsList
            .filter(x => x.status?.id !== getFileStatus(FileStatusEnum.complete).id)
            // .filter(x => x.updated && x.updated?.toDate().getTime() >= (new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate(), 0, 0, 0).getTime()))
            .sort((a, b) => (a.deadLine?.toDate() ?? 0) < (b.deadLine?.toDate() ?? 0) ? 1 : -1)
        ];
    }

    getAssignmentsListByComplete(): AssignmentsModel[] {
        return [...this.assignmentsList
            .filter(x => x.status?.id === getFileStatus(FileStatusEnum.complete).id)
            .filter(x => x.updated && x.updated?.toDate().getTime() >= (new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate(), 0, 0, 0).getTime()))
        ];
    }

    getUnits(files: FilesModel[] | undefined, type: 'ft' | 'pages', item?: AssignmentsModel): number | undefined {
        if (!files) return 0;

        const newUnit = files.reduce((sum, current) => sum + +current.units[type], 0);
        if (item && item.name.includes('(rev.)') && item.history.length !== 0) {
            const index = item.history.findIndex(x => x.status?.id === getFileStatus(FileStatusEnum.complete).id) + 1;
            if (item.history[index]) {

                const oldUnit = item.history[index].files.reduce((sum, current) => sum + +current.units[type], 0) ?? 0;

                if (item.history[index].updated && item.history[index].updated?.toDate()) {
                    let lastUpdatedDate = item.history[index].updated!.toDate();
                    lastUpdatedDate = new Date(lastUpdatedDate.getFullYear(), lastUpdatedDate.getMonth(), 0);

                    const d = new Date();
                    const currentDate = new Date(d.getFullYear(), d.getMonth(), 0);

                    if (lastUpdatedDate.getTime() === currentDate.getTime()) {
                        return Math.max(newUnit, oldUnit);
                    }
                }

                if (oldUnit < newUnit) return newUnit - oldUnit;
                if (oldUnit > newUnit) return 0;
            }
        }
        return newUnit;
    }

}
