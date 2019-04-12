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
        <GuessDisplay
          guessNumber={1}
          guesses={guessWords.filter((word) => word.guess === 1)}
        />
        <GuessDisplay
          guessNumber={2}
          guesses={guessWords.filter((word) => word.guess === 2)}
        />
        <GuessDisplay
          guessNumber={3}
          guesses={guessWords.filter((word) => word.guess === 3)}
        />
        <GuessDisplay
          guessNumber={4}
          guesses={guessWords.filter((word) => word.guess === 4)}
        />
      </section>
    </section >
  );
}

export default Guesses;
