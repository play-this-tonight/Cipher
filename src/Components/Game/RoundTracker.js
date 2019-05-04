import React, { Fragment } from 'react';
import { hoverToDiscover } from '../../Utility/hoverToDiscover';


// {
//   guesses.length > 0
//     ? <span>
//       [{guessesToSort
//         .sort((guessA, guessB) => guessA.sequenceLocation - guessB.sequenceLocation)
//         .map(({ guess, word }) => (word + ` (${guess})`)).join(",")
//       }]
//           </span>
//     : null
// }

const getSequenceString = (currentGuesses) => {
  currentGuesses.sort((guessA, guessB) => guessA.sequenceLocation - guessB.sequenceLocation)

  return `[${currentGuesses.join(", ")}]`;
}

const RoundDetails = ({ round, guesses, setHoveredRound }) => {
  hoverToDiscover(round);
  return (
    <li
      className="roundDetail"
      onMouseOver={() => setHoveredRound([round])}
      onMouseOut={() => setHoveredRound([])}
    >
      {round} {getSequenceString(guesses)}
    </li>

  );
}

const getGuessedWordSequence = (otherRoundClues, round) => (
  otherRoundClues
    .filter(({ gameRound }) => gameRound === round)
    .map(({ guess }) => guess)
);

const getCurrentRoundGuessSequence = (currentRoundClues) => currentRoundClues.map(({ guess }) => guess || "_");

const RoundTracker = ({ currentRound, otherRoundClues, correctGuessCount, incorrectGuessCount, setHoveredRound, currentRoundClues }) => {
  const roundArray = Array.apply(null, { length: currentRound - 1 }).map((item, i) => i + 1);

  return (
    <Fragment>
      <h4>Rounds</h4>
      <ul>
        <li>Correct: {correctGuessCount}</li>
        <li>Incorrect: {incorrectGuessCount}</li>
      </ul>
      <ul className="roundCountContainer">
        {
          roundArray.map((round) => (
            <RoundDetails
              key={round}
              round={round}
              guesses={getGuessedWordSequence(otherRoundClues, round)}
              setHoveredRound={setHoveredRound}
            />))
        }
        <RoundDetails
          round={currentRound}
          guesses={getCurrentRoundGuessSequence(currentRoundClues)}
          setHoveredRound={setHoveredRound}
        />
      </ul>
    </Fragment>
  );
}

export default RoundTracker;
