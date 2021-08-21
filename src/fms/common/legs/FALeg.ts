import LatLon from 'geodesy/latlon-ellipsoidal-vincenty';
import {AltitudeConstraint, Leg, SpeedConstraint} from "./index";
import {Waypoint} from "../Waypoint";
import {Degrees, NauticalMiles} from "../../../shared/types/Common";

export class FALeg implements Leg {

    public readonly from: Waypoint;

    private readonly mAltitude: number;

    private readonly mCourse: number;

    constructor(from: Waypoint, altitude: number, course: number) {
        this.mAltitude = altitude;
        this.mCourse = course;
        this.from = from;
    }

    get identifier(): string {
        return `(${this.mAltitude})`
    }

    get altitudeConstraint(): AltitudeConstraint | undefined
    {
        return undefined;
    }

    get bearing(): Degrees
    {
        return this.mCourse;
    }

    get distance(): NauticalMiles
    {
        return 0;
    }

    getDistanceToGo(ppos: LatLon): NauticalMiles
    {
        return 0;
    }

    getGuidanceParameters(ppos: LatLon, trueTrack: Degrees)
    {
        return undefined as any;
    }

    getNominalRollAngle(gs: number): Degrees
    {
        return 0;
    }

    getPseudoWaypointLocation(distanceBeforeTerminator: number): LatLon | undefined
    {
        return undefined;
    }

    get initialLocation(): LatLon | undefined
    {
        return undefined;
    }

    isAbeam(ppos: LatLon)
    {
        return false;
    }

    get isCircularArc(): boolean
    {
        return false;
    }

    get speedConstraint(): SpeedConstraint | undefined
    {
        return undefined;
    }

    get terminatorLocation(): LatLon | undefined
    {
        return undefined;
    }
}