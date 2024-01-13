

export interface Clinic {
    clinicId: number;
    clinicName: string;
    clinicIsActive: boolean;
}

export interface DoctorBelongsTo {
    siteId: number;
    siteName: string;
    siteLatitude: number;
    siteLongitude: number;
    siteAddress: string;
    siteCreatedAt: string;
}

export interface DoctorCategory {
    docCategoryId: number;
    docCategoryCreatedAt: string;
    docCategoryName: string;
    docCategoryIsActive: boolean;
}

export interface SlotDoctorId {
    doctorId: number;
    doctorCreatedAt: string;
    doctorName: string;
    doctorGender: number;
    doctorEmail: string;
    doctorContact: string;
    doctorProfile: string;
    doctorIsActive: boolean;
    doctorBelongsTo: DoctorBelongsTo;
    sessionsList?: any;
    doctorCategory: DoctorCategory;
}

export interface PatientBelongsToSite {
    siteId: number;
    siteName: string;
    siteLatitude: number;
    siteLongitude: number;
    siteAddress: string;
    siteCreatedAt: string;
}

export interface Patient {
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

export interface AppointmentStatus {
    id: number;
    status: string;
}

export interface SessionDetail {
    appointId: number;
    patient: Patient;
    appointmentStatus: AppointmentStatus;
    specialDescription: string;
}

export interface Session {
    sessionId: number;
    sessionStartTime: string;
    sessionEndTime: string;
    sessionIsActive: boolean;
    sessionDetail: SessionDetail;
}

export interface Slot {
    slotId: number;
    slotDoctorId: SlotDoctorId;
    slotDay: string;
    slotStatus: boolean;
    slotStartTime: string;
    slotEndTime: string;
    slotCreatedAt: string;
    slotCount: number;
    sessions: Session[];
}

export interface ClinicsModel {
    clinic: Clinic;
    slots: Slot[];
}

export interface AppointmentsModel {
    data: ClinicsModel[];
    status: number;
}



