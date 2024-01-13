import { BaseModel } from "src/app/services/models/base.model";
import { getStatus, StatusEnum } from "src/app/services/enums/status.enum";

export interface TeamsModel extends BaseModel {
}

export class Teams {
    constructor(private team?: TeamsModel) { }

    init(): TeamsModel {

        const team: TeamsModel = {
            id: '',
            name: '',
            status: getStatus(StatusEnum.active),
            created: null,
            updated: null
        };

        return team;
    }
}