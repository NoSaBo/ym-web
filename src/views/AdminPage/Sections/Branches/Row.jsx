import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core & style
import withStyles from "@material-ui/core/styles/withStyles";
import branchPageStyle from "assets/jss/material-kit-react/views/branchPage.jsx";
//components
import Badge from "../../../../components/Badge/Badge";
import DisplayModal from "../../../../components/Modal/branch/Display";
import UpdateModal from "../../../../components/Modal/branch/Update";
import { Mutation } from "react-apollo";
//GraphQL
import { DELETE_BRANCH } from "../../../../mutations/branch";
import { GET_BRANCHES } from "../../../../queries/branch";

const updateCacheDelete = (cache, { data: { deleteBranch } }) => {
  const { branches } = cache.readQuery({ query: GET_BRANCHES });
  cache.writeQuery({
    query: GET_BRANCHES,
    data: {
      branches: branches.filter(n => n.user !== deleteBranch.user)
    }
  });
};

const deleteOnClick = (deleteBranch, branch) => {
  let branchName = branch.branch;
  deleteBranch({ variables: { id: branch.id } });
  alert(`Sede ${branchName} has sido eliminada`);
  window.location.reload();
  this.props.history.push("/admin-page/branches");
};

const Row = ({ index, branch, classes }) => {
  return (
    <tr className={classes.tr}>
      <td className={classes.td}> {index + 1} </td>
      <td> {branch.branch} </td>
      <td> {branch.address} </td>
      <td> {branch.contact} </td>
      <td> {branch.phone} </td>
      <td> {branch.active ? "Activo" : "Inactivo"} </td>
      <td className={classNames(classes.flexContainerActions, classes.td)}>
        <div>
          <DisplayModal branch={branch} />
        </div>
        <div>
          <UpdateModal branch={branch} />
        </div>
        <div>
          <Mutation mutation={DELETE_BRANCH} update={updateCacheDelete}>
            {deleteBranch => (
              <Badge
                color="danger"
                onClick={() => deleteOnClick(deleteBranch, branch)}
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

export default withStyles(branchPageStyle)(Row);
