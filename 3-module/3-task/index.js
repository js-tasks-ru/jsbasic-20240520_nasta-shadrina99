function camelize(str) {
  const wordsArr = str.split('-');
  const changedWordsArr = wordsArr.map(word => {
    if (word && str.includes(`-${word}`)) {
      const lettersArr =  word.split('');
      lettersArr.splice(0, 1, word[0].toUpperCase());
      return lettersArr.join('');
    }
    return word;
  });
  const result = changedWordsArr.join('');
  return result;
}