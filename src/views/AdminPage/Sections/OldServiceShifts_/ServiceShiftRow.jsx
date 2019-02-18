import React, { Component } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import ServiceShiftPageStyle from "assets/jss/material-kit-react/views/serviceShiftPage.jsx";
// core components
import Badge from "../../../../components/Badge/Badge.jsx";
import ModalDisplay from "../../../../components/Modal/serviceShift/Display.jsx";
import ModalAddEmployee from "../../../../components/Modal/serviceShift/AddEmployee.jsx";
import Moment from "react-moment";
import ModalUpdate from "../../../../components/Modal/serviceShift/Update.jsx";
// queries and mutations with react-apollo
import { Query, Mutation } from "react-apollo";
import { GET_SERVICESHIFTS } from "../../../../queries/serviceShift";
import { GET_EMPLOYEES } from "../../../../queries/employee";
import { DELETE_SERVICESHIFT } from "../../../../mutations/serviceShift";

const updateCacheDelete = (cache, { data: { deleteServiceShift } }) => {
  const { serviceShifts } = cache.readQuery({ query: GET_SERVICESHIFTS });
  cache.writeQuery({
    query: GET_SERVICESHIFTS,
    data: {
      serviceShifts: serviceShifts.filter(n => n.id !== deleteServiceShift.id)
    }
  });
};

class ServiceShiftRow extends Component {
  constructor(props) {
    super(props);
    this.deleteOnClick = this.deleteOnClick.bind(this);
  }

  deleteOnClick(deleteServiceShift, serviceShift) {
    deleteServiceShift({ variables: { id: serviceShift.id } });
    alert("Datos de Horario eliminados");
  }

  render() {
    const serviceShift = this.props.serviceShift;
    const index = parseInt(this.props.index, 10) + 1;
    const { classes } = this.props;
    return (
      <tr className={classes.tr}>
        <td className={classes.td}> {index} </td>
        <td>{ serviceShift.branch.branch }</td>
        <td>
          {" "}
          <Moment add={{ hours: 5 }} format={"YYYY-MM-DD HH:mm"}>
            {serviceShift.begindate}
          </Moment>
        </td>
        <td>
          {" "}
          <Moment add={{ hours: 5 }} format={"YYYY-MM-DD HH:mm"}>
            {serviceShift.workspan}
          </Moment>
        </td>
        <td> {serviceShift.active ? "Activo" : "Inactivo"} </td>
        <td className={classNames(classes.flexContainerActions, classes.td)}>
          <div>
            <ModalDisplay serviceShift={serviceShift} />
          </div>
          <Query query={GET_EMPLOYEES}>
            {({ loading, error, data }) => {
              if (loading) return <h4>Loading...</h4>;
              if (error) console.log("Query error: ", error);
              return (
                <div>
                  <ModalAddEmployee
                    serviceShift={serviceShift}
                    employees={data.employees}
                  />
                </div>
              );
            }}
          </Query>

          <div>
            <ModalUpdate serviceshift={serviceShift} />
          </div>
          <div className={classes.isDisabled}>
          {/* <div> */}
            <Mutation mutation={DELETE_SERVICESHIFT} update={updateCacheDelete}>
              {deleteServiceShift => (
                <Badge
                  color="danger"
                  onClick={() =>
                    this.deleteOnClick(deleteServiceShift, serviceShift)
                  }
                >
                  <i className="material-icons">close</i>
                </Badge>
              )}
            </Mutation>
          </div>
        </td>
      </tr>
    );
  }
}

export default withStyles(ServiceShiftPageStyle)(ServiceShiftRow);
