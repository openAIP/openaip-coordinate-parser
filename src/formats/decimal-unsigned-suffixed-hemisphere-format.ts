import { z } from 'zod';
import { isNumeric } from '../is-numeric.js';
import type { Coordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { AbstractDecimalHemisphereFormat } from './abstract-decimal-hemisphere-format.js';
import type { Hemisphere } from './base-format.js';

const REGEX = /^(-?\d{1,2}(\.\d+)?)\s*([NS])\s*[, ]?\s*(-?\d{1,3}(\.\d+)?)\s*([EW])$/;

/**
 * Supported formats:
 *
 * 12N,56E
 * 12.234 N 56.678 E
 * 12.234 N, 56.678 E
 * 12.234N,56.678E
 * 12.234N56.678E
 * ... and additional variants with spaces and comma.
 */
export class DecimalUnsignedSuffixedHemisphereFormat extends AbstractDecimalHemisphereFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DecimalUnsignedSuffixedHemisphereFormat.canParse(coordinateString) === false) {
            throw new Error('Invalid coordinate string');
        }
        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const latitude = match[1];
        const latitudeDirection = match[3];
        const longitude = match[4];
        const longitudeDirection = match[6];

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
