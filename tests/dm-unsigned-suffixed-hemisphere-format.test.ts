import { describe, expect, it } from 'vitest';
import { DmUnsignedSuffixedHemisphereFormat } from '../src/formats/dm-unsigned-suffixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmUnsignedSuffixedHemisphereFormat.canParse('4007N 7407W')).toBe(true);
        expect(DmUnsignedSuffixedHemisphereFormat.canParse('4007.38N7407.38W')).toBe(true);
        expect(DmUnsignedSuffixedHemisphereFormat.canParse('4007.38 N 7407.38 W')).toBe(true);
        expect(DmUnsignedSuffixedHemisphereFormat.canParse('4007.38N 7407.38W')).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for 4007N 7407W`, () => {
        const formatParser = new DmUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`4007N 7407W`);
        expect(result.latitude).toBe(40.11667);
        expect(result.longitude).toBe(-74.11667);
    });

    it(`returns the correct latitude and longitude for 4007.38N 7407.38W`, () => {
        const formatParser = new DmUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`4007.38N 7407.38W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 4007.38N7407.38W`, () => {
        const formatParser = new DmUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`4007.38N7407.38W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 4007.38  N 7407.38  W`, () => {
        const formatParser = new DmUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse(`4007.38  N 7407.38  W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`preserves fractional minutes precision instead of rounding to whole seconds`, () => {
        const formatParser = new DmUnsignedSuffixedHemisphereFormat();
        // 52 + 9.493/60 = 52.1582166..., previously rounded to whole seconds (52:09:30 = 52.15833)
        const result = formatParser.parse(`5209.493N 00718.821E`);
        expect(result.latitude).toBe(52.15822);
        expect(result.longitude).toBe(7.31368);
    });
});
