import React from "react";
import RoundDetails from "./RoundDetails";
import { roundTracker } from "./index.module.css";

const RoundTracker = ({ roundClues }) => {
  const roundGuesses = roundClues.reduce(
    (roundArray, { gameRound, guess, sequenceLocation, isCorrect }) => {
      if (!roundArray[gameRound]) {
        roundArray[gameRound] = [{ guess, sequenceLocation, isCorrect }];
      } else {
        roundArray[gameRound].push({ guess, sequenceLocation, isCorrect });
      }

      return roundArray;
    },
    []
  );

  return (
    <ol className={roundTracker}>
      {roundGuesses.map((round, idx) => {
        const roundClues = [...round].sort(
          ({ sequenceLocation: a }, { sequenceLocation: b }) => {
            return a - b;
          }
        );
        return <RoundDetails key={idx} round={idx} guesses={roundClues} />;
      })}
    </ol>
  );
};

export default RoundTracker;
