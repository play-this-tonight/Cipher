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
    // <div className={`otherRoundClues`}>
    //   <div className="row conceptGroup">
    //     <h4 className="col-xs-1">{guessNumber}</h4>
    //     {currentWord.length > 0 ? currentWord.map(({ childConcept }) => <span className="emphasize col-xs-6">{childConcept} ?</span>) : null}
    //   </div>
    //   <div className="row">
    //     <div className="col-xs-6">
    //       <span>Answers</span>
    //       <ul>
    //         {
    //           answerGiven.map(({ childConcept, isCorrect, parentConceptId, gameRound }) => (
    //             <GuessedWord
    //               key={childConcept}
    //               childConcept={childConcept}
    //               isCorrect={isCorrect}
    //               parentConceptId={parentConceptId}
    //               gameRound={gameRound}
    //               lastRound={lastRound}
    //             />
    //           ))
    //         }
    //       </ul>

    //     </div>
    //     <div className="col-xs-6">
    //       <span>Incorrect Guesses</span>
    //       <ul>
    //         {
    //           answerNotGiven.map(({ childConcept, isCorrect, parentConceptId, gameRound }) => (
    //             <GuessedWord
    //               key={childConcept}
    //               childConcept={childConcept}
    //               isCorrect={isCorrect}
    //               parentConceptId={parentConceptId}
    //               gameRound={gameRound}
    //               lastRound={lastRound}
    //             />
    //           ))
    //         }
    //       </ul>

    //     </div>
    //   </div>
    // </div>
  )
}

const GuessedWord = ({ childConcept, isCorrect, parentConceptId, gameRound, lastRound }) => {
  const cX = () => {
    if (parentConceptId === '') {
      return "strikethrough";
    }
    if (!isCorrect) {
      return "incorrect";
    }
    return "correct";
  }

  const isLastRound = () => {
    if (gameRound === lastRound) return 'mostRecentRound';
    return '';
  }

  const addX = () => {
    if (isCorrect) return <span>✔️</span>
    if (!isCorrect && parentConceptId) return <span>x</span>;
    return null;
  }

  return (
    <li
      className={`${cX()} ${isLastRound()} previousGuess`}
    >{addX()} {childConcept}</li>
  );
}

export default ClueGroup;
