import gql from "graphql-tag";

export const NEW_SERVICESHIFT = gql`
  mutation addServiceShift(
    $begindate: DateTime!
    $workspan: Time!
    $active: Boolean!
    $branchId: ID!
    $employeeId: ID!
  ) {
    addServiceShift(
      begindate: $begindate
      workspan: $workspan
      active: $active
      branchId: $branchId
      employeeId: $employeeId      
    ) {
      id
      begindate
      workspan
      active
      branch{
        id
        branch
      }
      employee{
        id
        firstname
      }
    }
  },
`;

export const DELETE_SERVICESHIFT = gql`
mutation deleteServiceShift($id: ID!){
    deleteServiceShift(id: $id){
        id
        begindate
        workspan
        active
    }
}
`;
