const generate = (n, diff, line, combs) => {
  if (diff < 0 || diff > n) return;
  else if (n === 0) combs.push(line.join(""));
  else {
    line.push("(");
    generate(n - 1, diff + 1, line, combs);
    line.pop();
    line.push(")");
    generate(n - 1, diff - 1, line, combs);
    line.pop();
  }
  return combs;
};

console.log(generate(6, 0, [], []));
