import gql from "graphql-tag";

export const REGISTER = gql`
  mutation addRegistry(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addRegistry(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;
