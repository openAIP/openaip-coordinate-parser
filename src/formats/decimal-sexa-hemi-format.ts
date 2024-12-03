import { z } from 'zod';
import { isNumeric } from '../is-numeric.js';
import type { Coordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^(-?\d{1,2}(\.\d+)?)\s*(°)\s*([NS])\s*[, ]?\s*(-?\d{1,3}(\.\d+)?)\s*(°)\s*([EW])$/;

/**
 * Parses coordinates strings in decimal format with sexagesimal/hemisphere notation. Coordinate ordering is
 * always latitude, longitude.
 *
 * Supported formats:
 *
 * 1.234° N 5.678° E
 * 1.234° N, 5.678° E
 * 1.234°N,5.678°E
 * 1.234°N5.678°E
 */
export class DecimalSexaHemiFormat extends BaseFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DecimalSexaHemiFormat.canParse(coordinateString) === false) {
            throw new Error('Invalid coordinate string');
        }
        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const latitude = match[1];
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
