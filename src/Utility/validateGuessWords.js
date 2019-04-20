const noDuplicates = (currentGuessWord, guessedWords) => {
  const foundWord = guessedWords.find(({ guess }) => guess === currentGuessWord.guess);
  if (foundWord.word !== currentGuessWord.word) return 'You cannot guess the same clue twice';
  return undefined;
}

const noEmpties = ({ guess }) => {
  if (guess === '') return 'The guess cannot be empty';
  return undefined;
}

const removeInvalidProp = ({ invalid, ...rest }) => ({ ...rest })

const checkGuesses = (currentGuessWord, index, guessedWords) => {
  const emptyCheck = noEmpties(currentGuessWord);
  if (emptyCheck) {
    return {
      ...currentGuessWord,
      invalid: emptyCheck,
    }
  }
  const duplicateCheck = noDuplicates(currentGuessWord, guessedWords);
  if (duplicateCheck) {
    return {
      ...currentGuessWord,
      invalid: duplicateCheck,
    }
  }
  return removeInvalidProp(currentGuessWord);
}

export {
  checkGuesses,
}
