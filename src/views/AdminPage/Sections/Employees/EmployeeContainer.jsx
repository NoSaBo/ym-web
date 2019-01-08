import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import employeePageStyle from "assets/jss/material-kit-react/views/employeePage.jsx";
// nodejs library that concatenates classes
import classNames from "classnames";
// components
import EmployeeTable from "./EmployeeTable";
import Pagination from "../../../../components/Pagination/PaginationEngine";

class EmployeeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEmployees: [],
      currentEmployees: [],
      currentPage: null,
      totalPages: null
    };
  }

  componentDidMount() {
    const { employees: allEmployees = [] } = this.props;
    this.setState({ allEmployees });
  }

  onPageChanged = data => {
    const { allEmployees } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentEmployees = allEmployees.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentEmployees, totalPages });
  };

  render() {
    const {
      allEmployees,
      currentEmployees,
      currentPage,
      totalPages
    } = this.state;
    const { classes } = this.props;
    const totalEmployees = allEmployees.length;

    if (totalEmployees === 0) return null;

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
              Empleados
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
              totalRecords={totalEmployees}
              pageLimit={2}
              pageNeighbours={1}
              onPageChanged={this.onPageChanged}
            />
          </div>
        </div>

        <div className={classes.flexTable}>
          <EmployeeTable currentEmployees={currentEmployees} />
        </div>
      </div>
    );
  }
}

export default withStyles(employeePageStyle)(EmployeeContainer);
