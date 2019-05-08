import React, { Component, Fragment } from 'react';
import { checkGuesses } from '../../Utility/validateGuessWords';
import { getGameState, startGame, checkAnswers } from '../../Graph';
import { Redirect } from 'react-router-dom';

// These four functions pulls out the API index of the round clues
// And translates them to a number 1-N based on their index in the array.

const getParentFromGuessIndex = (parentConcepts, guessIndex) => {
  if (!guessIndex) return null;

  return parentConcepts[guessIndex - 1];
}

const getGuessIndexFromParent = (parentConcepts, parent) => {
  if (!parent) return '';

  return parentConcepts.indexOf(parent) + 1;
}

const parseRoundClue = (
  roundClues,
  parentConcepts,
) => {
  return roundClues.map(({ userGuessedParentConceptId, parentConceptId, isCorrect, ...restOfRoundClue }) => ({
    ...restOfRoundClue,
    guess: getGuessIndexFromParent(parentConcepts, userGuessedParentConceptId),
    parentConceptId: getGuessIndexFromParent(parentConcepts, parentConceptId),
    isCorrect: !userGuessedParentConceptId ? null : isCorrect,
  }))
}

const parseGameState = ({ parentConcepts, otherRoundClues, currentRoundClues, ...restOfGameState }) => ({
  gameState: {
    ...restOfGameState,
    otherRoundClues: parseRoundClue(otherRoundClues, parentConcepts),
    currentRoundClues: parseRoundClue(currentRoundClues, parentConcepts),
  },
  hasFinished: restOfGameState.endedAt !== null,
  parentConcepts,
  hasLoaded: true,
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
      const { gameKey } = this.props.match.params;
      this.gameKey = gameKey;
      getGameState(gameKey)
        .then((gameState) => {
          console.log(gameState);
          console.log(parseGameState(gameState))
          this.setState((state) => ({
            ...state,
            ...parseGameState(gameState),
          }))
        })
    }

    setGuessWord = (index) => (value) => {
      const { currentRoundClues } = this.state.gameState;
      const setClues = currentRoundClues.map((item, mappingIndex) => {
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
          currentRoundClues: setClues,
        }
      }));
    };

    // Refactor unset to use index, and merge with setGues
    unsetGuessWord = (value) => {
      const { currentRoundClues } = this.state.gameState;

      const unsetClues = currentRoundClues.map((word) => {
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
          currentRoundClues: unsetClues,
        }
      }));
    }

    startNextRound = () => {

      console.log("Round is ", this.state.gameState.currentRound)
      getGameState(this.gameKey)
        .then((gameState) => {
          console.log(parseGameState(gameState))
          this.setState((state) => ({
            ...state,
            ...parseGameState(gameState),
          }))
        })
    }

    submitGuesses = () => {
      const {
        guessWords,
        currentRoundClues,
        currentRound
      } = this.state.gameState;

      const {
        parentConcepts
      } = this.state;

      const checkedClueWords = currentRoundClues.map(checkGuesses);

      if (checkedClueWords.find(({ invalid }) => invalid !== undefined)) {
        this.setState(state => ({
          ...state,
          gameState: {
            ...state.gameState,
            currentRoundClues: checkedClueWords,
          }
        }));
        return;
      }

      const guesses = currentRoundClues.map(({ guess, childConcept }) => ({
        guess: getParentFromGuessIndex(parentConcepts, guess),
        word: childConcept,
      }));

      const guess = {
        gameKey: this.gameKey,
        guesses,
      };

      checkAnswers(guess)
        .then(({ hasGameEnded, roundClues }) => {
          const currentRoundClues = parseRoundClue(roundClues, parentConcepts);
          console.log(currentRoundClues);
          this.setState(state => ({
            ...state,
            hasFinished: hasGameEnded,
            gameState: {
              ...state.gameState,
              currentRoundClues,
              otherRoundClues: state.gameState.otherRoundClues.concat(currentRoundClues)
            }
          }));
          setTimeout(this.startNextRound, 2000);
        })

    }

    render() {
      const { hasLoaded, hasFinished } = this.state;

      console.log(hasFinished);

      if (hasFinished) return <Redirect to={`/show-results/${this.gameKey}`} />

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
