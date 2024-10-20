import { describe, expect, it } from 'vitest';
import { Parser } from '../src/parser.js';
import { DecimalFormat } from '../src/formats/decimal-format.js';

describe('Parser', () => {
    it('throws an error if coordinateString is not a non-empty string', () => {
        expect(() => new Parser('')).toThrow('coordinateString must be a non-empty string');
    });

    it('throws an error if options is not an object', () => {
        expect(() => new Parser('1.234, 5.678', '')).toThrow('options must be an object');
    });

    it('returns the correct latitude and longitude for "1.234, 5.678"', () => {
        const parser = new Parser('1.234, 5.678');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it('throws an error if no parser is found', () => {
        expect(() => new Parser('unknown format')).toThrow('No parser found for the given coordinate string');
    });
});

describe('Decimal Format', () => {
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
            const df = new DecimalFormat();
            expect(() => df.parse('')).toThrow('coordinateString must be a non-empty string');
        });
        it("returns the correct latitude and longitude for '1.234, 5.678'", () => {
            const df = new DecimalFormat();
            const result = df.parse('1.234, 5.678');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });
        it("returns the correct latitude and longitude for '1.234 5.678'", () => {
            const df = new DecimalFormat();
            const result = df.parse('1.234 5.678');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });
        it("returns the correct latitude and longitude for '1.23412312 5.6782356' with precision 4", () => {
            const df = new DecimalFormat({ precision: 4 });
            const result = df.parse('1.23412312 5.6782356');
            expect(result.latitude).toBe(1.2341);
            expect(result.longitude).toBe(5.6782);
        });
    });
});
