function sumSalary(salaries) {
  let sum = 0;
  let currentvalue;

  for (let key in salaries) {
    currentvalue = salaries[key];

    if (typeof currentvalue === 'number' && isFinite(currentvalue)) {
      sum += currentvalue;
    }
  }

  return sum;
}