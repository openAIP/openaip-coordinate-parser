import { z } from 'zod';
import type { Coordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^([NS])\s*(\d+)°\s*(\d+)'\s*(\d+(?:\.\d+)?)\"\s*,?\s*([EW])\s*(\d+)°\s*(\d+)'\s*(\d+(?:\.\d+)?)\"$/;

/**
 * Supported formats:
 *
 * N40°7'23" W74°7'23"
 * N40°7'23", W74°7'23"
 * N40°7'23"W74°7'23"
 * N 40°7'23.123" W 74°7'23.123"
 * ... and additional variants with spaces and comma.
 */
export class DmsSignedPrefixedHemisphereFormat extends BaseFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DmsSignedPrefixedHemisphereFormat.canParse(coordinateString) === false) {
            throw new Error('Invalid coordinate string');
        }
        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const matchLatDegree = match[2];
        const matchLatMinutes = match[3];
        const matchLatSeconds = match[4];
        const matchLatDirection = match[1];
        const matchLonDegree = match[6];
        const matchLonMinutes = match[7];
        const matchLonSeconds = match[8];
        const matchLonDirection = match[5];

        this.enforceValidLatitudeDegrees(matchLatDegree, false);
        this.enforceValidMinutes(matchLatMinutes);
        this.enforceValidSeconds(matchLatSeconds);
        this.enforceValidLongitudeDegrees(matchLonDegree, false);
        this.enforceValidMinutes(matchLonMinutes);
        this.enforceValidSeconds(matchLonSeconds);

        const latDegree = Number.parseInt(matchLatDegree);
        const latMinutes = Number.parseInt(matchLatMinutes);
        const latSeconds = Number.parseFloat(matchLatSeconds);
        const lonDegree = Number.parseInt(matchLonDegree);
        const lonMinutes = Number.parseInt(matchLonMinutes);
        const lonSeconds = Number.parseFloat(matchLonSeconds);

        const decimalLat = this.dmsToDecimal({
            degrees: Math.abs(latDegree),
            minutes: latMinutes,
            seconds: latSeconds,
            direction: matchLatDirection,
        });
        const decimalLon = this.dmsToDecimal({
            degrees: Math.abs(lonDegree),
            minutes: lonMinutes,
            seconds: lonSeconds,
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
