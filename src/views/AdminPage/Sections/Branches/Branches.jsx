import React, { Component } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react-router, graphQL and Apollo components
import { Query } from "react-apollo";
import { GET_BRANCHES } from "../../../../queries/branch";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import BranchPageStyle from "assets/jss/material-kit-react/views/branchPage.jsx";
// core components
import BranchRow from "./BranchRow";
import Modal from "../../../../components/Modal/BranchModal.jsx";

class Branches extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="container-fluid">
        <div className={classes.flexContainerNew}>
          <h1>Sedes</h1>
          <p style={{ marginLeft: "2em" }} />{" "}
          <Modal className={classNames(classes.alignNewDiv)} modalType="new" />
        </div>

        <div className={classes.MarginContainer}>
          <Query query={GET_BRANCHES}>
            {({ loading, error, data }) => {
              if (loading) return <h4>Loading...</h4>;
              if (error) console.log("error: ", error);
              return (
                <table width="100%">
                  <thead align="center">
                    <tr>
                      <th style={{ padding: "1%" }}>#</th>
                      <th>NOMBRE</th>
                      <th>DIRECCION</th>
                      <th>CONTACTO</th>
                      <th>TELEFONO</th>
                      <th>ESTADO</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.branches.map((branch, index) => (
                      <BranchRow key={index} branch={branch} index={index} />
                    ))}
                  </tbody>
                </table>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default withStyles(BranchPageStyle)(Branches);
