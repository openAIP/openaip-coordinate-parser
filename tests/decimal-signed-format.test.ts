import { describe, expect, it } from 'vitest';
import { DecimalSignedFormat } from '../src/formats/decimal-signed-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DecimalSignedFormat.canParse('1.234° 5.678°')).toBe(true);
        expect(DecimalSignedFormat.canParse('1.234 °,  5.678 °')).toBe(true);
    });
});
describe('parse', () => {
    it("returns the correct latitude and longitude for '12° 5°'", () => {
        const formatParser = new DecimalSignedFormat();
        const result = formatParser.parse('12° 5°');
        expect(result.latitude).toBe(12);
        expect(result.longitude).toBe(5);
    });

    it("returns the correct latitude and longitude for '1.234° 5.678°'", () => {
        const formatParser = new DecimalSignedFormat();
        const result = formatParser.parse('1.234° 5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234° 5.678°'", () => {
        const formatParser = new DecimalSignedFormat();
        const result = formatParser.parse('1.234° 5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
        const formatParser = new DecimalSignedFormat();
        const result = formatParser.parse('1.234  ° 5.678 °');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
        const formatParser = new DecimalSignedFormat();
        const result = formatParser.parse('1.234°,5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
        const formatParser = new DecimalSignedFormat();
        const result = formatParser.parse('1.234°, 5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });
});
