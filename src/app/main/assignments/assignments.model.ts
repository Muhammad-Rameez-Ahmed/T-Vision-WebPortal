import { DocumentData, DocumentReference, Timestamp } from "@angular/fire/firestore";
import { FileStatusEnum } from "src/app/services/enums/file-status.enum";
import { BaseModel } from "src/app/services/models/base.model";
import { EnumModel } from "src/app/services/models/enum.model";
import { MembersModel } from "../members/members.model";
import { ProjectsModel } from "../projects/projects.model";

export interface AssignmentsModel extends BaseModel {
    locality: string;
    tcpType: EnumModel | null;
    jobType: EnumModel | null;
    workType: EnumModel | null;
    comments: string;
    link: string;
    consLayout: string;
    files: FilesModel[];
    deadLine: Timestamp | any;
    members: any | DocumentReference<DocumentData[] | MembersModel[]> | MembersModel[];
    project: any | DocumentReference<DocumentData | ProjectsModel> | ProjectsModel;
    assignee: any | DocumentReference<DocumentData | EnumModel> | EnumModel;
    clientID: string | number;
    history: FileHistoryModel[];
}

export interface FilesModel {
    units: UnitsModel;
    memberID: string | number;
    memberName?: string;
}

export interface UnitsModel {
    ft: number | '';
    pages: number | '';
}

export interface FileHistoryModel {
    files: FilesModel[];
    updated: Timestamp | null;
    comments: string;
    status: EnumModel | null;
    actionBy: string;
}

export class Assignments {
    constructor(private assignment?: AssignmentsModel) { }

    init(): AssignmentsModel {

        const assignment: AssignmentsModel = {
            id: '',
            name: '',
            locality: '',
            tcpType: null,
            jobType: null,
            link: '',
            workType: null,
            comments: '',
            consLayout: '',
            members: [],
            project: null,
            files: [],
            clientID: '',
            assignee: null,
            deadLine: null,
            history: [],
            status: null,
            created: null,
            updated: null,
        };

        return assignment;
    }
}