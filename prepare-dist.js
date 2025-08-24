/* eslint-disable no-undef */
import { promises as fs } from 'fs';
import * as path from 'path';

const distFolder = './dist';

async function main() {
    try {
        console.log('\nStep 5: Creating package.json file...');
        await fs.writeFile(
            path.join(distFolder, 'package.json'),
            /*
            Indicate that this package is ESM only and that we require node >= 22 which
            will allow CommonJS consumers to "require" it.
            */
            JSON.stringify(
                {
                    type: 'module',
                    engines: {
                        node: '>=22.0.0',
                    },
                },
                null,
                2
            )
        );

        console.log('\nProcess completed successfully!');
    } catch (error) {
        console.error('Fatal error:', error);
        process.exit(1);
    }
}

main();
