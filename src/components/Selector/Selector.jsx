import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import Input from "@material-ui/core/Input";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import FilledInput from "@material-ui/core/FilledInput";
// import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class SimpleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branches: null,
      branch: null,
      serviceShifts: null
    };
  }

  componentWillMount() {
    const { branches, serviceShifts } = this.props;
    this.setState({ branches, serviceShifts });
  }

  handleChange = event => {
      event.preventDefault();
    const idSelected = event.target.value;
    const branch = this.state.branches.find(branch => {
      if (branch.id === idSelected) return branch;
    });
    this.setState({ branch });
    this.props.onFilterChanged(idSelected);
  };

  render() {
    const { classes } = this.props;
    const { branches, serviceShifts } = this.state;
    // console.log("this.state.branch", this.state.branch);
    // console.log("this.state.serviceshifts", this.state.serviceShifts);
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            value="to be defined"
            onChange={this.handleChange}
            displayEmpty
            name="branch"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            {branches.map((branch, index) => (
              <MenuItem key={index} value={branch.id}>
                {branch.branch}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Filtrar por Sede</FormHelperText>
        </FormControl>
        {/* <FormControl className={classes.formControl}>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            displayEmpty
            name="serviceShift"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>Filtrar por Horario</FormHelperText>
        </FormControl> */}
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSelect);
