import React, { Component } from 'react';
import logo from './logo.svg';
import 'normalize.css';
import './App.css';


const RoundClue = ({ clue, setGuess, valid }) => {

  return (
    <li className="clue">
      <p>{clue}</p>
      <input
        type="number"
        min="1" max="4"
        onChange={(e) => setGuess(Number(e.target.value))}
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
        guesses.map((guess) => <li>{guess}</li>)
      }</ul>
    </div>
  )
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      roundClues: [
        {
          word: "Telephone",
          guess: null,
        },
        {
          word: "Banana",
          guess: null,
        },
        {
          word: "Bowling Ball",
          guess: null,
        },
      ],
      "currentGuess1": null,
      "currentGuess2": null,
      "currentGuess3": null,
      "guesses1": ["iPhone"],
      "guesses2": [],
      "guesses3": [],
      "guesses4": [],
    }
  }


  setGuess = (clue, index) => (value) => {
    const { roundClues } = this.state;
    const setClues = roundClues.map((item, mappingIndex) => {
      if (mappingIndex === index) return {
        ...item,
        guess: value
      }
      return item;
    });
    this.setState({ roundClues: setClues });
  };

  makeGuess = () => {
    const {
      roundClues,
      guesses1,
      guesses2,
      guesses3,
      guesses4,
    } = this.state;

    const currentGuesses = {
      guesses1,
      guesses2,
      guesses3,
      guesses4,
    };

    const checkedRoundClues = roundClues
      .map((clue) => clue.guess)
      .map((clueToMatch, index, clues) => {
        return clues.filter((clue) => clue === clueToMatch).length === 1
      })

    if (checkedRoundClues.indexOf(false) !== -1) {
      const validatedRoundClues = checkedRoundClues.map((item, index) => ({
        ...roundClues[index],
        valid: item
      }));
      this.setState({
        roundClues: validatedRoundClues
      });
      return;
    }

    const guessGroup = roundClues
      .reduce((newGuesses, clue) => {
        const guessKey = "guesses" + clue.guess;
        newGuesses[guessKey] = currentGuesses[guessKey].concat(clue.word);
        return newGuesses;
      }, {})

    this.setState(guessGroup);
    this.setState({
      "roundClues": [],
    })
  }

  render() {
    return (
      <div>
        <h1>Round 1</h1>
        <section className="clues">
          <ul>
            {this.state.roundClues.map((clue, index) =>
              <RoundClue
                clue={clue.word}
                valid={clue.valid}
                setGuess={this.setGuess(clue, index)}
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
              guesses={this.state.guesses1}
            />
            <GuessDisplay
              guessNumber={2}
              guesses={this.state.guesses2}
            />
            <GuessDisplay
              guessNumber={3}
              guesses={this.state.guesses3}
            />
            <GuessDisplay
              guessNumber={4}
              guesses={this.state.guesses4}
            />
          </section>
        </section>
      </div>
    );
  }
}

export default App;
