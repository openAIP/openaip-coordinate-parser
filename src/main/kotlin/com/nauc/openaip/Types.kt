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

// Representations for DMS / DM coordinates (placeholders for full implementation)
sealed interface DmsCoordinate

sealed interface DmCoordinate

