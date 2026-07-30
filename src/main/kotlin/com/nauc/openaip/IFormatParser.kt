package com.nauc.openaip

/**
 * Parser format interface. Each format parser must be able to tell whether it can parse the given
 * string and produce a Coordinate instance.
 */
interface IFormatParser {
    /**
     * Return true if this parser can parse the given coordinate string.
     */
    fun canParse(coordinateString: String): Boolean

    /**
     * Parse the string into a Coordinate. Should throw an exception if parsing fails.
     */
    fun parse(coordinateString: String): Coordinate

    /**
     * Reset internal state if any. Default no-op.
     */
    fun reset() {}
}
