import React from "react";
import Row from "./Row";

const BranchTable = ({ currentBranches }) => {
  return (
    <table width="100%">
      <thead align="center">
        <tr>
          <th style={{ padding: "1%" }}>#</th>
          <th>SEDE</th>
          <th>DIRECCION</th>
          <th>CONTACTO</th>
          <th>TELEFONO</th>
          <th>ESTADO</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {currentBranches.map((branch, index) => (
          <Row key={index} value={branch} index={index} branch={branch} />
        ))}
      </tbody>
    </table>
  );
};

export default BranchTable;
