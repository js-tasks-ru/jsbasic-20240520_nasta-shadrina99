function ucFirst(str) {
  const firstLetter = str.length ? str[0] : '';
  return firstLetter.toUpperCase() + str.slice(1);
}
