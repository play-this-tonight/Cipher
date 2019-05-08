import React from 'react';

const addCorrectStyling = (isCorrect) => {
  if (!isCorrect) return 'strikethrough';

  return 'correct';
}


// const GuessedWord = ({ childConcept, isCorrect, parentConceptId, gameRound, lastRound }) => {


//   return (
//     <li
//       className={`${cX()} ${isLastRound()} previousGuess`}
//     >{addX()} {childConcept}</li>
//   );
// }


const RoundConcept = ({ childConcept, parentConceptId, isCorrect }) => (
  <var className="col-xs-12">
    <span className={addCorrectStyling(isCorrect)}>{childConcept} </span>
    {/* {
      parentConceptId ?
        <span className="answerClue">{parentConceptId}</span> :
        null
    } */}
  </var>
);

export default RoundConcept;
