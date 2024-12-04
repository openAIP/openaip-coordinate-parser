import { describe, expect, it } from 'vitest';
import { Parser } from '../src/parser.js';

describe('Test that all configured format parsers do not interfere', () => {
    describe('test decimal signed format', () => {
        it("returns the correct latitude and longitude for '12° 5°'", () => {
            const parser = new Parser();
            const result = parser.parse('12° 5°');
            expect(result.latitude).toBe(12);
            expect(result.longitude).toBe(5);
        });

        it("returns the correct latitude and longitude for '1.234° 5.678°'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234° 5.678°');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for '1.234° 5.678°'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234° 5.678°');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234  ° 5.678 °');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234°,5.678°');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for '1.234  ° 5.678 °'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234°, 5.678°');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });
    });
    describe('test decimal signed prefixed hemisphere format', () => {
        it("returns the correct latitude and longitude for 'N 12° E 5°'", () => {
            const parser = new Parser();
            const result = parser.parse('N 12° E 5°');
            expect(result.latitude).toBe(12);
            expect(result.longitude).toBe(5);
        });

        it("returns the correct latitude and longitude for 'N 1.234° E 5.678°'", () => {
            const parser = new Parser();
            const result = parser.parse('N 1.234° E 5.678°');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for 'N 1.234°, E 5.678°'", () => {
            const parser = new Parser();
            const result = parser.parse('N 1.234°, E 5.678°');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for 'N 1.234°,E5.678°'", () => {
            const parser = new Parser();
            const result = parser.parse('N 1.234°,E5.678°');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for 'N1.234°E5.678°'", () => {
            const parser = new Parser();
            const result = parser.parse('N1.234°E5.678°');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });
    });
    describe('test decimal signed suffixed hemisphere format', () => {
        it("returns the correct latitude and longitude for '12° N 5° E'", () => {
            const parser = new Parser();
            const result = parser.parse('12° N 5° E');
            expect(result.latitude).toBe(12);
            expect(result.longitude).toBe(5);
        });

        it("returns the correct latitude and longitude for '1.234° N 5.678° E'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234° N 5.678° E');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for '1.234° N 5.678° E'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234° N 5.678° E');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for '1.234  ° N 5.678 ° E'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234  ° N 5.678 ° E');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for '1.234°N,5.678°E'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234°N,5.678°E');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for '1.234°N5.678°E'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234°N5.678°E');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });
    });
    describe('test decimal unsigned format', () => {
        it("returns the correct latitude and longitude for '10, 13'", () => {
            const parser = new Parser();
            const result = parser.parse('10, 13');
            expect(result.latitude).toBe(10);
            expect(result.longitude).toBe(13);
        });

        it("returns the correct latitude and longitude for '1.234, 5.678'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234, 5.678');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for '1.234,5.678'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234,5.678');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for '1.234 5.678'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234 5.678');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });
    });
    describe('test decimal unsigned prefixed hemisphere format', () => {
        it("returns the correct latitude and longitude for 'N12 E56'", () => {
            const parser = new Parser();
            const result = parser.parse('N12 E56');
            expect(result.latitude).toBe(12);
            expect(result.longitude).toBe(56);
        });

        it("returns the correct latitude and longitude for 'N12,E56'", () => {
            const parser = new Parser();
            const result = parser.parse('N12,E56');
            expect(result.latitude).toBe(12);
            expect(result.longitude).toBe(56);
        });

        it("returns the correct latitude and longitude for 'N 12.234 E 56.678'", () => {
            const parser = new Parser();
            const result = parser.parse('N 12.234 E 56.678');
            expect(result.latitude).toBe(12.234);
            expect(result.longitude).toBe(56.678);
        });

        it("returns the correct latitude and longitude for 'N12.234,E56.678'", () => {
            const parser = new Parser();
            const result = parser.parse('N12.234,E56.678');
            expect(result.latitude).toBe(12.234);
            expect(result.longitude).toBe(56.678);
        });

        it("returns the correct latitude and longitude for 'N12.234E56.678'", () => {
            const parser = new Parser();
            const result = parser.parse('N12.234E56.678');
            expect(result.latitude).toBe(12.234);
            expect(result.longitude).toBe(56.678);
        });
    });
    describe('test decimal unsigned suffixed hemisphere format', () => {
        it("returns the correct latitude and longitude for '12N 56E'", () => {
            const parser = new Parser();
            const result = parser.parse('12N 56E');
            expect(result.latitude).toBe(12);
            expect(result.longitude).toBe(56);
        });

        it("returns the correct latitude and longitude for '1.234N 5.678E'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234N 5.678E');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for '1.234N 5.678E'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234N 5.678E');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for '1.234  N 5.678 E'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234  N 5.678 E');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for '1.234N5.678E'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234N5.678E');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });

        it("returns the correct latitude and longitude for '1.234N,5.678E'", () => {
            const parser = new Parser();
            const result = parser.parse('1.234N,5.678E');
            expect(result.latitude).toBe(1.234);
            expect(result.longitude).toBe(5.678);
        });
    });
    describe('test dm unsigned prefixed hemisphere format', () => {
        it("returns the correct latitude and longitude for 'N4007 W7407'", () => {
            const parser = new Parser();
            const result = parser.parse('N4007 W7407');
            expect(result.latitude).toBe(40.117);
            expect(result.longitude).toBe(-74.117);
        });

        it("returns the correct latitude and longitude for 'N4007.38W7407.38'", () => {
            const parser = new Parser();
            const result = parser.parse('N4007.38W7407.38');
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });

        it("returns the correct latitude and longitude for 'N 4007.38 W 7407.38'", () => {
            const parser = new Parser();
            const result = parser.parse('N 4007.38 W 7407.38');
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });

        it("returns the correct latitude and longitude for 'N4007.38 W7407.38'", () => {
            const parser = new Parser();
            const result = parser.parse('N4007.38 W7407.38');
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });
    });
    describe('test dm unsigned suffixed hemisphere format', () => {
        it("returns the correct latitude and longitude for '4007N 7407W'", () => {
            const parser = new Parser();
            const result = parser.parse('4007N 7407W');
            expect(result.latitude).toBe(40.117);
            expect(result.longitude).toBe(-74.117);
        });

        it("returns the correct latitude and longitude for '4007.38N 7407.38W'", () => {
            const parser = new Parser();
            const result = parser.parse('4007.38N 7407.38W');
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });

        it("returns the correct latitude and longitude for '4007.38N7407.38W'", () => {
            const parser = new Parser();
            const result = parser.parse('4007.38N7407.38W');
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });

        it("returns the correct latitude and longitude for '4007.38  N 7407.38  W'", () => {
            const parser = new Parser();
            const result = parser.parse('4007.38  N 7407.38  W');
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });
    });

    describe('test dsm signed format', () => {
        it(`returns the correct latitude and longitude for 40°7'23" -74°7'23"`, () => {
            const parser = new Parser();
            const result = parser.parse(`40°7'23" -74°7'23"`);
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });

        it(`returns the correct latitude and longitude for 40°7'23", -74°7'23"`, () => {
            const parser = new Parser();
            const result = parser.parse(`40°7'23", -74°7'23"`);
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });

        it(`returns the correct latitude and longitude for 40°7'23",-74°7'23"`, () => {
            const parser = new Parser();
            const result = parser.parse(`40°7'23",-74°7'23"`);
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });

        it(`returns the correct latitude and longitude for 40° 7' 23" -74° 7' 23"`, () => {
            const parser = new Parser();
            const result = parser.parse(`40° 7' 23" -74° 7' 23"`);
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });

        it(`returns the correct latitude and longitude for 40° 7' 23", -74° 7' 23"`, () => {
            const parser = new Parser();
            const result = parser.parse(`40° 7' 23", -74° 7' 23"`);
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });

        it(`returns the correct latitude and longitude for 40° 7' 23.9999", -74° 7' 23.9999"`, () => {
            const parser = new Parser({ precision: 5 });
            const result = parser.parse(`40° 7' 23.9999", -74° 7' 23.9999"`);

            expect(result.latitude).toBe(40.12333);
            expect(result.longitude).toBe(-74.12333);
        });
    });
    describe('test dsm unsigned format', () => {
        it(`returns the correct latitude and longitude for 40 7 23 -74 7 23`, () => {
            const parser = new Parser();
            const result = parser.parse(`40 7 23 -74 7 23`);
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });

        it(`returns the correct latitude and longitude for 40 7 23, -74 7 23`, () => {
            const parser = new Parser();
            const result = parser.parse(`40 7 23 , -74 7 23`);
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });

        it(`returns the correct latitude and longitude for 40 7 23,-74 7 23`, () => {
            const parser = new Parser();
            const result = parser.parse(`40 7 23,-74 7 23`);
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });

        it(`returns the correct latitude and longitude for 40 7 23 -74 7 23`, () => {
            const parser = new Parser();
            const result = parser.parse(`40 7 23 -74 7 23`);
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });

        it(`returns the correct latitude and longitude for 40 7 23, -74 7 23`, () => {
            const parser = new Parser();
            const result = parser.parse(`40 7 23, -74 7 23`);
            expect(result.latitude).toBe(40.123);
            expect(result.longitude).toBe(-74.123);
        });

        it(`returns the correct latitude and longitude for 40 7 23.9999, -74 7 23.9999`, () => {
            const parser = new Parser({ precision: 5 });
            const result = parser.parse(`40 7 23.9999, -74 7 23.9999`);

            expect(result.latitude).toBe(40.12333);
            expect(result.longitude).toBe(-74.12333);
        });
    });
    // describe('test', () => {});
});
