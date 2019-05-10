import React, { Component, Fragment, useEffect, useState } from 'react';
import ClueGroups from './ClueGroups/index';
import RoundTracker from './RoundTracker/index';
import RoundClues from './RoundClues/index';
import { getNextActiveInput } from '../../Utility/changeActiveInput';
import makeGame from './MakeGame';

import styles from './Game.module.css';


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
    <main className={styles.mainGame}>
      <aside className={styles.gameAside}>
        <h3>Round {currentRound}</h3>
        <h3>Incorrect {incorrectGuessCount}</h3>
        <RoundTracker
          currentRound={currentRound}
          otherRoundClues={otherRoundClues}
          setHoveredRound={setHoveredRound}
        />
      </aside>
      <section>
        <RoundClues
          setGuess={setGuessWord}
          currentRoundClues={currentRoundClues}
          setIndexOfNextWord={setIndexOfNextWord}
        />
        <ClueGroups
          otherRoundClues={otherRoundClues}
          currentRoundClues={currentRoundClues}
          parentConcepts={parentConcepts}
          currentRound={currentRound}
        />
        <button onClick={submitGuesses}>Try Lock</button>
      </section>
    </main>
  );
}

export default makeGame(MainGame);
