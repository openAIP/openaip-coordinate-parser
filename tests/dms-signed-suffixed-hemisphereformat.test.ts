import { describe, expect, it } from 'vitest';
import { DmsSignedSuffixedHemisphereFormat } from '../src/formats/dms-signed-suffixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmsSignedSuffixedHemisphereFormat.canParse(`40°7'23"N 74°7'23"W`)).toBe(true);
        expect(DmsSignedSuffixedHemisphereFormat.canParse(`40°7'23"N74°7'23"W`)).toBe(true);
        expect(DmsSignedSuffixedHemisphereFormat.canParse(`40° 7' 23" N 74° 7' 23" W`)).toBe(true);
        expect(DmsSignedSuffixedHemisphereFormat.canParse(`40°7'23"N, 74°7'23"W`)).toBe(true);
        expect(DmsSignedSuffixedHemisphereFormat.canParse(`40°7'23"N,74°7'23"W`)).toBe(true);
        expect(DmsSignedSuffixedHemisphereFormat.canParse(`40° 7' 23" N, 74° 7' 23" W`)).toBe(true);
        expect(DmsSignedSuffixedHemisphereFormat.canParse(`40° 7' 23.9999" N, 74° 7' 23.9999" W`)).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for 40°7'23"N 74°7'23"W`, () => {
        const formatParser = new DmsSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40°7'23"N 74°7'23"W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40°7'23"N74°7'23"W`, () => {
        const formatParser = new DmsSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40°7'23"N74°7'23"W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40° 7' 23" N 74° 7' 23" W`, () => {
        const formatParser = new DmsSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40° 7' 23" N 74° 7' 23" W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40°7'23"N, 74°7'23"W`, () => {
        const formatParser = new DmsSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40°7'23"N, 74°7'23"W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40°7'23"N,74°7'23"W`, () => {
        const formatParser = new DmsSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40°7'23"N,74°7'23"W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40° 7' 23" N, 74° 7' 23" W`, () => {
        const formatParser = new DmsSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40° 7' 23" N, 74° 7' 23" W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40° 7' 23.9999" N, 74° 7' 23.9999" W`, () => {
        const formatParser = new DmsSignedSuffixedHemisphereFormat({ precision: 5 });
        const result = formatParser.parse(`40° 7' 23.9999" N, 74° 7' 23.9999" W`);

        expect(result.latitude).toBe(40.12333);
        expect(result.longitude).toBe(-74.12333);
    });
});
