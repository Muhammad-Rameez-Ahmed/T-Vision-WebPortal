export interface DoctorAddModel {
    doctorName: string,
    doctorEmail: string,
    doctorPassword: string,
    doctorContact: string,
    profile: string | Blob,
    doctorIsActive: string,
    doctorCreatedBy: string,
    doctorBelongsTo: string,
    doctorGender: string
    doctorCategory: string
}



export class DoctorAdd {

    constructor(auth?: DoctorAddModel) { }
    init(): DoctorAddModel {

        const member: DoctorAddModel = {
            doctorName: "",
            doctorEmail: "",
            doctorPassword: "",
            doctorContact: "",
            profile: "",
            doctorIsActive: "",
            doctorCreatedBy: "",
            doctorBelongsTo: "",
            doctorGender: "",
            doctorCategory: "",
        };

        return member;
    }

}


export interface Doctors {
    doctorId: number,
    doctorName: string,
    doctorEmail: string,
    doctorContact: string,
    profile: string | Blob,
    doctorIsActive: string,
    doctorCreatedBy: string,
    doctorBelongsTo: string,
    doctorGender: string,
    doctorCategory: string
}


export interface Categories {
    docCategoryId: number;
    docCategoryCreatedAt: string;
    docCategoryName: string;
    docCategoryIsActive: boolean;
}