import React, { Fragment } from 'react';

const Lock = ({ spinCounter = '', lockNumber, correctAnswer }) => (
  <div className="col-xs-4">
    <div className={`lock lock-${lockNumber} ${spinCounter} ${correctAnswer}`}>
      <div className="lockLine"></div>
    </div>
  </div>
)

const getCorrectAnswer = (clueWords, index) => {
  if (clueWords.length == 0) return '';

  const { correct } = clueWords[index];
  if (correct === null) return '';

  return correct ? 'lock-correct' : 'lock-incorrect';
}

const getSpinString = (clueWords, index) => {
  if (clueWords.length == 0) return 'spin-0';

  const { guess } = clueWords[index];
  if (!guess) return 'spin-0';

  return `spin-${guess}`;
}

const Locks = ({ clueWords }) => {
  return (
    <Fragment>
      {
        [1, 2, 3].map((number, index) => (
          <Lock
            spinCounter={getSpinString(clueWords, index)}
            correctAnswer={getCorrectAnswer(clueWords, index)}
            lockNumber={number}
          />
        ))
      }
    </Fragment>
  )
}

export default Locks;
