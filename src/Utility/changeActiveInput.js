const getNextActiveInput = (currentRoundClues) => {
  const nextActiveWord = currentRoundClues.find(({ guess }) => guess === '');
  const indexOfNextWord = currentRoundClues.indexOf(nextActiveWord);

  if (indexOfNextWord != -1) {
    document.querySelector(`[name="${indexOfNextWord}"]`).focus();
  }

  return indexOfNextWord;
}

export { getNextActiveInput };
