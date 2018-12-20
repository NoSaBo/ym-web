import React, { Component } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import ServiceShiftPageStyle from "assets/jss/material-kit-react/views/serviceShiftPage.jsx";
// core components
import Badge from "../../../../components/Badge/Badge.jsx";
import Modal from "../../../../components/Modal/ServiceShiftModal.jsx";
// queries and mutations with react-apollo
import { Mutation } from "react-apollo";
import { GET_SERVICESHIFTS } from "../../../../queries/serviceShift";
import { DELETE_SERVICESHIFT } from "../../../../mutations/serviceShift";

const updateCacheDelete = (cache, { data: { deleteServiceShift } }) => {
  const { serviceShifts } = cache.readQuery({ query: GET_SERVICESHIFTS });
  console.log("deleteServiceShift", deleteServiceShift);
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
      <tr>
        <td> {index} </td>
        <td> {serviceShift.begindate} </td>
        <td> {serviceShift.workspan} </td>
        <td> {serviceShift.active ? "Activo" : "Inactivo"} </td>
        <td
          className={classNames(
            "td-actions",
            "text-right",
            classes.flexContainerActions
          )}
        >
          <div>
            <Modal modalType="display" serviceShift={serviceShift} />
          </div>
          <div>
            <Modal modalType="edit" serviceShift={serviceShift} />
          </div>
          <div>
            <Mutation mutation={DELETE_SERVICESHIFT} update={updateCacheDelete}>
              {deleteServiceShift => (
                <Badge
                  color="danger"
                  onClick={() => this.deleteOnClick(deleteServiceShift, serviceShift)}
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
