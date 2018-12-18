import gql from "graphql-tag";

export const GET_EMPLOYEES = gql`
  query EmployeesQuery {
    Employees {
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