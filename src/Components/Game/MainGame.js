import React, { Component, Fragment, useEffect, useState } from 'react';
import Guesses from './Guesses';
import RoundTracker from './RoundTracker';
import DialPad from './DialPad';
import RoundClues from './RoundClues/index';
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
    <main>
      <div className="row">
        <div className="col-xs-12">
          <h2>Round {currentRound}</h2>
        </div>
      </div>
      <div className="row guessRow around-sm">
        <RoundClues
          setGuess={setGuessWord}
          currentRoundClues={currentRoundClues}
          setIndexOfNextWord={setIndexOfNextWord}
        />
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="row">
            <Guesses
              otherRoundClues={otherRoundClues}
              currentRoundClues={currentRoundClues}
              parentConcepts={parentConcepts}
              currentRound={currentRound}
            />
          </div>
        </div>
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-4">
              <button onClick={submitGuesses}>Try Lock</button>
            </div>
            {/* <aside className="col-xs-3 col-md-3 center-xs">
            <RoundTracker
              currentRound={currentRound}
              otherRoundClues={otherRoundClues}
              correctGuessCount={correctGuessCount}
              incorrectGuessCount={incorrectGuessCount}
              setHoveredRound={setHoveredRound}
              currentRoundClues={currentRoundClues}
            />
          </aside> */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default makeGame(MainGame);
