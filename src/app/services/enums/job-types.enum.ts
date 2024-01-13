import { EnumModel } from "../models/enum.model";

export enum JobTypesEnum {
    new = 'New',
    revision = 'Revision',
    reCreate = 'Re-create',
    redline = 'Redline',
}

export function getJobTypes(role: JobTypesEnum): EnumModel {
    const object = {
        id: Object.keys(JobTypesEnum)[Object.values(JobTypesEnum).indexOf(role)],
        name: role
    };
    return object;
}

export function getJobTypesList(): EnumModel[] {
    const arrayObjects: EnumModel[] = [];
    for (const [propertyKey, propertyValue] of Object.entries(JobTypesEnum)) {
        if (!Number.isNaN(Number(propertyKey))) {
            continue;
        }
        arrayObjects.push({ id: propertyKey, name: propertyValue });
    }
    return arrayObjects;
}