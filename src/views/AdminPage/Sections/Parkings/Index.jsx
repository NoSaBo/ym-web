import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import ParkingContainer from "./ParkingContainer";
import { Query } from "react-apollo";
import { GET_PARKINGS } from "../../../../queries/parking";
import { GET_BRANCHES } from "../../../../queries/branch";
import { GET_SERVICESHIFTS } from "../../../../queries/serviceShift";

class IndexParking extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>Parqueos</h1>
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
                        <Query query={GET_PARKINGS}>
                          {({ loading, error, data }) => {
                            if (loading) return "Loading";
                            if (error) return `Error ${error.message}`;
                            return (
                              <ParkingContainer
                                parkings={data.parkings}
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

export default IndexParking;
