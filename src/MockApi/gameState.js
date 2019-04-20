import { createWordCluesForRound } from './createRound';

// Game State cares about holding the overall state details
// It explicitly manages current round, correct guesses, incorrect guesses, current round clues, and previous guesses
//

let gameState = {};

const incrementCounts = (checkedAnswers) => {
  const { correctGuesses, incorrectGuesses } = gameState;
  const includesIncorrect = checkedAnswers.find(({ correct }) => correct === false)

  if (includesIncorrect) {
    return [correctGuesses, incorrectGuesses + 1];
  }
  return [correctGuesses + 1, incorrectGuesses];
}

const wrapInPromise = (fn) => () => new Promise((resolve, reject) => resolve(fn()));

const startNewGame = () => {
  gameState = {
    currentRound: 1,
    correctGuesses: 0,
    incorrectGuesses: 0,
    currentRoundWords: createWordCluesForRound(),
    guessedWords: [],
  }

  return gameState;
};
const startNewGamePromise = wrapInPromise(startNewGame);

const getGameState = () => gameState;
const getGameStatePromise = wrapInPromise(getGameState);

const setGuessedWords = (currentRoundWords) => {
  const { guessedWords } = gameState;

  const guessedAndCurrentWords = guessedWords.concat(currentRoundWords);
  const [correctGuesses, incorrectGuesses] = incrementCounts(currentRoundWords);

  gameState = {
    ...gameState,
    guessedWords: guessedAndCurrentWords,
    correctGuesses,
    incorrectGuesses,
  }
}

const createNewRound = () => {
  const { currentRound } = gameState.game;
  gameState = {
    ...gameState,
    currentRound: currentRound + 1,
    currentRoundWords: createWordCluesForRound()
  }
};

const compareGuessToAnswer = ({ word: guessWord, guess }) => {
  const { currentRoundWords } = gameState;
  const { answer } = currentRoundWords.find(({ word }) => word === guessWord);

  return answer === guess;
};


const makeGuessPromise = (guessedWords) => {
  return new Promise((resolve, reject) => {
    const { currentRoundWords } = gameState;
    if (currentRoundWords.length !== guessedWords.length) {
      throw new Error('this is incorrect');
    }

    const guessedWords = guessedWords.map((guessWord) => ({
      ...guessWord,
      isCorrect: compareGuessToAnswer(guessWord)
    }));

    setGuessedWords(guessedWords);
    createNewRound();

    resolve(guessedWords);
  })
};


export {
  startNewGamePromise,
  makeGuessPromise,
  getGameStatePromise,
};
