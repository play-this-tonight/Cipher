import React, { useEffect } from 'react';
import debounce from '../../../../Utility/basicDebounce';
import { lock } from './index.module.css';

const WordSelect = ({ indexedSetGuess, index, clue }) => {
  // add Use Effect so this can handle the change withotu all of the choppiness

  console.log(clue.guess);
  const debouncedSetGuess = debounce((newValue) => {
    indexedSetGuess(parseInt(newValue) || '')
  }, 500);

  return (
    <div>
      <label>
        {clue.guess}
      </label>
      <input
        className={lock}
        type="range"
        min="1"
        max="5"
        value={clue.guess}
        onChange={(e) => debouncedSetGuess(e.target.value)}
        name={index}
      />
    </div>
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
