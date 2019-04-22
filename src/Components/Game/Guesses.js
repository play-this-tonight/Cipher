import React, { Fragment } from 'react';

const sortGuesses = (guesses) => {
  const correct = guesses.filter(({ isCorrect }) => isCorrect);
  const hintGiven = guesses.filter(({ isCorrect, answer }) => isCorrect === false && answer);
  const incorrect = guesses.filter(({ answer }) => !answer);

  return [
    ...correct,
    ...hintGiven,
    ...incorrect
  ];
}

const GuessDisplay = ({ guessNumber, guesses, hoveredRound, currentWord }) => {
  let highlight = "";
  if (currentWord.length > 0) highlight = "highlight";
  console.log(currentWord);
  return (
    <div className={`col-sm-2 col-xs-12 guessedWords`}>
      <div className="row">
        <div className="col-xs-12">
          <div className="row">
            <h4 className="col-xs-1">{guessNumber}</h4>
            {/* <div className="col-xs-11">
              <div className="row">
                <label>Hypothesis</label>
              </div>
              <div className="row">
                <input className="row" />
              </div>
            </div> */}
          </div>
        </div>
        <ul className="col-xs-11 guessedWordList">
          {
            sortGuesses(guesses).map(({ word, isCorrect, answer, roundNumber }) => (
              <GuessedWord
                key={word}
                word={word}
                isCorrect={isCorrect}
                answer={answer}
                roundNumber={roundNumber}
                hoveredRound={hoveredRound}
              />
            ))
          }
          {currentWord.length > 0 ? currentWord.map(({ word }) => <li className="col-xs-11 emphasize">{word} ?</li>) : null}
        </ul>
      </div>
    </div>
  )
}

const GuessedWord = ({ word, isCorrect, answer, roundNumber, hoveredRound }) => {
  const showHover = () => {
    if (hoveredRound.indexOf(roundNumber) !== -1) return 'hovered';
    if (hoveredRound.length > 0) return 'faded';
    return '';
  }

  const cX = () => {
    if (answer === null) {
      return "strikethrough";
    }
    if (!isCorrect) {
      return "incorrect";
    }
    return "correct";
  }

  const addX = () => {
    if (!isCorrect && answer) return <span>x</span>;
    return null;
  }

  return (
    <li
      className={`${cX()} ${showHover()} previousGuess`}
    >{addX()} {word}</li>
  );
}

const guessedButNotAnswered = (
  isCorrect,
  guess,
  currentNumber,
  answer = null,
) => (answer === null && !isCorrect && guess === currentNumber)

const Guesses = ({ guessedWords, hoveredRound, currentRoundWords }) => {
  return (
    <Fragment >
      <div className="col-xs-12">
        <div className="row">
          <h2>Previous Guesses</h2>
        </div>
      </div>
      <div className="col-xs-12">
        <div className="row around-sm previousGuesses">
          {
            [1, 2, 3, 4, 5].map((number) => (
              <GuessDisplay
                key={number}
                guessNumber={number}
                hoveredRound={hoveredRound}
                currentWord={currentRoundWords.filter(({ guess }) => guess === number)}
                guesses={guessedWords.filter(({ answer, isCorrect, guess }) => answer === number || guessedButNotAnswered(isCorrect, guess, number, answer))}
              />
            ))
          }
        </div>
      </div>
    </Fragment >
  );
}

export default Guesses;
