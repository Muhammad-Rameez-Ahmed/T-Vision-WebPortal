import { EnumModel } from "../models/enum.model";

export enum FileStatusEnum {
    todo = 'To-do',
    inProgress = 'In-progress',
    qc = 'QC',
    complete = 'Complete',
    deactivate = 'Deactivate',
}

export function getFileStatus(FileStatus: FileStatusEnum): EnumModel {
    const object = {
        id: Object.keys(FileStatusEnum)[Object.values(FileStatusEnum).indexOf(FileStatus)],
        name: FileStatus
    };
    return object;
}

export function getFileStatusList(): EnumModel[] {
    const arrayObjects: EnumModel[] = [];
    for (const [propertyKey, propertyValue] of Object.entries(FileStatusEnum)) {
        if (!Number.isNaN(Number(propertyKey))) {
            continue;
        }
        arrayObjects.push({ id: propertyKey, name: propertyValue });
    }
    return arrayObjects;
}