import { EnumModel } from "../models/enum.model";

export enum RolesEnum {
    admin = 'Admin',
    team_lead = 'Team Lead',
    qc = 'QC',
    engineering_department = 'Engineering Department',
    executive = 'Executive',
}

export function getRoles(role: RolesEnum): EnumModel {
    const object = {
        id: Object.keys(RolesEnum)[Object.values(RolesEnum).indexOf(role)],
        name: role
    };
    return object;
}

export function getRolesList(): EnumModel[] {
    const arrayObjects: EnumModel[] = [];
    for (const [propertyKey, propertyValue] of Object.entries(RolesEnum)) {
        if (!Number.isNaN(Number(propertyKey))) {
            continue;
        }
        arrayObjects.push({ id: propertyKey, name: propertyValue });
    }
    return arrayObjects;
}