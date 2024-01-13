
import { Component } from '@angular/core';
import { endAt, limit, orderBy, QueryConstraint, startAt, where } from '@angular/fire/firestore';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { AssignmentsModel, FilesModel } from 'src/app/main/assignments/assignments.model';
import { ClientsModel } from 'src/app/main/clients/clients.model';
import { FileStatusEnum, getFileStatus } from 'src/app/services/enums/file-status.enum';
import { RolesEnum, getRoles } from 'src/app/services/enums/roles.enum';
import { getStatusList, StatusEnum } from 'src/app/services/enums/status.enum';
import { EnumModel } from 'src/app/services/models/enum.model';

@Component({ template: '' })
export class BaseComponent<T> {

    page: number = 1;
    size: number = 25;
    total: number = 0

    list: T[] = [];

    loading: boolean = true;
    optLoading: boolean[] = [];

    direction: 'asc' | 'desc' = 'desc';
    field: string = 'index';
    search: string = '';
    active: boolean = false;

    fromDate: NgbDateStruct | null = null;
    toDate: NgbDateStruct | null = null;

    statusList: EnumModel[] = getStatusList();

    client: ClientsModel | null = null;

    submission: boolean = false;

    role = RolesEnum;

    resetButton: boolean = false;

    constructor() { }

    ngOnInit(): void {
        this.getList();
    }

    isNumber(e: { charCode: number; }): boolean {
        return (e.charCode >= 48 && e.charCode < 58) || e.charCode === 46;
    }

    query(): QueryConstraint[] {
        const q: QueryConstraint[] = [];

        if (this.size && !this.active) q.push(limit(this.size))

        if (this.field && this.direction && !this.search && !this.active && !this.client && !this.submission && !this.fromDate && !this.toDate) {
            // if (this.field === 'index') {
            q.push(orderBy(this.field, this.direction));
            // q.push(startAt(this.size * this.page - this.size + 1))
            // } else { q.push(orderBy(this.field, this.direction)); }
        }

        if (this.search) q.push(orderBy('name'), startAt(this.search), endAt(this.search + '\uf8ff'));

        if (this.active) q.push(where('status.id', '==', 'active'));

        if (this.fromDate) q.push(where('created', '>=', (new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day))));
        if (this.toDate) q.push(where('created', '<=', (new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day, 23, 59))));

        if (this.client) q.push(where('clientID', '==', this.client.id));

        return q;
    }

    getList(fetch?: boolean): void { }

    fetchData(): void {
        this.loading = true;
        this.getList(true);
    }

    resetFilter(): void {
        this.page = 1;
        this.size = 25;
        this.total = 0

        this.direction = 'desc';
        this.field = 'index';
        this.search = '';

        this.fromDate = null;
        this.toDate = null;

        this.resetButton = false;

        this.fetchData();
    }

    sort(field: string): void {
        this.field = field;
        this.direction = this.direction === 'asc' ? 'desc' : 'asc';
        this.fetchData();
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

    ngOnDestroy(): void {
        this.total = 0;
        this.page = 1;
    }

}
