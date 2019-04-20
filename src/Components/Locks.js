import React, { Fragment } from 'react';

const Lock = ({ spinCounter = '', lockNumber, correctAnswer }) => (
  <div className="col-xs-4">
    <div className={`lock lock-${lockNumber} ${spinCounter} ${correctAnswer}`}>
      <div className="lockLine"></div>
    </div>
  </div>
)

const getCorrectAnswer = (currentRoundWords, index) => {
  if (currentRoundWords.length == 0) return '';

  const { correct } = currentRoundWords[index];
  if (correct === null) return '';

  return correct ? 'lock-correct' : 'lock-incorrect';
}

const getSpinString = (currentRoundWords, index) => {
  if (currentRoundWords.length == 0) return 'spin-0';

  const { guess } = currentRoundWords[index];
  if (!guess) return 'spin-0';

  return `spin-${guess}`;
}

const Locks = ({ currentRoundWords }) => {
  return (
    <Fragment>
      {
        [1, 2, 3].map((number, index) => (
          <Lock
            spinCounter={getSpinString(currentRoundWords, index)}
            correctAnswer={getCorrectAnswer(currentRoundWords, index)}
            lockNumber={number}
          />
        ))
      }
    </Fragment>
  )
}

export default Locks;
