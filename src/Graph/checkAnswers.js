import { client, stripTypeName } from './apolloClient';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// const GUESS_INPUT = gql`

// `;

const CHECK_ANSWERS = gql`
  mutation CheckAnswers(
    $guesses: [Guess]!
    $gameKey: ID!
  ) {
    checkAnswers(
      gameKey: $gameKey
      guesses: $guesses
    ) {
      hasGameEnded
      roundClues {
        childConcept
        sequenceLocation
        gameRound
        userGuessedParentConceptId
        parentConceptId
        isCorrect
      }
    }
  }
`;

const checkAnswers = ({ guesses, gameKey }) => {
  return client.mutate({
    mutation: CHECK_ANSWERS,
    variables: {
      guesses,
      gameKey,
    }
  }).then(result => result.data.checkAnswers)
    .catch(error => console.error(error))
}

export {
  checkAnswers
};
