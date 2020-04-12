const filterGuessesInWordGroup = (guesses, parentClueIndex) => {
  return guesses.filter(({ guess }) => guess === parentClueIndex);
};

const filterHypothesesInWordGroup = (guesses, parentClueIndex) => {
  return guesses.filter(({ hypothesis }) => hypothesis === parentClueIndex);
};

const filterCurrentRoundGuessesInWordGroup = (guesses, parentClueIndex) => {
  return guesses.filter(
    ({ guess }) => Number.parseInt(guess, 10) === parentClueIndex
  );
};

export {
  filterCurrentRoundGuessesInWordGroup,
  filterGuessesInWordGroup,
  filterHypothesesInWordGroup,
};
