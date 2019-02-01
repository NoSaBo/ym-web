import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import EmpxSrvPageStyle from "assets/jss/material-kit-react/views/EmpxSrvPage.jsx";
//core components
import Badge from "../../../../components/Badge/Badge";
import DisplayModal from "../../../../components/Modal/empxsrv/Display";
//GraphQL & Apollo
import { Mutation } from "react-apollo";
import { DELETE_EMPLOYEEXSERVICESHIFT } from "../../../../mutations/employeexserviceshifts";


var moment = require("moment");

const deleteOnClick = (deleteEmployeexserviceshift, empxsrv) => {
  deleteEmployeexserviceshift({ variables: { id: empxsrv.id } });
  alert(`Horario asignado ha sido eliminado`);
  window.location.reload();
  // this.props.history.push("/admin-page/");
};

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
      <td className={classNames(classes.flexContainerActions, classes.td)}>
        <div>
          <DisplayModal empxsrv={empxsrv} />
        </div>
        <div>
          <Mutation mutation={DELETE_EMPLOYEEXSERVICESHIFT}>
            {deleteEmployeexserviceshift => (
              <Badge
                color="danger"
                onClick={() => deleteOnClick(deleteEmployeexserviceshift, empxsrv)}
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

export default withStyles(EmpxSrvPageStyle)(Row);
