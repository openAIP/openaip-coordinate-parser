import { describe, expect, it } from 'vitest';
import { DmUnsignedDelimitedPrefixedHemisphereFormat } from '../src/formats/dm-unsigned-delimited-prefixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmUnsignedDelimitedPrefixedHemisphereFormat.canParse('N40:07 W74:07')).toBe(true);
        expect(DmUnsignedDelimitedPrefixedHemisphereFormat.canParse('N40:07.38W74:07.38')).toBe(true);
        expect(DmUnsignedDelimitedPrefixedHemisphereFormat.canParse('N 40:07.38 W 74:07.38')).toBe(true);
        expect(DmUnsignedDelimitedPrefixedHemisphereFormat.canParse('N40:07.38 W74:07.38')).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for N40:07 W74:07`, () => {
        const formatParser = new DmUnsignedDelimitedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N40:07 W74:07`);
        expect(result.latitude).toBe(40.11667);
        expect(result.longitude).toBe(-74.11667);
    });

    it(`returns the correct latitude and longitude for N40:07.38W74:07.38`, () => {
        const formatParser = new DmUnsignedDelimitedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N40:07.38W74:07.38`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for N 40:07.38 W 74:07.38`, () => {
        const formatParser = new DmUnsignedDelimitedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N 40:07.38 W 74:07.38`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for N40:07.38 W74:07.38`, () => {
        const formatParser = new DmUnsignedDelimitedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N40:07.38 W74:07.38`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });
});
