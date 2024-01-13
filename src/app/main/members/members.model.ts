import { DocumentReference, DocumentData } from "@angular/fire/firestore";
import { getStatus, StatusEnum } from "src/app/services/enums/status.enum";
import { BaseModel } from "src/app/services/models/base.model";
import { EnumModel } from "src/app/services/models/enum.model";
import { TeamsModel } from "../teams/teams.model";

export interface MembersModel extends BaseModel {
    email: string;
    phone: string;
    role: EnumModel | null;
    team: any | DocumentReference<DocumentData | TeamsModel> | EnumModel | null;
}

export class Members {
    constructor(private member?: MembersModel) { }

    init(): MembersModel {

        const member: MembersModel = {
            id: '',
            name: '',
            email: '',
            phone: '',
            role: null,
            team: { id: '-1', name: 'Un-Assigned' },
            status: getStatus(StatusEnum.active),
            created: null,
            updated: null
        };

        return member;
    }

}