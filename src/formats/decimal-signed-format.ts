import { z } from 'zod';
import { isNumeric } from '../is-numeric.js';
import type { Coordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^(-?\d{1,2}(\.\d+)?)\s*(°)\s*[, ]\s*(-?\d{1,3}(\.\d+)?)\s*(°)$/;

/**
 * Parses coordinates strings in decimal format with sexagesimal notation. Coordinate ordering is
 * always latitude, longitude.
 *
 * Supported formats:
 *
 * 1.234° 5.678°
 * 1.234°, 5.678°
 * 1.234°,5.678°
 */
export class DecimalSignedFormat extends BaseFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DecimalSignedFormat.canParse(coordinateString) === false) {
            throw new Error('Invalid coordinate string');
        }
        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const latitude = match[1];
        const longitude = match[4];
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
