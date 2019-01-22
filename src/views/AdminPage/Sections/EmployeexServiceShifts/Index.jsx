import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import EmpxSrvContainer from "./EmpxSrvContainer";
import { Query } from "react-apollo";
import { GET_EMPLOYEEXSERVICESHIFTS } from "../../../../queries/employeexserviceshifts";
import { GET_BRANCHES } from "../../../../queries/branch";
import { GET_SERVICESHIFTS } from "../../../../queries/serviceShift";

class IndexEmployeexServiceShifts extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>Control de Asistencia</h1>
        <Query query={GET_BRANCHES}>
          {({ loading, error, data }) => {
            if (loading) return "Loading";
            if (error) return `Error ${error.message}`;
            let branches = data.branches;
            return (
              <div>
                <Query query={GET_SERVICESHIFTS}>
                  {({ loading, error, data }) => {
                    if (loading) return "Loading";
                    if (error) return `Error ${error.message}`;
                    let serviceShifts= data.serviceShifts;
                    return (
                      <div>
                        <Query query={GET_EMPLOYEEXSERVICESHIFTS}>
                          {({ loading, error, data }) => {
                            if (loading) return "Loading";
                            if (error) return `Error ${error.message}`;
                            console.log(data);
                            return (
                              <EmpxSrvContainer
                                empxsrvs={data.employeesxserviceshifts}
                                branches={branches}
                                serviceShifts={serviceShifts}
                              />
                            );
                          }}
                        </Query>
                      </div>
                    );
                  }}
                </Query>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default IndexEmployeexServiceShifts;
