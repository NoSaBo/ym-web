import gql from "graphql-tag";

export const NEW_EMPLOYEE = gql`
mutation addEmployee(
  $firstname: String!
  $lastname: String!
  $user: String!
  $password: String!
  $dni: String!
  $phone: String!
  $active: Boolean!
) {
  addEmployee(
    firstname: $firstname
    lastname: $lastname
    user: $user
    password: $password
    dni: $dni
    phone: $phone
    active: $active
  ) {
    id
    firstname
    lastname
    user
    dni
    phone
    active
  }
}
`;
export const DELETE_EMPLOYEE = gql`
mutation deleteEmployee($user: String!) {
  deleteEmployee(user: $user) {
    id
    firstname
    lastname
    user
    dni
    phone
    active
  }
}
`;