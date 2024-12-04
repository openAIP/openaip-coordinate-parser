import { z } from 'zod';
import { isNumeric } from '../is-numeric.js';
import type { Coordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^([NS])\s*(-?\d{1,2}(\.\d+)?)\s*(°)\s*[, ]?\s*([EW])\s*(-?\d{1,3}(\.\d+)?)\s*(°)\s*$/;

/**
 * Parses coordinates strings in decimal format with sexagesimal/hemisphere notation. Coordinate ordering is
 * always latitude, longitude.
 *
 * Supported formats:
 *
 * N 12° E 5°
 * N 1.234° E 5.678°
 * N 1.234°, E 5.678°
 * N 1.234°,E5.678°
 * N1.234°E5.678°
 */
export class DecimalSignedPrefixedHemisphereFormat extends BaseFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DecimalSignedPrefixedHemisphereFormat.canParse(coordinateString) === false) {
            throw new Error('Invalid coordinate string');
        }
        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const latitude = match[2];
        const longitude = match[6];
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
