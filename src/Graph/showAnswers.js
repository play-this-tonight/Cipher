import { client, stripTypeName } from './apolloClient';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const SHOW_ANSWERS = gql`
  query($gameKey: ID!){
    showFinalGameState(key: $gameKey) {
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
          userGuessedParentConceptId
          parentConceptId
          isCorrect
        }
        currentRoundClues {
          childConcept
          sequenceLocation
          gameRound
          userGuessedParentConceptId
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

const showAnswers = (gameKey) => {
  return client.query({
    query: SHOW_ANSWERS,
    variables: {
      gameKey,
    },
    fetchPolicy: 'network-only'
  }).then(result => stripTypeName(result.data.showFinalGameState))
    .catch(error => console.error(error))
}

export {
  showAnswers
};
