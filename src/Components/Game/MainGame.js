import React, { useState, useEffect } from "react";
import { getNextActiveInput } from "../../Utility/changeActiveInput";
import WordGroups from "./WordGroups/index";
import RoundTracker from "./RoundTracker/index";
import ClueCards from "./ClueCards";
import makeGame from "./MakeGame";
import Button from "@material-ui/core/Button";

import styles from "./Game.module.css";

const MainGame = ({
  currentRoundClues,
  currentRound,
  otherRoundClues,
  setGuessWord,
  submitGuesses,
  parentConcepts,
}) => {
  const [, setIndexOfNextWord] = useState(0);

  useEffect(() => {
    setIndexOfNextWord(() => getNextActiveInput(currentRoundClues));
  }, [currentRoundClues]);

  return (
    <main className={styles.mainGame}>
      <aside className={styles.gameAside}>
        <h3>Round {currentRound}</h3>
        <RoundTracker roundClues={otherRoundClues} />
      </aside>
      <section>
        <ClueCards
          setGuess={setGuessWord}
          currentRoundClues={currentRoundClues}
          setIndexOfNextWord={setIndexOfNextWord}
        />
        <WordGroups
          otherRoundClues={otherRoundClues}
          currentRoundClues={currentRoundClues}
          parentConcepts={parentConcepts}
          currentRound={currentRound}
        />
        <Button variant="contained" color="primary" onClick={submitGuesses}>
          Try Lock
        </Button>
      </section>
    </main>
  );
};

export default makeGame(MainGame);
