export interface StaffAddModel extends StaffUpdateModel {
    // firstName: string;
    // lastName: string;
    // name: string;
    // email: string;
    // contact: string;
    // image: string | Blob;
    // designation: string;
    // belongsTo: string;
    // role: string;
    // address: string;
    password: string;
}

export interface StaffUpdateModel {

    name: string;
    email: string;
    contact: string;
    image: string | Blob;
    designation: string;
    belongsTo: string;
    role: string;
    address: string;
}

export class StaffUpdate {

    constructor(auth?: StaffUpdateModel) { }
    init(): StaffUpdateModel {

        const member: StaffUpdateModel = {
            name: "",
            email: "",
            contact: "",
            image: "",
            designation: "",
            belongsTo: "",
            role: "",
            address: "",
        };

        return member;
    }

}

export class StaffAdd {

    constructor(auth?: StaffAddModel) { }
    init(): StaffAddModel {

        const member: StaffAddModel = {
            name: "",
            email: "",
            contact: "",
            image: "",
            designation: "",
            belongsTo: "",
            role: "",
            address: "",
            password: ""
        };

        return member;
    }

}