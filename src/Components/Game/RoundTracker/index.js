import React, { Fragment } from 'react';
import { hoverToDiscover } from '../../../Utility/hoverToDiscover';
import RoundDetails from './RoundDetails';

const RoundTracker = ({ currentRound, otherRoundClues, setHoveredRound }) => {
  const roundArray = Array.apply(null, { length: currentRound - 1 }).map((item, i) => i + 1);
  console.log(otherRoundClues);
  return (
    <ol className="row">
      {
        roundArray.map((round) => (
          <RoundDetails
            key={round}
            round={round}
            guesses={otherRoundClues.filter(({ gameRound }) => gameRound === round)}
            setHoveredRound={setHoveredRound}
          />))
      }
      {/* <RoundDetails
      round={currentRound}
      guesses={getCurrentRoundGuessSequence(currentRoundClues)}
      setHoveredRound={setHoveredRound}
    /> */}
    </ol>
  );
}

export default RoundTracker;
