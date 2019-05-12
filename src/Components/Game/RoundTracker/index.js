import React, { Fragment } from 'react';
import { hoverToDiscover } from '../../../Utility/hoverToDiscover';
import RoundDetails from './RoundDetails';
import { roundTracker } from './index.module.css';

const RoundTracker = ({ currentRound, otherRoundClues, setHoveredRound }) => {
  const roundArray = Array.apply(null, { length: currentRound - 1 }).map((item, i) => i + 1);
  return (
    <ol className={roundTracker}>
      {
        roundArray.map((round) => (
          <RoundDetails
            key={round}
            round={round}
            guesses={otherRoundClues.filter(({ gameRound }) => gameRound === round)}
            setHoveredRound={setHoveredRound}
          />))
      }
    </ol>
  );
}

export default RoundTracker;
