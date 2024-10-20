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
