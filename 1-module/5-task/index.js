function truncate(str, maxlength) {
  let result;

  if (str.length > maxlength) {
    result = str.slice(0, maxlength - 1) + "…";
  } else {
    result = str;
  }

  return result;
}
