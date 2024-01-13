import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';
import { FileStatusEnum, getFileStatus } from 'src/app/services/enums/file-status.enum';
import { RolesEnum, getRoles } from 'src/app/services/enums/roles.enum';
import { StatusEnum } from 'src/app/services/enums/status.enum';
import { EnumModel } from 'src/app/services/models/enum.model';
import { AssignmentsModel, FilesModel } from '../assignments/assignments.model';
import { ReportsService } from '../reports/reports.service';

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

    role = RolesEnum;

    constructor(
        private router: Router,
        private auth: AuthService,
        public report: ReportsService
    ) { }

    ngOnInit(): void {
        // if (this.auth && this.auth.user && this.auth.user.role) {
        //   if ([getRoles(RolesEnum.qc).id, getRoles(RolesEnum.engineering_department).id].includes(this.auth.user.role.id)) {
        //     this.router.navigate(['/assignments']);
        //   }
        // }

        // this.report.getAssignments();
    }

    getPermissions(role: RolesEnum): EnumModel {
        return getRoles(role);
    }

    getColumnsColors(status: EnumModel | null): string {
        if (!status) return '';

        switch (status.name) {
            case FileStatusEnum.qc: return 'table-warning';
            case FileStatusEnum.complete: return 'table-success';
            case StatusEnum.deactivate: case FileStatusEnum.inProgress: case FileStatusEnum.todo: return 'table-danger';
        }

        return '';
    }

    getUnits(files: FilesModel[] | undefined, type: 'FT' | 'PAGES'): number {
        if (!files) return 0;

        if (type === 'FT') {
            return files.reduce((sum, current) => sum + +current.units.ft, 0);
        }

        if (type === 'PAGES') {
            return files.reduce((sum, current) => sum + +current.units.pages, 0);
        }

        return 0;
    }

    colorsPalette: any = {
        a: ['#b33dc632', '#27aeef32', '#87bc4532', '#bdcf3232', '#ede15b32', '#edbf3332', '#ef9b2032', '#f46a9b32', '#ea554532'],
        b: ['#00bfa032', '#b3d4ff32', '#dc0ab432', '#ffa30032', '#9b19f532', '#e6d80032', '#50e99132', '#0bb4ff32', '#e6004932'],
    }

    getColors(index: number, type: any): string {
        return this.colorsPalette[type][index % this.colorsPalette[type].length];
    }

    getDeadline(item: AssignmentsModel): boolean {
        if (item.status && item.status.id !== getFileStatus(FileStatusEnum.complete).id) {
            const deadline = item.deadLine.toDate();
            const today = new Date();
            if ((new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate())).getTime() === (new Date(today.getFullYear(), today.getMonth(), today.getDate())).getTime()) {
                return true;
            }
        }

        return false;
    }

}
