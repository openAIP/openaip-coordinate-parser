import { describe, expect, it } from 'vitest';
import { DecimalSignedFormat } from '../src/formats/decimal-signed-format.js';

describe('canParse', () => {
    it('returns true for valid decimal format', () => {
        expect(DecimalSignedFormat.canParse('1.234° 5.678°')).toBe(true);
    });

    it("returns true for valid decimal format '1.234 °,  5.678 °' with comma", () => {
        expect(DecimalSignedFormat.canParse('1.234 °,  5.678 °')).toBe(true);
    });

    it("returns false for invalid decimal format '1.234 5.678'", () => {
        expect(DecimalSignedFormat.canParse('1.234 5.678')).toBe(false);
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

    it("returns the correct latitude and longitude for '1.23412312° 5.6782356°' with precision 4", () => {
        const formatParser = new DecimalSignedFormat({ precision: 4 });
        const result = formatParser.parse('1.23412312° 5.6782356°');
        expect(result.latitude).toBe(1.2341);
        expect(result.longitude).toBe(5.6782);
    });
});
