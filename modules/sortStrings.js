/**
 * Sorts strings lexicographically, ignoring spaces.
 * @param {string[]} arr - Array of strings
 * @returns 
 */
export function sortStringsIgnoringSpaces(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array of strings');
  }
  return [...arr].sort((a, b) => {
    const na = String(a).replace(/\s+/g, '');
    const nb = String(b).replace(/\s+/g, '');
    return na.localeCompare(nb, 'ru', { sensitivity: 'base' });
  });
}
