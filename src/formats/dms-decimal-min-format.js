import checkTypes from 'check-types';
import { BaseFormat } from './base-format.js';

const REGEX = /^(\d{3,4}(\.\d+)?\s*[NS])\s*(\d{3,5}(\.\d+)?\s*[EW])$/;

/**
 * Parses coordinates strings in DMS format with decimal minutes.
 *
 * Supported formats:
 *
 * 4007N 7407W
 * 4007.38N7407.38W
 * 4007.38 N 7407.38 W
 * 4007.38N 7407.38W
 */
export class DmsDecimalMinFormat extends BaseFormat {
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
        if (DmsDecimalMinFormat.canParse(coordinateString) === false) {
            throw new Error('Invalid coordinate string');
        }
        this.enforceNoHyphen(coordinateString);

        // use the regex to parse the latitude and longitude
        const match = coordinateString.match(REGEX);
        if (match == null) {
            throw new Error('Invalid coordinate string');
        }
        const latitude = match[1];
        const longitude = match[3];
        // to DMS
        const dmsLat = this.toDms(latitude.replace(/\s/g, ''));
        const dmsLon = this.toDms(longitude.replace(/\s/g, ''));
        // DMS to decimal
        const decimalLat = this.dmsToDecimal(dmsLat);
        const decimalLon = this.dmsToDecimal(dmsLon);
        // enforce valid latitude
        this.enforceValidLatitude(decimalLat);
        // enforce valid longitude
        this.enforceValidLongitude(decimalLon);

        const lat = decimalLat.toFixed(this.precision);
        const lon = decimalLon.toFixed(this.precision);

        return {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
        };
    }

    /**
     * Converts a DMS notation coordinate like "4007.38N" to DMS parts.
     *
     * @param {string} value - The parsed DMS value, e.g. "4007.38N" or "74007.38W"
     * @return {import('../types').openaip.CoordinateParser.DmsCoordinate}
     */
    toDms(value) {
        if (checkTypes.nonEmptyString(value) === false) {
            throw new Error('value must be a non-empty string');
        }

        const match = value.match(/^(\d{2,3})(\d{2})(\.\d+)?([NSWE])$/);
        if (match) {
            return {
                degrees: parseInt(match[1], 10),
                minutes: parseInt(match[2], 10),
                seconds: Math.round(60 * parseFloat(`0${match[3]}`)),
                direction: match[4],
            };
        } else {
            throw new Error('Invalid coordinate string');
        }
    }

    /**
     * @param {string} coordinateString
     * @return {boolean}
     */
    static canParse(coordinateString) {
        return REGEX.test(coordinateString);
    }
}
