import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import employeePageStyle from "assets/jss/material-kit-react/views/employeePage.jsx";
// components
import EmployeeTable from "./EmployeeTable";

class EmployeeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEmployees: []
    };
  }

  componentDidMount() {
    const { employees: allEmployees = [] } = this.props;
    this.setState({ allEmployees });
  }

  render() {
    const { allEmployees } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.MarginContainer}>
        <EmployeeTable currentEmployees={allEmployees} />
      </div>
    );
  }
}

export default withStyles(employeePageStyle)(EmployeeContainer);
