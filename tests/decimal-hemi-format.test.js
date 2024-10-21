import { describe, expect, it } from 'vitest';
import { DecimalHemiFormat } from '../src/formats/decimal-hemi-format.js';

describe('constructor', () => {
    it('throws an error if options is not an object', () => {
        expect(() => new DecimalHemiFormat('')).toThrow('options must be an object');
    });

    it('throws an error if precision is not a number', () => {
        expect(() => new DecimalHemiFormat({ precision: '3' })).toThrow('precision must be a number');
    });
});
describe('canParse', () => {
    it('returns true for valid decimal format', () => {
        expect(DecimalHemiFormat.canParse('1.234N 5.678E')).toBe(true);
    });

    it("returns false for invalid decimal format '1.234 5.678'", () => {
        expect(DecimalHemiFormat.canParse('1.234 5.678')).toBe(false);
    });

    it("returns true for valid decimal format '1.234 N,  5.678 E' with comma", () => {
        expect(DecimalHemiFormat.canParse('1.234 N,  5.678 E')).toBe(true);
    });
});
describe('parse', () => {
    it('throws an error if coordinateString is not a non-empty string', () => {
        const df = new DecimalHemiFormat();
        expect(() => df.parse('')).toThrow('coordinateString must be a non-empty string');
    });

    it('throws an error if latitude is out of bounds', () => {
        const df = new DecimalHemiFormat();
        expect(() => df.parse('100.234N 5.678E')).toThrow('latitude must be within the range of -90 to 90');
    });

    it('throws an error if latitude is out of bounds negative', () => {
        const df = new DecimalHemiFormat();
        expect(() => df.parse('-91.234N 5.678E')).toThrow('latitude must be within the range of -90 to 90');
    });

    it('throws an error if longitude is out of bounds', () => {
        const df = new DecimalHemiFormat();
        expect(() => df.parse('1.234N 181.678E')).toThrow('longitude must be within the range of -180 to 180');
    });

    it('throws an error if longitude is out of bounds negative ', () => {
        const df = new DecimalHemiFormat();
        expect(() => df.parse('1.234N -181.678E')).toThrow('longitude must be within the range of -180 to 180');
    });

    it("returns the correct latitude and longitude for '1.234N 5.678E'", () => {
        const df = new DecimalHemiFormat();
        const result = df.parse('1.234N 5.678E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234N 5.678E'", () => {
        const df = new DecimalHemiFormat();
        const result = df.parse('1.234N 5.678E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  N 5.678 E'", () => {
        const df = new DecimalHemiFormat();
        const result = df.parse('1.234  N 5.678 E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.23412312N 5.6782356E' with precision 4", () => {
        const df = new DecimalHemiFormat({ precision: 4 });
        const result = df.parse('1.23412312N 5.6782356E');
        expect(result.latitude).toBe(1.2341);
        expect(result.longitude).toBe(5.6782);
    });

    it("returns the correct latitude and longitude for '-1.23412312N -5.6782356E' with precision 4", () => {
        const df = new DecimalHemiFormat({ precision: 4 });
        const result = df.parse('-1.23412312N -5.6782356E');
        expect(result.latitude).toBe(-1.2341);
        expect(result.longitude).toBe(-5.6782);
    });

    it("returns the correct latitude and longitude for '1.23412312N -5.6782356E' with precision 4", () => {
        const df = new DecimalHemiFormat({ precision: 4 });
        const result = df.parse('1.23412312N -5.6782356E');
        expect(result.latitude).toBe(1.2341);
        expect(result.longitude).toBe(-5.6782);
    });

    it("returns the correct latitude and longitude for '-1.23412312N 5.6782356E' with precision 4", () => {
        const df = new DecimalHemiFormat({ precision: 4 });
        const result = df.parse('-1.23412312N 5.6782356E');
        expect(result.latitude).toBe(-1.2341);
        expect(result.longitude).toBe(5.6782);
    });
});
