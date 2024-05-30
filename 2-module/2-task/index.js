function isEmpty(obj) {
  let numProperties = 0;

  for (let key in obj) {
    if (obj[key] || obj[key] === undefined) {
      numProperties++;
    }
  }

  return !numProperties;
}
