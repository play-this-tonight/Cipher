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
        <div className="col-xs-2">
          <h2>Round {currentRound}</h2>
        </div>
        <div className="col-xs-2">
          <h2>Incorrect Guesses {incorrectGuessCount}</h2>
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
        <div className="col-sm-10">
          <Guesses
            otherRoundClues={otherRoundClues}
            currentRoundClues={currentRoundClues}
            parentConcepts={parentConcepts}
            currentRound={currentRound}
          />
        </div>
        <aside className="col-sm-2 center-xs roundTracker">
          <RoundTracker
            currentRound={currentRound}
            otherRoundClues={otherRoundClues}
            setHoveredRound={setHoveredRound}
          />
        </aside>
      </div>
      <div className="row">
        <div className="col-xs-4">
          <button onClick={submitGuesses}>Try Lock</button>
        </div>

      </div>
    </main>
  );
}

export default makeGame(MainGame);
