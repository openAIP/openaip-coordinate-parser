import { z } from 'zod';
import { isNumeric } from '../is-numeric.js';
import {
    type Coordinate,
    type DmCoordinate,
    DmCoordinateSchema,
    type DmsCoordinate,
    DmsCoordinateSchema,
} from '../types.js';
import { validateSchema } from '../validate-schema.js';

export type Hemisphere = 'N' | 'S' | 'E' | 'W';

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
    reset(): void;
}

export class BaseFormat implements IFormatParser {
    precision: number;
    longitude: number | undefined;
    latitude: number | undefined;

    constructor(options?: Config) {
        validateSchema(options, OptionsSchema, { assert: true, name: 'config' });

        const defaultOptions = { precision: 5 };
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
    enforceValidLongitude(lonValue: any): void {
        if (isNumeric(lonValue) === false) {
            throw new Error('longitude must be numeric');
        }
        const lon = parseFloat(lonValue);
        if (lon < -180 || lon > 180) {
            throw new Error('longitude must be within the range of -180 to 180');
        }
    }

    enforceValidLatitudeDegrees(degrees: any, signed = true): void {
        if (isNumeric(degrees) === false) {
            throw new Error('degrees must be numeric');
        }
        const deg = Number.parseFloat(degrees.toString());
        if (signed) {
            if (deg < -90 || deg > 90) {
                throw new Error('latitude degrees must be within the range of -90 to 90');
            }
        } else {
            if (deg < 0 || deg > 90) {
                throw new Error('latitude degrees must be within the range of 0 to 90');
            }
        }
    }

    enforceValidLongitudeDegrees(degrees: any, signed = true): void {
        if (isNumeric(degrees) === false) {
            throw new Error('degrees must be numeric');
        }
        const deg = Number.parseFloat(degrees.toString());
        if (signed) {
            if (deg < -180 || deg > 180) {
                throw new Error('longitude degrees must be within the range of -180 to 180');
            }
        } else {
            if (deg < 0 || deg > 180) {
                throw new Error('longitude degrees must be within the range of 0 to 180');
            }
        }
    }

    enforceValidMinutes(minutes: any): void {
        if (isNumeric(minutes) === false) {
            throw new Error('minutes must be numeric');
        }
        const min = Number.parseFloat((minutes as any).toString());
        if (min < 0 || min > 59) {
            throw new Error('minutes must be within the range of 0 to 59');
        }
    }

    enforceValidSeconds(seconds: any): void {
        if (isNumeric(seconds) === false) {
            throw new Error('seconds must be numeric');
        }
        const sec = Number.parseFloat(seconds.toString());
        if (sec < 0 || sec > 59) {
            throw new Error('seconds must be within the range of 0 to 59');
        }
    }

    /**
     * Enforces that a given input string is a valid latitude value. This means that the value is a
     * number and within the range of -90 to 90. If the value is not valid, the method throws an
     */
    enforceValidLatitude(latValue: any): void {
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
    enforceNoHyphen(coordinateString: any): void {
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
            Number.parseInt(degrees.toString()) +
            Number.parseFloat(minutes.toString()) / 60 +
            Number.parseFloat(seconds.toString()) / 3600;

        // Adjust for direction (North/East = positive, South/West = negative)
        if (direction === 'S' || direction === 'W') {
            decimal = -decimal;
        }

        return decimal;
    }

    /**
     * Converts DM coordinate parts i.e. degrees and decimal minutes to a decimal value.
     */
    dmToDecimal(dm: DmCoordinate): number {
        validateSchema(dm, DmCoordinateSchema, { assert: true, name: 'dm' });

        const { degrees, minutes, direction } = dm;
        // Calculate the decimal value
        let decimal = Number.parseInt(degrees.toString()) + Number.parseFloat(minutes.toString()) / 60;
        // Adjust for direction (North/East = positive, South/West = negative)
        if (direction === 'S' || direction === 'W') {
            decimal = -decimal;
        }

        return decimal;
    }

    /**
     * Resets the parser to its initial state.
     */
    reset(): void {}
}
