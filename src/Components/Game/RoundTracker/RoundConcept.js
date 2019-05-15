import React from 'react';
import { roundDetailWord, strikethrough, correct } from './index.module.css';

const addCorrectStyling = (isCorrect) => {
  if (!isCorrect) return strikethrough;

  return correct;
}


const RoundConcept = ({ childConcept, isCorrect, guess }) => (
  <var className={roundDetailWord}>
    <span className={addCorrectStyling(isCorrect)}>{childConcept} ({guess})</span>
  </var>
);

export default RoundConcept;
