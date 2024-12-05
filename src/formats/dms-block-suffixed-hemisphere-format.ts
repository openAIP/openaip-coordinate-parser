import { z } from 'zod';
import type { Coordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^(\d{2})(\d{2})(\d{2}(\.\d+)?)\s*([NS])\s*,?\s*(\d{3})(\d{2})(\d{2}(\.\d+)?)\s*([EW])$/;

/**
 * Supported formats:
 *
 * 044506N 1030342E
 * 044506N1030342E
 * 044506.123N 1030342.123E
 */
export class DmsBlockSuffixedHemisphereFormat extends BaseFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DmsBlockSuffixedHemisphereFormat.canParse(coordinateString) === false) {
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
        const matchLatDirection = match[5];
        const matchLonDegree = match[6];
        const matchLonMinutes = match[7];
        const matchLonSeconds = match[8];
        const matchLonDirection = match[10];

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
