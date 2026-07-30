package com.nauc.openaip.formats

import com.nauc.openaip.Hemisphere

/**
 * Abstract helper for decimal formats with hemisphere direction.
 */
abstract class AbstractDecimalHemisphereFormat : BaseFormat() {
    protected fun toDecimal(decimalValue: Double, hemisphere: Hemisphere): Double {
        return if (hemisphere == Hemisphere.W || hemisphere == Hemisphere.S) -decimalValue else decimalValue
    }
}
