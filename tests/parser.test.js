import { expect, it } from 'vitest';
import { Parser } from '../src/parser.js';

it('throws an error if coordinateString is not a non-empty string', () => {
    expect(() => new Parser('')).toThrow('coordinateString must be a non-empty string');
});

it('throws an error if options is not an object', () => {
    expect(() => new Parser('1.234, 5.678', '')).toThrow('options must be an object');
});

it('throws an error if no parser is found', () => {
    expect(() => new Parser('unknown format')).toThrow('No parser found for the given coordinate string');
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
