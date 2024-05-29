function checkSpam(str) {
  const spamWords1 = '1xBet';
  const spamWords2 = 'XXX';
  return str.toLowerCase().includes(spamWords1.toLowerCase()) || str.toLowerCase().includes(spamWords2.toLowerCase());
}
