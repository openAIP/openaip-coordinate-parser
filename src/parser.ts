import { z } from 'zod';
import type { IFormatParser } from './formats/base-format.js';
import { DecimalFormat } from './formats/decimal-format.js';
import { DecimalHemiFormat } from './formats/decimal-hemi-format.js';
import { DecimalSexaFormat } from './formats/decimal-sexa-format.js';
import { DecimalSexaHemiFormat } from './formats/decimal-sexa-hemi-format.js';
import { DmsDecimalMinFormat } from './formats/dms-decimal-min-format.js';
import type { Coordinate } from './types.js';
import { validateSchema } from './validate-schema.js';

export const OptionsSchema = z
    .object({
        precision: z.number().int().min(0).max(15),
        extendFormatParsers: z.boolean().optional(),
        formatParsers: z.array(z.any()).optional(),
    })
    .strict()
    .optional()
    .describe('OptionsSchema');

export type Options = {
    precision: number;
    // if true, the given format parsers will be appended to the default parsers instead of replacing them
    extendFormatParsers?: boolean;
    formatParsers?: IFormatParser[];
};

export class Parser {
    originalString: string;
    opts: Options;
    latitude: number | undefined;
    longitude: number | undefined;
    parsers: IFormatParser[];

    constructor(coordinateString: string, options?: Options) {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });
        validateSchema(options, OptionsSchema, { assert: true, name: 'options' });

        const defaultOptions = {
            precision: 3,
            extendFormatParsers: false,
        };
        const { precision, extendFormatParsers } = { ...defaultOptions, ...options };
        // set default format parsers to use if not provided
        const defaultParsers = [
            new DecimalFormat({ precision: precision }),
            new DecimalHemiFormat({ precision: precision }),
            new DecimalSexaFormat({ precision: precision }),
            new DecimalSexaHemiFormat({ precision: precision }),
            new DmsDecimalMinFormat({ precision: precision }),
        ];
        let formatParsers = options?.formatParsers || defaultParsers;
        if (formatParsers.length > 0 && extendFormatParsers === true) {
            formatParsers = [...defaultParsers, ...formatParsers];
        }
        this.originalString = coordinateString;
        this.opts = { precision: precision };
        this.latitude = undefined;
        this.longitude = undefined;
        this.parsers = formatParsers;

        try {
            const { longitude, latitude } = this.parse(coordinateString);
            this.longitude = longitude;
            this.latitude = latitude;
        } catch (err) {
            throw new Error(`Coordinate string "${coordinateString}" could not be parsed: ${err.message}`);
        }
    }

    parse(coordinateString: string): Coordinate {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        const parser = this.findParser(coordinateString);

        return parser.parse(coordinateString);
    }

    findParser(coordinateString: string): IFormatParser {
        validateSchema(coordinateString, z.string(), { assert: true, name: 'coordinateString' });

        // check if we have a parser that can parse the given string
        const parser = this.parsers.find((p) => (p.constructor as any).canParse(coordinateString));
        if (parser == null) {
            throw new Error('No parser found for the given coordinate string');
        }

        return parser;
    }

    getLatitude(): number | undefined {
        return this.latitude;
    }

    getLongitude(): number | undefined {
        return this.longitude;
    }

    /**
     * Resets the parser to its initial state.
     */
    reset(): void {
        this.latitude = undefined;
        this.longitude = undefined;
        this.parsers.forEach((p) => p.reset());
    }
}
