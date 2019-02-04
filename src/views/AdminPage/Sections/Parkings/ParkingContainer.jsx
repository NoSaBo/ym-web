import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import parkingPageStyle from "assets/jss/material-kit-react/views/parkingPage.jsx";
// nodejs library that concatenates classes
// import classNames from "classnames";
// components
import ParkingTable from "./ParkingTable";
import Selector from "../../../../components/Selector/Selector";

class ParkingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allParkings: [],
      branches: null,
      serviceShifts: null
    };
    this.onFilterChanged = this.onFilterChanged.bind(this);
  }

  componentWillMount() {
    const { parkings, branches, serviceShifts } = this.props;
    this.setState({ allParkings: parkings, branches, serviceShifts });
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
    const { allParkings } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.MarginContainer}>
        <Selector
          branches={this.state.branches}
          serviceShifts={this.state.serviceShifts}
          onFilterChanged={this.onFilterChanged}
        />
        <br />
        <ParkingTable currentParkings={allParkings}/>
      </div>
    );
  }
}

export default withStyles(parkingPageStyle)(ParkingContainer);
