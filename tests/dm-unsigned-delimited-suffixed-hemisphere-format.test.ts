import { describe, expect, it } from 'vitest';
import { DmUnsignedDelimitedSuffixedHemisphereFormat } from '../src/formats/dm-unsigned-delimited-suffixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmUnsignedDelimitedSuffixedHemisphereFormat.canParse('40:07N 74:07W')).toBe(true);
        expect(DmUnsignedDelimitedSuffixedHemisphereFormat.canParse('40:07.38N74:07.38W')).toBe(true);
        expect(DmUnsignedDelimitedSuffixedHemisphereFormat.canParse('40:07.38 N 74:07.38 W')).toBe(true);
        expect(DmUnsignedDelimitedSuffixedHemisphereFormat.canParse('40:07.38N 74:07.38W')).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for 40:07N 74:07W`, () => {
        const formatParser = new DmUnsignedDelimitedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40:07N 74:07W`);
        expect(result.latitude).toBe(40.11667);
        expect(result.longitude).toBe(-74.11667);
    });

    it(`returns the correct latitude and longitude for 40:07.38N74:07.38W`, () => {
        const formatParser = new DmUnsignedDelimitedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40:07.38N74:07.38W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40:07.38 N 74:07.38 W`, () => {
        const formatParser = new DmUnsignedDelimitedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40:07.38 N 74:07.38 W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 40:07.38N 74:07.38W`, () => {
        const formatParser = new DmUnsignedDelimitedSuffixedHemisphereFormat();
        const result = formatParser.parse(`40:07.38N 74:07.38W`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for 45:09.99516 N 67:13.07781 W`, () => {
        const formatParser = new DmUnsignedDelimitedSuffixedHemisphereFormat();
        const result = formatParser.parse(`45:09.99516 N 67:13.07781 W`);
        expect(result.latitude).toBe(45.16659);
        expect(result.longitude).toBe(-67.21796);
    });

    it(`preserves fractional minutes precision instead of rounding to whole seconds`, () => {
        const formatParser = new DmUnsignedDelimitedSuffixedHemisphereFormat();
        // 52 + 9.493/60 = 52.1582166..., previously rounded to whole seconds (52:09:30 = 52.15833)
        const result = formatParser.parse(`52:09.493N 007:18.821E`);
        expect(result.latitude).toBe(52.15822);
        expect(result.longitude).toBe(7.31368);
    });

    it(`keeps distinct fractional-minute coordinates distinct`, () => {
        const formatParser = new DmUnsignedDelimitedSuffixedHemisphereFormat();
        const first = formatParser.parse(`52:09.493N 007:18.821E`);
        const second = formatParser.parse(`52:09.500N 007:18.830E`);
        expect(first.latitude).not.toBe(second.latitude);
    });
});
