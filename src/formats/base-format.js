import checkTypes from 'check-types';

// default catch-all
const REGEX = /.*/;

export class BaseFormat {
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
     * @param {string} coordinateString
     * @return {boolean}
     */
    static canParse(coordinateString) {
        throw new Error('Not implemented');
    }

    /**
     * Enforces that a given input string is a valid longitude value. This means that the value is a
     * number and within the range of -180 to 180. If the value is not valid, the method throws an
     * error.
     *
     * @param {string} lonValue
     * @return {void}
     */
    enforceValidLongitude(lonValue) {
        if (checkTypes.nonEmptyString(lonValue) === false) {
            throw new Error('longitude must be a non-empty string');
        }

        const lon = parseFloat(lonValue);
        if (checkTypes.number(lon) === false) {
            throw new Error('longitude must be a number');
        }
        if (lon < -180 || lon > 180) {
            throw new Error('longitude must be within the range of -180 to 180');
        }
    }

    /**
     * Enforces that a given input string is a valid latitude value. This means that the value is a
     * number and within the range of -90 to 90. If the value is not valid, the method throws an
     *
     * @param {string} latValue
     * @return {void}
     */
    enforceValidLatitude(latValue) {
        if (checkTypes.nonEmptyString(latValue) === false) {
            throw new Error('latitude must be a non-empty string');
        }

        const lat = parseFloat(latValue);
        if (checkTypes.number(lat) === false) {
            throw new Error('latitude must be a number');
        }
        if (lat < -90 || lat > 90) {
            throw new Error('latitude must be within the range of -90 to 90');
        }
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
