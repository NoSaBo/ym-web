import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import ParkingContainer from "./ParkingContainer";
import { Query } from "react-apollo";
import { GET_PARKINGS } from "../../../../queries/parking";

class IndexParking extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>Parqueos</h1>
        <Query query={GET_PARKINGS}>
          {({ loading, error, data }) => {
            if (loading) return "Loading";
            if (error) return `Error ${error.message}`;
            return <ParkingContainer parkings={data.parkings} />;
          }}
        </Query>
      </div>
    );
  }
}

export default IndexParking;
