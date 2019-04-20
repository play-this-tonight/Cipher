const getNextActiveInput = (currentRoundWords) => {
  console.log(currentRoundWords);
  const nextActiveWord = currentRoundWords.find(({ guess }) => guess === null);
  const indexOfNextWord = currentRoundWords.indexOf(nextActiveWord);

  console.log(nextActiveWord);
  console.log(indexOfNextWord);

  if (indexOfNextWord != -1) {
    document.querySelector(`[name="${indexOfNextWord}"]`).focus();
  }

  return indexOfNextWord;
}

export { getNextActiveInput };
