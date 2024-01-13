import { EnumModel } from "../models/enum.model";

export enum StatusEnum {
    active = 'Active',
    deactivate = 'Deactivate',
}

export function getStatus(status: StatusEnum): EnumModel {
    const object = {
        id: Object.keys(StatusEnum)[Object.values(StatusEnum).indexOf(status)],
        name: status
    };
    return object;
}

export function getStatusList(): EnumModel[] {
    const arrayObjects: EnumModel[] = [];
    for (const [propertyKey, propertyValue] of Object.entries(StatusEnum)) {
        if (!Number.isNaN(Number(propertyKey))) {
            continue;
        }
        arrayObjects.push({ id: propertyKey, name: propertyValue });
    }
    return arrayObjects;
}