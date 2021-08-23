import { DatabaseItem, Degrees, Location, MegaHertz } from "./Common";

export interface VhfNavaid extends DatabaseItem {
    frequency: MegaHertz;
    figureOfMerit: number;
    /**
     * Beware: this is NOT the same as magnetic variation
     */
    stationDeclination: Degrees;
    vorLocation?: Location;
    dmeLocation?: Location;
    type: VhfNavaidType;
    class?: VorClass;
}

export enum VhfNavaidType {
    Unknown,
    Vor,
    VorDme,
    Dme,
    Tacan,
    Vortac,
    Vot,
    IlsDme,
    IlsTacan,
}

export enum VorClass {
    Unknown,
    Terminal,
    LowAlt,
    HighAlt,
}
