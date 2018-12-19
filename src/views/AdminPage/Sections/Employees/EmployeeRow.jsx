import React, { Component } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import employeePageStyle from "assets/jss/material-kit-react/views/employeePage.jsx";
// core components
import Badge from "../../../../components/Badge/Badge.jsx";
import Modal from "../../../../components/Modal/Modal.jsx";
// queries and mutations with react-apollo
import { Mutation } from "react-apollo";
import { GET_EMPLOYEES } from "../../../../queries/employee";
import { DELETE_EMPLOYEE } from "../../../../mutations/employee";

const updateCacheDelete = (cache, { data: { deleteEmployee } }) => {
  const { employees } = cache.readQuery({ query: GET_EMPLOYEES });
  cache.writeQuery({
    query: GET_EMPLOYEES,
    data: {
      employees: employees.filter(n => n.user !== deleteEmployee.user)
    }
  });
};

class EmployeeRow extends Component {
  constructor(props) {
    super(props);
    this.deleteOnClick = this.deleteOnClick.bind(this);
  }

  deleteOnClick(deleteEmployee, employee) {
    deleteEmployee({ variables: { user: employee.user } });
    alert("Datos de empleado eliminados");
  }

  render() {
    const employee = this.props.employee;
    const index = parseInt(this.props.index, 10) + 1;
    const { classes } = this.props;
    return (
      <tr>
        <td> {index} </td>
        <td> {employee.firstname} </td>
        <td> {employee.lastname} </td>
        <td> {employee.user} </td>
        <td> {employee.active ? "Activo" : "Inactivo"} </td>
        <td
          className={classNames(
            "td-actions",
            "text-right",
            classes.flexContainerActions
          )}
        >
          <div>
            <Modal modalType="display" employee={employee} />
          </div>
          <div>
            <Modal modalType="edit" employee={employee} />
          </div>
          <div>
            <Mutation mutation={DELETE_EMPLOYEE} update={updateCacheDelete}>
              {deleteEmployee => (
                <Badge
                  color="danger"
                  onClick={() => this.deleteOnClick(deleteEmployee, employee)}
                  // onClick={() => {
                  //   deleteEmployee({ variables: { user: employee.user } });
                  //   alert("Datos de empleado eliminados");
                  // }}
                >
                  <i className="material-icons">close</i>
                </Badge>
              )}
            </Mutation>
          </div>
        </td>
      </tr>
    );
  }
}

export default withStyles(employeePageStyle)(EmployeeRow);
