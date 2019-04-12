import React from 'react';

const GuessDisplay = ({ guessNumber, guesses }) => {
  return (
    <div>
      <h4>{guessNumber}</h4>
      <ul>{
        guesses.map(({ word, correct }) => (
          <GuessedWord
            word={word}
            correct={correct}
          />
        ))
      }</ul>
    </div>
  )
}

const GuessedWord = ({ word, correct }) => {
  const cX = () => {
    if (correct) {
      return "green";
    } else {
      return "strikethrough";
    }
  }

  return <li className={cX()}>{word}</li>
}

const Guesses = ({ guessWords }) => {
  console.log(guessWords);
  return (
    <section className="col-lg-6 col-xs-12" >
      <h2>Previous Guesses</h2>
      <section className="previousGuesses">
        {
          [1, 2, 3, 4, 5, 6].map((number) => (
            <GuessDisplay
              guessNumber={number}
              guesses={guessWords.filter((word) => word.guess === number)}
            />
          ))
        }
      </section>
    </section >
  );
}

export default Guesses;
