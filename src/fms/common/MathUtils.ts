export class MathUtils {
    static DEEGREES_TO_RADIANS = Math.PI / 180;

    static readonly EARTH_RADIUS_NM = 3440.1;

    static Rad2Deg = 180 / Math.PI;

    private static optiPow10 = [];

    public static fastToFixed(val: number, fraction: number): string {
        if (fraction <= 0) {
            return Math.round(val).toString();
        }

        let coefficient = MathUtils.optiPow10[fraction];
        if (!coefficient || Number.isNaN(coefficient)) {
            coefficient = 10 ** fraction;
            MathUtils.optiPow10[fraction] = coefficient;
        }

        return (Math.round(val * coefficient) / coefficient).toString();
    }

    public static diffAngle(a: number, b: number): number {
        let diff = b - a;
        while (diff > 180) {
            diff -= 360;
        }
        while (diff <= -180) {
            diff += 360;
        }
        return diff;
    }

    public static mod(x: number, n: number): number {
        return x - Math.floor(x / n) * n;
    }

    public static highestPower2(n: number): number {
        let res = 0;
        for (let i = n; i >= 1; i--) {
            if ((i & (i - 1)) === 0) {
                res = i;
                break;
            }
        }
        return res;
    }

    public static unpackPowers(n: number): number[] {
        const res: number[] = [];

        let x = n;
        while (x > 0) {
            const pow = MathUtils.highestPower2(x);
            res.push(pow);
            x -= pow;
        }

        return res;
    }

    public static packPowers(ns: number[]): number {
        if (ns.some((it) => it === 0 || (it & it - 1) !== 0)) {
            throw new Error('Cannot pack number which is not a power of 2 or is equal to zero.');
        }

        return ns.reduce((acc, v) => acc + v);
    }

    public static convertDMS(lat: number, lng: number, round?: boolean) {
        const convertLat = Math.abs(lat);
        const LatDeg = Math.floor(convertLat);
        let LatMin = '';
        if(!round)
            LatMin = this.toHundredth((convertLat - LatDeg) * 60).padStart(5, '0');
        else
            LatMin = Math.floor((convertLat - LatDeg) * 60).toString();
        const LatCardinal = (lat > 0 ? "N" : "S");

        const convertLng = Math.abs(lng);
        const LngDeg = Math.floor(convertLng);
        let LngMin = '';
        if(!round)
            LngMin = this.toHundredth((convertLng - LngDeg) * 60).padStart(5, '0');
        else
            LngMin = Math.floor((convertLng - LngDeg) * 60).toString();
        const LngCardinal = (lng > 0 ? "E" : "W");
        if(!round)
            return `${LatCardinal}${LatDeg.toString().padStart(2, '0')}°${LatMin} ${LngCardinal}${LngDeg.toString().padStart(3, '0')}°${LngMin}`;
        return `${LatCardinal}${LatDeg.toString().padStart(2, '0')}°${LatMin.padStart(2, '0')}  ${LngCardinal}${LngDeg.toString().padStart(3, '0')}°${LngMin}`;
    }

    public static toHundredth(input: number) {
        return (Math.round(input * 100) / 100).toFixed(2);
    }

    public static toTenth(input: number) {
        return (Math.round(input * 10) / 10).toFixed(1);
    }
}
