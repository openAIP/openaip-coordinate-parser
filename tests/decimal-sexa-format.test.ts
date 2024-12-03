import { describe, expect, it } from 'vitest';
import { DecimalSexaFormat } from '../src/formats/decimal-sexa-format.js';

describe('canParse', () => {
    it('returns true for valid decimal format', () => {
        expect(DecimalSexaFormat.canParse('1.234° 5.678°')).toBe(true);
    });

    it("returns true for valid decimal format '1.234 °,  5.678 °' with comma", () => {
        expect(DecimalSexaFormat.canParse('1.234 °,  5.678 °')).toBe(true);
    });

    it("returns false for invalid decimal format '1.234 5.678'", () => {
        expect(DecimalSexaFormat.canParse('1.234 5.678')).toBe(false);
    });
});
describe('parse', () => {
    it("returns the correct latitude and longitude for '12° 5°'", () => {
        const formatParser = new DecimalSexaFormat();
        const result = formatParser.parse('12° 5°');
        expect(result.latitude).toBe(12);
        expect(result.longitude).toBe(5);
    });

    it("returns the correct latitude and longitude for '1.234° 5.678°'", () => {
        const formatParser = new DecimalSexaFormat();
        const result = formatParser.parse('1.234° 5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234° 5.678°'", () => {
        const formatParser = new DecimalSexaFormat();
        const result = formatParser.parse('1.234° 5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
        const formatParser = new DecimalSexaFormat();
        const result = formatParser.parse('1.234  ° 5.678 °');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
        const formatParser = new DecimalSexaFormat();
        const result = formatParser.parse('1.234°,5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
        const formatParser = new DecimalSexaFormat();
        const result = formatParser.parse('1.234°, 5.678°');
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it("returns the correct latitude and longitude for '1.23412312° 5.6782356°' with precision 4", () => {
        const formatParser = new DecimalSexaFormat({ precision: 4 });
        const result = formatParser.parse('1.23412312° 5.6782356°');
        expect(result.latitude).toBe(1.2341);
        expect(result.longitude).toBe(5.6782);
    });
});
