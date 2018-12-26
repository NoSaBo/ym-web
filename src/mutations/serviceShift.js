import gql from "graphql-tag";

export const NEW_SERVICESHIFT = gql`
  mutation addServiceShift(
    $begindate: DateTime!
    $workspan: Time!
    $active: Boolean!
    $branchId: ID!
  ) {
    addServiceShift(
      begindate: $begindate
      workspan: $workspan
      active: $active
      branchId: $branchId    
    ) {
      id
      begindate
      workspan
      active
      branch{
        id
        branch
      }
    }
  },
`;

export const ADD_EMPLOYEE_TO_SERVICESHIFT = gql`
  mutation addEmployeeToServiceShift(
    $id: ID!
    $employeeId: ID!
  ) {
    addEmployeeToServiceShift(
      id: $id
      employeeId: $employeeId
    ){
      begindate
      branch {
        branch
      }
      employees{
        firstname
      }
    }
  }
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
