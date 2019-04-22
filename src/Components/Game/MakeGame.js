import React, { Component, Fragment } from 'react';
import { checkGuesses } from '../../Utility/validateGuessWords';
import { getGameState, startGame, checkAnswers } from '../../Graph';
import { Redirect } from 'react-router-dom';

const checkHasFinished = ({ correctGuesses = 0 }) => {
  console.log("Correct Guesses here is ", correctGuesses);
  return correctGuesses >= 3;
}

// correctGuesses >= 3;

const processGameState = (gameState) => ({
  ...gameState,
  currentRoundWords: gameState.currentRoundWords.map((word) => ({
    ...word,
    guess: ''
  }))
})

const makeGame = (Game) => {
  return class extends Component {
    constructor() {
      super();

      this.state = {
        hasLoaded: false,
        hasFinished: false,
      }
    }

    componentDidMount() {
      getGameState()
        .then((gameState) => {
          this.setState(state => ({
            ...state,
            hasFinished: checkHasFinished(gameState),
            hasLoaded: true,
            gameState: processGameState(gameState),
          }))
        })
    }

    setGuessWord = (index) => (value) => {
      const { currentRoundWords } = this.state.gameState;
      const setClues = currentRoundWords.map((item, mappingIndex) => {
        if (mappingIndex === index) return {
          ...item,
          guess: value
        }
        return item;
      });
      this.setState(state => ({
        ...state,
        gameState: {
          ...state.gameState,
          currentRoundWords: setClues,
        }
      }));
    };

    // Refactor unset to use index, and merge with setGues
    unsetGuessWord = (value) => {
      const { currentRoundWords } = this.state.gameState;

      const unsetClues = currentRoundWords.map((word) => {
        if (word.guess !== value) return word;

        return {
          ...word,
          guess: ''
        }
      });

      this.setState(state => ({
        ...state,
        gameState: {
          ...state.gameState,
          currentRoundWords: unsetClues,
        }
      }));
    }

    startNextRound = () => {
      console.log("Round is ", this.state.gameState.currentRound)
      getGameState().then((newGameState) => {
        console.log(newGameState);
        this.setState(state => ({
          ...state,
          hasFinished: checkHasFinished(newGameState),
          gameState: {
            ...state.gameState,
            ...processGameState(newGameState)
          }
        }))
      })
    }

    submitGuesses = () => {
      const {
        guessWords,
        currentRoundWords,
        currentRound
      } = this.state.gameState;

      const checkedClueWords = currentRoundWords.map(checkGuesses);

      if (checkedClueWords.find(({ invalid }) => invalid !== undefined)) {
        this.setState(state => ({
          ...state,
          gameState: {
            ...state.gameState,
            currentRoundWords: checkedClueWords,
          }
        }));
        return;
      }

      const wordsForChecking = currentRoundWords.map(({ guess, word }) => ({
        guess,
        word,
      }))

      checkAnswers(wordsForChecking).then((guessedWords) => {
        this.setState(state => ({
          ...state,
          gameState: {
            ...state.gameState,
            currentRoundWords: guessedWords,
          }
        }));
        setTimeout(this.startNextRound, 1000);
      })

    }

    render() {
      const { hasLoaded, hasFinished } = this.state;

      if (hasFinished) return <Redirect to="/end-game" />


      return (
        <Fragment>
          {
            hasLoaded
              ? <Game
                setGuessWord={this.setGuessWord}
                unsetGuessWord={this.unsetGuessWord}
                submitGuesses={this.submitGuesses}
                {...this.state.gameState} />
              : null
          }
        </Fragment>
      )
    }
  };
};

export default makeGame;
