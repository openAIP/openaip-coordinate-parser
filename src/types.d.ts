namespace openaip {
    namespace CoordinateParser {
        export type Coordinate = { longitude; latitude };

        export type ParserOptions = {};
        export type Parser = {
            constructor(coordinateString: string, options: openaip.CoordinateParser.ParserOptions): void;
            parse(): openaip.Coordinate;
            getLongitude(): number;
            getLatitude(): number;
        };

        namespace FormatParser {
            export type FormatParserOptions = {};
            export type Parser = {
                constructor(coordinateString: string, options: FormatParserOptions): void;
                canParse(): boolean;
                parse(): openaip.Coordinate;
                getLongitude(): number;
                getLatitude(): number;
            };
        }
    }
}
