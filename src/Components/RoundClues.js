import React from 'react';

const RoundClue = ({ clue, index, indexedSetGuess, invalid = '', setIndexOfNextWord }) => (
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
          onClick={() => setIndexOfNextWord(index)}
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



const RoundClues = ({ setGuess, currentRoundWords, setIndexOfNextWord }) => {
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
            setIndexOfNextWord={setIndexOfNextWord}
          />
        )
      }
      )}
    </div>
  );
}

export default RoundClues;
