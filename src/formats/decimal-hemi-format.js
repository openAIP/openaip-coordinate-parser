import checkTypes from 'check-types';
import { isNumeric } from '../is-numeric.js';
import { BaseFormat } from './base-format.js';

const REGEX = /^(-?\d{1,2}(\.\d+)?)\s*([NS])\s*[, ]?\s*(-?\d{1,3}(\.\d+)?)\s*([EW])$/;

/**
 * Parses coordinates strings in decimal format with hemisphere notations. Coordinate ordering is
 * always latitude, longitude.
 *
 * Supported formats:
 *
 * 12N,56E
 * 12.234 N 56.678 E
 * 12.234 N, 56.678 E
 * 12.234N,56.678E
 * 12.234N56.678E
 */
export class DecimalHemiFormat extends BaseFormat {
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
        if (DecimalHemiFormat.canParse(coordinateString) === false) {
            throw new Error('Invalid coordinate string');
        }

        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const latitude = match[1];
        const longitude = match[4];
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
