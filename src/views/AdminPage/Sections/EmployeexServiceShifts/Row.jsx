import React from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import EmpxSrvPageStyle from "assets/jss/material-kit-react/views/EmpxSrvPage.jsx";
//core components
import DisplayModal from "../../../../components/Modal/empxsrv/Display";

var moment = require("moment");

const Row = ({ index, empxsrv, classes }) => {
  return (
    <tr className={classes.tr}>
      <td className={classes.td}> {index + 1} </td>
      <td> {empxsrv.employeeName} </td>
      <td> {empxsrv.branchName} </td>
      <td>
        {moment(empxsrv.begindate)
          .add(5, "hours")
          .format("YYYY-MM-DD HH:mm")}
      </td>
      <td>
        { empxsrv.start !== null
          ? moment(empxsrv.start)
          .add(5, "hours")
          .format("YYYY-MM-DD HH:mm")
          : "SIN INICIO"}
      </td>
      <td> {empxsrv.comment} </td>
      <td>
        <div>
          <DisplayModal empxsrv={empxsrv} />
        </div>
      </td>
    </tr>
  );
};

export default withStyles(EmpxSrvPageStyle)(Row);
