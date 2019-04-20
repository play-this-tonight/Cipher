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

const RoundTracker = ({ roundArray, guessedWords, correctGuesses, incorrectGuesses }) => {
  return (
    <sidebar className="col-xs-3 col-md-1 center-xs">
      <h4>Rounds</h4>
      <ul>
        <li>Correct: {correctGuesses}</li>
        <li>Incorrect: {incorrectGuesses}</li>
      </ul>
      <ul className="roundCountContainer">
        {
          roundArray.map((round) => <RoundDetails round={round} guesses={getGuessedWords(guessedWords, round)} />)
        }
      </ul>
    </sidebar>
  );
}

export default RoundTracker;
