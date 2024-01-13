export interface SlotModel {
    slotDoctorId: string;
    slotDay: string;
    slotStartTime: string;
    slotEndTime: string;
    slotCreatedBy: string;
    slotBelongsTo: string;
    slotCount: string;
}


export interface Sessions {
    sessionId: number;
    sessionStartTime: string;
    sessionEndTime: string;
    sessionIsActive: boolean;
}

export interface Slots {
    slotId: number;
    slotDay: string;
    slotStatus: boolean;
    slotStartTime: string;
    slotEndTime: string;
    slotCreatedAt: string;
    slotCount: number;
    sessions: Sessions[];
}