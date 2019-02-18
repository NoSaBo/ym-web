import React from "react";
// nodejs library that concatenates classes
// import classNames from "classnames";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import ParkingsPageStyle from "assets/jss/material-kit-react/views/parkingPage";
// core components
import Row from "./Row";


const ParkingsTable = ({ currentParkings, changeTab }) => {
  return (
      <table width="100%">
        <thead align="center">
          <tr>
            <th style={{padding:"1%"}}>#</th>
            <th>HORARIO</th>
            <th>SEDE</th>
            <th>PROPIETARIO</th>
            <th>RETORNADO</th>
            <th>DETALLES</th>
          </tr>
        </thead>
        <tbody>
          {currentParkings.map((parking, index) => (
            <Row
              key={index}
              value={parking}
              index={index}
              parking={parking}
            />
          ))}
        </tbody>
      </table>
  );
};

export default withStyles(ParkingsPageStyle)(ParkingsTable);
