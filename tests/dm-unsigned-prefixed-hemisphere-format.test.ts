import { describe, expect, it } from 'vitest';
import { DmUnsignedPrefixedHemisphereFormat } from '../src/formats/dm-unsigned-prefixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmUnsignedPrefixedHemisphereFormat.canParse('N4007 W7407')).toBe(true);
        expect(DmUnsignedPrefixedHemisphereFormat.canParse('N4007.38W7407.38')).toBe(true);
        expect(DmUnsignedPrefixedHemisphereFormat.canParse('N 4007.38 W 7407.38')).toBe(true);
        expect(DmUnsignedPrefixedHemisphereFormat.canParse('N4007.38 W7407.38')).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for N4007 W7407`, () => {
        const formatParser = new DmUnsignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N4007 W7407`);
        expect(result.latitude).toBe(40.11667);
        expect(result.longitude).toBe(-74.11667);
    });

    it(`returns the correct latitude and longitude for N4007.38W7407.38`, () => {
        const formatParser = new DmUnsignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N4007.38W7407.38`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for N 4007.38 W 7407.38`, () => {
        const formatParser = new DmUnsignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N 4007.38 W 7407.38`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`returns the correct latitude and longitude for N4007.38 W7407.38`, () => {
        const formatParser = new DmUnsignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N4007.38 W7407.38`);
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it(`preserves fractional minutes precision instead of rounding to whole seconds`, () => {
        const formatParser = new DmUnsignedPrefixedHemisphereFormat();
        // 52 + 9.493/60 = 52.1582166..., previously rounded to whole seconds (52:09:30 = 52.15833)
        const result = formatParser.parse(`N5209.493 E00718.821`);
        expect(result.latitude).toBe(52.15822);
        expect(result.longitude).toBe(7.31368);
    });
});
