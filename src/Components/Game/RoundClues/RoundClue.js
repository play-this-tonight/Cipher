import React from 'react';
import { roundClue } from './RoundClues.module.css';
import WordSelect from './WordSelect/index';

const Lock = ({ spinCounter = '', lockNumber, correctAnswer }) => (
  <div className={`lock lock-${lockNumber} ${spinCounter}`}>
    <div className={`lockLine ${correctAnswer}`}></div>
  </div>
)

const getCorrectAnswer = ({ isCorrect }) => {
  if (isCorrect === null) return '';

  return isCorrect ? 'lock-correct' : 'lock-incorrect';
}

const getSpinString = ({ guess = null }) => {
  if (!guess) return 'spin-0';

  return `spin-${guess}`;
}

const RoundClue = ({ clue, index, indexedSetGuess, invalid = '', setIndexOfNextWord, isCorrect, roundSize }) => (
  <div className={roundClue}>
    <div className="lockBox">
      <Lock
        spinCounter={getSpinString(clue)}
        lockNumber={index + 1}
        correctAnswer={getCorrectAnswer(clue)}
      />
    </div>
    <p className="roundClue">{clue.childConcept}</p>
    <WordSelect indexedSetGuess={indexedSetGuess} clue={clue} index={index} />
    {
      invalid !== ''
        ? <p className="validation-error">{invalid}</p>
        : null
    }

  </div>
)

export default RoundClue;
