import { z } from 'zod';
import type { Coordinate, DmsCoordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^(\d+:\d+(\.\d+)?\s*[NS])\s*(\d+:\d+(\.\d+)?\s*[EW])$/;

/**
 * Supported formats:
 *
 * 40:07N 74:07W
 * 40:07.38N74:07.38W
 * 40:07.38 N 74:07.38 W
 * 40:07.38N 74:07.38W
 * ... and additional variants with spaces and comma.
 */
export class DmUnsignedDelimitedSuffixedHemisphereFormat extends BaseFormat {
    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (DmUnsignedDelimitedSuffixedHemisphereFormat.canParse(coordinateString) === false) {
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

        const match = value.match(/^(\d{2,3}):(\d{2})(\.\d+)?\s*([NSWE])$/);
        if (match) {
            let degrees = parseInt(match[1], 10);
            let minutes = parseInt(match[2], 10);
            let seconds = Math.round(60 * parseFloat(`0${match[3]}`));
            const direction = match[4] as 'N' | 'S';

            /*
            Due to rounding, minutes or seconds may be rounded to 60 which is tecnically correct but
            wrong as notation. Increment higher unit value by 1 if either seconds or minutes are 60.
            */
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            if (minutes === 60) {
                degrees++;
                minutes = 0;
            }

            return { degrees, minutes, seconds, direction };
        } else {
            throw new Error('Invalid coordinate string');
        }
    }

    static canParse(coordinateString: string): boolean {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        return REGEX.test(coordinateString);
    }
}
