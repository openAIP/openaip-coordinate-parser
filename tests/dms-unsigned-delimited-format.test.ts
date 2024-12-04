import { describe, expect, it } from 'vitest';
import { DmsUnsignedDelimitedFormat } from '../src/formats/dms-unsigned-delimited-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmsUnsignedDelimitedFormat.canParse(`40:7:23 -74:7:23`)).toBe(true);
        expect(DmsUnsignedDelimitedFormat.canParse(`40:7:23, -74:7:23`)).toBe(true);
        expect(DmsUnsignedDelimitedFormat.canParse(`40:7:23,-74:7:23`)).toBe(true);
        expect(DmsUnsignedDelimitedFormat.canParse(`40:7:23.9999, -74:7:23.9999`)).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for 40:7:23 -74:7:23`, () => {
        const formatParser = new DmsUnsignedDelimitedFormat();
        const result = formatParser.parse(`40:7:23 -74:7:23`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40:7:23, -74:7:23`, () => {
        const formatParser = new DmsUnsignedDelimitedFormat();
        const result = formatParser.parse(`40:7:23, -74:7:23`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40:7:23,-74:7:23`, () => {
        const formatParser = new DmsUnsignedDelimitedFormat();
        const result = formatParser.parse(`40:7:23,-74:7:23`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40:7:23.9999", -74:7:23.9999`, () => {
        const formatParser = new DmsUnsignedDelimitedFormat({ precision: 5 });
        const result = formatParser.parse(`40:7:23.9999, -74:7:23.9999`);

        expect(result.latitude).toBe(40.12333);
        expect(result.longitude).toBe(-74.12333);
    });
});
