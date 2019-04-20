import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const stripTypeName = ({ __typename, ...rest }) => ({ ...rest });

export {
  client,
  stripTypeName,
};
