import { EnumModel } from "src/app/services/models/enum.model"
import { UnitsModel } from "../assignments/assignments.model";
export interface ClientUnitsModel {
    client: EnumModel;
    units: UnitsModel;

    currentMonthUnits?: UnitsModel | any;
    lastMonthUnits?: UnitsModel | any;
}

export interface ClientTeamUnitModel extends ClientUnitsModel {
    team: EnumModel;
}

export interface MembersPerformanceModel {
    member: EnumModel;
    units: UnitsModel;
}