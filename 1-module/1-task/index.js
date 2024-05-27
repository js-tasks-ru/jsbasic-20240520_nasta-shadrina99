function factorial(n) {
  let result = 1;
  let currentFactor;

  for (let i = 0; i <= n; i++) {
    debugger;
    currentFactor = i !== 0 ? i : 1;
    result = result * currentFactor;
  }

  return result;
}
