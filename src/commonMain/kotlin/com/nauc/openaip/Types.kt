package com.nauc.openaip

/**
 * Simple data classes and types for parsed coordinates.
 */

data class Coordinate(val latitude: Double, val longitude: Double) {
    init {
        require(latitude in -90.0..90.0) { "latitude must be between -90 and 90: $latitude" }
        require(longitude in -180.0..180.0) { "longitude must be between -180 and 180: $longitude" }
    }
}

/**
 * Degrees / Minutes / Seconds representation with hemisphere direction (N/S or E/W).
 * Using Double for numeric components to allow decimal minutes/seconds if needed.
 */
data class DmsCoordinate(
    val degrees: Double,
    val minutes: Double,
    val seconds: Double,
    val direction: Hemisphere
)

/**
 * Degrees / Decimal Minutes representation with hemisphere direction (N/S or E/W).
 */
data class DmCoordinate(
    val degrees: Double,
    val minutes: Double,
    val direction: Hemisphere
)

/**
 * Hemisphere enumeration for direction.
 */
enum class Hemisphere {
    N, S, E, W
}
