import words from './words';

let currentArray = [];
let currentRound = 0;

const generateAnswerList = () => {
  const possibleAnswers = [1, 2, 3, 4];
  possibleAnswers.sort(() => 0.5 - Math.random());

  return possibleAnswers.slice(0, 3);
}

const getWordValue = () => {
  if (currentArray.length === 0) {
    currentRound++;
    currentArray = generateAnswerList();
  }

  return {
    answer: currentArray.pop(),
  }
}

const assignValueToWord = (wordAnswers, word) => {
  const wordValue = getWordValue();
  if (!Object.keys(wordAnswers).includes(currentRound.toString())) {
    wordAnswers[currentRound] = [];
  }
  wordAnswers[currentRound].push({
    ...wordValue,
    word,
  });

  return wordAnswers;
};

const newWords = words
  .split("\n")
  .sort(() => 0.5 - Math.random())
  .reduce(assignValueToWord, {});

const wordFind = (userWord) => ({ word }) => (userWord === word);

const checkAnswers = (roundNumber, userAnswers) => (
  userAnswers.map(({ word, guess }, index) => ({
    word,
    guess,
    locationInSequence: index + 1,
    correct: newWords[roundNumber].find(wordFind(word)).answer === guess,
    roundNumber,
  }))
)

const getCluesForRound = (roundNumber) => (
  newWords[roundNumber].map(({ word }) => word)
)

export {
  checkAnswers,
  getCluesForRound,
};
