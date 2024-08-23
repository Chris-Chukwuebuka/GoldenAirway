/**
 * This function generates a random tracking number.
 *
 * @return {string} The randomly generated tracking number.
 */
const generateTrackingNumber = () => {
  // Generate a random number between 0 and 1 (exclusive), and convert it to a base 36 string.
  // The `substr(2, 9)` part extracts a substring starting from the third character (index 2)
  // and taking 9 characters in total. This ensures the tracking number is always 9 characters long.
  // The `toUpperCase()` function converts the string to uppercase.
  return Math.random().toString(36).substr(2, 9).toUpperCase();
};

module.exports = generateTrackingNumber;