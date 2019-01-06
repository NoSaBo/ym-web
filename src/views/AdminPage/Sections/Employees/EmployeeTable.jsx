import React from "react";
import { Query } from "react-apollo";
import { GET_EMPLOYEES } from "../../../../queries/employee";
import Row from "./Row";

const EmployeesTable = () => (
  <Query query={GET_EMPLOYEES}>
    {({ loading, error, data }) => {
      if (loading) return "Loading";
      if (error) return `Error ${error.message}`;
      return (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>NOMBRE</th>
              <th>APELLIDO</th>
              <th>USUARIO</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {data.employees.map((employee, index) => (
              <Row
                key={index}
                value={employee}
                index={index}
                employee={employee}
              />
            ))}
          </tbody>
        </table>
      );
    }}
  </Query>
);

export default EmployeesTable;
