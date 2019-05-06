import React, { Fragment } from 'react';
import { sortGuesses } from '../../Utility/sortGuesses';

const GuessDisplay = ({ guessNumber, guesses, hoveredRound, currentWord }) => {
  let highlight = "";
  if (currentWord.length > 0) highlight = "highlight";
  return (
    <div className={`col-sm-2 col-xs-12 otherRoundClues`}>
      <div className="row">
        <div className="col-xs-12">
          <div className="row">
            <h4 className="col-xs-1">{guessNumber}</h4>
            {/* <div className="col-xs-11">
              <div className="row">
                <label>Hypothesis</label>
              </div>
              <div className="row">
                <input className="row" />
              </div>
            </div> */}
          </div>
        </div>
        <ul className="col-xs-11 guessedWordList">
          {
            sortGuesses(guesses).map(({ childConcept, isCorrect, parentConceptId, gameRound }) => (
              <GuessedWord
                key={childConcept}
                childConcept={childConcept}
                isCorrect={isCorrect}
                parentConceptId={parentConceptId}
                gameRound={gameRound}
                hoveredRound={hoveredRound}
              />
            ))
          }
          {currentWord.length > 0 ? currentWord.map(({ childConcept }) => <li className="col-xs-11 emphasize">{childConcept} ?</li>) : null}
        </ul>
      </div>
    </div>
  )
}

const GuessedWord = ({ childConcept, isCorrect, parentConceptId, gameRound, hoveredRound }) => {
  const showHover = () => {
    if (hoveredRound.indexOf(gameRound) !== -1) return 'hovered';
    if (hoveredRound.length > 0) return 'faded';
    return '';
  }

  const cX = () => {
    if (parentConceptId === '') {
      return "strikethrough";
    }
    if (!isCorrect) {
      return "incorrect";
    }
    return "correct";
  }

  const addX = () => {
    if (!isCorrect && parentConceptId) return <span>x</span>;
    return null;
  }

  return (
    <li
      className={`${cX()} ${showHover()} previousGuess`}
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

const Guesses = ({ otherRoundClues, hoveredRound, currentRoundClues }) => {
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
                hoveredRound={hoveredRound}
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
