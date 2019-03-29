import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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

class Chips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  handleClick() {
    if (this.state.user.username === "superadmin") {
      this.props.history.push("/parkeo/admin-page/admin");
    } else {
      alert("You touched the admin, watched out!");
    }
  }
  handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    alert("Sesión de administrador cerrada");
    this.props.history.push("/parkeo/admin-page/login");
  }
  componentWillMount() {
    const token = localStorage.getItem("token");
    let user = decode(token).user;
    console.log("decode(token)", decode(token));
    if (token) {
      this.setState({ user });
    }
  }
  render() {
    const { classes } = this.props;
    const { username } = this.state.user;
    console.log("this.state.user", this.state.user);
    return (
      <div className={classes.root}>
        <Chip
          label={`${capitalize(username)}`}
          onClick={() => this.handleClick()}
          onDelete={() => this.handleLogout()}
          className={classes.chip}
          icon={<i className="material-icons">account_circle</i>}
        />
      </div>
    );
  }
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Chips);

// function Chips(props) {
//   const { classes } = props;

//   let username =
//     localStorage.getItem("token") !== null
//       ? decode(localStorage.getItem("token")).user.username
//       : "";
//   return (
//     <div className={classes.root}>
//       <Chip
//         label={`Cuenta: ${capitalize(username)}`}
//         onDelete={() => handleDelete()}
//         className={classes.chip}
//         icon={<i className="material-icons">account_circle</i>}
//       />
//     </div>
//   );
// }

// Chips.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(Chips);
