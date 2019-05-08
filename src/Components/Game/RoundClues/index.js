import React, { Fragment } from 'react';
import RoundWords from './RoundWords';
import RoundClue from './RoundClue';



const RoundClues = ({ setGuess, currentRoundClues, setIndexOfNextWord }) => {
  const roundSize = 12 / currentRoundClues.length;

  return (
    <Fragment>
      {currentRoundClues.map((clue, index) => {
        return (
          <RoundClue
            key={`clue-${index}`}
            clue={clue}
            index={index}
            indexedSetGuess={setGuess(index)}
            invalid={clue.invalid}
            setIndexOfNextWord={setIndexOfNextWord}
            isCorrect={clue.isCorrect}
            roundSize={roundSize}
          />
        )
      }
      )}
    </Fragment>
  );
}

export default RoundClues;
