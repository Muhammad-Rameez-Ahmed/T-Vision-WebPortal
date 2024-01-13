import { EnumModel } from "../models/enum.model";

export enum TCPTypesEnum {
    f2 = 'F2',
    aerial = 'Site-Specific (Aerial)',
    ug = 'Site-Specific (UG)',
}

export function getTCPTypes(role: TCPTypesEnum): EnumModel {
    const object = {
        id: Object.keys(TCPTypesEnum)[Object.values(TCPTypesEnum).indexOf(role)],
        name: role
    };
    return object;
}

export function getTCPTypesList(): EnumModel[] {
    const arrayObjects: EnumModel[] = [];
    for (const [propertyKey, propertyValue] of Object.entries(TCPTypesEnum)) {
        if (!Number.isNaN(Number(propertyKey))) {
            continue;
        }
        arrayObjects.push({ id: propertyKey, name: propertyValue });
    }
    return arrayObjects;
}