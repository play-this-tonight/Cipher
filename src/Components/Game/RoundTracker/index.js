import React, { useContext } from "react";
import RoundDetails from "./RoundDetails";
import { store } from "../MakeGame";
import { roundTracker } from "./index.module.css";

const RoundTracker = () => {
  const {
    gameState: { otherRoundClues: roundClues },
  } = useContext(store);
  const roundGuesses = roundClues.reduce(
    (
      roundArray,
      { gameRound, guess, sequenceLocation, isCorrect, childConcept }
    ) => {
      if (!roundArray[gameRound]) {
        roundArray[gameRound] = [
          { guess, sequenceLocation, isCorrect, childConcept },
        ];
      } else {
        roundArray[gameRound].push({
          guess,
          sequenceLocation,
          isCorrect,
          childConcept,
        });
      }

      return roundArray;
    },
    []
  );

  return (
    <div className={roundTracker}>
      {roundGuesses.map((round, idx) => {
        const roundClues = [...round].sort(
          ({ sequenceLocation: a }, { sequenceLocation: b }) => {
            return a - b;
          }
        );
        return <RoundDetails key={idx} round={idx} guesses={roundClues} />;
      })}
    </div>
  );
};

export default RoundTracker;
