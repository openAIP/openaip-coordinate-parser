import { describe, expect, it } from 'vitest';
import { DmsUnsignedDelimitedSuffixedHemisphereFormat } from '../src/formats/dms-unsigned-delimited-suffixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmsUnsignedDelimitedSuffixedHemisphereFormat.canParse(`40:7:23N 74:7:23W`)).toBe(true);
        expect(DmsUnsignedDelimitedSuffixedHemisphereFormat.canParse(`35:02:15 N 131:59:23 E`)).toBe(true);
        expect(DmsUnsignedDelimitedSuffixedHemisphereFormat.canParse(`40:7:23N74:7:23W`)).toBe(true);
        expect(DmsUnsignedDelimitedSuffixedHemisphereFormat.canParse(`40:7:23N, 74:7:23W`)).toBe(true);
        expect(DmsUnsignedDelimitedSuffixedHemisphereFormat.canParse(`40:7:23N,74:7:23W`)).toBe(true);
        expect(DmsUnsignedDelimitedSuffixedHemisphereFormat.canParse(`40:7:23.9999N, 74:7:23.9999W`)).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for 40:7:23N 74:7:23W`, () => {
        const formatParser = new DmsUnsignedDelimitedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40:7:23N 74:7:23W`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for 35:02:15 N 131:59:23 E`, () => {
        const formatParser = new DmsUnsignedDelimitedSuffixedHemisphereFormat();
        const result = formatParser.parse(`35:02:15 N 131:59:23 E`);
        expect(result.latitude).toBe(35.0375);
        expect(result.longitude).toBe(131.98972);
    });

    it(`returns the correct latitude and longitude for 40:7:23N74:7:23W`, () => {
        const formatParser = new DmsUnsignedDelimitedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40:7:23N74:7:23W`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for 40:7:23N, 74:7:23W`, () => {
        const formatParser = new DmsUnsignedDelimitedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40:7:23N, 74:7:23W`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for 40:7:23N,74:7:23W`, () => {
        const formatParser = new DmsUnsignedDelimitedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40:7:23N,74:7:23W`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for 40:7:59.9999N, 74:7:59.9999W`, () => {
        const formatParser = new DmsUnsignedDelimitedSuffixedHemisphereFormat({ precision: 5 });
        const result = formatParser.parse(`40:7:59.9999N, 74:7:59.9999W`);

        expect(result.latitude).toBe(40.13333);
        expect(result.longitude).toBe(-74.13333);
    });    

});
