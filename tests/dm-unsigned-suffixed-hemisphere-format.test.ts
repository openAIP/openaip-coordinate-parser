import { describe, expect, it } from 'vitest';
import { DmUnsignedSuffixedHemisphereFormat } from '../src/formats/dm-unsigned-suffixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmUnsignedSuffixedHemisphereFormat.canParse('4007.38N7407.38W')).toBe(true);
        expect(DmUnsignedSuffixedHemisphereFormat.canParse('4007.38N 7407.38W')).toBe(true);
    });

    it('returns false for unknown formats', () => {
        expect(DmUnsignedSuffixedHemisphereFormat.canParse('4007.38N740738W')).toBe(false);
        expect(DmUnsignedSuffixedHemisphereFormat.canParse('4007.38N7407.38P')).toBe(false);
        expect(DmUnsignedSuffixedHemisphereFormat.canParse('4007.38N7407.38 ')).toBe(false);
    });
});
describe('parse', () => {
    it("returns the correct latitude and longitude for '4007N 7407W'", () => {
        const formatParser = new DmUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse('4007N 7407W');
        expect(result.latitude).toBe(40.117);
        expect(result.longitude).toBe(-74.117);
    });

    it("returns the correct latitude and longitude for '4007.38N 7407.38W'", () => {
        const formatParser = new DmUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse('4007.38N 7407.38W');
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it("returns the correct latitude and longitude for '4007.38N7407.38W'", () => {
        const formatParser = new DmUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse('4007.38N7407.38W');
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it("returns the correct latitude and longitude for '4007.38  N 7407.38  W'", () => {
        const formatParser = new DmUnsignedSuffixedHemisphereFormat();
        const result = formatParser.parse('4007.38  N 7407.38  W');
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it("returns the correct latitude and longitude for '4007.3812342N 7407.38123W' with precision 4", () => {
        const formatParser = new DmUnsignedSuffixedHemisphereFormat({ precision: 4 });
        const result = formatParser.parse('4007.3812342N 7407.38123W');
        expect(result.latitude).toBe(40.1231);
        expect(result.longitude).toBe(-74.1231);
    });
});
