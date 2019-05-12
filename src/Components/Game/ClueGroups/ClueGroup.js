import React, { Fragment } from 'react';
import { clueGroup, clueGroupHeader, correctGuesses, incorrectGuesses, showHoveredRound } from './ClueGroups.module.css';

const joinChildConceptsFromGuesses = (guesses) => guesses.map(({ childConcept }) => childConcept).join(",  ");

const ChildConcepts = ({ concepts, hoveredRound }) => {
  return (
    <Fragment>
      {
        concepts.map(({ childConcept, gameRound }) => (
          <span
            key={childConcept}
            className={gameRound === hoveredRound ? showHoveredRound : null}
          >{childConcept}, </span>
        ))
      }
    </Fragment>
  )
}

const ClueGroup = ({ guessNumber, currentRoundClues, lastRound, correctAnswers, incorrectAnswers, hoveredRound }) => {
  let highlight = "";
  // if (currentWord.length > 0) highlight = "highlight";
  const currentGuesses = currentRoundClues
    .filter(({ guess }) => guess == guessNumber);

  return (
    <div className={clueGroup}>
      <header className={clueGroupHeader}>
        <h3>Group {guessNumber}</h3>
        <p>{currentGuesses ? joinChildConceptsFromGuesses(currentGuesses) : null}</p>
      </header>
      {
        correctAnswers.length ?
          <section className={correctGuesses}>
            <p><ChildConcepts concepts={correctAnswers} hoveredRound={hoveredRound} /></p>
            <i className="la la-check-circle"></i>
          </section>
          : null
      }
      {
        incorrectAnswers.length ?
          <section className={incorrectGuesses}>
            <p><ChildConcepts concepts={incorrectAnswers} hoveredRound={hoveredRound} /></p>
            <p><i className="la la-times-circle-o" /></p>
          </section>
          : null
      }
    </div >
  )
}

export default ClueGroup;
