import { z } from 'zod';
import type { Coordinate, DmsCoordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^([NS]\s*\d{3,4}(\.\d+)?\s*)\s*([EW]\s*\d{3,5}(\.\d+)?\s*)$/;

/**
 * Parses coordinates strings in DM format with decimal minutes.
 *
 * Supported formats:
 *
 * N4007 W7407
 * N4007.38W7407.38
 * N 4007.38 W 7407.38
 * N4007.38 W7407.38
 */
export class DmUnsignedPrefixedHemisphereFormat extends BaseFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DmUnsignedPrefixedHemisphereFormat.canParse(coordinateString) === false) {
            throw new Error('Invalid coordinate string');
        }
        this.enforceNoHyphen(coordinateString);
        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const latitude = match[1];
        const longitude = match[3];
        // to DMS
        const dmsLat = this.toDms(latitude.replace(/\s/g, ''));
        const dmsLon = this.toDms(longitude.replace(/\s/g, ''));
        // DMS to decimal
        const decimalLat = this.dmsToDecimal(dmsLat);
        const decimalLon = this.dmsToDecimal(dmsLon);
        this.enforceValidLatitude(decimalLat);
        this.enforceValidLongitude(decimalLon);
        const lat = decimalLat.toFixed(this.precision);
        const lon = decimalLon.toFixed(this.precision);

        return {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
        };
    }

    /**
     * Converts a DMS notation coordinate like "4007.38N" to DMS parts.
     */
    toDms(value: string): DmsCoordinate {
        validateSchema(value, z.string(), { assert: true, name: 'value' });

        const match = value.match(/^([NSWE])(\d{2,3})(\d{2})(\.\d+)?$/);
        if (match) {
            return {
                degrees: parseInt(match[2], 10),
                minutes: parseInt(match[3], 10),
                seconds: Math.round(60 * parseFloat(`0${match[4]}`)),
                direction: match[1],
            };
        } else {
            throw new Error('Invalid coordinate string');
        }
    }

    static canParse(coordinateString: string): boolean {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        return REGEX.test(coordinateString);
    }
}
