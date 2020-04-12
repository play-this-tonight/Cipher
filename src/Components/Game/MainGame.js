import React, { useState, useEffect, useContext } from "react";
import { getNextActiveInput } from "../../Utility/changeActiveInput";
import WordGroups from "./WordGroups/index";
import RoundTracker from "./RoundTracker/index";
import ClueCards from "./ClueCards";
import { makeGame, store } from "./MakeGame";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

import styles from "./Game.module.css";

const MainGame = ({ gameKey }) => {
  const {
    gameState: { currentRoundClues, currentRound, parentConcepts },
    hasFinished,
    submitGuesses: submitGuessesFinal,
  } = useContext(store);
  const [, setIndexOfNextWord] = useState(0);

  const submitGuesses = () => {
    submitGuessesFinal(currentRoundClues, parentConcepts);
  };

  useEffect(() => {
    setIndexOfNextWord(() => getNextActiveInput(currentRoundClues));
  }, [currentRoundClues]);

  if (hasFinished) {
    return <Redirect to={`/show-results/${gameKey}`} />;
  }

  return (
    <main className={styles.mainGame}>
      <aside className={styles.gameAside}>
        <h3>Round {currentRound}</h3>
        <RoundTracker />
      </aside>
      <section>
        <ClueCards />
        <WordGroups />
        <Button variant="contained" color="primary" onClick={submitGuesses}>
          Try Lock
        </Button>
      </section>
    </main>
  );
};

export default makeGame(MainGame);
