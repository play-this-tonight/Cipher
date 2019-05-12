import React, { useState, Component } from 'react';
// import debounce from '../../../../Utility/basicDebounce';
import { lock } from './index.module.css';
// import { debounce } from 'lodash';

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

// const RadioSelect = ({ indexedSetGuess, index, clue }) => (
//   <div className="col-xs-12">
//     <div className="row">


//       <label className="col-xs-2">
//         <input
//           name={index}
//           type="radio"
//           value="1"
//           defaultChecked={clue.guess == 1}
//           className={`guess word-${index + 1}`}
//           onChange={(e) => indexedSetGuess(parseInt(e.target.value) || '')}
//         />
//         1
//         </label>
//       <label className="col-xs-2">
//         <input
//           name={index}
//           type="radio"
//           value="2"
//           defaultChecked={clue.guess == 2}
//           className={`guess word-${index + 1}`}
//           onChange={(e) => indexedSetGuess(parseInt(e.target.value) || '')}
//         />
//         2
//         </label>
//       <label className="col-xs-2">
//         <input
//           name={index}
//           type="radio"
//           value="3"
//           defaultChecked={clue.guess == 3}
//           className={`guess word-${index + 1}`}
//           onChange={(e) => indexedSetGuess(parseInt(e.target.value) || '')}
//         />
//         3
//         </label>
//       <label className="col-xs-2">
//         <input
//           name={index}
//           type="radio"
//           value="4"
//           defaultChecked={clue.guess == 4}
//           className={`guess word-${index + 1}`}
//           onChange={(e) => indexedSetGuess(parseInt(e.target.value) || '')}
//         />
//         4
//         </label>
//       <label className="col-xs-2">
//         <input
//           name={index}
//           type="radio"
//           value="5"
//           defaultChecked={clue.guess == 5}
//           className={`guess word-${index + 1}`}
//           onChange={(e) => indexedSetGuess(parseInt(e.target.value) || '')}
//         />
//         5
//         </label>
//     </div>
//   </div>
// )

export default WordSelect;
