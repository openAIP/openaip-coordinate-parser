package com.nauc.openaip

/**
 * A very small example parser that accepts two decimal numbers (lat lon or lon lat depending on order)
 * separated by comma or whitespace. This is intentionally simple and provided as a minimal working
 * format to demonstrate the Kotlin port. Full set of format parsers from the original project
 * should be ported similarly.
 */
class SimpleDecimalFormat(private val precision: Int = 5) : IFormatParser {
    private val regex = Regex("([-+]?[0-9]*\.?[0-9]+)\\s*[ ,\\s]+\\s*([-+]?[0-9]*\.?[0-9]+)")

    override fun canParse(coordinateString: String): Boolean {
        return regex.containsMatchIn(coordinateString.trim())
    }

    override fun parse(coordinateString: String): Coordinate {
        val trimmed = coordinateString.trim()
        val m = regex.find(trimmed) ?: throw IllegalArgumentException("String not in decimal pair format: '$coordinateString'")
        val a = m.groupValues[1].toDoubleOrNull() ?: throw IllegalArgumentException("Invalid number: ${m.groupValues[1]}")
        val b = m.groupValues[2].toDoubleOrNull() ?: throw IllegalArgumentException("Invalid number: ${m.groupValues[2]}")

        // Heuristic: if first value is in [-90,90] and second in [-180,180], treat as (lat, lon)
        return when {
            a in -90.0..90.0 && b in -180.0..180.0 -> Coordinate(latitude = a, longitude = b)
            b in -90.0..90.0 && a in -180.0..180.0 -> Coordinate(latitude = b, longitude = a)
            else -> throw IllegalArgumentException("Cannot determine which value is latitude vs longitude: '$coordinateString'")
        }
    }

    override fun reset() {
        // no state
    }
}
