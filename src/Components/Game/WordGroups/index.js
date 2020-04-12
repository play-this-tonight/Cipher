import React, { useContext } from "react";
import { store } from "../MakeGame";
import WordGroups from "./WordGroups";
import { filterGuessedThisRound } from "./sortGuesses";
import styles from "./WordGroups.module.css";

// const guessedButNotAnswered = (
//   isCorrect,
//   guess,
//   currentNumber,
//   answer = null,
// ) => (answer === null && !isCorrect && guess === currentNumber)

const ClueGroups = () => {
  const {
    gameState: { otherRoundClues, currentRoundClues },
  } = useContext(store);
  console.log(otherRoundClues);
  return (
    <div className={styles.clueGroups}>
      {[1, 2, 3, 4, 5].map((parentClueIndex) => {
        return (
          <WordGroups
            key={parentClueIndex}
            guessNumber={parentClueIndex}
            currentRoundClues={currentRoundClues}
            roundGuesses={filterGuessedThisRound(
              otherRoundClues,
              parentClueIndex
            )}
          />
        );
      })}
    </div>
  );
};

export default ClueGroups;
