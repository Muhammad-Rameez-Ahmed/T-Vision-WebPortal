import { BaseModel } from "src/app/services/models/base.model";

export interface NotificationsModel extends BaseModel {
    description: string;
    image: string | null;
    link: string;
    read: boolean;
}

export class Notifications {
    constructor(private notification?: NotificationsModel) { }

    init(): NotificationsModel {

        const notification: NotificationsModel = {
            id: '',
            name: '',
            description: '',
            image: null,
            link: '',
            read: false,
            status: null,
            created: null,
            updated: null
        };

        return notification;
    }
}