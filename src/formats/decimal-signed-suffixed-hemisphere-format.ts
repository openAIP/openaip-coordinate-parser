import { z } from 'zod';
import { isNumeric } from '../is-numeric.js';
import type { Coordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { AbstractDecimalHemisphereFormat } from './abstract-decimal-hemisphere-format.js';
import type { Hemisphere } from './base-format.js';

const REGEX = /^(-?\d{1,2}(\.\d+)?)\s*(°)\s*([NS])\s*[, ]?\s*(-?\d{1,3}(\.\d+)?)\s*(°)\s*([EW])$/;

/**
 * Supported formats:
 *
 * 1.234° N 5.678° E
 * 1.234° N, 5.678° E
 * 1.234°N,5.678°E
 * 1.234°N5.678°E
 * ... and additional variants with spaces and comma.
 */
export class DecimalSignedSuffixedHemisphereFormat extends AbstractDecimalHemisphereFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DecimalSignedSuffixedHemisphereFormat.canParse(coordinateString) === false) {
            throw new Error('Invalid coordinate string');
        }
        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const latitude = match[1];
        const latitudeDirection = match[4];
        const longitude = match[5];
        const longitudeDirection = match[8];

        if (
            isNumeric(latitude) === false ||
            isNumeric(longitude) === false ||
            ['N', 'S'].includes(latitudeDirection) === false ||
            ['E', 'W'].includes(longitudeDirection) === false
        ) {
            throw new Error('Invalid coordinate string');
        }

        this.enforceValidLatitude(latitude);
        this.enforceValidLongitude(longitude);
        const lat = parseFloat(parseFloat(latitude).toFixed(this.precision));
        const lon = parseFloat(parseFloat(longitude).toFixed(this.precision));

        return {
            latitude: this.toDecimal(lat, latitudeDirection as Hemisphere),
            longitude: this.toDecimal(lon, longitudeDirection as Hemisphere),
        };
    }

    static canParse(coordinateString: string): boolean {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        return REGEX.test(coordinateString);
    }
}
