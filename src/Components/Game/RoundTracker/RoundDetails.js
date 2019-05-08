import React from 'react';
import RoundConcept from './RoundConcept';

const sortGuesses = (currentGuesses) => {
  const guessesToSort = [...currentGuesses];
  guessesToSort.sort((guessA, guessB) => guessA.sequenceLocation - guessB.sequenceLocation)

  return guessesToSort;
}

const RoundDetails = ({ round, guesses, setHoveredRound }) => {
  // hoverToDiscover(round);
  console.log(guesses);
  return (
    <li
      className="roundDetail col-xs-12"
    // onMouseOver={() => setHoveredRound([round])}
    // onMouseOut={() => setHoveredRound([])}
    >
      <section className="row">
        <p className="col-xs-12 round-title">Round {round}</p>
        {sortGuesses(guesses).map((props) => (<RoundConcept {...props} />))}
      </section>
    </li>

  );
}

export default RoundDetails;
