import React, { Component } from 'react';
import { checkAnswers, getCluesForRound } from '../Utility/parseWords';

const RoundClue = ({ clue, setGuess, valid, guess }) => {
  return (
    <li className="clue">
      <p>{clue}</p>
      <input
        type="number"
        min="1" max="4"
        onChange={(e) => setGuess(Number(e.target.value))}
        value={guess}
      />
      {
        valid === false
          ? <p className="red">Numbers are not repeated in sequence.</p>
          : null
      }
    </li>
  )
}

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

class MainGame extends Component {
  constructor() {
    super();

    this.state = {
      clueWords: [],
      guessWords: [],
      gameState: {
        currentRound: 1,
        correctGuesses: 0,
        incorrectGuesses: 0,
      }
    }

    // this.setState({
    //   clueWords: this.getWordsForRound()
    // })

    // console.log(this.state);
  }

  componentDidMount() {
    this.setState({
      clueWords: this.getWordsForRound(this.state.gameState.currentRound),
    });
  }

  getWordsForRound = (round) => {
    const createNewClue = this.createNewClue.bind(this);
    return getCluesForRound(round).map(createNewClue);
  }

  createNewClue = (word) => ({
    word,
    guess: '',
    correct: null
  });

  setGuess = (index) => (value) => {
    const { clueWords } = this.state;
    const setClues = clueWords.map((item, mappingIndex) => {
      if (mappingIndex === index) return {
        ...item,
        guess: value
      }
      return item;
    });
    this.setState({ clueWords: setClues });
  };

  makeGuess = () => {
    const {
      guessWords,
      clueWords,
      gameState: {
        currentRound
      }
    } = this.state;

    const checkedClueWords = clueWords
      .map((clue) => clue.guess)
      .map((clueToMatch, index, clues) => {
        return clues.filter((clue) => clue === clueToMatch).length === 1
      })

    if (checkedClueWords.indexOf(false) !== -1) {
      const validatedRoundClues = checkedClueWords.map((item, index) => ({
        ...clueWords[index],
        valid: item
      }));
      this.setState({
        clueWords: validatedRoundClues
      });
      return;
    }
    const nextRound = currentRound + 1;

    console.log(checkAnswers(currentRound, clueWords));

    this.setState({
      gameState: {
        ...this.gameState,
        currentRound: nextRound
      },
      guessWords: guessWords.concat(checkAnswers(currentRound, clueWords)),
      clueWords: this.getWordsForRound(nextRound)
    });
  }


  render() {
    const {
      clueWords,
      guessWords,
      gameState: {
        currentRound
      }
    } = this.state;
    return (
      <section class="row">
        <sidebar class="col-xs-1 col-lg-1">
          <h6>Rounds</h6>
          <ul>
            {
              Array.apply(null, { length: currentRound }).map((item, i) => <li>{i + 1}</li>)
            }
          </ul>
        </sidebar>

        <div class="col-xs-11">
          <div class="row">
            <div class="col-xs-12 col-lg-4">
              <h1>Round {currentRound}</h1>
              <section className="clues">
                <ul>
                  {clueWords.map((clue, index) =>
                    <RoundClue
                      clue={clue.word}
                      valid={clue.valid}
                      setGuess={this.setGuess(index)}
                      guess={clue.guess}
                    />
                  )}
                </ul>
                <button onClick={this.makeGuess}>Submit Guess</button>
              </section>
              <section>
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
              </section>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default MainGame;
