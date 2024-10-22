import checkTypes from 'check-types';
import { isNumeric } from '../is-numeric.js';

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
     * Enforces that a given input string is a valid longitude value. This means that the value is a
     * number and within the range of -180 to 180. If the value is not valid, the method throws an
     * error.
     *
     * @param {string|number} lonValue
     * @return {void}
     */
    enforceValidLongitude(lonValue) {
        if (isNumeric(lonValue) === false) {
            throw new Error('longitude must be numeric');
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
     * @param {string|number} latValue
     * @return {void}
     */
    enforceValidLatitude(latValue) {
        if (isNumeric(latValue) === false) {
            throw new Error('latitude must be numeric');
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
     * Enforces that a given input string does not contain a hyphen. If the value contains a hyphen,
     * the method throws an error.
     *
     * @param {string} coordinateString
     * @return {void}
     */
    enforceNoHyphen(coordinateString) {
        if (coordinateString.includes('-')) {
            throw new Error('Coordinates must not contain a hyphen');
        }
    }

    /**
     * Converts DMS coordinate parts to a decimal value.
     *
     * @param {import('../types').openaip.CoordinateParser.DmsCoordinate} dms
     * @return {number} - The decimal value.
     */
    dmsToDecimal(dms) {
        if (checkTypes.nonEmptyObject(dms) === false) {
            throw new Error('dms must be an non-empty object');
        }

        const { degrees, minutes, seconds, direction } = dms;

        if (checkTypes.number(degrees) === false) {
            throw new Error('degrees must be a number');
        }
        if (checkTypes.number(minutes) === false) {
            throw new Error('minutes must be a number');
        }
        if (checkTypes.number(seconds) === false) {
            throw new Error('seconds must be a number');
        }
        if (checkTypes.nonEmptyString(direction) === false) {
            throw new Error('direction must be a non-empty string');
        }

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
     *
     * @return {void}
     */
    reset() {
        this.latitude = null;
        this.longitude = null;
    }
}
