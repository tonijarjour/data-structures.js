const count = (string) => {
  let charCounts = new Map();
  for (char of string.split("")) {
    if (charCounts.has(char)) charCounts.set(char, charCounts.get(char) + 1);
    else charCounts.set(char, 1);
  }
  return charCounts;
};

const windowChars = (s, t) => {
  let slen = s.length;
  let tlen = t.length;

  if (slen > tlen || tlen === 0) return "";

  let sFreq = count(s);

  for (let length = slen; length <= tlen; ++length) {
    for (let win = 0; win < tlen - length + 1; ++win) {
      let slice = t.slice(win, win + length);
      let viability = true;
      winFreq = count(slice);
      sFreq.forEach((v, k) => {
        if (!winFreq.get(k) || winFreq.get(k) < v) viability = false;
      });
      if (viability) return slice;
    }
  }
};

console.log(windowChars("ABCA", "ABCDEBCA"));
