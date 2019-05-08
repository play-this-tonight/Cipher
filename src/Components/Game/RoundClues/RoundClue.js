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

const RadioSelect = ({ indexedSetGuess, index, clue }) => (
  <div className="col-xs-12">
    <div className="row">


      <label className="col-xs-2">
        <input
          name={index}
          type="radio"
          value="1"
          defaultChecked={clue.guess == 1}
          className={`guess word-${index + 1}`}
          onChange={(e) => indexedSetGuess(parseInt(e.target.value) || '')}
        />
        1
        </label>
      <label className="col-xs-2">
        <input
          name={index}
          type="radio"
          value="2"
          defaultChecked={clue.guess == 2}
          className={`guess word-${index + 1}`}
          onChange={(e) => indexedSetGuess(parseInt(e.target.value) || '')}
        />
        2
        </label>
      <label className="col-xs-2">
        <input
          name={index}
          type="radio"
          value="3"
          defaultChecked={clue.guess == 3}
          className={`guess word-${index + 1}`}
          onChange={(e) => indexedSetGuess(parseInt(e.target.value) || '')}
        />
        3
        </label>
      <label className="col-xs-2">
        <input
          name={index}
          type="radio"
          value="4"
          defaultChecked={clue.guess == 4}
          className={`guess word-${index + 1}`}
          onChange={(e) => indexedSetGuess(parseInt(e.target.value) || '')}
        />
        4
        </label>
      <label className="col-xs-2">
        <input
          name={index}
          type="radio"
          value="5"
          defaultChecked={clue.guess == 5}
          className={`guess word-${index + 1}`}
          onChange={(e) => indexedSetGuess(parseInt(e.target.value) || '')}
        />
        5
        </label>
    </div>
  </div>
)

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
      <div className="col-xs-9">
        <div className="row">
          <p className="roundClue col-xs-12">{clue.childConcept}</p>
          <RadioSelect indexedSetGuess={indexedSetGuess} clue={clue} index={index} />
        </div>
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
