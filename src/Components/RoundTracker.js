import React from 'react';


const RoundDetails = ({ round, guesses }) => {
  const guessesToSort = [...guesses];
  return (
    <li
      className="roundDetail"
    >
      {round}
      {
        guesses.length > 0
          ? <span>
            [{guessesToSort
              .sort((guessA, guessB) => guessA.locationInSequence - guessB.locationInSequence)
              .map(guess => guess.guess).join(",")
            }]
          </span>
          : null
      }
    </li>

  );
}

const getGuessedWords = (guessedWords, round) => guessedWords.filter(word => word.roundNumber === round)

const RoundTracker = ({ roundArray, guessedWords }) => {
  return (
    <sidebar class="col-xs-3 col-lg-1 center-xs">
      <h4>Rounds</h4>
      <ul className="roundCountContainer">
        {
          roundArray.map((round) => <RoundDetails round={round} guesses={getGuessedWords(guessedWords, round)} />)
        }
      </ul>
    </sidebar>
  );
}

export default RoundTracker;
