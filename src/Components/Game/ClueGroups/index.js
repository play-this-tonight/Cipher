import React, { Fragment } from 'react';
import ClueGroup from './ClueGroup';
import { sortGuesses } from './sortGuesses';

const guessedButNotAnswered = (
  isCorrect,
  guess,
  currentNumber,
  answer = null,
) => (answer === null && !isCorrect && guess === currentNumber)

const ClueGroups = ({ otherRoundClues, currentRoundClues, currentRound }) => {
  return (
    <div className="row around-sm previousGuesses">
      {
        [1, 2, 3, 4, 5].map((parentClueIndex) => {
          const { correctAnswers, incorrectAnswers } = sortGuesses(otherRoundClues, parentClueIndex);
          return (<ClueGroup
            key={parentClueIndex}
            guessNumber={parentClueIndex}
            currentRoundClues={currentRoundClues}
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
          />)
        })
      }
    </div>
  );
}

export default ClueGroups;
