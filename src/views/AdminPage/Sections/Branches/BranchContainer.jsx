import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import branchPageStyle from "assets/jss/material-kit-react/views/branchPage.jsx";
// components
import BranchTable from "./BranchTable";

class BranchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBranches: []
    };
  }

  componentDidMount() {
    const { branches: allBranches = [] } = this.props;
    this.setState({ allBranches });
  }

  render() {
    const { allBranches } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.MarginContainer}>
        <BranchTable currentBranches={allBranches} />
      </div>
    );
  }
}

export default withStyles(branchPageStyle)(BranchContainer);
