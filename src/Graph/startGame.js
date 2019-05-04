import { client, stripTypeName } from './apolloClient';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// Reminder to remove sequenceLocation hre...
const START_GAME = gql`
  mutation {
    startGame
  }
`;

const startGame = () => {
  return client.mutate({
    mutation: START_GAME
  }).then(result => stripTypeName(result.data))
    .catch(error => console.error(error))
}

export {
  startGame
};
