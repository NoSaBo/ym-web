import gql from "graphql-tag";

export const GET_SERVICESHIFTS = gql`
  query ServiceShiftsQuery {
    serviceShifts {
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
  }
`;
