import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import EmpxSrvPageStyle from "assets/jss/material-kit-react/views/EmpxSrvPage.jsx";
// nodejs library that concatenates classes
// import classNames from "classnames";
// components
import EmpxSrvTable from "./EmpxSrvTable";
import Selector from "../../../../components/Selector/Selector";

class EmpxSrvContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEmpxSrv: [],
      branches: null,
      serviceShifts: null
    };
    this.onFilterChanged = this.onFilterChanged.bind(this);
  }

  componentWillMount() {
    const { empxsrvs, branches, serviceShifts } = this.props;
    this.setState({ allEmpxSrv: empxsrvs, branches, serviceShifts });
  }

  onFilterChanged = (branchId, serviceshiftId) => {
    const allParkings = this.props.parkings;
    let newAllParkings = "";
    if (serviceshiftId === "x" && branchId === "x") {
      newAllParkings = allParkings;
    } else if (branchId === "x" && serviceshiftId !== "x") {
      newAllParkings = allParkings.filter(
        parking => parking.serviceshift.id === serviceshiftId
      );
    } else if (serviceshiftId === "x" && branchId !== "x") {
      newAllParkings = allParkings.filter(
        parking => parking.serviceshift.branch.id === branchId
      );
    } else if (serviceshiftId !== "x" && branchId !== "x") {
      newAllParkings = allParkings
        .filter(parking => parking.serviceshift.id === serviceshiftId)
        .filter(parking => parking.serviceshift.branch.id === branchId);
    }
    this.setState({ allParkings: newAllParkings });
  };

  render() {
    const { allEmpxSrv } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.EmpxSrvContainer}>
        <Selector
          branches={this.state.branches}
          serviceShifts={this.state.serviceShifts}
          onFilterChanged={this.onFilterChanged}
        />
        <br />
        <EmpxSrvTable currentEmpxSrvs={allEmpxSrv} />
      </div>
    );
  }
}

export default withStyles(EmpxSrvPageStyle)(EmpxSrvContainer);
