package com.nauc.openaip

/**
 * Lightweight utilities.
 */
object Utils {
    fun isNumeric(value: String): Boolean {
        return value.toDoubleOrNull() != null
    }
}
