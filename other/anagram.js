const mapString = (string) => {
  const map = new Map();

  string.split("").forEach((c) => {
    if (map.has(c)) {
      map.set(c, map.get(c) + 1);
    } else {
      map.set(c, 1);
    }
  });
  return map;
};

const isAnagram = (s1, s2) => {
  const mapS1 = mapString(s1);
  const mapS2 = mapString(s2);

  if (mapS1.size !== mapS2.size) return false;

  for (let key of mapS1.keys()) {
    if (mapS1.get(key) !== mapS2.get(key)) return false;
  }

  return true;
};

console.log(isAnagram("danger", "garden"));
