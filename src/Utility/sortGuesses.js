const sortGuesses = (guesses) => {
  const correct = guesses.filter(({ isCorrect }) => isCorrect);
  const hintGiven = guesses.filter(({ isCorrect, parentConceptId }) => isCorrect === false && parentConceptId);
  const incorrect = guesses.filter(({ parentConceptId }) => !parentConceptId);

  return [
    ...correct,
    ...hintGiven,
    ...incorrect
  ];
}


export {
  sortGuesses
};
