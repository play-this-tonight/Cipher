import { client, stripTypeName } from './apolloClient';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// const GUESS_INPUT = gql`

// `;

const CHECK_ANSWERS = gql`
  mutation CheckAnswers(
    $guesses: [Guess]
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

const checkAnswers = (wordGuesses) => {
  return client.mutate({
    mutation: CHECK_ANSWERS,
    variables: {
      guesses: wordGuesses,
    }
  }).then(result => result.data.checkAnswers.map(result => stripTypeName(result)))
    .catch(error => console.error(error))
}

export {
  checkAnswers
};
