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
import AddModal from "../../../../components/Modal/employee/Add";
// import Pagination from "../../../../components/Pagination/PaginationEmployee";
// import Components from "../../../Components/Components.jsx";

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: {
        firstname: "",
        lastname: "",
        dni: "",
        user: "",
        phone: "",
        password: "",
        active: ""
      },
      currentPage: 1,
      itemsPerPage: 3
    };
    this.updateEmployeeState = this.updateEmployeeState.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleClickPagintation = this.handleClickPagintation.bind(this);
  }

  updateEmployeeState(event) {
    const field = event.target.name;
    let value = event.target.value;
    if (field === "active") {
      value = value === "true" ? true : false;
    }
    const employee = this.state.employee;
    employee[field] = value;
    return this.setState({ employee });
  }

  resetForm() {
    this.setState({
      employee: {
        firstname: "",
        lastname: "",
        dni: "",
        user: "",
        phone: "",
        password: "",
        active: ""
      }
    });
  }

  handleClickPagintation(event) {
    event.preventDefault();
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    let { classes } = this.props;
    let { currentPage, itemsPerPage } = this.state;
    let currentItems = [];
    let allItems = [];
    let pageNumbers = [];
    return (
      <div className="container-fluid">
        <div className={classNames(classes.flexContainerNew)}>
          <h1 className={classes.divMargin}>Empleados</h1>
          <p style={{ marginLeft: "2em" }} />
          <AddModal
            className={classNames(classes.alignNewDiv)}
            onChange={this.updateEmployeeState}
            employee={this.state.employee}
            resetForm={this.resetForm}
          />
        </div>
        <p style={{ marginTop: "4em" }} />
        <div>
          <Query query={GET_EMPLOYEES}>
            {({ loading, error, data, refetch }) => {
              if (loading) return <h4>Loading...</h4>;
              if (error) console.log("error: ", error);

              allItems = data.employees;
              const indexOfLastTodo = currentPage * itemsPerPage;
              const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
              currentItems = allItems.slice(indexOfFirstTodo, indexOfLastTodo);
              for (
                let i = 1;
                i <= Math.ceil(allItems.length / itemsPerPage);
                i++
              ) {
                pageNumbers.push(i);
              }
              return (
                <div>
                  <div>
                    <table className="table" align="center">
                      <thead>
                        <tr style={{ textAlign: "center" }}>
                          <th>#</th>
                          <th>NOMBRE</th>
                          <th>APELLIDO</th>
                          <th>USUARIO</th>
                          <th>ESTADO</th>
                          <th>ACCIONES</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((employee, index) => (
                          <EmployeeRow
                            key={index}
                            employee={employee}
                            index={index}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <ul className={classNames(classes.pageNumbers)}>
                    {pageNumbers.map(number => {
                      return (
                        <li
                          key={number}
                          id={number}
                          onClick={this.handleClickPagintation}
                          className={classNames(classes.liOfpageNumbers)}
                        >
                          {number}
                        </li>
                      );
                    })}
                  </ul>
                </div>
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
