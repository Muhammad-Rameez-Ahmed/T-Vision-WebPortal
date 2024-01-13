import { EnumModel } from "../models/enum.model";

export enum WorkTypesEnum {
    tcp = 'TCP',
    permit = 'Permit',
    baseMap = 'Base-map',
    ffth = 'FFTH',
    other = 'Other',
}

export function getWorkType(role: WorkTypesEnum): EnumModel {
    const object = {
        id: Object.keys(WorkTypesEnum)[Object.values(WorkTypesEnum).indexOf(role)],
        name: role
    };
    return object;
}

export function getWorkTypesList(): EnumModel[] {
    const arrayObjects: EnumModel[] = [];
    for (const [propertyKey, propertyValue] of Object.entries(WorkTypesEnum)) {
        if (!Number.isNaN(Number(propertyKey))) {
            continue;
        }
        arrayObjects.push({ id: propertyKey, name: propertyValue });
    }
    return arrayObjects;
}