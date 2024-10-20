import checkTypes from 'check-types';
import { isNumeric } from '../is-numeric.js';

const REGEX = /(-?\d+\.\d+)\s*[,\s]\s*(-?\d+\.\d+)/;

/**
 * Parses coordinates strings in decimal format. Coordinate ordering is always latitude, longitude.
 */
export class DecimalFormat {
    /**
     * @param {import('../types').openaip.FormatParserOptions} [options]
     * @param {number} [options.precision] - The number of decimal places to round to. Default is 3.
     */
    constructor(options) {
        const defaultOptions = { precision: 3 };
        const { precision } = { ...defaultOptions, ...options };

        if (options != null && checkTypes.object(options) === false) {
            throw new Error('options must be an object');
        }
        if (checkTypes.number(precision) === false) {
            throw new Error('precision must be a number');
        }

        /** @type {number} */
        this.precision = precision;
        /** @type {number|null} */
        this.longitude = null;
        /** @type {number|null} */
        this.latitude = null;
    }

    /**
     * Checks if the given decimal strings can be parsed by this parser.
     *
     * Supported formats:
     *
     * 1.234, 5.678
     * 1.234 5.678
     *
     * @param {string} coordinateString
     * @return {boolean}
     */
    static canParse(coordinateString) {
        return REGEX.test(coordinateString);
    }

    /**
     * @param {string} coordinateString
     * @return {import('../types').openaip.CoordinateParser.Coordinate}
     */
    parse(coordinateString) {
        if (checkTypes.nonEmptyString(coordinateString) === false) {
            throw new Error('coordinateString must be a non-empty string');
        }

        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const [, latitude, longitude] = match;

        if (isNumeric(latitude) === false || isNumeric(longitude) === false) {
            throw new Error('Invalid coordinate string');
        }

        const lat = parseFloat(latitude).toFixed(this.precision);
        const lon = parseFloat(longitude).toFixed(this.precision);

        return {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
        };
    }

    /**
     * Resets the parser to its initial state.
     *
     * @return {void}
     */
    reset() {
        this.latitude = null;
        this.longitude = null;
    }
}
