import { client, stripTypeName } from './apolloClient';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_GAME_STATE = gql`
  {
    getGameState {
      correctGuesses
      incorrectGuesses
      currentRound
      currentRoundWords {
        word
        isCorrect
      }
      gameReady
      guessedWords {
        word
        isCorrect
        guess
        locationInSequence
        roundNumber
        answer
      }
    }
  }
`;

const getGameState = () => {
  return client.query({
    query: GET_GAME_STATE,
    fetchPolicy: 'network-only'
  }).then(result => stripTypeName(result.data.getGameState))
    .catch(error => console.error(error))
}

export {
  getGameState
};
