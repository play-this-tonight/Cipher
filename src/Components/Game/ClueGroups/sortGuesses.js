const sortGuesses = (guesses, parentClueIndex) => {
  const correctAnswers = guesses.filter(({ parentConceptId }) => parentConceptId && parentClueIndex === parentConceptId);
  const incorrectAnswers = guesses.filter(({ isCorrect, guess }) => !isCorrect && guess === parentClueIndex);


  return {
    correctAnswers,
    incorrectAnswers,
  }
}


export {
  sortGuesses
};
