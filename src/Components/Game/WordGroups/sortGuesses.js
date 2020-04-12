const filterGuessedThisRound = (guesses, parentClueIndex) => {
  const filteredGuesses = guesses.filter(
    ({ guess }) => guess === parentClueIndex
  );

  return filteredGuesses.sort(
    ({ isCorrect: aC }, { isCorrect: bC }) => bC - aC
  );
};

export { filterGuessedThisRound };
