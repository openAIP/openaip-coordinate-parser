import { z } from 'zod';
import type { IFormatParser } from './formats/base-format.js';
import { DecimalSignedFormat } from './formats/decimal-signed-format.js';
import { DecimalSignedPrefixedHemisphereFormat } from './formats/decimal-signed-prefixed-hemisphere-format.js';
import { DecimalSignedSuffixedHemisphereFormat } from './formats/decimal-signed-suffixed-hemisphere-format.js';
import { DecimalUnsignedFormat } from './formats/decimal-unsigned-format.js';
import { DecimalUnsignedPrefixedHemisphereFormat } from './formats/decimal-unsigned-prefixed-hemisphere-format.js';
import { DecimalUnsignedSuffixedHemisphereFormat } from './formats/decimal-unsigned-suffixed-hemisphere-format.js';
import { DmUnsignedSuffixedHemisphereFormat } from './formats/dm-unsigned-suffixed-hemisphere-format.js';
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
    opts: Options;
    latitude: number | undefined;
    longitude: number | undefined;
    parsers: IFormatParser[];

    constructor(options?: Options) {
        validateSchema(options, OptionsSchema, { assert: true, name: 'options' });

        const defaultOptions = {
            precision: 3,
            extendFormatParsers: false,
        };
        const { precision, extendFormatParsers } = { ...defaultOptions, ...options };
        // set default format parsers to use if not provided
        const defaultParsers = [
            new DecimalUnsignedFormat({ precision: precision }),
            new DecimalSignedPrefixedHemisphereFormat({ precision: precision }),
            new DecimalUnsignedSuffixedHemisphereFormat({ precision: precision }),
            new DecimalSignedFormat({ precision: precision }),
            new DecimalUnsignedPrefixedHemisphereFormat({ precision: precision }),
            new DecimalSignedSuffixedHemisphereFormat({ precision: precision }),
            new DmUnsignedSuffixedHemisphereFormat({ precision: precision }),
        ];
        let formatParsers = options?.formatParsers || defaultParsers;
        if (formatParsers.length > 0 && extendFormatParsers === true) {
            formatParsers = [...defaultParsers, ...formatParsers];
        }
        this.opts = { precision: precision };
        this.latitude = undefined;
        this.longitude = undefined;
        this.parsers = formatParsers;
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
