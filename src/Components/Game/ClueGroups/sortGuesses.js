const sortGuesses = (guesses, parentClueIndex) => {
  const correctAnswers = guesses.filter(({ parentConceptId }) => parentConceptId && parentClueIndex === parentConceptId);
  const incorrectAnswers = guesses.filter(({ isCorrect, guess }) => !isCorrect && guess === parentClueIndex);

  incorrectAnswers.sort(({ parentConceptId: aParent }, { parentConceptId: bParent }) => ((aParent || 100) - (bParent || 100)));
  // groups like answers together for people abd shoves undefineds to the back.

  return {
    correctAnswers,
    incorrectAnswers,
  }
}

const filterGuessedThisRound = (guesses, parentClueIndex) => {
  const filteredGuesses = guesses.filter(({ guess }) => guess === parentClueIndex);

  return filteredGuesses.sort(({ isCorrect: aC }, { isCorrect: bC }) => bC - aC);
}


export {
  sortGuesses,
  filterGuessedThisRound
};
