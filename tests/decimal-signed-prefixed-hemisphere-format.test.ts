import { describe, expect, it } from 'vitest';
import { DecimalSignedPrefixedHemisphereFormat } from '../src/formats/decimal-signed-prefixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DecimalSignedPrefixedHemisphereFormat.canParse('N 12° E 5°')).toBe(true);
        expect(DecimalSignedPrefixedHemisphereFormat.canParse('N 1.234° E 5.678°')).toBe(true);
        expect(DecimalSignedPrefixedHemisphereFormat.canParse('N 1.234°, E 5.678°')).toBe(true);
        expect(DecimalSignedPrefixedHemisphereFormat.canParse('N 1.234°,E5.678°')).toBe(true);
        expect(DecimalSignedPrefixedHemisphereFormat.canParse('N1.234°E5.678°')).toBe(true);
    });
});
describe('parse', () => {
    it('returns the correct latitude and longitude for N 12° E 5°', () => {
        const formatParser = new DecimalSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N 12° E 5°`);
        expect(result.latitude).toBe(12);
        expect(result.longitude).toBe(5);
    });

    it('returns the correct latitude and longitude for N 1.234° E 5.678°', () => {
        const formatParser = new DecimalSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N 1.234° E 5.678°`);
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it('returns the correct latitude and longitude for N 1.234°, E 5.678°', () => {
        const formatParser = new DecimalSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N 1.234°, E 5.678°`);
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it('returns the correct latitude and longitude for N 1.234°,E5.678°', () => {
        const formatParser = new DecimalSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N 1.234°,E5.678°`);
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });

    it('returns the correct latitude and longitude for N1.234°E5.678°', () => {
        const formatParser = new DecimalSignedPrefixedHemisphereFormat();
        const result = formatParser.parse(`N1.234°E5.678°`);
        expect(result.latitude).toBe(1.234);
        expect(result.longitude).toBe(5.678);
    });
});
