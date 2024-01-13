export interface ClinicAddModel {
    clinicName: string;
    clinicBelongsTo: number;
    clinicCreatedBy: number;
}


export class ClinicAdd {

    constructor(auth?: ClinicAddModel) { }
    init(): ClinicAddModel {

        const member: ClinicAddModel = {

            clinicName: "",
            clinicBelongsTo: 0,
            clinicCreatedBy: 0,
        };

        return member;
    }

}


export interface Clinics {
    clinicName: string;
    clinicBelongsTo: number;
    clinicCreatedBy: number;

}

