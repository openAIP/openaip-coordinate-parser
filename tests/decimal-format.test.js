import { describe, expect, it } from 'vitest';
import { DecimalFormat } from '../src/formats/decimal-format.js';

describe('constructor', () => {
    it('throws an error if options is not an object', () => {
        expect(() => new DecimalFormat('')).toThrow('options must be an object');
    });

    it('throws an error if precision is not a number', () => {
        expect(() => new DecimalFormat({ precision: '3' })).toThrow('precision must be a number');
    });
});
describe('canParse', () => {
    it('returns true for valid decimal format', () => {
        expect(DecimalFormat.canParse('1.234, 5.678')).toBe(true);
    });

    it('returns false for invalid decimal format', () => {
        expect(DecimalFormat.canParse('1.234N 5.678E')).toBe(false);
    });
});
describe('parse', () => {
    it('throws an error if coordinateString is not a non-empty string', () => {
        const formatParser = new DecimalFormat();
        expect(() => formatParser.parse('')).toThrow('coordinateString must be a non-empty string');
    });

    it('throws an error if latitude is invalid string', () => {
        const formatParser = new DecimalFormat();
        expect(() => formatParser.parse('291.234, 5.678')).toThrow('Invalid coordinate string');
    });

    it('throws an error if longitude is invalid string', () => {
        const formatParser = new DecimalFormat();
        expect(() => formatParser.parse('65.234, 1325.678')).toThrow('Invalid coordinate string');
    });

    it('throws an error if latitude is out of bounds', () => {
        const formatParser = new DecimalFormat();
        expect(() => formatParser.parse('91.234, 5.678')).toThrow('latitude must be within the range of -90 to 90');
    });

    it('throws an error if latitude is out of bounds negative', () => {
        const formatParser = new DecimalFormat();
        expect(() => formatParser.parse('-91.234 5.678')).toThrow('latitude must be within the range of -90 to 90');
    });

    it('throws an error if longitude is out of bounds', () => {
        const formatParser = new DecimalFormat();
        expect(() => formatParser.parse('1.234, 181.678')).toThrow('longitude must be within the range of -180 to 180');
    });

    it('throws an error if longitude is out of bounds negative', () => {
        const formatParser = new DecimalFormat();
        expect(() => formatParser.parse('1.234 -181.678')).toThrow('longitude must be within the range of -180 to 180');
    });

    it("returns the correct latitude and longitude for '10, 13'", () => {
        const formatParser = new DecimalFormat();
        const result = formatParser.parse('10, 13');
        expect(result.latitude).toBe(10);
        expect(result.longitude).toBe(13);
    });

    it("returns the correct latitude and longitude for '1.234, 5.678'", () => {
        const formatParser = new DecimalFormat();
        const result = formatParser.parse('1.234, 5.678');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234,5.678'", () => {
        const formatParser = new DecimalFormat();
        const result = formatParser.parse('1.234,5.678');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234 5.678'", () => {
        const formatParser = new DecimalFormat();
        const result = formatParser.parse('1.234 5.678');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.23412312 5.6782356' with precision 4", () => {
        const formatParser = new DecimalFormat({ precision: 4 });
        const result = formatParser.parse('1.23412312 5.6782356');
        expect(result.latitude).toBe(1.2341);
        expect(result.longitude).toBe(5.6782);
    });

    it("returns the correct latitude and longitude for '-1.23412312 -5.6782356' with precision 4", () => {
        const formatParser = new DecimalFormat({ precision: 4 });
        const result = formatParser.parse('-1.23412312 -5.6782356');
        expect(result.latitude).toBe(-1.2341);
        expect(result.longitude).toBe(-5.6782);
    });

    it("returns the correct latitude and longitude for '1.23412312 -5.6782356' with precision 4", () => {
        const formatParser = new DecimalFormat({ precision: 4 });
        const result = formatParser.parse('1.23412312 -5.6782356');
        expect(result.latitude).toBe(1.2341);
        expect(result.longitude).toBe(-5.6782);
    });

    it("returns the correct latitude and longitude for '-1.23412312 5.6782356' with precision 4", () => {
        const formatParser = new DecimalFormat({ precision: 4 });
        const result = formatParser.parse('-1.23412312 5.6782356');
        expect(result.latitude).toBe(-1.2341);
        expect(result.longitude).toBe(5.6782);
    });
});
