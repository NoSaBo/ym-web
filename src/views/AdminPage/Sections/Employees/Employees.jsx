import React, { Component } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import employeePageStyle from "assets/jss/material-kit-react/views/employeePage.jsx";
// GraphQL and Apollo components
import { Query } from "react-apollo";
import { GET_EMPLOYEES } from "../../../../queries/employee";
// core components
import EmployeeRow from "./EmployeeRow";
import Modal from "../../../../components/Modal/EmployeeModal.jsx";
// import Components from "../../../Components/Components.jsx";

class Employees extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="container-fluid">
        <div className={classNames(classes.flexContainerNew)}>
          <h1 className={classes.divMargin}>Empleados</h1>
          <p style={{ marginLeft: "2em" }} />
          <Modal className={classNames(classes.alignNewDiv)} modalType="new" />
        </div>
        <p style={{ marginTop: "4em" }} />
        <div>
          <Query query={GET_EMPLOYEES}>
            {({ loading, error, data, refetch }) => {
              if (loading) return <h4>Loading...</h4>;
              if (error) console.log("error: ", error);
              return (
                <table className="table" align="center">
                  <thead>
                    <tr style={{textAlign: "center"}}>
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
                      <EmployeeRow
                        key={index}
                        employee={employee}
                        index={index}
                      />
                    ))}
                  </tbody>
                </table>
              );
            }}
          </Query>
        </div>
        {/* <Components/> */}
      </div>
    );
  }
}

export default withStyles(employeePageStyle)(Employees);
