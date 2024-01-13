export interface AppointmentSession {
    sessionId: number;
    sessionStartTime: string;
    sessionEndTime: string;
    sessionIsActive: boolean;
    slotsID?: any;
}

export interface Status {
    id: number;
    status: string;
}

export interface PatientBelongsToSite {
    siteId: number;
    siteName: string;
    siteLatitude: number;
    siteLongitude: number;
    siteAddress: string;
    siteCreatedAt: string;
}

export interface AppointmentPatient {
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
    patientBelongsToSite: PatientBelongsToSite;
}

export interface Appointments {
    appointmentId: number;
    appointmentDate: string;
    appointmentSession: AppointmentSession | any;
    appointmentPatient: AppointmentPatient | any;
    appointmentPatientParent?: any | null;
    appointCreatedAt: string;
    appointmentStatus: number;
    appointmentActiveStatus: boolean;
    appointmentSpecialDescription: string;
}




export class AppointmentsModel {
    constructor(auth?: Appointments) { }

    static init(): Appointments {

        const member: Appointments = {
            appointmentId: 0,
            appointmentDate: '',
            appointmentSession: {},
            appointmentPatient: {},
            appointmentPatientParent: {},
            appointCreatedAt: '',
            appointmentStatus: 0,
            appointmentActiveStatus: true,
            appointmentSpecialDescription: '',
        };

        return member;
    }



}
export class AppointmentSessionModel {
    constructor(auth?: AppointmentSession) { }

    static init(): AppointmentSession {

        const member: AppointmentSession = {
            sessionId: 0,
            sessionStartTime: '',
            sessionEndTime: '',
            sessionIsActive: true,
            slotsID: 1,

        };

        return member;
    }

}