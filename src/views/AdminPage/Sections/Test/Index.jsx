import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import EmployeePageStyle from "assets/jss/material-kit-react/views/employeePage.jsx";
import Table from "./EnhancedTable";
import Add from "../../../../components/Modal/employee/Add";
import { Query } from "react-apollo";
import { GET_EMPLOYEES } from "../../../../queries/employee";
// import MaterialTable from "material-table";


class IndexEmployee extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div
        className="container-fluid"
        style={{ paddingBottom: "20px", color: "black" }}
      >
        <div className={classes.flexContainerNew}>
          <h1 className={classes.text}>Empleados</h1>
          <p style={{ marginLeft: "2em" }} /> <Add />
        </div>
        <Query query={GET_EMPLOYEES}>
          {({ loading, error, data }) => {
            if (loading) return "Loading";
            if (error) return `Error ${error.message}`;
            return <Table data={data.employees} history={this.props.history}/>;
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(EmployeePageStyle)(IndexEmployee);
