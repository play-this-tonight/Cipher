import React, { Component, Fragment, useEffect, useState } from 'react';
import Guesses from './Guesses';
import RoundTracker from './RoundTracker';
import DialPad from './DialPad';
import RoundClues from './RoundClues';
import Locks from './Locks';
import { getNextActiveInput } from '../Utility/changeActiveInput';
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
  const somethingSomething = useEffect(
    () => {
      console.log('does this ever fire?')
      setIndexOfNextWord(
        () => getNextActiveInput(currentRoundWords)
      )
    },
    [currentRoundWords]
  );

  const roundArray = Array.apply(null, { length: currentRound }).map((item, i) => i + 1);

  return (
    <Fragment>
      <div className="col-xs-12 handleOverflow">
        <Guesses guessedWords={guessedWords} />
      </div>
      <section className="row">
        <RoundTracker
          roundArray={roundArray}
          guessedWords={guessedWords}
          correctGuesses={correctGuesses}
          incorrectGuesses={incorrectGuesses}
        />

        <div className="col-xs-9 col-md-11">
          <div className="row">
            <section className="col-xs-12">
              <RoundClues
                setGuess={setGuessWord}
                currentRoundWords={currentRoundWords}
              />
              <div className="row around-xs">
                <div className="col-xs-6 col-sm-2">
                  <DialPad
                    guessedNumbers={currentRoundWords.map(({ guess }) => guess)}
                    setGuess={setGuessWord(indexOfNextWord)}
                    unsetGuess={unsetGuessWord}
                  />
                  <button onClick={submitGuesses}>Try Lock</button>
                </div>
              </div>
              <div className="row">
                <Locks
                  currentRoundWords={currentRoundWords}
                />
              </div>
            </section>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default makeGame(MainGame);
