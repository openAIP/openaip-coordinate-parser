import { describe, expect, it } from 'vitest';
import { DmsUnsignedDelimitedPrefixedHemisphere } from '../src/formats/dms-unsigned-delimited-prefixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmsUnsignedDelimitedPrefixedHemisphere.canParse(`N40:7:23 W74:7:23`)).toBe(true);
        expect(DmsUnsignedDelimitedPrefixedHemisphere.canParse(`N40:7:23W74:7:23`)).toBe(true);
        expect(DmsUnsignedDelimitedPrefixedHemisphere.canParse(`N40:7:23 W74:7:23`)).toBe(true);
        expect(DmsUnsignedDelimitedPrefixedHemisphere.canParse(`N40:7:23, W74:7:23`)).toBe(true);
        expect(DmsUnsignedDelimitedPrefixedHemisphere.canParse(`N40:7:23,W74:7:23`)).toBe(true);
        expect(DmsUnsignedDelimitedPrefixedHemisphere.canParse(`N 40:7:23.9999, W 74:7:23.9999`)).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for N40:7:23 W74:7:23`, () => {
        const formatParser = new DmsUnsignedDelimitedPrefixedHemisphere();
        const result = formatParser.parse(`N40:7:23 W74:7:23`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for N40:7:23W74:7:23`, () => {
        const formatParser = new DmsUnsignedDelimitedPrefixedHemisphere();
        const result = formatParser.parse(`N40:7:23W74:7:23`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for N40:7:23 W74:7:23`, () => {
        const formatParser = new DmsUnsignedDelimitedPrefixedHemisphere();
        const result = formatParser.parse(`N40:7:23 W74:7:23`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for N40:7:23, W74:7:23`, () => {
        const formatParser = new DmsUnsignedDelimitedPrefixedHemisphere();
        const result = formatParser.parse(`N40:7:23, W74:7:23`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for N40:7:23,W74:7:23`, () => {
        const formatParser = new DmsUnsignedDelimitedPrefixedHemisphere();
        const result = formatParser.parse(`N40:7:23,W74:7:23`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for N 40:7:23.9999, W 74:7:23.9999`, () => {
        const formatParser = new DmsUnsignedDelimitedPrefixedHemisphere({ precision: 5 });
        const result = formatParser.parse(`N 40:7:23.9999, W 74:7:23.9999`);

        expect(result.latitude).toBe(40.12333);
        expect(result.longitude).toBe(-74.12333);
    });
});
