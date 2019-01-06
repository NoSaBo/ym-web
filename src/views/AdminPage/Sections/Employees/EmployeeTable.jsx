import React from "react";
import Row from "./Row";


const EmployeesTable = ({ data }) => {
  return (
    <div>
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
    </div>
  );
};

export default EmployeesTable;
