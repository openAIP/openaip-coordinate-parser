namespace openaip {
    namespace CoordinateParser {
        export type Coordinate = { longitude; latitude };
        export type DmsCoordinate = {
            degrees: number;
            minutes: number;
            seconds: number;
            direction: string;
        };

        export type ParserOptions = {
            precision: number;
        };
        export type Parser = {
            constructor(coordinateString: string, options: openaip.CoordinateParser.ParserOptions): void;
            parse(coordinateString: string): openaip.Coordinate;
            getLongitude(): number;
            getLatitude(): number;
            findParser(coordinateString: string): openaip.FormatParser.Parser;
            reset(): void;
        };

        namespace FormatParser {
            export type FormatParserOptions = {
                precision: number;
            };
            export type Parser = {
                constructor(options: FormatParserOptions): void;
                canParse(): boolean;
                parse(): openaip.Coordinate;
                getLongitude(): number;
                getLatitude(): number;
                enforceValidLongitude(lonValue: string): void;
                enforceValidLatitude(latValue: string): void;
                reset(); void;
            };
        }
    }
}
