import React, { Component, Fragment } from 'react';
import { checkAnswers, getCluesForRound } from '../Utility/parseWords';
import Guesses from './Guesses';
import RoundTracker from './RoundTracker';
import DialPad from './DialPad';
import RoundClues from './RoundClues';
import Locks from './Locks';

const incrementCounts = (
  checkedAnswers,
  {
    correctGuesses,
    incorrectGuesses
  }
) => {
  const includesIncorrect = checkedAnswers.find(({ correct }) => correct === false)

  if (includesIncorrect) {
    return [correctGuesses, incorrectGuesses + 1];
  }
  return [correctGuesses + 1, incorrectGuesses];
}

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

const getNextActiveInput = (clueWords) => {
  const nextWord = clueWords.find(({ guess }) => guess === '');
  const indexOfNextWord = clueWords.indexOf(nextWord);
  return [nextWord, indexOfNextWord];
}

class MainGame extends Component {
  constructor() {
    super();

    this.state = {
      indexOfNextWord: 0,
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

  moveIndex = (clueWords, currentIndex) => {
    const [nextWord, indexOfNextWord] = getNextActiveInput(clueWords);
    if (nextWord) {
      document.querySelector(`[name="${nextWord.word}"]`).focus();
    }
    return indexOfNextWord;
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
    const { clueWords, indexOfNextWord } = this.state;
    const setClues = clueWords.map((item, mappingIndex) => {
      if (mappingIndex === index) return {
        ...item,
        guess: value
      }
      return item;
    });
    const nextIndex = this.moveIndex(setClues, indexOfNextWord);
    this.setState({
      clueWords: setClues,
      indexOfNextWord: nextIndex
    });
  };

  unsetGuess = (value) => {
    const { clueWords, indexOfNextWord } = this.state;

    const unsetClues = clueWords.map((word) => {
      if (word.guess !== value) return word;

      return {
        ...word,
        guess: ''
      }
    });

    const nextIndex = this.moveIndex(unsetClues, indexOfNextWord);
    this.setState({
      clueWords: unsetClues,
      indexOfNextWord: nextIndex,
    })
  }

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
    const checkedAnswers = checkAnswers(currentRound, clueWords);
    this.setState({
      clueWords: checkedAnswers,
    });

    setTimeout(this.startNextRound, 1000, nextRound, checkedAnswers, guessWords);
  }

  startNextRound = (nextRound, checkedAnswers, guessWords) => {
    const {
      gameState
    } = this.state;

    const [correctGuesses, incorrectGuesses] = incrementCounts(checkedAnswers, gameState);


    const nextRoundWords = this.getWordsForRound(nextRound);
    this.setState({
      gameState: {
        ...this.gameState,
        currentRound: nextRound,
        correctGuesses,
        incorrectGuesses,
      },
      guessWords: guessWords.concat(checkedAnswers),
      clueWords: nextRoundWords,
      indexOfNextWord: 0
    });
    this.moveIndex(nextRoundWords, 0);
  }


  render() {
    const {
      clueWords,
      guessWords,
      indexOfNextWord,
      gameState: {
        currentRound,
        correctGuesses,
        incorrectGuesses,
      }
    } = this.state;

    const roundArray = Array.apply(null, { length: currentRound }).map((item, i) => i + 1);

    return (
      <Fragment>
        <div className="col-xs-12 handleOverflow">
          <Guesses guessWords={guessWords} />
        </div>
        <section class="row">
          <RoundTracker
            roundArray={roundArray}
            guessedWords={guessWords}
            correctGuesses={correctGuesses}
            incorrectGuesses={incorrectGuesses}
          />

          <div className="col-xs-9 col-md-11">
            <div className="row">
              <section className="col-xs-12">
                <RoundClues
                  setGuess={this.setGuess}
                  clueWords={clueWords}
                />
                <div className="row around-xs">
                  <div className="col-xs-6 col-sm-2">
                    <DialPad
                      guessedNumbers={clueWords.map(({ guess }) => guess)}
                      setGuess={this.setGuess(indexOfNextWord)}
                      unsetGuess={this.unsetGuess}
                    />
                    <button onClick={this.makeGuess}>Try Lock</button>
                  </div>
                </div>
                <div className="row">
                  <Locks
                    clueWords={clueWords}
                  />
                </div>
                {/* <div className="locks row">
                <img src="https://img.icons8.com/metro/52/000000/lock.png"></img>
                <img src="https://img.icons8.com/metro/52/000000/lock.png"></img>
                <img src="https://img.icons8.com/metro/52/000000/lock.png"></img>
              </div> */}
              </section>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default MainGame;
