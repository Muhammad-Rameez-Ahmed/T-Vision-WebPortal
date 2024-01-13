import { EnumModel } from "../services/models/enum.model";

export interface AuthModel {
    uid: string;
    email: string;
    password: string;
    user: EnumModel | null,
    role: EnumModel | null;
    status: EnumModel | null;
}


export interface AuthLogin {
    email: string;
    password: string;
}

export class AuthLoginModel {
    constructor(auth?: AuthLogin) { }

    static init(): AuthLogin {

        const member: AuthLogin = {
            email: '',
            password: '',
        };

        return member;
    }

}



export class Auth {

    constructor(auth?: AuthModel) { }

    init(): AuthModel {

        const member: AuthModel = {
            uid: '',
            user: null,
            role: null,
            status: null,
            email: '',
            password: '',
        };

        return member;
    }

}

export interface User {
    Id: number;
    Name: string;
    Email: string;
    Contact: string;
    Designation: string;
    Address: string;
    Profile: string;
    IsActive: boolean;
    CreatedAt: string;
    CreatedBy: number;
    Gender: string;
    Category: any;
    siteID: number;
    BelongsTo: any;
}



export class UserAdd {

    constructor(auth?: User) { }

    init(): User {

        const member: User = {
            Id: 0,
            Name: "",
            Email: "",
            Contact: "",
            Designation: "",
            Address: "",
            Profile: "",
            IsActive: true,
            CreatedAt: "",
            CreatedBy: 0,
            Gender: "",
            Category: {},
            siteID: 0,
            BelongsTo: {}
        };
        return member;
    }

}