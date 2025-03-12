import { z } from 'zod';
import type { Coordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^(\d+)°\s*(\d+(\.\d+)?)'\s*([NS])\s*,?\s*(\d+)°\s*(\d+(\.\d+)?)'\s*([EW])$/;

/**
 * Supported formats:
 *
 * 40°07'N 74°07'W
 * 40°07' N 74°07' W
 * 40°07.38'N74°07.38'W
 * 40°07.38' N 74°07.38' W
 * 40°07.38'N 74°07.38'W
 * 40° 07.38' N 74° 07.38' W
 * 40° 07.38'N, 74° 07.38' W
 * ... and additional variants with spaces and comma.
 */
export class DmSignedSuffixedHemisphereFormat extends BaseFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DmSignedSuffixedHemisphereFormat.canParse(coordinateString) === false) {
            throw new Error('Invalid coordinate string');
        }
        this.enforceNoHyphen(coordinateString);
        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const matchLatDegree = match[1];
        const matchLatMinutes = match[2];
        const matchLatDirection = match[4];
        const matchLonDegree = match[5];
        const matchLonMinutes = match[6];
        const matchLonDirection = match[8];

        this.enforceValidLatitudeDegrees(matchLatDegree, false);
        this.enforceValidMinutes(matchLatMinutes);
        this.enforceValidLongitudeDegrees(matchLonDegree, false);
        this.enforceValidMinutes(matchLonMinutes);

        const latDegree = Number.parseInt(matchLatDegree);
        const latMinutes = Number.parseFloat(matchLatMinutes);
        const lonDegree = Number.parseInt(matchLonDegree);
        const lonMinutes = Number.parseFloat(matchLonMinutes);

        const decimalLat = this.dmToDecimal({
            degrees: Math.abs(latDegree),
            minutes: latMinutes,
            direction: matchLatDirection,
        });
        const decimalLon = this.dmToDecimal({
            degrees: Math.abs(lonDegree),
            minutes: lonMinutes,
            direction: matchLonDirection,
        });

        const lat = decimalLat.toFixed(this.precision);
        const lon = decimalLon.toFixed(this.precision);

        return {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
        };
    }

    static canParse(coordinateString: string): boolean {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        return REGEX.test(coordinateString);
    }
}
