import React, { Fragment } from 'react';
import { sortGuesses } from '../../Utility/sortGuesses';

const GuessDisplay = ({ guessNumber, guesses, currentRound, currentWord, lastRound }) => {
  let highlight = "";
  if (currentWord.length > 0) highlight = "highlight";

  const { answerGiven, answerNotGiven } = sortGuesses(guesses);


  return (
    <div className={`otherRoundClues`}>
      <div className="row conceptGroup">
        <h4 className="col-xs-1">{guessNumber}</h4>
        {currentWord.length > 0 ? currentWord.map(({ childConcept }) => <span className="emphasize col-xs-6">{childConcept} ?</span>) : null}
      </div>
      <div className="row">
        <div className="col-xs-6">
          <span>Answers</span>
          <ul>
            {
              answerGiven.map(({ childConcept, isCorrect, parentConceptId, gameRound }) => (
                <GuessedWord
                  key={childConcept}
                  childConcept={childConcept}
                  isCorrect={isCorrect}
                  parentConceptId={parentConceptId}
                  gameRound={gameRound}
                  lastRound={lastRound}
                />
              ))
            }
          </ul>

        </div>
        <div className="col-xs-6">
          <span>Incorrect Guesses</span>
          <ul>
            {
              answerNotGiven.map(({ childConcept, isCorrect, parentConceptId, gameRound }) => (
                <GuessedWord
                  key={childConcept}
                  childConcept={childConcept}
                  isCorrect={isCorrect}
                  parentConceptId={parentConceptId}
                  gameRound={gameRound}
                  lastRound={lastRound}
                />
              ))
            }
          </ul>

        </div>
      </div>
    </div>
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

const getGuessedWord = (
  otherRoundClues,
  parentClueIndex,
) => {
  return otherRoundClues.filter(
    ({
      parentConceptId,
      guess
    }) => (
        (parentConceptId === '' && guess === parentClueIndex)
        || parentConceptId === parentClueIndex)
  )
}

const guessedButNotAnswered = (
  isCorrect,
  guess,
  currentNumber,
  answer = null,
) => (answer === null && !isCorrect && guess === currentNumber)

const Guesses = ({ otherRoundClues, currentRoundClues, currentRound }) => {
  return (
    <Fragment >
      <div className="col-xs-12">
      </div>
      <div className="col-xs-12">
        <div className="row around-sm previousGuesses">
          {
            [1, 2, 3, 4, 5].map((parentClueIndex) => (
              <GuessDisplay
                key={parentClueIndex}
                guessNumber={parentClueIndex}
                lastRound={currentRound - 1}
                currentWord={currentRoundClues.filter(({ guess }) => guess === parentClueIndex)}
                guesses={getGuessedWord(otherRoundClues, parentClueIndex)}
              />
            ))
          }
        </div>
      </div>
    </Fragment >
  );
}

export default Guesses;
