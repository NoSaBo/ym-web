import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "../../CustomInput/CustomInput.jsx";
import Badge from "../../Badge/Badge.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";

import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// queries and mutations with react-apollo
import { Query, Mutation } from "react-apollo";
import { GET_BRANCHES } from "../../../queries/branch";
import { UPDATE_SERVICESHIFT } from "../../../mutations/serviceShift";
import { GET_SERVICESHIFTS } from "../../../queries/serviceShift";
//react-router
import { withRouter } from "react-router-dom";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const initialState = {
  begindate: "",
  workspan: "",
  active: "",
  branch: {
    branchId: "",
    branch: "",
  }
};

class UpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      serviceShift: initialState
    };
    this.handleServiceShiftState = this.handleServiceShiftState.bind(this);
    this.handleBranchSelected = this.handleBranchSelected.bind(this);
    // this.saveEmployee = this.saveEmployee.bind(this);
    this.resetServiceShift = this.resetServiceShift.bind(this);
  }

  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
    this.resetServiceShift();
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
    this.resetServiceShift();
  }

  handleServiceShiftState(event) {
    const field = event.target.name;
    let value = event.target.value;
    if (field === "active") {
      value = value === "true" ? true : false;
    }
    let serviceShift = this.state.serviceShift;
    serviceShift[field] = value;
    this.setState({ serviceShift });
  }

  handleBranchSelected(event) {
    const branch = event.target.name;
    let value = event.target.value;
    const serviceShift = this.state.serviceShift;
    // console.log("event.target", event.target);
    console.log("branch", branch);
    console.log("value", value);
    // serviceShift[branch] = event.target.value;
    // this.setState({ serviceShift });
  }

  resetServiceShift() {
    let serviceShift = Object.assign({}, this.props.serviceShift);
    this.setState({
      serviceShift: {
        id: serviceShift.id,
        begindate: serviceShift.begindate,
        workspan: serviceShift.workspan,
        branch: {
          branchId: serviceShift.branch.id,
          branch: serviceShift.branch.branch
        },
        active: serviceShift.active
      }
    });
  }

  // saveEmployee(updateEmployee) {
  //   this.handleClose("classicModal");
  //   let employee = this.state.employee;
  //   updateEmployee({ variables: employee });
  //   alert(employee.user + " have been updated!");
  // }

  componentWillMount() {
    this.resetServiceShift();
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("nextProps.employee", nextProps.employee);
  // }

  render() {
    const { classes } = this.props;
    // const serviceShift = this.state.serviceShift;
    // console.log("this.props.serviceShift", this.props.serviceShift);
    console.log("this.state.serviceShift", this.state.serviceShift);
    return (
      <div>
        <div onClick={() => this.handleClickOpen("classicModal")}>
          <Badge color="success">
            <i className="material-icons">edit</i>
          </Badge>
        </div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} lg={4}>
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={this.state.classicModal}
                  TransitionComponent={Transition}
                  disableBackdropClick={true}
                  disableEscapeKeyDown={true}
                  keepMounted
                  onClose={() => this.handleClose("classicModal")}
                  aria-labelledby="classic-modal-slide-title"
                  aria-describedby="classic-modal-slide-description"
                >
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                  >
                    <IconButton
                      className={classes.modalCloseButton}
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      onClick={() => this.handleClose("classicModal")}
                    >
                      <Close className={classes.modalClose} />
                    </IconButton>
                    <h4 className={classes.modalTitle}>
                      Actualización de datos
                    </h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <form>
                      <InputLabel className={classes.label}>
                        Inicio de turno
                      </InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <Datetime
                          inputProps={{
                            placeholder: "Fecha y hora de inicio"
                          }}
                          value={this.state.serviceShift.begindate}
                          onChange={this.handleStartDateState}
                          renderInput={false}
                        />
                      </FormControl>
                      <br />
                      <br />
                      <InputLabel className={classes.label}>
                        Fin de turno
                      </InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <Datetime
                          dateFormat={true}
                          inputProps={{
                            placeholder: "Fecha y hora fin"
                          }}
                          value={this.state.serviceShift.workspan}
                          onChange={this.handleWorkspanDateState}
                        />
                      </FormControl>
                      <br />
                      <br />
                      <InputLabel className={classes.label}>Sede</InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <Query query={GET_BRANCHES}>
                          {({ loading, error, data }) => {
                            if (loading) return <h4>Loading...</h4>;
                            if (error) console.log("errror: ", error);
                            return (
                              <select
                                name={this.state.serviceShift.branch.branch}
                                onChange={this.handleBranchSelected}
                              >
                                <option>Elija una sede</option>
                                {data.branches.map((branch, index) => {
                                  return (
                                    <option key={index} value={branch.id}>
                                      {branch.branch}
                                    </option>
                                  );
                                })}
                              </select>
                            );
                          }}
                        </Query>
                      </FormControl>
                      <br />
                      <br />
                      <InputLabel className={classes.label}>Estado</InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <select
                          onChange={this.handleServiceShiftState}
                          name="active"
                          value={this.state.serviceShift.active}
                        >
                          <option>Seleccionar Estado</option>
                          <option value={true}>Activo</option>
                          <option value={false}>Inactivo</option>
                        </select>
                      </FormControl>
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    {/* <Mutation mutation={UPDATE_EMPLOYEE}>
                      {updateEmployee => (
                        <div>
                          <Button
                            color="transparent"
                            simple
                            onClick={() => {
                              this.saveEmployee(updateEmployee);
                            }}
                          >
                            Guardar
                          </Button>
                        </div>
                      )}
                    </Mutation> */}
                    <Button
                      onClick={() => this.handleClose("classicModal")}
                      color="danger"
                      simple
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withRouter(withStyles(javascriptStyles)(UpdateModal));
