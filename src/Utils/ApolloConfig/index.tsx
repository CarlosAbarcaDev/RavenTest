import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// const apiUrl = process.env.REACT_APP_API_URL;
// const apiToken = process.env.REACT_APP_PERSONAL_TOKEN;
const httpLink = createHttpLink({
  uri: 'https://syn-api-prod.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiZTk5MDdlNzgtYjZjMy00ZTA1LWIxZmMtZWU1OTI3NzYzNTZlIiwicHJvamVjdElkIjoiNDEwYWE0NGMtNDhjNy00Zjk3LWE5NDEtN2NlNTI5YmMzYzk1IiwiZnVsbE5hbWUiOiJDYXJsb3MgRXJuZXN0byBMb3BleiBBYmFyY2EiLCJlbWFpbCI6ImNhcmxvcy5hYmFyY2EwMEBnbWFpbC5jb20iLCJpYXQiOjE3MjMwNjUzMTF9.woOa3tOuc_NyggP37OmVV15KENpSIUU89sJqbpKeIm8'
    
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
