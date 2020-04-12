import React, { Fragment } from "react";
import {
  clueGroup,
  showHoveredRound,
  roundGuessGroup,
  correctAnswer,
  currentGuessStyle,
} from "./WordGroups.module.css";
import cx from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const ChildConcepts = ({ concepts, isCurrentRound }) => {
  return (
    // gameRound === hoveredRound ? showHoveredRound : null
    <Fragment>
      {concepts.map(
        ({ childConcept, gameRound, isCorrect }, index, concepts) => (
          <li
            key={childConcept}
            className={cx({
              [correctAnswer]: isCorrect,
              [currentGuessStyle]: isCurrentRound,
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
  guessesInWordGroup,
  hypothesesInWordGroup,
  currentRoundGuesses,
}) => {
  const correctGuesses = guessesInWordGroup.filter(
    ({ isCorrect }) => isCorrect
  );
  return (
    <Card className={clueGroup}>
      <CardHeader title={`Group ${guessNumber}`} />
      <CardContent>
        <TextField label="Hypothesis" />
        <ul className={roundGuessGroup}>
          <ChildConcepts concepts={currentRoundGuesses} isCurrentRound />
        </ul>
        <Typography>Correct</Typography>
        <ul className={roundGuessGroup}>
          <ChildConcepts concepts={correctGuesses} />
        </ul>
        <Typography>New Hypotheses</Typography>
        <ul>
          <ChildConcepts concepts={hypothesesInWordGroup} />
        </ul>
      </CardContent>
    </Card>
  );
};

export default ClueGroup;
