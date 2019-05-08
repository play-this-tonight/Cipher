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

const sortGuesses = (currentGuesses) => {
  const guessesToSort = [...currentGuesses];
  guessesToSort.sort((guessA, guessB) => guessA.sequenceLocation - guessB.sequenceLocation)

  return guessesToSort;
}

const getSequenceString = (currentGuesses) => {


  return `[${currentGuesses.join(", ")}]`;
}

const RoundDetails = ({ round, guesses, setHoveredRound }) => {
  hoverToDiscover(round);
  console.log(guesses);
  return (
    <li
      className="roundDetail col-xs-12"
      onMouseOver={() => setHoveredRound([round])}
      onMouseOut={() => setHoveredRound([])}
    >
      <section className="row">
        <p className="col-xs-12 round-title">Round {round}</p>
        {
          sortGuesses(guesses).map(({ childConcept }) => (
            <var className="col-xs-12">
              {childConcept}
            </var>
          ))
        }
      </section>
    </li>

  );
}

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
