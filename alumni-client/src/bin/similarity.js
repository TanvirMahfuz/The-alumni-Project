export function countOrderedMatches(source = "", input = "") {
  let i = 0; // pointer for source
  let j = 0; // pointer for input
  let matchCount = 0;

  while (i < source.length && j < input.length) {
    if (source[i].toLowerCase() === input[j].toLowerCase()) {
      matchCount++;
      j++; // move input pointer only if matched
    }
    i++; // always move source pointer
  }
  return (matchCount / input.length) > 0.8;
}
