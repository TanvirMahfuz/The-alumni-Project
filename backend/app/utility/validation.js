/**
 * Validates 12-hour time format with AM/PM
 * @param {string} time - Time string to validate
 * @returns {boolean} True if valid
 */
export const validateTime12hFormat = (time) => {
  return /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/i.test(time);
};
