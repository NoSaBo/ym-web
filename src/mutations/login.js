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
