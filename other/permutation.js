const factorial = (n) => {
  if (n === 1) return 1;
  let product = 1;
  for (let i = 2; i <= n; ++i) {
    product *= i;
  }
  return product;
};

const kthPermutation = (n, k) => {
  let permutation = [];
  let digits = [];

  for (let i = 1; i <= n; ++i) digits.push(i);

  while (n > 0) {
    let partLength = factorial(n) / n;
    let i = Math.floor(k / partLength);
    permutation.push(digits[i]);
    digits.splice(digits.indexOf(digits[i]), 1);
    --n;
    k %= partLength;
  }

  return permutation.join("");
};

console.log(kthPermutation(5, 25));
