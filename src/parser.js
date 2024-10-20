import checkTypes from 'check-types';

export class Parser {
    /**
     * @param {string} coordinateString
     */
    constructor(coordinateString) {
        if (checkTypes.nonEmptyString(coordinateString) === false) {
            throw new Error('coordinateString must be a non-empty string');
        }
    }
}
