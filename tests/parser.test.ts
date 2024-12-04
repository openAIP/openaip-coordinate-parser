import { describe, expect, it } from 'vitest';
import { Parser } from '../src/parser.js';

describe('Test that all configured format parsers do not interfere', () => {
    it('returns the correct latitude and longitude for "12, 5"', () => {
        const parser = new Parser('12, 5');
        expect(parser.getLatitude()).toBe(12);
        expect(parser.getLongitude()).toBe(5);
    });

    it('returns the correct latitude and longitude for "1.234, 5.678"', () => {
        const parser = new Parser('1.234, 5.678');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234, 5.678'", () => {
        const parser = new Parser('1.234, 5.678');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234,5.678'", () => {
        const parser = new Parser('1.234,5.678');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234 5.678'", () => {
        const parser = new Parser('1.234 5.678');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '12N 5E'", () => {
        const parser = new Parser('12N 5E');
        expect(parser.getLatitude()).toBe(12);
        expect(parser.getLongitude()).toBe(5);
    });

    it("returns the correct latitude and longitude for '1.234N 5.678E'", () => {
        const parser = new Parser('1.234N 5.678E');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234N 5.678E'", () => {
        const parser = new Parser('1.234N 5.678E');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  N 5.678 E'", () => {
        const parser = new Parser('1.234  N 5.678 E');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234N5.678E'", () => {
        const parser = new Parser('1.234N5.678E');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234N,5.678E'", () => {
        const parser = new Parser('1.234N,5.678E');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '12° 5°'", () => {
        const parser = new Parser('12° 5°');
        expect(parser.getLatitude()).toBe(12);
        expect(parser.getLongitude()).toBe(5);
    });

    it("returns the correct latitude and longitude for '1.234° 5.678°'", () => {
        const parser = new Parser('1.234° 5.678°');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234° 5.678°'", () => {
        const parser = new Parser('1.234° 5.678°');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
        const parser = new Parser('1.234  ° 5.678 °');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
        const parser = new Parser('1.234°,5.678°');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
        const parser = new Parser('1.234°, 5.678°');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '12° N 5° E'", () => {
        const parser = new Parser('12° N 5° E');
        expect(parser.getLatitude()).toBe(12);
        expect(parser.getLongitude()).toBe(5);
    });

    it("returns the correct latitude and longitude for '1.234° N 5.678° E'", () => {
        const parser = new Parser('1.234° N 5.678° E');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234° N 5.678° E'", () => {
        const parser = new Parser('1.234° N 5.678° E');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° N 5.678 ° E'", () => {
        const parser = new Parser('1.234  ° N 5.678 ° E');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234°N,5.678°E'", () => {
        const parser = new Parser('1.234°N,5.678°E');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234°N5.678°E'", () => {
        const parser = new Parser('1.234°N5.678°E');
        expect(parser.getLatitude()).toBe(1.234);
        expect(parser.getLongitude()).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '4007N 7407W'", () => {
        const parser = new Parser('4007N 7407W');
        expect(parser.getLatitude()).toBe(40.117);
        expect(parser.getLongitude()).toBe(-74.117);
    });

    it("returns the correct latitude and longitude for '4007.38N 7407.38W'", () => {
        const parser = new Parser('4007.38N 7407.38W');
        expect(parser.getLatitude()).toBe(40.123);
        expect(parser.getLongitude()).toBe(-74.123);
    });

    it("returns the correct latitude and longitude for '4007.38N7407.38W'", () => {
        const parser = new Parser('4007.38N7407.38W');
        expect(parser.getLatitude()).toBe(40.123);
        expect(parser.getLongitude()).toBe(-74.123);
    });

    it("returns the correct latitude and longitude for '4007.38  N 7407.38  W'", () => {
        const parser = new Parser('4007.38  N 7407.38  W');
        expect(parser.getLatitude()).toBe(40.123);
        expect(parser.getLongitude()).toBe(-74.123);
    });
});
