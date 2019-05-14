import React, { Fragment } from 'react';
import { clueGroup, clueGroupHeader, showHoveredRound, roundGuessGroup, hideIncorrect, correctAnswer, currentGuessStyle } from './ClueGroups.module.css';
import cx from 'classnames';

const joinChildConceptsFromGuesses = (guesses) => guesses.map(({ childConcept }) => childConcept).join(",  ");

const ChildConcepts = ({ concepts, hoveredRound }) => {
  return (
    // gameRound === hoveredRound ? showHoveredRound : null
    <Fragment>
      {
        concepts.map(({ childConcept, gameRound, isCorrect }, index, concepts) => (
          <li
            key={childConcept}
            className={cx({
              [showHoveredRound]: (gameRound === hoveredRound),
              [hideIncorrect]: (!isCorrect),
              [correctAnswer]: isCorrect,
            })}
          >{childConcept}</li>
        ))
      }
    </Fragment>
  )
}

const ClueGroup = ({ guessNumber, currentRoundClues, lastRound, roundGuesses, hoveredRound }) => {
  const currentGuesses = currentRoundClues
    .filter(({ guess }) => guess == guessNumber);

  console.log(currentGuesses);
  return (
    <div className={clueGroup}>
      <header className={clueGroupHeader}>
        <h3>Group {guessNumber}</h3>
      </header>
      <ul
        className={roundGuessGroup}
      >
        {
          currentGuesses.length ?
            currentGuesses.map(({ childConcept }) => (
              <li
                key={childConcept}
                className={currentGuessStyle}
              >{childConcept}</li>)
            ) :
            null
        }
        <ChildConcepts
          concepts={roundGuesses}
          hoveredRound={hoveredRound}
        />
      </ul>
    </div >
  )
}

export default ClueGroup;
