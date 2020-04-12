import React from "react";
import { roundTrackerDetail, correct, incorrect } from "./index.module.css";

const RoundDetails = ({ round, guesses }) => {
  return (
    <li className={roundTrackerDetail}>
      <p>Round {round}</p>
      {guesses.map(({ isCorrect, guess }) => {
        return <span className={isCorrect ? correct : incorrect}>{guess}</span>;
      })}
    </li>
  );
};

export default RoundDetails;
