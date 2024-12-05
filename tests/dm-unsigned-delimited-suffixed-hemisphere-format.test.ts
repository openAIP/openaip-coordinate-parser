import { describe, expect, it } from 'vitest';
import { DmUnsignedDelimitedSuffixedHemisphereFormat } from '../src/formats/dm-unsigned-delimited-suffixed-hemisphere-format';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmUnsignedDelimitedSuffixedHemisphereFormat.canParse('40:07N 74:07W')).toBe(true);
        expect(DmUnsignedDelimitedSuffixedHemisphereFormat.canParse('40:07.38N74:07.38W')).toBe(true);
        expect(DmUnsignedDelimitedSuffixedHemisphereFormat.canParse('40:07.38 N 74:07.38 W')).toBe(true);
        expect(DmUnsignedDelimitedSuffixedHemisphereFormat.canParse('40:07.38N 74:07.38W')).toBe(true);
    });
});
describe('parse', () => {
    it("returns the correct latitude and longitude for '40:07N 74:07W'", () => {
        const formatParser = new DmUnsignedDelimitedSuffixedHemisphereFormat();
        const result = formatParser.parse('40:07N 74:07W');
        expect(result.latitude).toBe(40.11667);
        expect(result.longitude).toBe(-74.11667);
    });

    it("returns the correct latitude and longitude for '40:07.38N74:07.38W'", () => {
        const formatParser = new DmUnsignedDelimitedSuffixedHemisphereFormat();
        const result = formatParser.parse('40:07.38N74:07.38W');
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it("returns the correct latitude and longitude for '40:07.38 N 74:07.38 W'", () => {
        const formatParser = new DmUnsignedDelimitedSuffixedHemisphereFormat();
        const result = formatParser.parse('40:07.38 N 74:07.38 W');
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it("returns the correct latitude and longitude for '40:07.38N 74:07.38W'", () => {
        const formatParser = new DmUnsignedDelimitedSuffixedHemisphereFormat();
        const result = formatParser.parse('40:07.38N 74:07.38W');
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });
});
