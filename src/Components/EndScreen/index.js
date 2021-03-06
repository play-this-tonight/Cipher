import React, { useState, useEffect } from 'react';
import { showAnswers } from '../../Graph/showAnswers';
import { gameDetails, wordDetails } from './index.module.css';

const sortGuesses = (guesses) => {
  const correct = guesses.filter(({ isCorrect }) => isCorrect);
  const hintGiven = guesses.filter(({ isCorrect, showAnswer }) => isCorrect === false && showAnswer);
  const incorrect = guesses.filter(({ isCorrect, showAnswer }) => isCorrect === false && !showAnswer);

  return [
    ...correct,
    ...hintGiven,
    ...incorrect
  ];
}

const filteredGuessedWords = (otherRoundClues, parentConceptId) => (
  sortGuesses(otherRoundClues).filter(({ parentConceptId: clueParentConceptId }) => parentConceptId === clueParentConceptId)
);

const GuessedWord = ({ childConcept, isCorrect, parentConceptId, showAnswer, userGuessedWord }) => {
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
    if (!isCorrect) return `(${userGuessedWord})`;
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
    <div className={gameDetails}>
      <h2>Number of Rounds</h2>
      <p>{correctGuessCount + incorrectGuessCount}</p>
    </div>
  );


const EndGame = ({ match: { params } }) => {
  console.log(params);
  const [loading, setLoading] = useState(true);
  const [finalGameState, setFinalGameState] = useState({});

  useEffect(
    () => {
      async function fetchAnswers() {
        const finalGameState = await showAnswers(params.gameKey);
        console.log(finalGameState);
        setFinalGameState(finalGameState);
        setLoading(false);
      }
      fetchAnswers();
    },
    []
  );



  if (loading) return (<div>Loading...</div>);

  const {
    gameAnswers,
    game,
  } = finalGameState;

  const {
    otherRoundClues
  } = game;

  const getWordFromParentAnswer = (userGuessedConceptId) => {
    // console.log(userGuessedConceptId);
    const answer = gameAnswers.find(({ parentConceptId }) => userGuessedConceptId === parentConceptId);
    // console.log(answer);
    return answer.parentConcept;
  }

  return (
    <div className="row finalScreen">
      <div className="col-xs-12">
        <h1>Game Over</h1>
      </div>
      <GameDetails
        {...game}
      />
      <div className={wordDetails}>
        {
          gameAnswers.map(({ parentConcept, parentConceptId }) => (
            <div
              className="col-xs-2"
              key={parentConcept}
            >
              <h3>{parentConcept}</h3>
              <ul>
                {
                  filteredGuessedWords(otherRoundClues, parentConceptId).map(({ childConcept, isCorrect, parentConceptId: childsParentConceptId, showAnswer, userGuessedParentConceptId }) => (
                    <GuessedWord
                      childConcept={childConcept}
                      isCorrect={isCorrect}
                      parentConceptId={childsParentConceptId}
                      showAnswer={showAnswer}
                      userGuessedWord={getWordFromParentAnswer(userGuessedParentConceptId)}
                    />
                  ))
                }
              </ul>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default EndGame;
