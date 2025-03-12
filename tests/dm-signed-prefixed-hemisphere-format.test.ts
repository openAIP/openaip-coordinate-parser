import { describe, expect, it } from 'vitest';
import { DmSignedPrefixedHemisphereFormat } from '../src/formats/dm-signed-prefixed-hemisphere-format';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmSignedPrefixedHemisphereFormat.canParse(`N40°07' W74°07'`)).toBe(true);
        expect(DmSignedPrefixedHemisphereFormat.canParse(`N40°07.38'W74°07.38'`)).toBe(true);
        expect(DmSignedPrefixedHemisphereFormat.canParse(`N 40°07.38' W 74°07.38'`)).toBe(true);
        expect(DmSignedPrefixedHemisphereFormat.canParse(`N40°07.38' W74°07.38'`)).toBe(true);
        expect(DmSignedPrefixedHemisphereFormat.canParse(`N 40° 07.38' W 74° 07.38'`)).toBe(true);
        expect(DmSignedPrefixedHemisphereFormat.canParse(`N40° 07.38', W74° 07.38'`)).toBe(true);
        expect(DmSignedPrefixedHemisphereFormat.canParse(`N40° 07.38',W74° 07.38'`)).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for N40°07' W74°07'`, () => {
        const formatParser = new DmSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N40°07' W74°07'`);
        expect(result.latitude).toBe(40.11667);
        expect(result.longitude).toBe(-74.11667);
    });

    it(`returns the correct latitude and longitude for N40°07.38'W74°07.38'`, () => {
        const formatParser = new DmSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N40°07.38'W74°07.38'`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for N 40°07.38' W 74°07.38'`, () => {
        const formatParser = new DmSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N 40°07.38' W 74°07.38'`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for N40°07.38' W74°07.38'`, () => {
        const formatParser = new DmSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N40°07.38' W74°07.38'`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for N 40° 07.38' W 74° 07.38'`, () => {
        const formatParser = new DmSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N 40° 07.38' W 74° 07.38'`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for N40° 07.38', W74° 07.38'`, () => {
        const formatParser = new DmSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N40° 07.38', W74° 07.38'`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for N40° 07.38',W74° 07.38'`, () => {
        const formatParser = new DmSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N40° 07.38',W74° 07.38'`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });
});
