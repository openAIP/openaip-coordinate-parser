import { describe, expect, it } from 'vitest';
import { DmsSignedPrefixedHemisphereFormat } from '../src/formats/dms-signed-prefixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmsSignedPrefixedHemisphereFormat.canParse(`N40°7'23" W74°7'23"`)).toBe(true);
        expect(DmsSignedPrefixedHemisphereFormat.canParse(`N40°7'23"W74°7'23"`)).toBe(true);
        expect(DmsSignedPrefixedHemisphereFormat.canParse(`N 40° 7' 23" W 74° 7' 23"`)).toBe(true);
        expect(DmsSignedPrefixedHemisphereFormat.canParse(`N40°7'23", W74°7'23"`)).toBe(true);
        expect(DmsSignedPrefixedHemisphereFormat.canParse(`N40°7'23",W74°7'23"`)).toBe(true);
        expect(DmsSignedPrefixedHemisphereFormat.canParse(`N40° 7' 23", W74° 7' 23"`)).toBe(true);
        expect(DmsSignedPrefixedHemisphereFormat.canParse(`N 40° 7' 23.9999", W 74° 7' 23.9999"`)).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for N40°7'23" W74°7'23"`, () => {
        const formatParser = new DmsSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N40°7'23" W74°7'23"`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for N40°7'23"W74°7'23"`, () => {
        const formatParser = new DmsSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N40°7'23"W74°7'23"`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for N 40° 7' 23" W 74° 7' 23"`, () => {
        const formatParser = new DmsSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N 40° 7' 23" W 74° 7' 23"`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for N40°7'23", W74°7'23"`, () => {
        const formatParser = new DmsSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N40°7'23", W74°7'23"`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for N40°7'23",W74°7'23"`, () => {
        const formatParser = new DmsSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N40°7'23",W74°7'23"`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for N40° 7' 23", W74° 7' 23"`, () => {
        const formatParser = new DmsSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N40° 7' 23", W74° 7' 23"`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for N 40° 7' 23.9999", W 74° 7' 23.9999"`, () => {
        const formatParser = new DmsSignedPrefixedHemisphereFormat({ precision: 5 });
        const result = formatParser.parse(`N 40° 7' 23.9999", W 74° 7' 23.9999"`);

        expect(result.latitude).toBe(40.12333);
        expect(result.longitude).toBe(-74.12333);
    });
});
