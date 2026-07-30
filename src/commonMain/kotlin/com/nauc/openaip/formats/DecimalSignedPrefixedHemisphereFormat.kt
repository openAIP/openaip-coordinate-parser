package com.nauc.openaip.formats

import com.nauc.openaip.Coordinate
import com.nauc.openaip.Hemisphere
import com.nauc.openaip.Utils

private val REGEX = Regex("^([NS])\\s*(-?\\d{1,2}(\\.\\d+)?)\\s*(°)\\s*[, ]?\\s*([EW])\\s*(-?\\d{1,3}(\\.\\d+)?)\\s*(°)\\s*$", RegexOption.IGNORE_CASE)

/**
 * Supported formats:
 *
 * N 12° E 5°
 * N 1.234° E 5.678°
 * N 1.234°, E 5.678°
 * N 1.234°,E5.678°
 * N1.234°E5.678°
 * ... and additional variants with spaces and comma.
 */
class DecimalSignedPrefixedHemisphereFormat(options: FormatConfig? = null) : AbstractDecimalHemisphereFormat(options) {
    override fun parse(coordinateString: String): Coordinate {
        val str = coordinateString
        if (!canParse(str)) throw IllegalArgumentException("Invalid coordinate string")

        val match = REGEX.find(str) ?: throw IllegalArgumentException("Invalid coordinate string")
        val latitude = match.groupValues[2]
        val latitudeDirection = match.groupValues[1].uppercase()
        val longitude = match.groupValues[6]
        val longitudeDirection = match.groupValues[5].uppercase()

        if (!Utils.isNumeric(latitude) || !Utils.isNumeric(longitude)) throw IllegalArgumentException("Invalid coordinate string")
        if (latitudeDirection !in listOf("N", "S") || longitudeDirection !in listOf("E", "W")) throw IllegalArgumentException("Invalid coordinate string")

        enforceValidLatitude(latitude)
        enforceValidLongitude(longitude)

        val latValue = String.format("%.${precision}f", latitude.toDouble()).toDouble()
        val lonValue = String.format("%.${precision}f", longitude.toDouble()).toDouble()

        val latHem = if (latitudeDirection == "N") Hemisphere.N else Hemisphere.S
        val lonHem = if (longitudeDirection == "E") Hemisphere.E else Hemisphere.W

        return Coordinate(this.toDecimal(latValue, latHem), this.toDecimal(lonValue, lonHem))
    }

    companion object {
        @JvmStatic
        fun canParse(coordinateString: String): Boolean {
            return REGEX.containsMatchIn(coordinateString)
        }
    }
}
