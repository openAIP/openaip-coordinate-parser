import checkTypes from 'check-types';

/**
 * Check if the value is a number or a string that can be converted to a number.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is a number or a string that can be converted to a number, false otherwise.
 */
export function isNumeric(value) {
    return (checkTypes.string(value) && !isNaN(value) && !isNaN(parseFloat(value))) || checkTypes.number(value);
}
