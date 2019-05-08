import React from 'react';

const joinChildConceptsFromGuesses = (guesses) => guesses.map(({ childConcept }) => childConcept).join(",  ");

const ClueGroup = ({ guessNumber, currentRoundClues, lastRound, correctAnswers, incorrectAnswers }) => {
  let highlight = "";
  // if (currentWord.length > 0) highlight = "highlight";

  const currentGuesses = currentRoundClues
    .filter(({ guess }) => guess == guessNumber);

  return (
    <div className="col-xs-12 col-sm-4">
      <div className="row">
        <h4 className="col-xs-4 clueGroupTitle">Group {guessNumber}</h4>
        <p className="col-xs-8 emphasize">{currentGuesses ? joinChildConceptsFromGuesses(currentGuesses) : null}</p>
      </div>
      <div className="row">
        <p className="col-xs-12">
          Correct Answers
        </p>
        <p className="col-xs-12">{joinChildConceptsFromGuesses(correctAnswers)}</p>
      </div>
      <div className="row">
        <p className="col-xs-12">
          Incorrect Answers
        </p>
        <p className="col-xs-12">{joinChildConceptsFromGuesses(incorrectAnswers)}</p>
      </div>
    </div>
  )
}

export default ClueGroup;
