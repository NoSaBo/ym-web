import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import decode from "jwt-decode";
import { capitalize } from "assets/helperFunctions/index.js";


const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  }
});

let username = "";

if (localStorage.getItem("token") !== null) {
  const token = localStorage.getItem("token");
  username = decode(token).user.username;
}

function handleDelete() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  alert("Sesion de administrado cerrada");
}

function Chips(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Chip
        // avatar={<Avatar src="assets/img/favicon.png" />}
        label={`Cuenta: ${capitalize(username)}`}
        onDelete={() => {
          handleDelete();
          props.history.push("/parkeo/admin-page/login");
        }}
        className={classes.chip}
        icon={<i className="material-icons">account_circle</i>}
      />
    </div>
  );
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Chips);
