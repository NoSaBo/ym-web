import gql from "graphql-tag";

export const DELETE_EMPLOYEEXSERVICESHIFT = gql`
  mutation deleteEmployeexserviceshift($id: ID!) {
    deleteEmployeexserviceshift(id: $id) {
      id
    }
  }
`;