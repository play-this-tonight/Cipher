import React from 'react';

const RoundClue = ({ clue, index, indexedSetGuess }) => (
  <div className="col-xs-4">
    <div className="box">
      <div className="inputBox">
        <p>{clue.word}</p>
        <input
          name={clue.word}
          className={`guess word-${index + 1} col-xs-6`}
          type="integer"
          maxLength="1"
          onChange={(e) => indexedSetGuess(parseInt(e.target.value) || '')}
          value={clue.guess}
        />
      </div>
    </div>
  </div>
)


const RoundClues = ({ setGuess, clueWords, }) => {

  return (
    <div className="row between-xs guessRow">
      {clueWords.map((clue, index) => {
        return (
          <RoundClue
            clue={clue}
            index={index}
            indexedSetGuess={setGuess(index)}
          />
        )
      }
      )}
    </div>
  );
}

export default RoundClues;
