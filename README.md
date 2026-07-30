# openaip-coordinate-parser-kotlin

This repository is an initial Kotlin port of the openAIP coordinate parser (originally in TypeScript).

This first commit contains:
- Core types (Coordinate)
- Parser core (Parser, Options)
- A simple decimal parser (SimpleDecimalFormat) as an example format implementation
- Gradle/Kotlin build files

Next steps:
- Port the remaining format parsers from the original project (src/formats/*)
- Add unit tests mirroring original behavior
- Optionally provide a CLI or library artifact

