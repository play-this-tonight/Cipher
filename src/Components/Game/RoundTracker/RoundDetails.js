import React from 'react';
import RoundConcept from './RoundConcept';
import { roundTrackerDetail } from './index.module.css';

const sortGuesses = (currentGuesses) => {
  const guessesToSort = [...currentGuesses];
  guessesToSort.sort((guessA, guessB) => guessA.sequenceLocation - guessB.sequenceLocation)

  return guessesToSort;
}

const RoundDetails = ({ round, guesses, setHoveredRound }) => {
  // hoverToDiscover(round);
  return (
    <li
      className={roundTrackerDetail}
      onMouseOver={() => setHoveredRound([round])}
      onMouseOut={() => setHoveredRound([])}
    >
      <p>Round {round}</p>
      {sortGuesses(guesses).map((props, index) => (
        <RoundConcept
          key={index}
          {...props}
        />
      ))
      }
    </li>

  );
}

export default RoundDetails;
