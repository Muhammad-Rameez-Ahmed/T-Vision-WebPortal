import { Timestamp } from "@angular/fire/firestore";
import { EnumModel } from "./enum.model";

export interface BaseModel {
    readonly id: string | number;
    index?: number;
    name: string;
    status: EnumModel | null;
    created: Timestamp | null;
    updated: Timestamp | null;
}