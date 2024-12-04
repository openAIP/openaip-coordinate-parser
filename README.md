# OpenAIP Coordinate Parser

Easily extendable and configurable parser for NodeJS and the browser that extracts coordinates from a variety of formatted lat/lon strings.

### Usage

The parser provides parsing all known formats right out-of-the-box:

```javascript
import { Parser } from '@openaip/openaip-coordinate-parser';

const coordinateString = '12.5678 45.6789';
const coordinates = parser.parse(coordinateString);
const latitude = coordinates.latitude; // 12.5678
const longitude = coordinates.longitude; // 45.6789
```

#### Configuration

For advanced use-cases and to speed up performance, the parser can be configured according to requirements. For example,
if only parsing a known number of coordinate formats is required, the used format parsers can be reduced to only the
required ones. Each format parser can be configured individually:

```javascript
import { Parser } from '@openaip/openaip-coordinate-parser';
import { DecimalUnsignedFormat } from '@openaip/openaip-coordinate-parser/formats/decimal-format.js';

// only parsing two formats is ever required
const decimalParser = new DecimalUnsignedFormat({ precision: 5 });
const decimalSexaParser = new DecimalSignedFormat({ precision: 3 });
// only use two parsers instead of all default ones
const parser = new Parser({ formatParsers: [decimalParser, decimalSexaParser] });

parser.parse('12.5678 45.6789');
parser.getLatitude(); // 12.5678
parser.getLongitude(); // 45.6789

const coordinates = parser.parse('1.234° 5.678°');
const latitude = coordinates.latitude; // 1.234
const longitude = coordinates.longitude; // 5.678
```

#### Extending the parser

The parser can easily be extended with custom parsing logic. Simply provide your own format parser that provides the `parse`, `canParse` and `reset`
methods. The `canParse` method must return `true` if the parser is able to parse given coordinate string, `false` if not. The `parse` method is used to extract decimal `longitude` and `latitude` values from the coordinate string. Please note that the
ordering of format parsers is crucial if two parsers may be able to parse the same format - first
parser identified with `canParse` wins!

```javascript
import { Parser } from '@openaip/openaip-coordinate-parser';
import { IFormatParser } from '@openaip/openaip-coordinate-parser/formats/base-format.js';
import { DecimalUnsignedFormat } from '@openaip/openaip-coordinate-parser/formats/decimal-format.js';

// available format parser
const decimalParser = new DecimalUnsignedFormat({ precision: 5 });
// your custom format parser
export class MyCustomFormatParser implements IFormatParser {
    parse(coordinateString: string): Coordinate {
        // custom parser logic
        const { lat, lon} = parseWithCustomLogic(coordinateString);

        return {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
        };
    }

    static canParse(coordinateString: string): boolean {
        // verify that the parser can actually parse the string - if true, the parser will be used to parse the coordinates
        return /^.*$/.test(coordinateString);
    }

    reset() {
        // do reset logic
    }
}

// initialize your custom format parser
const customFormatParser = new MyCustomFormatParser();
// extend with your custom format parser
const parser = new Parser({ formatParsers: [customFormatParser, decimalParser] });
```

### Supported Formats

Currently the out-of-the-box format parsers supports various formats and handles their various variations ,e.g. with or without whitespaces, gracefully:

-   `1° 5°`
-   `1.234° 5.678°`
-   `1.234°, 5.678°`
-   `N 12° E 5°`
-   `N 1.234° E 5.678°`
-   `N 1.234°, E5.678°`
-   `1° N 5° E`
-   `1.234° N 5.678° E`
-   `1.234° N, 5.678° E`
-   `10, 12`
-   `1.234, 5.678`
-   `N 12, E 56`
-   `N 12.234 E 56.678`
-   `N 12.234, E 56.678`
-   `12 N, 56 E`
-   `12.234 N 56.678 E`
-   `12.234 N, 56.678 E`
-   `N 4007 W 7407`
-   `N 4007.38 W 7407.38`
-   `4007 N 7407 W`
-   `4007.38 N 7407.38 W`
-   ``
-   ``
-   ``
-   ``
