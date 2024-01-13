export interface PatientAddModel {
    patientNhsId: string;
    patientEmail: string;
    patientPassword: string;
    patientUserName: string;
    patientLastName: string;
    patientUserPhone: string;
    patientUserAge: number;
    patientUserAddress: string;
    patientUserGender: number;
    patientStatus: string;
    patientBelongsToSite: number;
    patientCreatedBy: number;
    patientImage: Blob | string;
}


export class PatientAdd {

    constructor(auth?: PatientAddModel) { }
    init(): PatientAddModel {

        const member: PatientAddModel = {
            patientNhsId: "",
            patientEmail: "",
            patientPassword: "",
            patientUserName: "",
            patientLastName: "",
            patientUserPhone: "",
            patientUserAge: 0,
            patientUserAddress: "",
            patientUserGender: 0,
            patientStatus: "",
            patientBelongsToSite: 0,
            patientCreatedBy: 0,
            patientImage: ""
        };

        return member;
    }

}


export interface Patients {
    patientId: number;
    patientNhsId: number;
    patientEmail: string;
    patientUserName: string;
    patientLastName: string;
    patientUserPhone: string;
    patientUserAge: string;
    patientUserAddress: string;
    patientUserGender: number;
    patientUserProfile: string;
    patientIsParent: boolean;
    patientParentId: number;
    patientStatus: string;
    patientIsActive: boolean;
    patientCreatedAt: string;
}

