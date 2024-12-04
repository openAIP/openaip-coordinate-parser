import { z } from 'zod';
import type { Coordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^(-?\d+)°\s*(\d+)'\s*(\d+(?:\.\d+)?)\",?\s*(-?\d+)°\s*(\d+)'\s*(\d+(?:\.\d+)?)\"$/;

/**
 * Parses coordinates strings in DMS signed format. Coordinate ordering is
 * always latitude, longitude.
 *
 * Supported formats:
 *
 * 40°7'23" -74°7'23"
 * 40°7'23", -74°7'23"
 * 40°7'23.123", -74°7'23.123"
 */
export class DmsSignedFormat extends BaseFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DmsSignedFormat.canParse(coordinateString) === false) {
            throw new Error('Invalid coordinate string');
        }
        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const matchLatDegree = match[1];
        const matchLatMinutes = match[2];
        const matchLatSeconds = match[3];
        const matchLonDegree = match[4];
        const matchLonMinutes = match[5];
        const matchLonSeconds = match[6];

        this.enforceValidLatitudeDegrees(matchLatDegree);
        this.enforceValidMinutes(matchLatMinutes);
        this.enforceValidSeconds(matchLatSeconds);
        this.enforceValidLongitudeDegrees(matchLonDegree);
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
            direction: latDegree < 0 ? 'S' : 'N',
        });
        const decimalLon = this.dmsToDecimal({
            degrees: Math.abs(lonDegree),
            minutes: lonMinutes,
            seconds: lonSeconds,
            direction: lonDegree < 0 ? 'W' : 'E',
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
