import React, { Component } from "react";
import EmployeeTable from './EmployeeTable';
import Pagination from '../../../../components/Pagination/PaginationEngine'

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
    const totalEmployees = allEmployees.length;

    console.log("allEmployees", allEmployees);
    console.log("currentEmployees", currentEmployees);
    console.log("currentPage", currentPage);
    console.log("totalPages", totalPages);
    if (totalEmployees === 0) return null;

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h2>
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

            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination
                totalRecords={totalEmployees}
                pageLimit={2}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </div>
          </div>

            <EmployeeTable currentEmployees={currentEmployees}/>
        </div>
      </div>
    );
  }
}

export default EmployeeContainer;
