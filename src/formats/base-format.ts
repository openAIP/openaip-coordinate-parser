import { z } from 'zod';
import { isNumeric } from '../is-numeric.js';
import { DmsCoordinateSchema, type Coordinate, type DmsCoordinate } from '../types.js';
import { validateSchema } from '../validate-schema.js';

export const OptionsSchema = z
    .object({
        precision: z.number().optional(),
    })
    .strict()
    .optional()
    .describe('OptionsSchema');
export type Config = z.infer<typeof OptionsSchema>;

export interface IFormatParser {
    parse(coordinateString: string): Coordinate;
}

export class BaseFormat implements IFormatParser {
    precision: number;
    longitude: number | undefined;
    latitude: number | undefined;

    constructor(options?: Config) {
        validateSchema(options, OptionsSchema, { assert: true, name: 'config' });

        const defaultOptions = { precision: 3 };
        const { precision } = { ...defaultOptions, ...options };

        this.precision = precision;
    }

    parse(coordinateString: string): Coordinate {
        throw new Error('Method not implemented.');
    }

    static canParse(coordinateString: string): boolean {
        throw new Error('Method not implemented.');
    }

    /**
     * Enforces that a given input string is a valid longitude value. This means that the value is a
     * number and within the range of -180 to 180. If the value is not valid, the method throws an
     * error.
     */
    enforceValidLongitude(lonValue) {
        if (isNumeric(lonValue) === false) {
            throw new Error('longitude must be numeric');
        }
        const lon = parseFloat(lonValue);
        if (lon < -180 || lon > 180) {
            throw new Error('longitude must be within the range of -180 to 180');
        }
    }

    /**
     * Enforces that a given input string is a valid latitude value. This means that the value is a
     * number and within the range of -90 to 90. If the value is not valid, the method throws an
     */
    enforceValidLatitude(latValue) {
        if (isNumeric(latValue) === false) {
            throw new Error('latitude must be numeric');
        }
        const lat = parseFloat(latValue);
        if (lat < -90 || lat > 90) {
            throw new Error('latitude must be within the range of -90 to 90');
        }
    }

    /**
     * Enforces that a given input string does not contain a hyphen. If the value contains a hyphen,
     * the method throws an error.
     */
    enforceNoHyphen(coordinateString: string): void {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        if (coordinateString.includes('-')) {
            throw new Error('Coordinates must not contain a hyphen');
        }
    }

    /**
     * Converts DMS coordinate parts to a decimal value.
     */
    dmsToDecimal(dms: DmsCoordinate): number {
        validateSchema(dms, DmsCoordinateSchema, { assert: true, name: 'dms' });

        const { degrees, minutes, seconds, direction } = dms;

        // Calculate the decimal value
        let decimal =
            parseInt(degrees.toString()) +
            parseFloat(minutes.toString()) / 60 +
            (seconds ? parseFloat(seconds.toString()) / 3600 : 0);

        // Adjust for direction (North/East = positive, South/West = negative)
        if (direction === 'S' || direction === 'W') {
            decimal = -decimal;
        }

        return decimal;
    }

    /**
     * Resets the parser to its initial state.
     */
    reset(): void {
        this.latitude = undefined;
        this.longitude = undefined;
    }
}
