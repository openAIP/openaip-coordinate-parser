import { describe, expect, it } from 'vitest';
import { DmsBlockSuffixedHemisphereFormat } from '../src/formats/dms-block-suffixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmsBlockSuffixedHemisphereFormat.canParse(`400723N 0740723W`)).toBe(true);
        expect(DmsBlockSuffixedHemisphereFormat.canParse(`400723N0740723W`)).toBe(true);
        expect(DmsBlockSuffixedHemisphereFormat.canParse(`400723N, 0740723W`)).toBe(true);
        expect(DmsBlockSuffixedHemisphereFormat.canParse(`400723.999N, 0740723.999W`)).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for 400723N 0740723W`, () => {
        const formatParser = new DmsBlockSuffixedHemisphereFormat();
        const result = formatParser.parse(`400723N 0740723W`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for 400723N0740723W`, () => {
        const formatParser = new DmsBlockSuffixedHemisphereFormat();
        const result = formatParser.parse(`400723N0740723W`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for 400723N, 0740723W`, () => {
        const formatParser = new DmsBlockSuffixedHemisphereFormat();
        const result = formatParser.parse(`400723N, 0740723W`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for 400723.999N, 0740723.999W`, () => {
        const formatParser = new DmsBlockSuffixedHemisphereFormat({ precision: 5 });
        const result = formatParser.parse(`400723.999N, 0740723.999W`);
        expect(result.latitude).toBe(40.12333);
        expect(result.longitude).toBe(-74.12333);
    });
});
