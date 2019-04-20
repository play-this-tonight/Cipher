import React from 'react';

const RoundClue = ({ clue, index, indexedSetGuess, valid }) => (
  <div className="col-xs-4">
    <div className="box">
      <div className="inputBox">
        <p>{clue.word}</p>
        <input
          name={index}
          className={`guess word-${index + 1} col-xs-6`}
          type="integer"
          maxLength="1"
          onChange={(e) => indexedSetGuess(parseInt(e.target.value) || null)}
          value={clue.guess}
        />
        {
          valid === false
            ? <p className="validation-error">Numbers are not repeated in sequence.</p>
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
            valid={clue.valid}
          />
        )
      }
      )}
    </div>
  );
}

export default RoundClues;
