import checkTypes from 'check-types';
import { DecimalFormat } from './formats/decimal-format.js';
import { DecimalHemiFormat } from './formats/decimal-hemi-format.js';
import { DecimalSexaFormat } from './formats/decimal-sexa-format.js';

export class Parser {
    /**
     * @param {string} coordinateString
     * @param {import('./types').openaip.ParserOptions} [options]
     */
    constructor(coordinateString, options) {
        const defaultOptions = {};
        const opts = { ...defaultOptions, ...options };

        if (checkTypes.nonEmptyString(coordinateString) === false) {
            throw new Error('coordinateString must be a non-empty string');
        }
        if (options != null && checkTypes.object(options) === false) {
            throw new Error('options must be an object');
        }

        /** @type {string} */
        this.originalString = coordinateString;
        /** @type import('./types').openaip.ParserOptions */
        this.opts = opts;
        /** @type {number|null} */
        this.latitude = null;
        /** @type {number|null} */
        this.longitude = null;
        /** @type {import('./types').openaip.FormatParser.Parser[]} */
        this.parsers = [
            new DecimalFormat(this.opts),
            new DecimalHemiFormat(this.opts),
            new DecimalSexaFormat(this.opts),
        ];

        try {
            const { longitude, latitude } = this.parse(coordinateString);
            this.longitude = longitude;
            this.latitude = latitude;
        } catch (err) {
            throw new Error(`Coordinate string "${coordinateString}" could not be parsed: ${err.message}`);
        }
    }

    /**
     * @param {string} coordinateString
     * @return {import('./types').openaip.CoordinateParser}
     */
    parse(coordinateString) {
        const parser = this.findParser(coordinateString);

        return parser.parse(coordinateString);
    }

    /**
     * @param {string} coordinateString
     * @return {import('./types').openaip.CoordinateParser}
     */
    findParser(coordinateString) {
        // check if we have a parser that can parse the given string
        const parser = this.parsers.find((p) => p.constructor.canParse(coordinateString));
        if (parser == null) {
            throw new Error('No parser found for the given coordinate string');
        }

        return parser;
    }

    /**
     * @returns {number}
     */
    getLatitude() {
        return this.latitude;
    }

    /**
     * @returns {number}
     */
    getLongitude() {
        return this.longitude;
    }

    /**
     * Resets the parser to its initial state.
     *
     * @returns {void}
     */
    reset() {
        this.latitude = null;
        this.longitude = null;
        this.parsers.forEach((p) => p.reset());
    }
}
