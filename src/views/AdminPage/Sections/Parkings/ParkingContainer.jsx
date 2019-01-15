import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import parkingPageStyle from "assets/jss/material-kit-react/views/parkingPage.jsx";
// nodejs library that concatenates classes
import classNames from "classnames";
// components
import ParkingTable from "./ParkingTable";
import Pagination from "../../../../components/Pagination/PaginationEngine";


class ParkingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allParkings: [],
      currentParkings: [],
      currentPage: null,
      totalPages: null
    };
  }

  componentDidMount() {
    const { parkings: allParkings = [] } = this.props;
    this.setState({ allParkings });
  }

  onPageChanged = data => {
    const { allParkings } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentParkings = allParkings.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentParkings, totalPages });
  };

  render() {
    const {
      allParkings,
      currentParkings,
      currentPage,
      totalPages
    } = this.state;
    const { classes } = this.props;
    const totalParkings = allParkings.length;

    if (totalParkings === 0) return null;

    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-dark border-right" : ""
    ]
      .join(" ")
      .trim();

    return (
      <div>
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
              <strong className="text-secondary">{totalEmployees}</strong>{" "}
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

        <div className={classes.flexTable}>
          <ParkingTable currentParkings={currentParkings} />
        </div>
      </div>
    );
  }
}

export default withStyles(parkingPageStyle)(ParkingContainer);
