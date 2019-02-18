import React, { Component } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import BranchPageStyle from "assets/jss/material-kit-react/views/branchPage.jsx";
// core components
import Badge from "../../../../components/Badge/Badge.jsx";
import Modal from "../../../../components/Modal/BranchModal.jsx";
// queries and mutations with react-apollo
import { Mutation } from "react-apollo";
import { GET_BRANCHES } from "../../../../queries/branch";
import { DELETE_BRANCH } from "../../../../mutations/branch";

const updateCacheDelete = (cache, { data: { deleteBranch } }) => {
  const { branches } = cache.readQuery({ query: GET_BRANCHES });
  cache.writeQuery({
    query: GET_BRANCHES,
    data: {
      branches: branches.filter(n => n.id !== deleteBranch.id)
    }
  });
};

class BranchRow extends Component {
  constructor(props) {
    super(props);
    this.deleteOnClick = this.deleteOnClick.bind(this);
  }

  deleteOnClick(deleteBranch, branch) {
    deleteBranch({ variables: { id: branch.id } });
    alert("Datos de sede eliminados");
  }

  render() {
    const branch = this.props.branch;
    const index = parseInt(this.props.index, 10) + 1;
    const { classes } = this.props;
    return (
      <tr className={classes.tr}>
        <td className={classes.td}> {index} </td>
        <td> {branch.branch} </td>
        <td> {branch.address} </td>
        <td> {branch.contact} </td>
        <td> {branch.phone} </td>
        <td> {branch.active ? "Activo" : "Inactivo"} </td>
        <td className={classNames(classes.flexContainerActions, classes.td)}>

            <Modal modalType="display" branch={branch} />

            <Modal modalType="edit" branch={branch} />

            <Mutation mutation={DELETE_BRANCH} update={updateCacheDelete}>
              {deleteBranch => (
                <Badge
                  color="danger"
                  onClick={() => this.deleteOnClick(deleteBranch, branch)}
                >
                  <i className="material-icons">close</i>
                </Badge>
              )}
            </Mutation>

        </td>
      </tr>
    );
  }
}

export default withStyles(BranchPageStyle)(BranchRow);
