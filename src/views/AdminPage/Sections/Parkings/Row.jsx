import React from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import parkingPageStyle from "assets/jss/material-kit-react/views/parkingPage.jsx";
//core components
import DisplayModal from "../../../../components/Modal/parking/Display";

var moment = require("moment");

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
      <td>
        <div>
          <DisplayModal parking={parking} />
        </div>
      </td>
    </tr>
  );
};

export default withStyles(parkingPageStyle)(Row);
