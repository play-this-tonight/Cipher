import React, { Component, Fragment, useEffect, useState } from 'react';
import Guesses from './Guesses';
import RoundTracker from './RoundTracker';
import DialPad from './DialPad';
import RoundClues from './RoundClues';
import { getNextActiveInput } from '../../Utility/changeActiveInput';
import makeGame from './MakeGame';


const MainGame = ({
  currentRoundClues,
  currentRound,
  correctGuessCount,
  incorrectGuessCount,
  otherRoundClues,
  setGuessWord,
  unsetGuessWord,
  submitGuesses,
  parentConcepts,
}) => {
  const [indexOfNextWord, setIndexOfNextWord] = useState(0);
  const [hoveredRound, setHoveredRound] = useState([]);

  const somethingSomething = useEffect(
    () => {
      setIndexOfNextWord(
        () => getNextActiveInput(currentRoundClues)
      )
    },
    [currentRoundClues]
  );

  return (
    <main className="row">
      <div className="col-xs-12">
        <div className="row">
          <Guesses
            otherRoundClues={otherRoundClues}
            hoveredRound={hoveredRound}
            currentRoundClues={currentRoundClues}
            parentConcepts={parentConcepts}
          />
        </div>
      </div>
      <div className="col-xs-12">
        <div className="row">

          <div className="col-xs-9 col-md-9">
            <div className="row guessRow">
              <RoundClues
                setGuess={setGuessWord}
                currentRoundClues={currentRoundClues}
                setIndexOfNextWord={setIndexOfNextWord}
              />
              <div className="col-xs-4">
                <DialPad
                  guessedNumbers={currentRoundClues.map(({ guess }) => guess)}
                  setGuess={setGuessWord(indexOfNextWord)}
                  unsetGuess={unsetGuessWord}
                />
                <button onClick={submitGuesses}>Try Lock</button>
              </div>
            </div>
          </div>
          <aside className="col-xs-3 col-md-3 center-xs">
            <RoundTracker
              currentRound={currentRound}
              otherRoundClues={otherRoundClues}
              correctGuessCount={correctGuessCount}
              incorrectGuessCount={incorrectGuessCount}
              setHoveredRound={setHoveredRound}
              currentRoundClues={currentRoundClues}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}

export default makeGame(MainGame);
