import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
});

const stripTypeName = ({ __typename, ...rest }) => {
  if (typeof rest !== "object") return rest;
  return {
    ...rest,
  };
};

export { client, stripTypeName };
