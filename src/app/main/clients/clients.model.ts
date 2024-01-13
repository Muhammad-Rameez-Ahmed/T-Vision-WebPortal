import { BaseModel } from "src/app/services/models/base.model";
import { getStatus, StatusEnum } from "src/app/services/enums/status.enum";

export interface ClientsModel extends BaseModel {
    email: string;
    contact: ContactModel;
}

export interface ContactModel {
    name: string;
    phone: string;
}

export class Clients {
    constructor(private client?: ClientsModel) { }

    init(): ClientsModel {

        const client: ClientsModel = {
            id: '',
            name: '',
            email: '',
            contact: { name: '', phone: '', },
            status: getStatus(StatusEnum.active),
            created: null,
            updated: null
        };

        return client;
    }
}