import { describe, expect, it } from 'vitest';
import { DecimalSexaHemiFormat } from '../src/formats/decimal-sexa-hemi-format.js';

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
    it("returns the correct latitude and longitude for '12° N 5° E'", () => {
        const formatParser = new DecimalSexaHemiFormat();
        const result = formatParser.parse('12° N 5° E');
        expect(result.latitude).toBe(12);
        expect(result.longitude).toBe(5);
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