import React from "react";
import ClueCard from "./ClueCard";
import { roundClues } from "./RoundClues.module.css";

const ClueCards = ({ setGuess, currentRoundClues, setIndexOfNextWord }) => {
  const roundSize = 12 / currentRoundClues.length;

  return (
    <div className={roundClues}>
      {currentRoundClues.map((clue, index) => {
        return (
          <ClueCard
            key={`clue-${index}`}
            clue={clue}
            index={index}
            indexedSetGuess={setGuess(index)}
            invalid={clue.invalid}
            setIndexOfNextWord={setIndexOfNextWord}
            isCorrect={clue.isCorrect}
            roundSize={roundSize}
          />
        );
      })}
    </div>
  );
};

export default ClueCards;
