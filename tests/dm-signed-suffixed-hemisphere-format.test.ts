import { describe, expect, it } from 'vitest';
import { DmSignedSuffixedHemisphereFormat } from '../src/formats/dm-signed-suffixed-hemisphere-format';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmSignedSuffixedHemisphereFormat.canParse(`40°07'N 74°07'W`)).toBe(true);
        expect(DmSignedSuffixedHemisphereFormat.canParse(`40°07.38'N74°07.38'W`)).toBe(true);
        expect(DmSignedSuffixedHemisphereFormat.canParse(`40°07.38' N 74°07.38' W`)).toBe(true);
        expect(DmSignedSuffixedHemisphereFormat.canParse(`40°07.38'N 74°07.38'W`)).toBe(true);
        expect(DmSignedSuffixedHemisphereFormat.canParse(`40° 07.38' N 74° 07.38' W`)).toBe(true);
        expect(DmSignedSuffixedHemisphereFormat.canParse(`40° 07.38'N, 74° 07.38' W`)).toBe(true);
        expect(DmSignedSuffixedHemisphereFormat.canParse(`40° 07.38'N,74° 07.38' W`)).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for 40°07'N 74°07'W`, () => {
        const formatParser = new DmSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40°07'N 74°07'W`);
        expect(result.latitude).toBe(40.11667);
        expect(result.longitude).toBe(-74.11667);
    });

    it(`returns the correct latitude and longitude for 40°07.38'N74°07.38'W`, () => {
        const formatParser = new DmSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40°07.38'N74°07.38'W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40°07.38' N 74°07.38' W`, () => {
        const formatParser = new DmSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40°07.38' N 74°07.38' W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40°07.38'N 74°07.38'W`, () => {
        const formatParser = new DmSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40°07.38'N 74°07.38'W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40° 07.38' N 74° 07.38' W`, () => {
        const formatParser = new DmSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40° 07.38' N 74° 07.38' W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40° 07.38'N, 74° 07.38' W`, () => {
        const formatParser = new DmSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40° 07.38'N, 74° 07.38' W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40° 07.38'N,74° 07.38' W`, () => {
        const formatParser = new DmSignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40° 07.38'N,74° 07.38' W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });
});
