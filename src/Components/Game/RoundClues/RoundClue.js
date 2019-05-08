import React from 'react';

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
  <div className={`inputBox col-xs-12 col-sm-${roundSize} ${getCorrectAnswer(clue)}`}>
    <div className="row align-center">
      <div className="lockBox col-xs-3">
        <Lock
          spinCounter={getSpinString(clue)}
          lockNumber={index + 1}
          correctAnswer={getCorrectAnswer(clue)}
        />
      </div>
      <div className="col-xs-3">
        <input
          name={index}
          className={`guess word-${index + 1}`}
          type="integer"
          maxLength="1"
          onChange={(e) => indexedSetGuess(parseInt(e.target.value) || '')}
          value={clue.guess}
          onClick={() => setIndexOfNextWord(index)}
        />
      </div>
      <div className={`col-xs-6`}>
        <p className="roundClue">{clue.childConcept}</p>

      </div>
    </div>
    {
      invalid !== ''
        ?
        <div className="row">
          <div className="col-xs-12">
            <p className="validation-error">{invalid}</p>
          </div>
        </div>
        : null
    }

  </div>
)

export default RoundClue;
