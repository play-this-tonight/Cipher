import React from 'react';
import { lock } from './index.module.css';

const WordSelect = ({ indexedSetGuess, index, clue }) => {
  return (
    <input
      className={lock}
      type="number"
      min="1"
      max="5"
      value={clue.guess}
      onChange={(e) => indexedSetGuess(e.target.value || '')}
      name={index}
    />
  );
}

export default WordSelect;
