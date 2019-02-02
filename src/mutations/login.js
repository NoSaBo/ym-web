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
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
