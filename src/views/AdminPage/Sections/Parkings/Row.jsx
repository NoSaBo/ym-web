import React from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import parkingPageStyle from "assets/jss/material-kit-react/views/parkingPage.jsx";


const Row = ({ index, parking, classes }) => {
  return (
    <tr>
      <td> {index + 1} </td>
      <td> {parking.owner} </td>
      <td> {parking.token} </td>
      <td> {parking.returned} </td>
    </tr>
  );
};

export default withStyles(parkingPageStyle)(Row);
