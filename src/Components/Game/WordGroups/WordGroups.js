import React, { Fragment } from "react";
import {
  clueGroup,
  showHoveredRound,
  roundGuessGroup,
  hideIncorrect,
  correctAnswer,
  currentGuessStyle,
} from "./WordGroups.module.css";
import cx from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const ChildConcepts = ({ concepts, hoveredRound }) => {
  return (
    // gameRound === hoveredRound ? showHoveredRound : null
    <Fragment>
      {concepts.map(
        ({ childConcept, gameRound, isCorrect }, index, concepts) => (
          <li
            key={childConcept}
            className={cx({
              [showHoveredRound]: gameRound === hoveredRound,
              [hideIncorrect]: !isCorrect,
              [correctAnswer]: isCorrect,
            })}
          >
            {childConcept}
          </li>
        )
      )}
    </Fragment>
  );
};

const ClueGroup = ({
  guessNumber,
  currentRoundClues,
  roundGuesses,
  hoveredRound,
}) => {
  const currentGuesses = currentRoundClues.filter(
    ({ guess }) => guess == guessNumber
  );

  return (
    <Card className={clueGroup}>
      <CardContent>
        {/* <CardHeader> */}
        <Typography>{guessNumber}</Typography>
        <TextField label="Guess" />
        {/* </CardHeader> */}
        <ul className={roundGuessGroup}>
          {currentGuesses.length
            ? currentGuesses.map(({ childConcept }) => (
                <li key={childConcept} className={currentGuessStyle}>
                  {childConcept}
                </li>
              ))
            : null}
          <ChildConcepts concepts={roundGuesses} hoveredRound={hoveredRound} />
        </ul>
      </CardContent>
    </Card>
  );
};

export default ClueGroup;
