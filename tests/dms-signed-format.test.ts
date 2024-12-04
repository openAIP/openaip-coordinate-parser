import { describe, expect, it } from 'vitest';
import { DmsSignedFormat } from '../src/formats/dms-signed-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmsSignedFormat.canParse(`40°7'23" -74°7'23"`)).toBe(true);
        expect(DmsSignedFormat.canParse(`40°7'23", -74°7'23"`)).toBe(true);
        expect(DmsSignedFormat.canParse(`40°7'23",-74°7'23"`)).toBe(true);
        expect(DmsSignedFormat.canParse(`40° 7' 23" -74° 7' 23"`)).toBe(true);
        expect(DmsSignedFormat.canParse(`40° 7' 23", -74° 7' 23"`)).toBe(true);
        expect(DmsSignedFormat.canParse(`40° 7' 23.9999", -74° 7' 23.9999"`)).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for 40°7'23" -74°7'23"`, () => {
        const formatParser = new DmsSignedFormat();
        const result = formatParser.parse(`40°7'23" -74°7'23"`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for 40°7'23", -74°7'23"`, () => {
        const formatParser = new DmsSignedFormat();
        const result = formatParser.parse(`40°7'23", -74°7'23"`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for 40°7'23",-74°7'23"`, () => {
        const formatParser = new DmsSignedFormat();
        const result = formatParser.parse(`40°7'23",-74°7'23"`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for 40° 7' 23" -74° 7' 23"`, () => {
        const formatParser = new DmsSignedFormat();
        const result = formatParser.parse(`40° 7' 23" -74° 7' 23"`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for 40° 7' 23", -74° 7' 23"`, () => {
        const formatParser = new DmsSignedFormat();
        const result = formatParser.parse(`40° 7' 23", -74° 7' 23"`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for 40° 7' 23.9999", -74° 7' 23.9999"`, () => {
        const formatParser = new DmsSignedFormat({ precision: 5 });
        const result = formatParser.parse(`40° 7' 23.9999", -74° 7' 23.9999"`);

        expect(result.latitude).toBe(40.12333);
        expect(result.longitude).toBe(-74.12333);
    });
});
