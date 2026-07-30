package com.nauc.openaip

/**
 * Options used by Parser
 */
data class Options(
    val precision: Int = 5,
    val extendFormatParsers: Boolean = false,
    val formatParsers: List<IFormatParser>? = null,
)

/**
 * Main Parser ported from TypeScript. It holds a list of format parsers and attempts to find one
 * that can parse an incoming coordinate string.
 */
class Parser(options: Options = Options()) {
    private val opts: Options
    private val parsers: List<IFormatParser>

    init {
        // basic validation
        require(options.precision in 0..15) { "precision must be in 0..15" }

        val defaultParsers: List<IFormatParser> = listOf(
            SimpleDecimalFormat(options.precision)
            // TODO: port other format parsers from original project and include them here
        )

        val provided = options.formatParsers ?: defaultParsers
        val formatParsers = if (options.formatParsers != null && options.extendFormatParsers) {
            defaultParsers + provided
        } else {
            provided
        }

        this.opts = options.copy(formatParsers = null) // avoid keeping parser instances in opts
        this.parsers = formatParsers
    }

    fun parse(coordinateString: String): Coordinate {
        require(coordinateString.isNotBlank()) { "coordinateString must be a non-empty string" }
        val parser = findParser(coordinateString)
        return parser.parse(coordinateString)
    }

    fun findParser(coordinateString: String): IFormatParser {
        require(coordinateString.isNotBlank()) { "coordinateString must be a non-empty string" }
        val parser = parsers.find { it.canParse(coordinateString) }
        return parser ?: throw IllegalArgumentException("No parser found for the given coordinate string")
    }

    fun reset() {
        parsers.forEach { it.reset() }
    }
}
