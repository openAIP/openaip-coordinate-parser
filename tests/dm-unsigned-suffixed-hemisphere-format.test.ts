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
    it("returns the correct latitude and longitude for '4007N 7407W'", () => {
        const formatParser = new DmUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse('4007N 7407W');
        expect(result.latitude).toBe(40.11667);
        expect(result.longitude).toBe(-74.11667);
    });

    it("returns the correct latitude and longitude for '4007.38N 7407.38W'", () => {
        const formatParser = new DmUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse('4007.38N 7407.38W');
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it("returns the correct latitude and longitude for '4007.38N7407.38W'", () => {
        const formatParser = new DmUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse('4007.38N7407.38W');
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it("returns the correct latitude and longitude for '4007.38  N 7407.38  W'", () => {
        const formatParser = new DmUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse('4007.38  N 7407.38  W');
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });
});
