const p001 = (n) => {
  return [...Array(n).keys()]
    .filter((v) => v % 3 === 0 || v % 5 === 0)
    .reduce((t, v) => t + v, 0);
};

function* fibonacci(max) {
  let prev = 0;
  let curr = 1;

  while (curr <= max) {
    let next = prev + curr;
    prev = curr;
    curr = next;
    yield curr;
  }
}

const p002 = (n) => {
  return [...fibonacci(n)].reduce((t, v) => t + (v % 2 === 0 ? v : 0), 0);
};

const p003 = (n) => {
  let m = Math.floor(Math.sqrt(n));
  for (let i = m % 2 !== 0 ? m : m + 1; i >= 3; i -= 2) {
    let isPrime = true;
    let o = Math.floor(Math.sqrt(i));
    for (let g = o % 2 !== 0 ? o : o + 1; g >= 3; g -= 2) {
      if (i % g === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime && n % i === 0) {
      return i;
    }
  }
};

const p004 = (n) => {
  let largest = 0;
  for (let a = Math.pow(10, n) - 1; a >= Math.pow(10, n - 1); a--) {
    for (let b = a; b >= Math.pow(10, n - 1); b--) {
      if (a * b <= largest || (a * b) % 11 != 0) {
        continue;
      }
      if (a * b === parseInt([...String(a * b)].reverse().join(""))) {
        largest = a * b;
      }
    }
  }
  return largest;
};

const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

const gcd = (a, b) => {
  let hi = a > b ? a : b;
  let lo = a > b ? b : a;
  if (hi % lo !== 0) {
    return gcd(lo, hi % lo);
  }
  return lo;
};

const p005 = (n) => {
  let multiple = 2;
  for (let i = 3; i <= n; i++) {
    multiple = lcm(i, multiple);
  }
  return multiple;
};

const p006 = (n) => {
  let numbers = [...Array(n + 1).keys()];
  let square_of_sum = Math.pow(
    numbers.reduce((t, v) => t + v, 0),
    2
  );
  let sum_of_squares = numbers.reduce((t, v) => t + v * v, 0);
  return square_of_sum - sum_of_squares;
};

const p007 = (n) => {
  let primes = [2, 3, 5, 7, 11, 13, 17, 19];
  while (primes.length < n) {
    if (
      primes
        .slice(0, primes.length - 1)
        .every((v) => primes[primes.length - 1] % v !== 0)
    ) {
      primes.push(primes[primes.length - 1] + 2);
    } else {
      primes[primes.length - 1] += 2;
    }
  }
  while (!primes.slice(0, n - 1).every((v) => primes[n - 1] % v !== 0)) {
    primes[n - 1] += 2;
  }
  return primes[n - 1];
};

const p008 = (n) => {
  let number =
    "73167176531330624919225119674426574742355349194934" +
    "96983520312774506326239578318016984801869478851843" +
    "85861560789112949495459501737958331952853208805511" +
    "12540698747158523863050715693290963295227443043557" +
    "66896648950445244523161731856403098711121722383113" +
    "62229893423380308135336276614282806444486645238749" +
    "30358907296290491560440772390713810515859307960866" +
    "70172427121883998797908792274921901699720888093776" +
    "65727333001053367881220235421809751254540594752243" +
    "52584907711670556013604839586446706324415722155397" +
    "53697817977846174064955149290862569321978468622482" +
    "83972241375657056057490261407972968652414535100474" +
    "82166370484403199890008895243450658541227588666881" +
    "16427171479924442928230863465674813919123162824586" +
    "17866458359124566529476545682848912883142607690042" +
    "24219022671055626321111109370544217506941658960408" +
    "07198403850962455444362981230987879927244284909188" +
    "84580156166097919133875499200524063689912560717606" +
    "05886116467109405077541002256983155200055935729725" +
    "71636269561882670428252483600823257530420752963450";
  number = number.split("");
  let largest = 0;
  for (let a = 0; a < number.length - n; a++) {
    let slice = number.slice(a, a + n);
    if (slice.includes(0)) {
      continue;
    }
    let product = slice.reduce((t, v) => t * v, 1);
    if (product > largest) {
      largest = product;
    }
  }
  return largest;
};

console.log("001: " + p001(1000));
console.log("002: " + p002(4000000));
console.log("003: " + p003(600851475143));
console.log("004: " + p004(3));
console.log("005: " + p005(20));
console.log("006: " + p006(100));
console.log("007: " + p007(10001));
console.log("008: " + p008(13));
