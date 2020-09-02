export function escapeStringRegexp(str) {
  let matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
  if (typeof str !== "string") {
    throw new TypeError("Expected a string");
  }
  return str.replace(matchOperatorsRe, "\\$&");
}
