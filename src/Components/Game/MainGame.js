import React, { Component, Fragment, useEffect, useState } from 'react';
import Guesses from './Guesses';
import RoundTracker from './RoundTracker';
import DialPad from './DialPad';
import RoundClues from './RoundClues';
import { getNextActiveInput } from '../../Utility/changeActiveInput';
import makeGame from './MakeGame';


const MainGame = ({
  currentRoundWords,
  currentRound,
  correctGuesses,
  incorrectGuesses,
  guessedWords,
  setGuessWord,
  unsetGuessWord,
  submitGuesses,
}) => {
  const [indexOfNextWord, setIndexOfNextWord] = useState(0);
  const [hoveredRound, setHoveredRound] = useState([]);

  const somethingSomething = useEffect(
    () => {
      setIndexOfNextWord(
        () => getNextActiveInput(currentRoundWords)
      )
    },
    [currentRoundWords]
  );

  const roundArray = Array.apply(null, { length: currentRound }).map((item, i) => i + 1);

  return (
    <main className="row">
      <div className="col-xs-12">
        <div className="row">
          <Guesses
            guessedWords={guessedWords}
            hoveredRound={hoveredRound}
            currentRoundWords={currentRoundWords}
          />
        </div>
      </div>
      <div className="col-xs-12">
        <div className="row">

          <div className="col-xs-9 col-md-9">
            <div className="row guessRow">
              <RoundClues
                setGuess={setGuessWord}
                currentRoundWords={currentRoundWords}
                setIndexOfNextWord={setIndexOfNextWord}
              />
              <div className="col-xs-4">
                <DialPad
                  guessedNumbers={currentRoundWords.map(({ guess }) => guess)}
                  setGuess={setGuessWord(indexOfNextWord)}
                  unsetGuess={unsetGuessWord}
                />
                <button onClick={submitGuesses}>Try Lock</button>
              </div>
            </div>
          </div>
          <aside className="col-xs-3 col-md-3 center-xs">
            <RoundTracker
              roundArray={roundArray}
              guessedWords={guessedWords}
              correctGuesses={correctGuesses}
              incorrectGuesses={incorrectGuesses}
              setHoveredRound={setHoveredRound}
              currentRoundWords={currentRoundWords}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}

export default makeGame(MainGame);
