import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import parkingPageStyle from "assets/jss/material-kit-react/views/parkingPage.jsx";
//core components
import Badge from "../../../../components/Badge/Badge";
import DisplayModal from "../../../../components/Modal/parking/Display";
//GraphQL & Apollo
import { Mutation } from "react-apollo";
import { DELETE_PARKING } from "../../../../mutations/parking";
import { GET_PARKINGS } from "../../../../queries/parking";

var moment = require("moment");

const updateCacheDelete = (cache, { data: { deleteParking } }) => {
  const { parkings } = cache.readQuery({ query: GET_PARKINGS });
  cache.writeQuery({
    query: GET_PARKINGS,
    data: {
      parkings: parkings.filter(n => n.id !== deleteParking.id)
    }
  });
};

const deleteOnClick = (deleteParking, parking) => {
  let parkingPlate = parking.plate;
  deleteParking({ variables: { id: parking.id } });
  alert(`Parqueo con placa ${parkingPlate} ha sido eliminada`);
  window.location.reload();
  // this.props.history.push("/admin-page/");
};


const Row = ({ index, parking, classes }) => {
  return (
    <tr className={classes.tr}>
      <td className={classes.td}> {index + 1} </td>
      <td>
        {" "}
        {moment(parking.serviceshift.begindate)
          .add(5, "hours")
          .format("YYYY-MM-DD HH:mm")}{" "}
      </td>
      <td> {parking.serviceshift.branch.branch} </td>
      <td> {parking.owner} </td>
      <td> {parking.returned ? "SI" : "NO"} </td>
      <td className={classNames(classes.flexContainerActions, classes.td)}>
        <div>
          <DisplayModal parking={parking} />
        </div>
        <div>
          <Mutation mutation={DELETE_PARKING} update={updateCacheDelete}>
            {deleteParking => (
              <Badge
                color="danger"
                onClick={() => deleteOnClick(deleteParking, parking)}
              >
                <i className="material-icons">close</i>
              </Badge>
            )}
          </Mutation>
        </div>
      </td>
    </tr>
  );
};

export default withStyles(parkingPageStyle)(Row);
