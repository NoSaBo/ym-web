import gql from "graphql-tag";

export const WEB_LOGIN = gql`
  query webLogin (
    $email: String,
    $password: String  
  ) {
    webLogin(
        email: $email,
        password: $password
      ) {
        userID
        username
        token
        tokenExpiration
      }
  }
`;
