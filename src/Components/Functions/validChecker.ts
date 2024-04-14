/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Check if an item is not null, is defined and has property
 * @param {any} obj Object to check
 * @returns {boolean} is it valid?
 */
const IsValid = (obj: any): boolean => {
    if (obj === null || obj === undefined) return false;
    if (Array.isArray(obj)) {
        if (obj.length === 0) return false;
        return true;
    }
    if (typeof obj === "object") {
        if (Object.keys(obj).length === 0) return false;
        return true;
    }
    if (obj) return true;
    return false;
};
export default IsValid;
