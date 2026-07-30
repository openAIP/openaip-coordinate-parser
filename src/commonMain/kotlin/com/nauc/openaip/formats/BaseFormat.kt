package com.nauc.openaip.formats

import com.nauc.openaip.Coordinate
import com.nauc.openaip.DmCoordinate
import com.nauc.openaip.DmsCoordinate
import com.nauc.openaip.Hemisphere
import com.nauc.openaip.Utils
import com.nauc.openaip.IFormatParser

/**
 * Minimal configuration for format parsers.
 */
data class FormatConfig(val precision: Int? = null)

/**
 * BaseFormat provides shared validation and conversion helpers used by concrete format parsers.
 */
open class BaseFormat(options: FormatConfig? = null) : IFormatParser {
    val precision: Int
    var longitude: Double? = null
    var latitude: Double? = null

    init {
        val defaultPrecision = 5
        precision = options?.precision ?: defaultPrecision
    }

    override fun parse(coordinateString: String): Coordinate {
        throw NotImplementedError("parse must be implemented by subclasses")
    }

    companion object {
        @JvmStatic
        fun canParse(coordinateString: String): Boolean {
            throw NotImplementedError("canParse must be implemented by subclasses")
        }
    }

    fun enforceValidLongitude(lonValue: Any?) {
        val s = lonValue?.toString() ?: throw IllegalArgumentException("longitude must be numeric")
        if (!Utils.isNumeric(s)) throw IllegalArgumentException("longitude must be numeric")
        val lon = s.toDouble()
        if (lon < -180.0 || lon > 180.0) {
            throw IllegalArgumentException("longitude must be within the range of -180 to 180")
        }
    }

    fun enforceValidLatitudeDegrees(degrees: Any?, signed: Boolean = true) {
        val s = degrees?.toString() ?: throw IllegalArgumentException("degrees must be numeric")
        if (!Utils.isNumeric(s)) throw IllegalArgumentException("degrees must be numeric")
        val deg = s.toDouble()
        if (signed) {
            if (deg < -90.0 || deg > 90.0) throw IllegalArgumentException("latitude degrees must be within the range of -90 to 90")
        } else {
            if (deg < 0.0 || deg > 90.0) throw IllegalArgumentException("latitude degrees must be within the range of 0 to 90")
        }
    }

    fun enforceValidLongitudeDegrees(degrees: Any?, signed: Boolean = true) {
        val s = degrees?.toString() ?: throw IllegalArgumentException("degrees must be numeric")
        if (!Utils.isNumeric(s)) throw IllegalArgumentException("degrees must be numeric")
        val deg = s.toDouble()
        if (signed) {
            if (deg < -180.0 || deg > 180.0) throw IllegalArgumentException("longitude degrees must be within the range of -180 to 180")
        } else {
            if (deg < 0.0 || deg > 180.0) throw IllegalArgumentException("longitude degrees must be within the range of 0 to 180")
        }
    }

    fun enforceValidMinutes(minutes: Any?) {
        val s = minutes?.toString() ?: throw IllegalArgumentException("minutes must be numeric")
        if (!Utils.isNumeric(s)) throw IllegalArgumentException("minutes must be numeric")
        val min = s.toDouble()
        // allow decimal minutes; valid range: 0 <= minutes < 60
        if (min < 0.0 || min >= 60.0) {
            throw IllegalArgumentException("minutes must be within the range of 0 to 59.999...")
        }
    }

    fun enforceValidSeconds(seconds: Any?) {
        val s = seconds?.toString() ?: throw IllegalArgumentException("seconds must be numeric")
        if (!Utils.isNumeric(s)) throw IllegalArgumentException("seconds must be numeric")
        val sec = s.toDouble()
        // allow decimal seconds; valid range: 0 <= seconds < 60
        if (sec < 0.0 || sec >= 60.0) {
            throw IllegalArgumentException("seconds must be within the range of 0 to 59.999...")
        }
    }

    fun enforceValidLatitude(latValue: Any?) {
        val s = latValue?.toString() ?: throw IllegalArgumentException("latitude must be numeric")
        if (!Utils.isNumeric(s)) throw IllegalArgumentException("latitude must be numeric")
        val lat = s.toDouble()
        if (lat < -90.0 || lat > 90.0) throw IllegalArgumentException("latitude must be within the range of -90 to 90")
    }

    fun enforceNoHyphen(coordinateString: Any?) {
        val s = coordinateString?.toString() ?: throw IllegalArgumentException("coordinateString must be a string")
        if (s.contains('-')) throw IllegalArgumentException("Coordinates must not contain a hyphen")
    }

    fun dmsToDecimal(dms: DmsCoordinate): Double {
        // degrees are typically integers but accept Double for safety
        val degrees = dms.degrees
        val minutes = dms.minutes
        val seconds = dms.seconds
        // perform validations
        enforceValidLatitudeDegrees(degrees, signed = false)
        enforceValidMinutes(minutes)
        enforceValidSeconds(seconds)

        var decimal = degrees.toInt() + (minutes / 60.0) + (seconds / 3600.0)
        if (dms.direction == Hemisphere.S || dms.direction == Hemisphere.W) {
            decimal = -decimal
        }
        return decimal
    }

    fun dmToDecimal(dm: DmCoordinate): Double {
        val degrees = dm.degrees
        val minutes = dm.minutes
        // validations
        enforceValidLatitudeDegrees(degrees, signed = false)
        enforceValidMinutes(minutes)

        var decimal = degrees.toInt() + (minutes / 60.0)
        if (dm.direction == Hemisphere.S || dm.direction == Hemisphere.W) {
            decimal = -decimal
        }
        return decimal
    }

    override fun reset() {
        // default no-op
    }
}
