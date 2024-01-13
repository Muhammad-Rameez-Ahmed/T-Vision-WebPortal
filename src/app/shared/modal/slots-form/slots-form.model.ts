
export interface SlotAddModel {
    slotDoctorId: string;
    slotDay: string;
    slotStartTime: string;
    slotEndTime: string;
    slotCreatedBy: string;
    slotBelongsTo: string;
    slotCount: string;
}


export class SlotAdd {

    constructor(auth?: SlotAddModel) { }
    init(): SlotAddModel {

        const member: SlotAddModel = {
            slotDoctorId: "",
            slotDay: "",
            slotStartTime: "",
            slotEndTime: "",
            slotCreatedBy: "",
            slotBelongsTo: "",
            slotCount: ""
        };

        return member;
    }

}


export interface Slots {
    slotDoctorId: string;
    slotDay: string;
    slotStartTime: string;
    slotEndTime: string;
    slotCreatedBy: string;
    slotBelongsTo: string;
    slotCount: string;
}


export interface Doctors {
    doctorId: number,
    doctorCreatedAt: string,
    doctorName: string,
    doctorEmail: string,
    doctorContact: string,
    profile: string,
    doctorIsActive: boolean,
    doctorGender: string
}