import { z } from 'zod';
import type { Coordinate, DmsCoordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^([NS]\s*\d+:\d+(\.\d+)?)\s*([EW]\s*\d+:\d+(\.\d+)?)$/;

/**
 * Supported formats:
 *
 * N40:07 W74:07
 * N40:07.38W74:07.38
 * N 40:07.38 W 74:07.38
 * N40:07.38 W74:07.38
 * ... and additional variants with spaces and comma.
 */
export class DmUnsignedDelimitedPrefixedHemisphereFormat extends BaseFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DmUnsignedDelimitedPrefixedHemisphereFormat.canParse(coordinateString) === false) {
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
     * Converts a DM notation coordinate like "4007.38N" to DMS parts.
     */
    toDms(value: string): DmsCoordinate {
        validateSchema(value, z.string(), { assert: true, name: 'value' });

        const match = value.match(/^([NSWE])(\d{2,3}):(\d{2})(\.\d+)?$/);
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
