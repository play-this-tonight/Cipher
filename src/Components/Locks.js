import React, { Fragment } from 'react';

const Lock = ({ spinCounter = '', lockNumber }) => (
  <div className="col-xs-4">
    <div className="lockBox">
      <div className="lockHolder">
        <div className={`lock lock-${lockNumber} ${spinCounter}`}>
          <div className="lockLine"></div>
        </div>
      </div>
    </div>
  </div>
)

const getSpinString = (clueWords, index) => {
  if (clueWords.length == 0) return 'spin-0';

  console.log(clueWords);
  console.log(clueWords[index]);

  const { guess } = clueWords[index];

  return `spin-${guess}`;
}

const Locks = ({ clueWords }) => {
  return (
    <Fragment>
      {
        [1, 2, 3].map((number, index) => (
          <Lock
            spinCounter={getSpinString(clueWords, index)}
            lockNumber={number}
          />
        ))
      }
    </Fragment>
  )
}

export default Locks;
