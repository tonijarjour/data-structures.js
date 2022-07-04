const binarySearch = (arr, target) => {
  if (target < arr[0] || target > arr[arr.length - 1]) return -1;
  if (arr.length === 1 && arr[0] !== target) return -1;
  if (arr[0] === target) return 0;
  if (arr[arr.length - 1] === target) return arr.length - 1;

  let mid = Math.floor(arr.length / 2);

  if (arr[mid] === target) return mid;

  while (mid !== 0 && mid !== arr.length - 1) {
    if (target < arr[mid]) mid = Math.floor(mid / 2);
    else if (target > arr[mid]) mid = Math.ceil(mid * 1.5);

    if (arr[mid] === target) return mid;
  }
  return -1;
};
