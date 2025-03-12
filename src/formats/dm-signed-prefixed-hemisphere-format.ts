import { z } from 'zod';
import type { Coordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^([NS])\s*(\d+)°\s*(\d+(\.\d+)?)'\s*,?\s*([EW])\s*(\d+)°\s*(\d+(\.\d+)?)'$/;

/**
 * Supported formats:
 *
 * N40°07' W74°07'
 * N 40°07' W 74°07'
 * N40°07.38'W74°07.38'
 * N40°07.38' W74°07.38'
 * N40°07.38' W74°07.38'
 * N 40° 07.38' W 74° 07.38'
 * N 40° 07.38', W 74° 07.38'
 * ... and additional variants with spaces and comma.
 */
export class DmSignedPrefixedHemisphereFormat extends BaseFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DmSignedPrefixedHemisphereFormat.canParse(coordinateString) === false) {
            throw new Error('Invalid coordinate string');
        }
        this.enforceNoHyphen(coordinateString);
        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const matchLatDegree = match[2];
        const matchLatMinutes = match[3];
        const matchLatDirection = match[1];
        const matchLonDegree = match[6];
        const matchLonMinutes = match[7];
        const matchLonDirection = match[5];

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
