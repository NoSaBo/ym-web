import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import EmployeeContainer from "./EmployeeContainer";
import Add from "../../../../components/Modal/employee/Add";
// import Components from "../../../Components/Components";
import { Query } from "react-apollo";
import { GET_EMPLOYEES } from "../../../../queries/employee";

class IndexEmployee extends Component {
  render() {
    return (
      <div>
        <h1>Empleados</h1>
        <Query query={GET_EMPLOYEES}>
          {({ loading, error, data }) => {
            if (loading) return "Loading";
            if (error) return `Error ${error.message}`;
            return (
              <div>
                <Add data={data} />
                <EmployeeContainer employees={data.employees} />
              </div>
            );
          }}
        </Query>
        {/* <Components /> */}
      </div>
    );
  }
}

export default IndexEmployee;
