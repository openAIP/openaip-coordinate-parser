import { describe, expect, it } from 'vitest';

// tests dual package exports (CJS and ESM)
describe('Dual Package Exports', () => {
    it('should work with package.json exports field', async () => {
        const packageJson = await import('../package.json', { assert: { type: 'json' } });

        // verify ESM export configuration
        expect(packageJson.exports['.'].import).toBeDefined();
        expect(packageJson.exports['.'].import.types).toBe('./dist/esm/types/index.d.mts');
        expect(packageJson.exports['.'].import.default).toBe('./dist/esm/index.mjs');

        // verify CJS export configuration
        expect(packageJson.exports['.'].require).toBeDefined();
        expect(packageJson.exports['.'].require.types).toBe('./dist/cjs/types/index.d.cts');
        expect(packageJson.exports['.'].require.default).toBe('./dist/cjs/index.cjs');
    });

    it('should have correctly built ESM output', async () => {
        // test that the ESM build exists and exports the Parser
        const { Parser } = await import('../dist/esm/index.mjs');
        expect(Parser).toBeTypeOf('function');
    });
});
