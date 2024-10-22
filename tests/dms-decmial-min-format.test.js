import { describe, expect, it } from 'vitest';
import { DmsDecimalMinFormat } from '../src/formats/dms-decimal-min-format.js';

describe('constructor', () => {
    it('throws an error if options is not an object', () => {
        expect(() => new DmsDecimalMinFormat('')).toThrow('options must be an object');
    });

    it('throws an error if precision is not a number', () => {
        expect(() => new DmsDecimalMinFormat({ precision: '3' })).toThrow('precision must be a number');
    });
});
describe('canParse', () => {
    it('returns true for valid decimal format', () => {
        expect(DmsDecimalMinFormat.canParse('4007.38N7407.38W')).toBe(true);
    });

    it("returns true for valid decimal format '4007.38N 7407.38W' with space", () => {
        expect(DmsDecimalMinFormat.canParse('4007.38N 7407.38W')).toBe(true);
    });

    it("returns false for invalid decimal format '4007.38N740738W'", () => {
        expect(DmsDecimalMinFormat.canParse('4007.38N740738W')).toBe(false);
    });

    it("returns false for invalid decimal format '4007.38N7407.38P'", () => {
        expect(DmsDecimalMinFormat.canParse('4007.38N7407.38P')).toBe(false);
    });

    it("returns false for invalid decimal format '4007.38N7407.38 '", () => {
        expect(DmsDecimalMinFormat.canParse('4007.38N7407.38 ')).toBe(false);
    });
});
describe('parse', () => {
    it('throws an error if coordinateString is not a non-empty string', () => {
        const formatParser = new DmsDecimalMinFormat();
        expect(() => formatParser.parse('')).toThrow('coordinateString must be a non-empty string');
    });

    it('throws an error if latitude is out of bounds', () => {
        const formatParser = new DmsDecimalMinFormat();
        expect(() => formatParser.parse('9107.38N7407.38W')).toThrow('latitude must be within the range of -90 to 90');
    });

    it('throws an error if string contains hyphen', () => {
        const formatParser = new DmsDecimalMinFormat();
        expect(() => formatParser.parse('-3407.38N7407.38W')).toThrow('Invalid coordinate string');
    });

    it('throws an error if longitude is out of bounds', () => {
        const formatParser = new DmsDecimalMinFormat();
        expect(() => formatParser.parse('4007.38N27407.38W')).toThrow(
            'longitude must be within the range of -180 to 180',
        );
    });

    it('throws an error if longitude is out of bounds negative ', () => {
        const formatParser = new DmsDecimalMinFormat();
        expect(() => formatParser.parse('4007.38N 27407.38W')).toThrow(
            'longitude must be within the range of -180 to 180',
        );
    });

    it("returns the correct latitude and longitude for '4007N 7407W'", () => {
        const formatParser = new DmsDecimalMinFormat();
        const result = formatParser.parse('4007N 7407W');
        expect(result.latitude).toBe(40.117);
        expect(result.longitude).toBe(-74.117);
    });

    it("returns the correct latitude and longitude for '4007.38N 7407.38W'", () => {
        const formatParser = new DmsDecimalMinFormat();
        const result = formatParser.parse('4007.38N 7407.38W');
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it("returns the correct latitude and longitude for '4007.38N7407.38W'", () => {
        const formatParser = new DmsDecimalMinFormat();
        const result = formatParser.parse('4007.38N7407.38W');
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it("returns the correct latitude and longitude for '4007.38  N 7407.38  W'", () => {
        const formatParser = new DmsDecimalMinFormat();
        const result = formatParser.parse('4007.38  N 7407.38  W');
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it("returns the correct latitude and longitude for '4007.3812342N 7407.38123W' with precision 4", () => {
        const formatParser = new DmsDecimalMinFormat({ precision: 4 });
        const result = formatParser.parse('4007.3812342N 7407.38123W');
        expect(result.latitude).toBe(40.1231);
        expect(result.longitude).toBe(-74.1231);
    });
});
