import React from "react";
import TextField from "@material-ui/core/TextField";
// import { lock } from "./index.module.css";

const WordSelect = ({ indexedSetGuess, index, clue }) => {
  return (
    <TextField
      label={clue.childConcept}
      value={clue.guess}
      min={1}
      max={5}
      onChange={(e) => indexedSetGuess(e.target.value || "")}
      name={index.toString()}
    />
  );
};

export default WordSelect;
