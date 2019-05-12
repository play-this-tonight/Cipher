import React from 'react';
import { roundClue, lockBox, lock, lockCorrect, lockIncorrect, lockLine, spin0, spin1, spin2, spin3, spin4, spin5 } from './RoundClues.module.css';
import WordSelect from './WordSelect/index';

const Lock = ({ spinCounter = '', lockNumber, correctAnswer }) => (
  <div className={`${lock} lock-${lockNumber} ${spinCounter}`}>
    <div className={`${lockLine} ${correctAnswer} `}></div>
  </div>
)

const getCorrectAnswer = ({ isCorrect }) => {
  if (isCorrect === null) return '';

  return isCorrect ? lockCorrect : lockIncorrect;
}

const getSpinString = ({ guess = null }) => {
  if (!guess) return [spin0];

  const spins = {
    0: spin0,
    1: spin1,
    2: spin2,
    3: spin3,
    4: spin4,
    5: spin5,
  }
  return spins[guess];
}

const RoundClue = ({ clue, index, indexedSetGuess, invalid = '', setIndexOfNextWord, isCorrect, roundSize }) => (
  <div className={roundClue + ' ' + getCorrectAnswer(clue)}>
    <div className={lockBox}>
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
