import { describe, expect, it } from 'vitest';
import { Parser } from '../src/parser.js';

describe('Parser', () => {
    it('throws an error if coordinateString is not a non-empty string', () => {
        expect(() => new Parser('')).toThrow('coordinateString must be a non-empty string');
    });
});
