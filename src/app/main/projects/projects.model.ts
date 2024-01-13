import { DocumentData, DocumentReference } from "@angular/fire/firestore";
import { getStatus, StatusEnum } from "src/app/services/enums/status.enum";
import { BaseModel } from "src/app/services/models/base.model";
import { ClientsModel } from "../clients/clients.model";
import { TeamsModel } from "../teams/teams.model";

export interface ProjectsModel extends BaseModel {
    description: string;
    team: DocumentReference<DocumentData | TeamsModel> | TeamsModel | any;
    client: DocumentReference<DocumentData | ClientsModel> | ClientsModel | any;
}

export class Projects {
    constructor(private project?: ProjectsModel) { }

    init(): ProjectsModel {

        const project: ProjectsModel = {
            id: '',
            name: '',
            description: '',
            team: null,
            client: null,
            status: getStatus(StatusEnum.active),
            created: null,
            updated: null
        };

        return project;
    }

}