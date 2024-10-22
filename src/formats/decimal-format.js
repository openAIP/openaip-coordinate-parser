import checkTypes from 'check-types';
import { isNumeric } from '../is-numeric.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^(-?\d{1,2}(\.\d+)?)\s*[,\s]\s*(-?\d{1,3}(\.\d+)?)$/;

/**
 * Parses coordinates strings in decimal format. Coordinate ordering is always latitude, longitude.
 *
 * Supported formats:
 *
 * 10, 12
 * 1.234, 5.678
 * 1.234,5.678
 * 1.234 5.678
 */
export class DecimalFormat extends BaseFormat {
    /**
     * @param {import('../types').openaip.FormatParserOptions} [options]
     * @param {number} [options.precision] - The number of decimal places to round to. Default is 3.
     */
    constructor(options) {
        super(options);
    }

    /**
     * @param {string} coordinateString
     * @return {import('../types').openaip.CoordinateParser.Coordinate}
     */
    parse(coordinateString) {
        if (checkTypes.nonEmptyString(coordinateString) === false) {
            throw new Error('coordinateString must be a non-empty string');
        }
        if (DecimalFormat.canParse(coordinateString) === false) {
            throw new Error('Invalid coordinate string');
        }

        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const latitude = match[1];
        const longitude = match[3];
        if (isNumeric(latitude) === false || isNumeric(longitude) === false) {
            throw new Error('Invalid coordinate string');
        }

        // enforce valid latitude
        this.enforceValidLatitude(latitude);
        // enforce valid longitude
        this.enforceValidLongitude(longitude);

        const lat = parseFloat(latitude).toFixed(this.precision);
        const lon = parseFloat(longitude).toFixed(this.precision);

        return {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
        };
    }

    /**
     * @param {string} coordinateString
     * @return {boolean}
     */
    static canParse(coordinateString) {
        return REGEX.test(coordinateString);
    }
}
