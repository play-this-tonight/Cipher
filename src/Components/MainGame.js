import React, { Component } from 'react';
import { checkAnswers, getCluesForRound } from '../Utility/parseWords';
import Guesses from './Guesses';
import RoundTracker from './RoundTracker';

const RoundClue = ({ clue, valid }) => {
  return (
    <li className="clue">
      <p>{clue}</p>
      {
        valid === false
          ? <p className="red">Numbers are not repeated in sequence.</p>
          : null
      }
    </li>
  )
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

    const roundArray = Array.apply(null, { length: currentRound }).map((item, i) => i + 1);

    return (
      <section class="row">
        <RoundTracker
          roundArray={roundArray}
          guessedWords={guessWords}
        />

        <div className="row col-xs-9 col-lg-11">
          <div class="col-xs-12">
            <h1>Round {currentRound}</h1>
          </div>
          <section className="clues col-xs-12 col-lg-4">
            <ul>
              {clueWords.map((clue, index) =>
                <RoundClue
                  clue={clue.word}
                  valid={clue.valid}
                />
              )}
            </ul>
            <div className="row around-xs guessRow">
              {clueWords.map((clue, index) => {
                const setGuess = this.setGuess(index);
                return <input
                  className={`guess word-${index + 1} col-xs-2`}
                  setGuess={this.setGuess(index)}
                  type="integer"
                  maxLength="1"
                  onChange={(e) => setGuess(parseInt(e.target.value))}
                  value={clue.guess}
                />
              }
              )}
            </div>
            <button onClick={this.makeGuess}>Submit Guess</button>
          </section>
          <Guesses guessWords={guessWords} />
        </div>
      </section>
    );
  }
}

export default MainGame;
