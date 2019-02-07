export default function ensureArray(possibleArray) {
  return Array.isArray(possibleArray) ? possibleArray : [possibleArray];
}
