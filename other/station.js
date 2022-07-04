const gasStations = (gas, cost) => {
  let remaining = 0;
  let prevRem = 0;
  let candidate = -1;

  for (let i = 0; i < gas.length; ++i) {
    remaining += gas[i] - cost[i];
    if (remaining < 0) {
      prevRem += remaining;
      remaining = 0;
      candidate = i + 1;
      continue;
    }
  }

  if (candidate === gas.length || remaining + prevRem < 0) return -1;

  return candidate;
};

console.log(
  gasStations([1, 5, 3, 3, 5, 3, 1, 3, 4, 5], [5, 2, 2, 8, 2, 4, 2, 5, 1, 2])
);
