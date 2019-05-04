import { client, stripTypeName } from './apolloClient';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_GAME_STATE = gql`
  query($gameKey: ID!){
    getGameState(key: $gameKey) {
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
  }
`;

const getGameState = (gameKey) => {
  return client.query({
    query: GET_GAME_STATE,
    variables: {
      gameKey,
    },
    fetchPolicy: 'network-only'
  }).then(result => stripTypeName(result.data.getGameState))
    .catch(error => console.error(error))
}

export {
  getGameState
};
