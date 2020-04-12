import React, { Component, createContext } from "react";
import { checkGuesses } from "../../Utility/validateGuessWords";
import { getGameState, checkAnswers } from "../../Graph";

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

// These four functions pulls out the API index of the round clues
// And translates them to a number 1-N based on their index in the array.

const getParentFromGuessIndex = (parentConcepts, guessIndex) => {
  if (!guessIndex) return null;

  return parentConcepts[guessIndex - 1];
};

const getGuessIndexFromParent = (parentConcepts, parent) => {
  if (!parent) return "";

  return parentConcepts.indexOf(parent) + 1;
};

const parseRoundClue = (roundClues, parentConcepts) => {
  return roundClues.map(
    ({
      userGuessedParentConceptId,
      parentConceptId,
      isCorrect,
      ...restOfRoundClue
    }) => ({
      ...restOfRoundClue,
      guess: getGuessIndexFromParent(
        parentConcepts,
        userGuessedParentConceptId
      ),
      parentConceptId: getGuessIndexFromParent(parentConcepts, parentConceptId),
      isCorrect: !userGuessedParentConceptId ? null : isCorrect,
    })
  );
};

const parseGameState = ({
  parentConcepts,
  otherRoundClues,
  currentRoundClues,
  ...restOfGameState
}) => ({
  gameState: {
    ...restOfGameState,
    otherRoundClues: parseRoundClue(otherRoundClues, parentConcepts),
    currentRoundClues: parseRoundClue(currentRoundClues, parentConcepts),
  },
  hasFinished: restOfGameState.endedAt !== null,
  parentConcepts,
  hasLoaded: true,
});

const makeGame = (Game) => {
  return class extends Component {
    constructor() {
      super();

      this.state = {
        hasLoaded: false,
        hasFinished: false,
      };
    }

    componentDidMount() {
      const { gameKey } = this.props.match.params;
      this.gameKey = gameKey;
      getGameState(gameKey).then((gameState) => {
        console.log(gameState);
        console.log(parseGameState(gameState));
        this.setState((state) => ({
          ...state,
          ...parseGameState(gameState),
        }));
      });
    }

    setGuessWord = (index) => (value) => {
      const { currentRoundClues } = this.state.gameState;
      const setClues = currentRoundClues.map((item, mappingIndex) => {
        if (mappingIndex === index)
          return {
            ...item,
            guess: value,
          };
        return item;
      });
      this.setState((state) => ({
        ...state,
        gameState: {
          ...state.gameState,
          currentRoundClues: setClues,
        },
      }));
    };

    startNextRound = () => {
      console.log("Round is ", this.state.gameState.currentRound);
      getGameState(this.gameKey).then((gameState) => {
        console.log(parseGameState(gameState));
        this.setState((state) => ({
          ...state,
          ...parseGameState(gameState),
        }));
      });
    };

    setHypothesis = (childConcept, newHypothesis) => {
      const otherRoundClues = this.state.gameState.otherRoundClues.map(
        (roundClue) => {
          if (roundClue.childConcept === childConcept) {
            return {
              ...roundClue,
              hypothesis: newHypothesis,
            };
          }

          return roundClue;
        }
      );

      console.log(otherRoundClues);

      this.setState((state) => ({
        ...state,
        gameState: {
          ...state.gameState,
          otherRoundClues,
        },
      }));
    };

    submitGuesses = () => {
      const { currentRoundClues } = this.state.gameState;

      const { parentConcepts } = this.state;

      const checkedClueWords = currentRoundClues.map(checkGuesses);

      if (checkedClueWords.find(({ invalid }) => invalid !== undefined)) {
        this.setState((state) => ({
          ...state,
          gameState: {
            ...state.gameState,
            currentRoundClues: checkedClueWords,
          },
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

      checkAnswers(guess).then(({ hasGameEnded, roundClues }) => {
        const currentRoundClues = parseRoundClue(roundClues, parentConcepts);
        console.log(currentRoundClues);
        this.setState((state) => ({
          ...state,
          hasFinished: hasGameEnded,
          gameState: {
            ...state.gameState,
            currentRoundClues,
            otherRoundClues: state.gameState.otherRoundClues.concat(
              currentRoundClues
            ),
          },
        }));
        setTimeout(this.startNextRound, 2000);
      });
    };

    render() {
      const { hasLoaded } = this.state;

      return (
        <Provider
          value={{
            gameState: this.state.gameState,
            hasFinished: this.state.hasFinished,
            setGuessWord: this.setGuessWord,
            submitGuesses: this.submitGuesses,
            setHypothesis: this.setHypothesis,
          }}
        >
          {hasLoaded ? <Game gameKey={this.gameKey} /> : null}
        </Provider>
      );
    }
  };
};

export { makeGame, store };
