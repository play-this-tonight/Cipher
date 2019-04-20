const getNextActiveInput = (currentRoundWords) => {
  const nextActiveWord = currentRoundWords.find(({ guess }) => guess === '');
  const indexOfNextWord = currentRoundWords.indexOf(nextActiveWord);

  if (indexOfNextWord != -1) {
    document.querySelector(`[name="${indexOfNextWord}"]`).focus();
  }

  return indexOfNextWord;
}

export { getNextActiveInput };
