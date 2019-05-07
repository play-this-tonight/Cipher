import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://cipher-api.playthistonight.com"
});

const stripTypeName = ({ __typename, ...rest }) => {
  if (typeof rest !== 'object') return rest;
  return {
    ...rest
  };
};

export {
  client,
  stripTypeName,
};
