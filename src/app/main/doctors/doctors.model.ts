// export interface Doctors {
//     doctorId: number,
//     doctorCreatedAt: string,
//     doctorName: string,
//     doctorEmail: string,
//     doctorContact: string,
//     doctorProfile: string,
//     doctorIsActive: boolean,
//     doctorGender: string
// }
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
export interface Doctors {
    doctorId: number;
    doctorCreatedAt: string;
    doctorName: string;
    doctorGender: number;
    doctorEmail: string;
    doctorContact: string;
    doctorProfile: string;
    doctorIsActive: boolean;
    doctorBelongsTo: DoctorBelongsTo;
    sessionsList: string;
    doctorCategory: DoctorCategory;
}


