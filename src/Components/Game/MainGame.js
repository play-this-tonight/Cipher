import React, { useState, useEffect } from 'react';
import { getNextActiveInput } from '../../Utility/changeActiveInput';
import ClueGroups from './ClueGroups/index';
import RoundTracker from './RoundTracker/index';
import RoundClues from './RoundClues/index';
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

  useEffect(
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
        <ClueGroups
          otherRoundClues={otherRoundClues}
          currentRoundClues={currentRoundClues}
          parentConcepts={parentConcepts}
          currentRound={currentRound}
          hoveredRound={hoveredRound}
        />
        <RoundClues
          setGuess={setGuessWord}
          currentRoundClues={currentRoundClues}
          setIndexOfNextWord={setIndexOfNextWord}
        />
        <button onClick={submitGuesses}>Try Lock</button>
      </section>
    </main>
  );
}

export default makeGame(MainGame);
