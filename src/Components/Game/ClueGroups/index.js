import React, { Fragment } from 'react';
import ClueGroup from './ClueGroup';
import { sortGuesses } from './sortGuesses';
import styles from './ClueGroups.module.css';

const guessedButNotAnswered = (
  isCorrect,
  guess,
  currentNumber,
  answer = null,
) => (answer === null && !isCorrect && guess === currentNumber)

const ClueGroups = ({ otherRoundClues, currentRoundClues, currentRound }) => {
  return (
    <div className={styles.clueGroups}>
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
