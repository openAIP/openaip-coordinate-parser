import { z } from 'zod';
import type { Coordinate, DmCoordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^(\d{3,4}(\.\d+)?\s*[NS])\s*(\d{3,5}(\.\d+)?\s*[EW])$/;

/**
 * Supported formats:
 *
 * 4007N 7407W
 * 4007.38N7407.38W
 * 4007.38 N 7407.38 W
 * 4007.38N 7407.38W
 * ... and additional variants with spaces and comma.
 */
export class DmUnsignedSuffixedHemisphereFormat extends BaseFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DmUnsignedSuffixedHemisphereFormat.canParse(coordinateString) === false) {
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
        // to DM
        const dmLat = this.toDm(latitude.replace(/\s/g, ''));
        const dmLon = this.toDm(longitude.replace(/\s/g, ''));
        // DM to decimal
        const decimalLat = this.dmToDecimal(dmLat);
        const decimalLon = this.dmToDecimal(dmLon);
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
     * Converts a DM notation coordinate like "4007.38N" to DM parts i.e. degrees and decimal minutes.
     */
    toDm(value: string): DmCoordinate {
        validateSchema(value, z.string(), { assert: true, name: 'value' });

        const match = value.match(/^(\d{2,3})(\d{2})(\.\d+)?([NSWE])$/);
        if (match) {
            return {
                degrees: parseInt(match[1], 10),
                minutes: parseInt(match[2], 10) + parseFloat(`0${match[3]}`),
                direction: match[4] as 'N' | 'S',
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
