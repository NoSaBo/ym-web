import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import BranchPageStyle from "assets/jss/material-kit-react/views/branchPage.jsx";
import BranchContainer from "./BranchContainer";
import Add from "../../../../components/Modal/branch/Add";
import { Query } from "react-apollo";
import { GET_BRANCHES } from "../../../../queries/branch";

class IndexBranch extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div
        className="container-fluid"
        style={{ paddingBottom: "20px", color: "black" }}
      >
        <div className={classes.flexContainerNew}>
          <h1>Sedes</h1>
          <p style={{ marginLeft: "2em" }} />
          <Add />
        </div>
        <Query query={GET_BRANCHES}>
          {({ loading, error, data }) => {
            if (loading) return "Loading";
            if (error) return `Error ${error.message}`;
            return <BranchContainer branches={data.branches} />;
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(BranchPageStyle)(IndexBranch);
