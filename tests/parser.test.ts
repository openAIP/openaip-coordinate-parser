import { describe, expect, it } from 'vitest';
import { Parser } from '../src/parser.js';

describe('Test that all configured format parsers do not interfere', () => {
    // decimal signed format
    it("returns the correct latitude and longitude for '12° 5°'", () => {
        const parser = new Parser();
        const result = parser.parse('12° 5°');
        expect(result.latitude).toBe(12);
        expect(result.longitude).toBe(5);
    });

    it("returns the correct latitude and longitude for '1.234° 5.678°'", () => {
        const parser = new Parser();
        const result = parser.parse('1.234° 5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234° 5.678°'", () => {
        const parser = new Parser();
        const result = parser.parse('1.234° 5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
        const parser = new Parser();
        const result = parser.parse('1.234  ° 5.678 °');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
        const parser = new Parser();
        const result = parser.parse('1.234°,5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
        const parser = new Parser();
        const result = parser.parse('1.234°, 5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    // decimal signed prefixed hemisphere format

    it("returns the correct latitude and longitude for 'N 12° E 5°'", () => {
        const parser = new Parser();
        const result = parser.parse('N 12° E 5°');
        expect(result.latitude).toBe(12);
        expect(result.longitude).toBe(5);
    });

    it("returns the correct latitude and longitude for 'N 1.234° E 5.678°'", () => {
        const parser = new Parser();
        const result = parser.parse('N 1.234° E 5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for 'N 1.234°, E 5.678°'", () => {
        const parser = new Parser();
        const result = parser.parse('N 1.234°, E 5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for 'N 1.234°,E5.678°'", () => {
        const parser = new Parser();
        const result = parser.parse('N 1.234°,E5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for 'N1.234°E5.678°'", () => {
        const parser = new Parser();
        const result = parser.parse('N1.234°E5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    // decimal signed suffixed hemisphere format

    it("returns the correct latitude and longitude for '12° N 5° E'", () => {
        const parser = new Parser();
        const result = parser.parse('12° N 5° E');
        expect(result.latitude).toBe(12);
        expect(result.longitude).toBe(5);
    });

    it("returns the correct latitude and longitude for '1.234° N 5.678° E'", () => {
        const parser = new Parser();
        const result = parser.parse('1.234° N 5.678° E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234° N 5.678° E'", () => {
        const parser = new Parser();
        const result = parser.parse('1.234° N 5.678° E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° N 5.678 ° E'", () => {
        const parser = new Parser();
        const result = parser.parse('1.234  ° N 5.678 ° E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234°N,5.678°E'", () => {
        const parser = new Parser();
        const result = parser.parse('1.234°N,5.678°E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234°N5.678°E'", () => {
        const parser = new Parser();
        const result = parser.parse('1.234°N5.678°E');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    // decimal unsigned format

    it("returns the correct latitude and longitude for '10, 13'", () => {
        const parser = new Parser();
        const result = parser.parse('10, 13');
        expect(result.latitude).toBe(10);
        expect(result.longitude).toBe(13);
    });

    it("returns the correct latitude and longitude for '1.234, 5.678'", () => {
        const parser = new Parser();
        const result = parser.parse('1.234, 5.678');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234,5.678'", () => {
        const parser = new Parser();
        const result = parser.parse('1.234,5.678');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234 5.678'", () => {
        const parser = new Parser();
        const result = parser.parse('1.234 5.678');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.23412312 5.6782356' with precision 4", () => {
        const parser = new Parser();
        const result = parser.parse('1.23412312 5.6782356');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '-1.23412312 -5.6782356' with precision 4", () => {
        const parser = new Parser();
        const result = parser.parse('-1.23412312 -5.6782356');
        expect(result.latitude).toBe(-1.234);
        expect(result.longitude).toBe(-5.678);
    });

    it("returns the correct latitude and longitude for '1.23412312 -5.6782356' with precision 4", () => {
        const parser = new Parser();
        const result = parser.parse('1.23412312 -5.6782356');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(-5.678);
    });

    // decimal signed prefixed hemisphere format

    it("returns the correct latitude and longitude for 'N 12° E 5°'", () => {
        const parser = new Parser();
        const result = parser.parse('N 12° E 5°');
        expect(result.latitude).toBe(12);
        expect(result.longitude).toBe(5);
    });

    it("returns the correct latitude and longitude for 'N 1.234° E 5.678°'", () => {
        const parser = new Parser();
        const result = parser.parse('N 1.234° E 5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for 'N 1.234°, E 5.678°'", () => {
        const parser = new Parser();
        const result = parser.parse('N 1.234°, E 5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for 'N 1.234°,E5.678°'", () => {
        const parser = new Parser();
        const result = parser.parse('N 1.234°,E5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for 'N1.234°E5.678°'", () => {
        const parser = new Parser();
        const result = parser.parse('N1.234°E5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    // dm unsigned suffixed hemisphere format

    it("returns the correct latitude and longitude for '4007N 7407W'", () => {
        const parser = new Parser();
        const result = parser.parse('4007N 7407W');
        expect(result.latitude).toBe(40.117);
        expect(result.longitude).toBe(-74.117);
    });

    it("returns the correct latitude and longitude for '4007.38N 7407.38W'", () => {
        const parser = new Parser();
        const result = parser.parse('4007.38N 7407.38W');
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it("returns the correct latitude and longitude for '4007.38N7407.38W'", () => {
        const parser = new Parser();
        const result = parser.parse('4007.38N7407.38W');
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it("returns the correct latitude and longitude for '4007.38  N 7407.38  W'", () => {
        const parser = new Parser();
        const result = parser.parse('4007.38  N 7407.38  W');
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it("returns the correct latitude and longitude for '4007.3812342N 7407.38123W' with precision 4", () => {
        const parser = new Parser();
        const result = parser.parse('4007.3812342N 7407.38123W');
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });
});
