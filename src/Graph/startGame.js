import { client, stripTypeName } from './apolloClient';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// Reminder to remove locationInSequence hre...
const START_GAME = gql`
  mutation {
    startGame {
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

const startGame = () => {
  return client.mutate({
    mutation: START_GAME
  }).then(result => stripTypeName(result.data.startGame))
    .catch(error => console.error(error))
}

export {
  startGame
};
