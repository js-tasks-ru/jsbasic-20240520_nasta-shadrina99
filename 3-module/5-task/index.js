function getMinMax(str) {
  let result = {};
  const partsOfStr = str.split(' ');
  const numbers = partsOfStr.filter(item => isFinite(item));
  numbers.sort((a, b) => a - b);
  result.min = +numbers[0];
  result.max = +numbers[numbers.length - 1];
  return result;
}

