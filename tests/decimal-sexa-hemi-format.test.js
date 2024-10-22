import { describe, expect, it } from 'vitest';
import { DecimalSexaHemiFormat } from '../src/formats/decimal-sexa-hemi-format.js';

describe('constructor', () => {
    it('throws an error if options is not an object', () => {
        expect(() => new DecimalSexaHemiFormat('')).toThrow('options must be an object');
    });

    it('throws an error if precision is not a number', () => {
        expect(() => new DecimalSexaHemiFormat({ precision: '3' })).toThrow('precision must be a number');
    });
});
describe('canParse', () => {
    it('returns true for valid decimal format', () => {
        expect(DecimalSexaHemiFormat.canParse('1.234° N 5.678° E')).toBe(true);
    });

    it("returns true for valid decimal format '1.234 ° N,  5.678 ° E' with comma", () => {
        expect(DecimalSexaHemiFormat.canParse('1.234 ° N,  5.678 ° E')).toBe(true);
    });

    it("returns false for invalid decimal format '1.234 5.678'", () => {
        expect(DecimalSexaHemiFormat.canParse('1.234 5.678')).toBe(false);
    });

    it("returns false for invalid decimal format '1.234 N 5.678 P'", () => {
        expect(DecimalSexaHemiFormat.canParse('1.234 N 5.678 P')).toBe(false);
    });

    it("returns false for invalid decimal format '1.234 N 5.678 '", () => {
        expect(DecimalSexaHemiFormat.canParse('1.234 N 5.678 ')).toBe(false);
    });
});
describe('parse', () => {
    it('throws an error if coordinateString is not a non-empty string', () => {
        const formatParser = new DecimalSexaHemiFormat();
        expect(() => formatParser.parse('')).toThrow('coordinateString must be a non-empty string');
    });

    it('throws an error if latitude is invalid string', () => {
        const formatParser = new DecimalSexaHemiFormat();
        expect(() => formatParser.parse('100.234°N 5.678°E')).toThrow('Invalid coordinate string');
    });

    it('throws an error if longitude is invalid string', () => {
        const formatParser = new DecimalSexaHemiFormat();
        expect(() => formatParser.parse('56.234°N 4535.678°E')).toThrow('Invalid coordinate string');
    });

    it('throws an error if latitude is out of bounds', () => {
        const formatParser = new DecimalSexaHemiFormat();
        expect(() => formatParser.parse('91.234°N 5.678°E')).toThrow('latitude must be within the range of -90 to 90');
    });

    it('throws an error if latitude is out of bounds negative', () => {
        const formatParser = new DecimalSexaHemiFormat();
        expect(() => formatParser.parse('-91.234° N 5.678° E')).toThrow(
            'latitude must be within the range of -90 to 90',
        );
    });

    it('throws an error if longitude is out of bounds', () => {
        const formatParser = new DecimalSexaHemiFormat();
        expect(() => formatParser.parse('1.234° N 181.678° E')).toThrow(
            'longitude must be within the range of -180 to 180',
        );
    });

    it('throws an error if longitude is out of bounds negative ', () => {
        const formatParser = new DecimalSexaHemiFormat();
        expect(() => formatParser.parse('1.234° N -181.678° E')).toThrow(
            'longitude must be within the range of -180 to 180',
        );
    });

    it("returns the correct latitude and longitude for '1.234° N 5.678° E'", () => {
        const formatParser = new DecimalSexaHemiFormat();
        const result = formatParser.parse('1.234° N 5.678° E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234° N 5.678° E'", () => {
        const formatParser = new DecimalSexaHemiFormat();
        const result = formatParser.parse('1.234° N 5.678° E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° N 5.678 ° E'", () => {
        const formatParser = new DecimalSexaHemiFormat();
        const result = formatParser.parse('1.234  ° N 5.678 ° E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234°N,5.678°E'", () => {
        const formatParser = new DecimalSexaHemiFormat();
        const result = formatParser.parse('1.234°N,5.678°E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234°N5.678°E'", () => {
        const formatParser = new DecimalSexaHemiFormat();
        const result = formatParser.parse('1.234°N5.678°E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.23412312°N 5.6782356°E' with precision 4", () => {
        const formatParser = new DecimalSexaHemiFormat({ precision: 4 });
        const result = formatParser.parse('1.23412312°N 5.6782356°E');
        expect(result.latitude).toBe(1.2341);
        expect(result.longitude).toBe(5.6782);
    });
});
