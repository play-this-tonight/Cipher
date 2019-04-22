import React, { Fragment } from 'react';
import { hoverToDiscover } from '../../Utility/hoverToDiscover';


// {
//   guesses.length > 0
//     ? <span>
//       [{guessesToSort
//         .sort((guessA, guessB) => guessA.locationInSequence - guessB.locationInSequence)
//         .map(({ guess, word }) => (word + ` (${guess})`)).join(",")
//       }]
//           </span>
//     : null
// }

const getSequenceString = (currentGuesses) => {
  currentGuesses.sort((guessA, guessB) => guessA.locationInSequence - guessB.locationInSequence)

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

const getGuessedWords = (guessedWords, round, currentRoundWords = []) => {

  const guessedArray = guessedWords.filter(({ roundNumber }) => roundNumber === round);

  if (guessedArray.length > 0) return guessedArray.map(({ answer }) => answer || "_");

  return currentRoundWords.map(({ guess }) => guess || "_");
}

const RoundTracker = ({ roundArray, guessedWords, correctGuesses, incorrectGuesses, setHoveredRound, currentRoundWords }) => {
  return (
    <Fragment>
      <h4>Rounds</h4>
      <ul>
        <li>Correct: {correctGuesses}</li>
        <li>Incorrect: {incorrectGuesses}</li>
      </ul>
      <ul className="roundCountContainer">
        {
          roundArray.map((round) => (
            <RoundDetails
              key={round}
              round={round}
              guesses={getGuessedWords(guessedWords, round, currentRoundWords)}
              setHoveredRound={setHoveredRound}
            />))
        }
      </ul>
    </Fragment>
  );
}

export default RoundTracker;
