import React from 'react';

// @deprecated

const RoundWords = ({ clueWords }) => {
  return (
    <div className="row">
      {clueWords.map(({ word, guess }, index) => (
        <div className={`col-xs-4`} key={word}>
          <div className="box">
            {/* <Lock
              spinCounter={getSpinString(clueWords, index)}
              correctAnswer={getCorrectAnswer(clueWords, index)}
              lockNumber={index + 1}
            /> */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default RoundWords;
