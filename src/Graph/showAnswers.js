import { client, stripTypeName } from './apolloClient';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const SHOW_ANSWERS = gql`
  {
    showAnswers {
      correctGuesses
      incorrectGuesses
      currentRound
      answers {
        word
        parentOf
      }
      guessedWords {
        word
        isCorrect
        guess
        locationInSequence
        roundNumber
        answer
        showAnswer
      }
    }
  }
`;

const showAnswers = () => {
  return client.query({
    query: SHOW_ANSWERS,
    fetchPolicy: 'network-only'
  }).then(result => stripTypeName(result.data.showAnswers))
    .catch(error => console.error(error))
}

export {
  showAnswers
};
