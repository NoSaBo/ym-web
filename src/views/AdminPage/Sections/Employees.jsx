import React, { Component } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react-router, graphQL and Apollo components
import { Query } from "react-apollo";
import { GET_EMPLOYEES } from '../../../queries/employee';
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import employeePageStyle from "assets/jss/material-kit-react/views/employeePage.jsx";
// core components
import EmployeeRow from "./EmployeeRow";
import Modal from '../../../components/Modal/Modal.jsx';
// import Components from "../../Components/Components.jsx";


class Employees extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="container-fluid">
          <div className={classNames(classes.flexContainerNew)}>
            <h1>Empleados</h1>
            <p style={{marginLeft:"2em"}}></p>
            <Modal className={classNames(classes.alignNewDiv)} modalType="new"/>
          </div>

          <div>
            <Query query={GET_EMPLOYEES}>
              {({ loading, error, data, refetch }) => {
                if (loading) return <h4>Loading...</h4>;
                if (error) console.log("error: ", error);
                console.log("data.Employees", data.Employees);
                return (
                  <table className="table" align="center">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>USUARIO</th>
                        <th>ESTADO</th>
                        <th className="text-right">ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.Employees.map((employee, index) => (
                        <EmployeeRow key={index} employee={employee} index={index}/>
                      ))}
                    </tbody>
                  </table>
                );
              }}
            </Query>
          </div>
        </div>
        {/* <Components/> */}
      </div>
    );
  }
}

export default withStyles(employeePageStyle)(Employees);
