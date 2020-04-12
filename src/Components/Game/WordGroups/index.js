import React, { useContext } from "react";
import { store } from "../MakeGame";
import WordGroups from "./WordGroups";
import {
  filterGuessesInWordGroup,
  filterHypothesesInWordGroup,
  filterCurrentRoundGuessesInWordGroup,
} from "./sortGuesses";
import styles from "./WordGroups.module.css";

const ClueGroups = () => {
  const {
    gameState: { otherRoundClues, currentRoundClues },
  } = useContext(store);

  return (
    <div className={styles.clueGroups}>
      {[1, 2, 3, 4, 5].map((parentClueIndex) => {
        const guessesInWordGroup = filterGuessesInWordGroup(
          otherRoundClues,
          parentClueIndex
        );
        const hypothesesInWordGroup = filterHypothesesInWordGroup(
          otherRoundClues,
          parentClueIndex
        );
        const currentRoundGuesses = filterCurrentRoundGuessesInWordGroup(
          currentRoundClues,
          parentClueIndex
        );
        console.log(currentRoundGuesses);
        return (
          <WordGroups
            key={parentClueIndex}
            guessNumber={parentClueIndex}
            currentRoundGuesses={currentRoundGuesses}
            currentRoundClues={currentRoundClues}
            guessesInWordGroup={guessesInWordGroup}
            hypothesesInWordGroup={hypothesesInWordGroup}
          />
        );
      })}
    </div>
  );
};

export default ClueGroups;
