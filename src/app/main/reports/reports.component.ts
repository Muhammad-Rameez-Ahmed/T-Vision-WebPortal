import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExportService } from 'src/app/services/common/export.service';
import { FileStatusEnum, getFileStatus } from 'src/app/services/enums/file-status.enum';
import { BaseComponent } from 'src/app/shared/classes/base.component';
import { ReportsService } from './reports.service';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent extends BaseComponent<unknown> implements OnInit {

    selectedTab: string = 'clients';

    constructor(
        private router: Router,
        public report: ReportsService,
        private _export: ExportService,
    ) { super(); }

    override ngOnInit(): void {
        this.getTab();
        this.report.getAssignments();
    }

    getTab(): void {
        const tab = this.router.url.split('/')[2] ?? 'clients';
        switch (tab) {
            case 'clients': case 'teams': case 'members': this.selectedTab = tab; break;
            default: this.router.navigate(['/reports/clients']); break;
        }
    }

    override fetchData(): void {
        this.report.fromDate = this.fromDate;
        this.report.toDate = this.toDate;
        this.report.getAssignments();
    }

    export(): void {
        const name = `${this.selectedTab} - ${(new Date().toUTCString())}`;

        if (this.selectedTab === 'clients') {

            let list = [...this.report.assignmentsList.filter(x => x.status && x.status.id === getFileStatus(FileStatusEnum.complete).id)];
            // // console.log(list)
            const clientsList = list.reduce(function (r, a) {
                r[a.project.client.name] = r[a.project.client.name] || [];
                r[a.project.client.name].push(a);
                return r;
            }, Object.create(null));
            Object.entries(clientsList).forEach(([key, value]: any) => {
                clientsList[key] = clientsList[key].reduce(function (r: { [x: string]: any[]; }, a: { project: { name: string | number; }; }) {
                    r['PROJECT: ' + a.project.name] = r['PROJECT: ' + a.project.name] || [];
                    r['PROJECT: ' + a.project.name].push(a);
                    return r;
                }, Object.create(null));
            });


            // // console.log(clientsList)

            Object.entries(clientsList).forEach(([key, value]: any) => {
                let temp: any[] = []
                Object.entries(clientsList[key]).forEach(([k, v]: any) => {
                    temp.push({
                        serial_no: '',
                        particulars: '',
                        ft: k,
                        pages: '',
                        date: '',
                        jobType: '',
                        status: '',
                    })
                    const typeList = v.reduce(function (r: { [x: string]: any[]; }, a: { workType: { name: string; }; tcpType: { name: string; }; }) {
                        r[a.workType.name + ' ' + (a.tcpType?.name ?? '')] = r[a.workType.name + ' ' + (a.tcpType?.name ?? '')] || [];
                        r[a.workType.name + ' ' + (a.tcpType?.name ?? '')].push(a);
                        return r;
                    }, Object.create(null));

                    Object.entries(typeList).forEach(([key, value]: any) => {
                        temp.push({
                            serial_no: '',
                            particulars: '',
                            ft: key,
                            pages: '',
                            date: '',
                            jobType: '',
                            status: '',
                        })
                        temp = temp.concat(value)
                    })
                })
                clientsList[key] = temp
            });

            Object.entries(clientsList).forEach(([key, value]: any) => {
                let count = 0;
                this._export.exportClientAsExcelFile(value.map((data: any, index: number) => {
                    if (!data.name && !data.created && !data.status) {
                        return { serial_no: `${data.ft}`, particulars: '', ft: '', pages: '', date: '', jobType: '', status: '', };
                    } else {
                        count++;
                        return {
                            serial_no: count,
                            particulars: data.name,
                            // ft: data.files?.reduce((sum: number, current: { units: { ft: string | number; }; }) => sum + (+current.units.ft), 0),
                            // pages: data.files?.reduce((sum: number, current: { units: { pages: string | number; }; }) => sum + (+current.units.pages), 0),
                            ft: this.getUnits(data.files, 'ft', data),
                            pages: this.getUnits(data.files, 'pages', data),
                            date: data.created?.toDate(),
                            jobType: data.jobType?.name,
                            status: data.status?.name,
                        };
                    }
                }), `Client, ${key} - ${(new Date().toUTCString())}`);
            });
        }

        if (this.selectedTab === 'teams') {
            const list = [
                ...this.report.teamsList.map(team => {

                    // let clientList: any = {};
                    // this.report.clientsList.forEach(client => {
                    //   // clientList[client.name] = {
                    //   //   ft: this.report.getClientTeamUnits(team, client, 'FT'),
                    //   //   pages: this.report.getClientTeamUnits(team, client, 'PAGES'),
                    //   // };
                    //   clientList[client.name+'-ft'] =  this.report.getClientTeamUnits(team, client, 'FT')
                    //   clientList[client.name+'-pages'] =  this.report.getClientTeamUnits(team, client, 'PAGES')
                    // });

                    return {
                        TEAM: team.name,
                        // ...clientList,
                        ...this.report.clientsList.reduce((acc: any, curr) => (acc[curr.name] = this.report.getClientTeamUnits(team, curr), acc), {}),
                        TOTAL: this.report.getClientTeamUnitsTotal(team),
                    };
                })
            ];

            // // console.log(list);
            this._export.exportAsExcelFile(list, name);
        }

        if (this.selectedTab === 'members') {
            const list = [...this.report.monthlyMembersPerformance.map(data => {
                return {
                    MEMBER: data.member.name,
                    UNITS: `FT: ${data.units.ft}, Pages: ${data.units.pages}`,
                };
            })];
            this._export.exportAsExcelFile(list, name);
        }

    }

    colorsPalette: any = {
        a: ['#b33dc632', '#27aeef32', '#87bc4532', '#bdcf3232', '#ede15b32', '#edbf3332', '#ef9b2032', '#f46a9b32', '#ea554532'],
        b: ['#00bfa032', '#b3d4ff32', '#dc0ab432', '#ffa30032', '#9b19f532', '#e6d80032', '#50e99132', '#0bb4ff32', '#e6004932'],
    }

    getColors(index: number, type: any): string {
        return this.colorsPalette[type][index % this.colorsPalette[type].length];
    }

}
