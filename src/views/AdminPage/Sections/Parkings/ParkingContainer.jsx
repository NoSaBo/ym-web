import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import parkingPageStyle from "assets/jss/material-kit-react/views/parkingPage.jsx";
// nodejs library that concatenates classes
import classNames from "classnames";
// components
import ParkingTable from "./ParkingTable";
import Pagination from "../../../../components/Pagination/PaginationEngine";
import Selector from "../../../../components/Selector/Selector";

class ParkingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allParkings: [],
      currentParkings: [],
      currentPage: null,
      totalPages: null,
      branches: null,
      serviceShifts: null,
      searched: 0
    };
    this.onFilterChanged = this.onFilterChanged.bind(this);
  }

  componentDidMount() {
    const { parkings: allParkings = [], branches, serviceShifts } = this.props;
    this.setState({ allParkings, branches, serviceShifts });
  }

  onPageChanged = data => {
    const { allParkings } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentParkings = allParkings.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentParkings, totalPages });
  };

  onFilterChanged = (branchId) => {
    const allParkings =this.props.parkings;
    if (branchId === "") {
      this.setState({ allParkings });
    } else {
      const newAllParkings = allParkings.filter(
        parking => parking.serviceshift.branch.id === branchId
      );
      this.setState({ allParkings: newAllParkings, searched: 1 });
    }
    this.onPageChanged;
  };

  render() {
    const {
      allParkings,
      currentParkings,
      currentPage,
      totalPages,
      searched
    } = this.state;
    const { classes } = this.props;
    const totalParkings = allParkings.length;
    
    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-dark border-right" : ""
    ]
      .join(" ")
      .trim();

    if (totalParkings === 0 && searched === 0) return null;

    if (totalParkings === 0 && searched === 1) {
      return (
        <div className={classes.ParkingContainer}>
          <Selector
            branches={this.state.branches}
            serviceShifts={this.state.serviceShifts}
            onFilterChanged={this.onFilterChanged}
          />
        </div>
      )};
    return (
      <div className={classes.ParkingContainer}>
        <Selector
          branches={this.state.branches}
          serviceShifts={this.state.serviceShifts}
          onFilterChanged={this.onFilterChanged}
        />
        <br />
        <ParkingTable currentParkings={currentParkings} />

        <div className={classes.flexParent}>
          <div
            className={classNames(
              "d-flex",
              "flex-row",
              "align-items-center",
              classes.flexChild
            )}
          >
            <h2 className={headerClass}>
              <strong className="text-secondary">{totalParkings}</strong>{" "}
              Parqueos
            </h2>

            {currentPage && (
              <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                <span className="font-weight-bold">{totalPages}</span>
              </span>
            )}
          </div>

          <div className={classes.flexChild}>
            <Pagination
              totalRecords={totalParkings}
              pageLimit={2}
              pageNeighbours={1}
              onPageChanged={this.onPageChanged}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(parkingPageStyle)(ParkingContainer);
