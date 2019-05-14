import React from 'react';
import RoundConcept from './RoundConcept';
import { roundTrackerDetail } from './index.module.css';

// const sortGuesses = (currentGuesses) => {
//   const guessesToSort = [...currentGuesses];
//   guessesToSort.sort((guessA, guessB) => guessA.sequenceLocation - guessB.sequenceLocation)

//   return guessesToSort;
// }

const guessToCorrectIncorrect = (guesses) => guesses.map(({ isCorrect }) => (isCorrect ? '✓' : 'X'));

const RoundDetails = ({ round, guesses, setHoveredRound }) => {
  return (
    <li
      className={roundTrackerDetail}
      onMouseOver={() => setHoveredRound([round])}
      onMouseOut={() => setHoveredRound([])}
    >
      <p>Round {round} [{guessToCorrectIncorrect(guesses)}]</p>
    </li>
  );
}

export default RoundDetails;
