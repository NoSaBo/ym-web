import React, { Component } from "react";
import EmployeeTable from "./EmployeeTable";
import Add from "../../../../components/Modal/employee/Add";

class IndexEmployee extends Component {
  render() {
    return (
      <div>
        <h1>Empleados</h1>
        <Add />
        <EmployeeTable />
      </div>
    );
  }
}

export default IndexEmployee;
