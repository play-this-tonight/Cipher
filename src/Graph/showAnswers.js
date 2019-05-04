import { client, stripTypeName } from './apolloClient';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const SHOW_ANSWERS = gql`
  {
    showAnswers {
      game {
        correctGuessCount
        currentRound
        startedAt
        endedAt
        incorrectGuessCount
        otherRoundClues {
          childConcept
          sequenceLocation
          gameRound
          guess
          parentConceptId
          isCorrect
        }
        currentRoundClues {
          childConcept
          sequenceLocation
          gameRound
          guess
          parentConceptId
          isCorrect
        }
        parentConcepts
      }
      gameAnswers {
        parentConcept
        parentConceptId
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
