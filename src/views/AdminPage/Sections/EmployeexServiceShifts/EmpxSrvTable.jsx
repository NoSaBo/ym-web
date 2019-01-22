import React from "react";
// nodejs library that concatenates classes
// import classNames from "classnames";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import EmpxSrvPageStyle from "assets/jss/material-kit-react/views/EmpxSrvPage.jsx";
// core components
import Row from "./Row";


const EmpxSrvTable = ({ currentEmpxSrvs }, classes) => {
  return (
      <table width="100%">
        <thead align="center">
          <tr>
            <th style={{padding:"1%"}}>#</th>
            <th>EMPLEADO</th>
            <th>HORARIO</th>
            <th>INICIO</th>
            <th>COMENTARIO</th>
          </tr>
        </thead>
        <tbody>
          {currentEmpxSrvs.map((empxsrv, index) => (
            <Row
              key={index}
              value={empxsrv}
              index={index}
              empxsrv={empxsrv}
            />
          ))}
        </tbody>
      </table>
  );
};

export default withStyles(EmpxSrvPageStyle)(EmpxSrvTable);
