import React, { Component } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import employeePageStyle from "assets/jss/material-kit-react/views/employeePage.jsx";
// core components
import Badge from "../../../../components/Badge/Badge.jsx";
import DisplayModal from "../../../../components/Modal/employee/Display";
import UpdateModal from "../../../../components/Modal/employee/Update";
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
    this.state = {
      employee: this.props.employee
    };
    this.deleteOnClick = this.deleteOnClick.bind(this);
    this.handleChangeEmployee = this.handleChangeEmployee.bind(this);
  }

  deleteOnClick(deleteEmployee, employee) {
    let user = employee.user;
    deleteEmployee({ variables: { user: employee.user } });
    alert(`Empleado ${user} has sido eliminado`);
  }

  handleChangeEmployee(field, value) {
    if (field === "active") {
      value = (value === "true") ? true : false;
    }
    const employee = this.state.employee;
    employee[field] = value;
    this.setState({ employee });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.employee.id !== nextProps.employee.id) {
      this.setState({employee: nextProps.employee})
    }
  }

  render() {
    const employee = this.state.employee;
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
            <DisplayModal employee={employee} />
          </div>
          <div>
            <UpdateModal
              employee={employee}
              onChange={this.handleChangeEmployee}
            />
          </div>
          <div>
            <Mutation mutation={DELETE_EMPLOYEE} update={updateCacheDelete}>
              {deleteEmployee => (
                <Badge
                  color="danger"
                  onClick={() => this.deleteOnClick(deleteEmployee, employee)}
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
