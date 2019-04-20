import { client, stripTypeName } from './apolloClient';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// const GUESS_INPUT = gql`

// `;

const CHECK_ANSWERS = gql`
  mutation CheckAnswers($guesses: [Guess]) {
    checkAnswers(
      guesses: $guesses
    ) {
      word
      isCorrect
      guess
      answer
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
