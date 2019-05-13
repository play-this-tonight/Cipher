import React from 'react';
import { lock } from './index.module.css';

const WordSelect = ({ indexedSetGuess, index, clue }) => {
  return (
    <select
      className={lock}
      optionvalue={clue.guess || null}
      onChange={(e) => indexedSetGuess(e.target.value)}
      name={index}
    >
      {[null, 1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>{value}</option>)}
    </select>
  );
}

export default WordSelect;
