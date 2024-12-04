import { describe, expect, it } from 'vitest';
import { DmsBlockPrefixedHemisphereFormat } from '../src/formats/dms-block-prefixed-hemisphere-format.js';

describe('canParse', () => {
    it('returns true for known formats', () => {
        expect(DmsBlockPrefixedHemisphereFormat.canParse(`N400723 W0740723`)).toBe(true);
        expect(DmsBlockPrefixedHemisphereFormat.canParse(`N400723W0740723`)).toBe(true);
        expect(DmsBlockPrefixedHemisphereFormat.canParse(`N400723, W0740723`)).toBe(true);
        expect(DmsBlockPrefixedHemisphereFormat.canParse(`N400723.999, W0740723.999`)).toBe(true);
    });
});
describe('parse', () => {
    it(`returns the correct latitude and longitude for N400723 W0740723`, () => {
        const formatParser = new DmsBlockPrefixedHemisphereFormat();
        const result = formatParser.parse(`N400723 W0740723`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for N400723W0740723`, () => {
        const formatParser = new DmsBlockPrefixedHemisphereFormat();
        const result = formatParser.parse(`N400723W0740723`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for N400723, W0740723`, () => {
        const formatParser = new DmsBlockPrefixedHemisphereFormat();
        const result = formatParser.parse(`N400723, W0740723`);
        expect(result.latitude).toBe(40.12306);
        expect(result.longitude).toBe(-74.12306);
    });

    it(`returns the correct latitude and longitude for N400723.999, W0740723.999`, () => {
        const formatParser = new DmsBlockPrefixedHemisphereFormat({ precision: 5 });
        const result = formatParser.parse(`N400723.999, W0740723.999`);
        expect(result.latitude).toBe(40.12333);
        expect(result.longitude).toBe(-74.12333);
    });
});
