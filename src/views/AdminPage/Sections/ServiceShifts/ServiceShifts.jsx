import React, { Component } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react-router, graphQL and Apollo components
import { Query } from "react-apollo";
import { GET_SERVICESHIFTS } from '../../../../queries/serviceShift';
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import ServiceShiftPageStyle from "assets/jss/material-kit-react/views/serviceShiftPage.jsx";
// core components
import ServiceShiftRow from "./ServiceShiftRow";
import Modal from '../../../../components/Modal/ServiceShiftModal.jsx';


class ServiceShift extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="container-fluid">
          <div className={classNames(classes.flexContainerNew)}>
            <h1>Horarios</h1>
            <p style={{marginLeft:"2em"}}></p>
            <Modal className={classNames(classes.alignNewDiv)} modalType="new"/>
          </div>

          <div>
            <Query query={GET_SERVICESHIFTS}>
              {({ loading, error, data }) => {
                if (loading) return <h4>Loading...</h4>;
                if (error) console.log("error: ", error);
                return (
                  <table className={classNames("table", classes.textCentered)} align="center">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th>INICIO</th>
                        <th>FIN</th>
                        <th>ACTIVO</th>
                        <th className="text-right">ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.serviceShifts.map((serviceShift, index) => (
                        <ServiceShiftRow key={index} serviceShift={serviceShift} index={index}/>
                      ))}
                    </tbody>
                  </table>
                );
              }}
            </Query>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(ServiceShiftPageStyle)(ServiceShift);
