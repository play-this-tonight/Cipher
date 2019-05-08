const sortGuesses = (guesses) => {
  const answerGiven = guesses.filter(({ parentConceptId }) => parentConceptId);
  const answerNotGiven = guesses.filter(({ parentConceptId }) => !parentConceptId);


  return {
    answerGiven,
    answerNotGiven,
  }
}


export {
  sortGuesses
};
