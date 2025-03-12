import { z } from 'zod';
import { isNumeric } from '../is-numeric.js';
import type { Coordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^([NS])\s*(-?\d{1,2}(\.\d+)?)\s*[, ]?\s*([EW])\s*(-?\d{1,3}(\.\d+)?)\s*$/;

/**
 * Supported formats:
 *
 * N12,E56
 * N 12.234 E 56.678
 * N 12.234, E 56.678
 * N12.234,E56.678
 * N12.234E56.678
 * ... and additional variants with spaces and comma.
 */
export class DecimalUnsignedPrefixedHemisphereFormat extends BaseFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DecimalUnsignedPrefixedHemisphereFormat.canParse(coordinateString) === false) {
            throw new Error('Invalid coordinate string');
        }
        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const latitude = match[2];
        const longitude = match[5];
        if (isNumeric(latitude) === false || isNumeric(longitude) === false) {
            throw new Error('Invalid coordinate string');
        }

        this.enforceValidLatitude(latitude);
        this.enforceValidLongitude(longitude);
        const lat = parseFloat(latitude).toFixed(this.precision);
        const lon = parseFloat(longitude).toFixed(this.precision);

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
