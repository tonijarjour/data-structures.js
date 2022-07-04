const firstLast = (arr, target) => {
  let result = [-1, -1];

  for (let i = 0; i < arr.length; ++i) {
    if (result[0] === -1 && arr[i] === target) result[0] = i;
    if (result[0] !== -1 && result[1] === -1 && arr[i] !== target) {
      result[1] = i - 1;
      break;
    }
  }

  if (result[0] !== -1 && result[1] === -1) result[1] = result[0];

  return result;
};

console.log(firstLast([1, 2, 3, 3, 3, 4, 5], 3));
