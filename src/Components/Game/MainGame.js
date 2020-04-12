import React, { useState, useEffect } from "react";
import { getNextActiveInput } from "../../Utility/changeActiveInput";
import ClueGroups from "./WordGroups/index";
import RoundTracker from "./RoundTracker/index";
import ClueCards from "./ClueCards";
import makeGame from "./MakeGame";
import Button from "@material-ui/core/Button";

import styles from "./Game.module.css";

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

  useEffect(() => {
    setIndexOfNextWord(() => getNextActiveInput(currentRoundClues));
  }, [currentRoundClues]);

  return (
    <main className={styles.mainGame}>
      <aside className={styles.gameAside}>
        <h3>Round {currentRound}</h3>
        <RoundTracker
          currentRound={currentRound}
          roundClues={otherRoundClues}
          setHoveredRound={setHoveredRound}
        />
        <div>
          <ul>
            {otherRoundClues
              .filter(({ isCorrect }) => !isCorrect)
              .map(({ childConcept, guess }) => {
                return (
                  <li>
                    {childConcept} {guess}
                  </li>
                );
              })}
          </ul>
        </div>
      </aside>
      <section>
        <ClueCards
          setGuess={setGuessWord}
          currentRoundClues={currentRoundClues}
          setIndexOfNextWord={setIndexOfNextWord}
        />
        <ClueGroups
          otherRoundClues={otherRoundClues}
          currentRoundClues={currentRoundClues}
          parentConcepts={parentConcepts}
          currentRound={currentRound}
          hoveredRound={hoveredRound}
        />
        <Button variant="contained" color="primary" onClick={submitGuesses}>
          Try Lock
        </Button>
      </section>
    </main>
  );
};

export default makeGame(MainGame);
