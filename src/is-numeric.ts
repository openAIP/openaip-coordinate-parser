import { z } from 'zod';

/**
 * Check if the value is a number or a string that can be converted to a number.
 */
export function isNumeric(value: any): boolean {
    return (
        (z.string().safeParse(value).success && !Number.isNaN(value) && !Number.isNaN(parseFloat(value))) ||
        z.number().safeParse(value).success
    );
}
