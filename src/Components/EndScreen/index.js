import React, { useState, useEffect, Fragment } from 'react';
import { showAnswers } from '../../Graph/showAnswers';

const sortGuesses = (guesses) => {
  const correct = guesses.filter(({ isCorrect }) => isCorrect);
  const hintGiven = guesses.filter(({ isCorrect, showAnswer }) => isCorrect === false && showAnswer === true);
  const incorrect = guesses.filter(({ showAnswer }) => showAnswer === false);



  return [
    ...correct,
    ...hintGiven,
    ...incorrect
  ];
}

const filteredGuessedWords = (otherRoundClues, currentAnswer) => (
  sortGuesses(otherRoundClues).filter(({ answer }) => answer === currentAnswer)
);

const GuessedWord = ({ childConcept, isCorrect, guess, showAnswer }) => {
  const cX = () => {
    if (isCorrect) return "correct";
    if (showAnswer) return "incorrect";
    return "hintNotGiven";
  }

  const addX = () => {
    if (!isCorrect) return <span>x</span>;
    return null;
  }

  const correct = () => {
    if (!isCorrect) return `(${guess})`;
    return ''
  }

  return (
    <li
      className={`${cX()} previousGuess`}
    >{addX()} {childConcept} {correct()}</li>
  );
}

const GameDetails = ({
  correctGuessCount,
  incorrectGuessCount,
  currentRound,
}) => (
    <div className="col-xs-12 gameDetails">
      <div className="row between-xs">
        <div className="col-xs-3">
          <div className="box">
            <h2>Number of Rounds</h2>
            <p>{currentRound}</p>
          </div>
        </div>
        <div className="col-xs-3">
          <div className="box">
            <h2>Incorrect Guesses</h2>
            <p>{incorrectGuessCount}</p>
          </div>
        </div>
        <div className="col-xs-3">
          <div className="box">
            <h2>Correct Guesses</h2>
            <p>{correctGuessCount}</p>
          </div>
        </div>
      </div>
    </div>
  );


const EndGame = () => {
  const [loading, setLoading] = useState(true);
  const [finalGameState, setFinalGameState] = useState({});
  console.log(finalGameState);

  useEffect(
    () => {
      async function fetchAnswers() {
        const finalGameState = await showAnswers();
        setFinalGameState(finalGameState);
        setLoading(false);
      }
      fetchAnswers();
    },
    []
  );

  if (loading) return (<div>Loading...</div>);

  const {
    answers,
    otherRoundClues,
  } = finalGameState;

  return (
    <div className="row finalScreen">
      <div className="col-xs-12">
        <h1>Game Over</h1>
      </div>
      <GameDetails
        {...finalGameState}
      />
      <div className="col-xs-12">
        <div className="row between-xs">
          {
            answers.map(({ word, parentOf }) => (
              <div
                className="col-xs-2"
                key={parentOf}
              >
                <h3>{word}</h3>
                <ul>
                  {
                    filteredGuessedWords(otherRoundClues, parentOf).map(({ childConcept, isCorrect, guess, showAnswer }) => (
                      <GuessedWord
                        childConcept={childConcept}
                        isCorrect={isCorrect}
                        guess={guess}
                        showAnswer={showAnswer}
                      />
                    ))
                  }
                </ul>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default EndGame;
