import React from "react";
import Row from "./Row";

const EmployeesTable = ({ currentEmployees }) => {
  return (
    <table width="100%">
      <thead align="center">
        <tr>
          <th style={{ padding: "1%" }}>#</th>
          <th>NOMBRE</th>
          <th>APELLIDO</th>
          <th>USUARIO</th>
          <th>ESTADO</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {currentEmployees.map((employee, index) => (
          <Row key={index} value={employee} index={index} employee={employee} />
        ))}
      </tbody>
    </table>
  );
};

export default EmployeesTable;
