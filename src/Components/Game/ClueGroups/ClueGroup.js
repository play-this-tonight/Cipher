import React from 'react';

const joinChildConceptsFromGuesses = (guesses) => guesses.map(({ childConcept }) => childConcept).join(",  ");

// const AnswerGroup = ({ answers }) => {
//   return (
//     <div className="row between-xs">
//       <div className="col-xs-10">
//         <Answers
//       </div>
//     </div>
//       )
//     }

const ClueGroup = ({ guessNumber, currentRoundClues, lastRound, correctAnswers, incorrectAnswers }) => {
  let highlight = "";
  // if (currentWord.length > 0) highlight = "highlight";

  const currentGuesses = currentRoundClues
    .filter(({ guess }) => guess == guessNumber);

  return (
    <div className="col-xs-8 col-sm-4 clueGroup">
      <header>
        <h4 className="col-xs-2 clueGroupTitle">Group {guessNumber}</h4>
        <p className="col-xs-8 emphasize">{currentGuesses ? joinChildConceptsFromGuesses(currentGuesses) : null}</p>
      </header>
      <section>

      </section>
      <div className="row">
        <h5 className="col-xs-12">
          Correct Answers
        </h5>
        <div className="col-xs-12">{joinChildConceptsFromGuesses(correctAnswers)}</div>
      </div>
      <div className="row">
        <div className="incorrectAnswerGroup">
          <h5 className="col-xs-12">
            Incorrect Answers
          </h5>
          <p className="col-xs-12">{joinChildConceptsFromGuesses(incorrectAnswers)}</p>
        </div>
      </div>
    </div>
  )
}

export default ClueGroup;
