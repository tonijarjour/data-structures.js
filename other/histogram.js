const histRect = (histogram) => {
  if (!histogram || histogram.length === 0) return 0;

  let minVal = Math.min(...histogram);
  let minArea = minVal * histogram.length;

  let leftArea = histRect(histogram.slice(0, histogram.indexOf(minVal)));
  let rightArea = histRect(histogram.slice(histogram.indexOf(minVal) + 1));

  if (leftArea > minArea) minArea = leftArea;
  if (rightArea > minArea) minArea = rightArea;

  return minArea;
};

console.log(histRect([3, 2, 4, 5, 7, 6, 3, 8, 9, 11, 10, 7, 5, 2, 6]));
