import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import EmployeePageStyle from "assets/jss/material-kit-react/views/employeePage.jsx";
//GraphQL
import { Query } from "react-apollo";
import { GET_ADMINS } from "../../../../queries/admin";
//Customized components
import Table from "./EnhancedTable";

class IndexEmployee extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div
        className="container-fluid"
        style={{ paddingBottom: "20px", color: "black" }}
      >
        <div className={classes.flexContainerNew}>
          <h1 className={classes.text}>Administradores</h1>
        </div>
        <Query query={GET_ADMINS}>
          {({ loading, error, data }) => {
            if (loading) return "Loading";
            if (error) return `Error ${error.message}`;
            return <Table data={data.admins} history={this.props.history} />;
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(EmployeePageStyle)(IndexEmployee);
