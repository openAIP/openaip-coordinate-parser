import { describe, expect, it } from 'vitest';
import { DmHemisphereFormat } from '../src/formats/dm-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for valid decimal format', () => {
        expect(DmHemisphereFormat.canParse('4007.38N7407.38W')).toBe(true);
    });

    it("returns true for valid decimal format '4007.38N 7407.38W' with space", () => {
        expect(DmHemisphereFormat.canParse('4007.38N 7407.38W')).toBe(true);
    });

    it("returns false for invalid decimal format '4007.38N740738W'", () => {
        expect(DmHemisphereFormat.canParse('4007.38N740738W')).toBe(false);
    });

    it("returns false for invalid decimal format '4007.38N7407.38P'", () => {
        expect(DmHemisphereFormat.canParse('4007.38N7407.38P')).toBe(false);
    });

    it("returns false for invalid decimal format '4007.38N7407.38 '", () => {
        expect(DmHemisphereFormat.canParse('4007.38N7407.38 ')).toBe(false);
    });
});
describe('parse', () => {
    it("returns the correct latitude and longitude for '4007N 7407W'", () => {
        const formatParser = new DmHemisphereFormat();
        const result = formatParser.parse('4007N 7407W');
        expect(result.latitude).toBe(40.117);
        expect(result.longitude).toBe(-74.117);
    });

    it("returns the correct latitude and longitude for '4007.38N 7407.38W'", () => {
        const formatParser = new DmHemisphereFormat();
        const result = formatParser.parse('4007.38N 7407.38W');
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it("returns the correct latitude and longitude for '4007.38N7407.38W'", () => {
        const formatParser = new DmHemisphereFormat();
        const result = formatParser.parse('4007.38N7407.38W');
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it("returns the correct latitude and longitude for '4007.38  N 7407.38  W'", () => {
        const formatParser = new DmHemisphereFormat();
        const result = formatParser.parse('4007.38  N 7407.38  W');
        expect(result.latitude).toBe(40.123);
        expect(result.longitude).toBe(-74.123);
    });

    it("returns the correct latitude and longitude for '4007.3812342N 7407.38123W' with precision 4", () => {
        const formatParser = new DmHemisphereFormat({ precision: 4 });
        const result = formatParser.parse('4007.3812342N 7407.38123W');
        expect(result.latitude).toBe(40.1231);
        expect(result.longitude).toBe(-74.1231);
    });
});
