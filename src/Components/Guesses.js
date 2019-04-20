import React from 'react';

const GuessDisplay = ({ guessNumber, guesses }) => {
  return (
    <div className="col-md-2 col-xs-12 guessedWords">
      <div className="box">
        <h4>{guessNumber}</h4>
        {
          guesses.map(({ word, correct }) => (
            <GuessedWord
              word={word}
              correct={correct}
            />
          ))
        }
      </div>
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

  return <span className={cX()}>{word}</span>
}

const Guesses = ({ guessedWords }) => {
  return (
    <section >
      <h2>Previous Guesses</h2>
      <section className="previousGuesses row">
        {
          [1, 2, 3, 4, 5, 6].map((number) => (
            <GuessDisplay
              guessNumber={number}
              guesses={guessedWords.filter((word) => word.guess === number)}
            />
          ))
        }
      </section>
    </section >
  );
}

export default Guesses;
