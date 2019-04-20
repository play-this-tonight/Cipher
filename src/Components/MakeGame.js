import React, { Component, Fragment } from 'react';
import ApolloClient from "apollo-boost";
import {
  startNewGamePromise,
  makeGuessPromise,
  getGameStatePromise
} from '../MockApi/gameState';
import { checkGuesses } from '../Utility/validateGuessWords';
// const client = new ApolloClient({
//   uri: "https://48p1r2roz4.sse.codesandbox.io"
// });

// increment Guess Counts

// Sets point for the input
// creates New Round
// Sets a Word Guess (calls sets pointer)
// Validates input details
// Makes a Round Guess


const makeGame = (Game) => {
  return class extends Component {
    constructor() {
      super();

      this.state = {
        hasLoaded: false,
      }
    }

    componentDidMount() {
      startNewGamePromise()
        .then((gameState) => {
          this.setState(state => ({
            ...state,
            hasLoaded: true,
            gameState: gameState,
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
      getGameStatePromise().then((newGameState) => {
        this.setState(state => ({
          ...state,
          gameState: {
            ...state.gameState,
            ...newGameState
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

      makeGuessPromise(currentRoundWords).then((guessedWords) => {
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
      const { hasLoaded } = this.state;

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
