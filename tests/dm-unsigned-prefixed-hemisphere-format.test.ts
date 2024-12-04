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
    it("returns the correct latitude and longitude for 'N4007 W7407'", () => {
        const formatParser = new DmUnsignedPrefixedHemisphereFormat();
        const result = formatParser.parse('N4007 W7407');
        expect(result.latitude).toBe(40.11667);
        expect(result.longitude).toBe(-74.11667);
    });

    it("returns the correct latitude and longitude for 'N4007.38W7407.38'", () => {
        const formatParser = new DmUnsignedPrefixedHemisphereFormat();
        const result = formatParser.parse('N4007.38W7407.38');
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it("returns the correct latitude and longitude for 'N 4007.38 W 7407.38'", () => {
        const formatParser = new DmUnsignedPrefixedHemisphereFormat();
        const result = formatParser.parse('N 4007.38 W 7407.38');
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it("returns the correct latitude and longitude for 'N4007.38 W7407.38'", () => {
        const formatParser = new DmUnsignedPrefixedHemisphereFormat();
        const result = formatParser.parse('N4007.38 W7407.38');
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });
});
