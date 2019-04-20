import React from 'react';

const RoundClue = ({ clue, index, indexedSetGuess, invalid = '' }) => (
  <div className="col-xs-4">
    <div className="box">
      <div className="inputBox">
        <p>{clue.word}</p>
        <input
          name={index}
          className={`guess word-${index + 1} col-xs-6`}
          type="integer"
          maxLength="1"
          onChange={(e) => indexedSetGuess(parseInt(e.target.value) || '')}
          value={clue.guess}
        />
        {
          invalid !== ''
            ? <p className="validation-error">{invalid}</p>
            : null
        }
      </div>
    </div>
  </div>
)



const RoundClues = ({ setGuess, currentRoundWords, }) => {
  return (
    <div className="row between-xs guessRow">
      {currentRoundWords.map((clue, index) => {
        return (
          <RoundClue
            key={`clue-${index}`}
            clue={clue}
            index={index}
            indexedSetGuess={setGuess(index)}
            invalid={clue.invalid}
          />
        )
      }
      )}
    </div>
  );
}

export default RoundClues;
