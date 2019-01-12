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

import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
// queries and mutations with react-apollo
import { Query, Mutation } from "react-apollo";
import { GET_BRANCHES } from "../../../queries/branch";
import { NEW_SERVICESHIFT } from "../../../mutations/serviceShift";
import { GET_SERVICESHIFTS } from "../../../queries/serviceShift";
//react-router
import { withRouter } from "react-router-dom";

Date.prototype.toIsoString = function() {
  var tzo = -this.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = function(num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? "0" : "") + norm;
    };
  return (
    this.getFullYear() +
    "-" +
    pad(this.getMonth() + 1) +
    "-" +
    pad(this.getDate()) +
    "T" +
    pad(this.getHours()) +
    ":" +
    pad(this.getMinutes()) +
    ":" +
    pad(this.getSeconds()) +
    dif +
    pad(tzo / 60) +
    ":" +
    pad(tzo % 60)
  );
};

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const updateCacheNew = (cache, { data: { addServiceShift } }) => {
  const { serviceShifts } = cache.readQuery({ query: GET_SERVICESHIFTS });
  cache.writeQuery({
    query: GET_SERVICESHIFTS,
    data: {
      serviceShifts: serviceShifts.concat([addServiceShift])
    }
  });
};

const initialState = {
  begindate: "",
  workspan: "",
  active: "",
  branchId: ""
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      serviceShift: initialState
    };
    this.handleServiceShiftState = this.handleServiceShiftState.bind(this);
    this.handleBranchSelected = this.handleBranchSelected.bind(this);
    this.saveServiceShift = this.saveServiceShift.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleStartDateState = this.handleStartDateState.bind(this);
    this.handleWorkspanDateState = this.handleWorkspanDateState.bind(this);
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
    this.resetForm();
  }

  resetForm() {
    let serviceShift = Object.assign({}, initialState);
    this.setState({ serviceShift});
  }

  handleServiceShiftState(event) {
    const field = event.target.name;
    const serviceShift = this.state.serviceShift;
    serviceShift[field] = event.target.value;
    this.setState({ serviceShift });
  }

  handleStartDateState(event) {
    const field = "begindate";
    const serviceShift = this.state.serviceShift;
    let date = new Date(event);
    serviceShift[field] = date;
    this.setState({ serviceShift });
  }

  handleWorkspanDateState(event) {
    const field = "workspan";
    const serviceShift = this.state.serviceShift;
    let hours = new Date(event);

    // let test = this.state.serviceShift.begindate;
    // console.log("start", test);
    // console.log("endHour", hours.toString().substring(16,21));
    // console.log("final", test);

    serviceShift[field] = hours;
    this.setState({ serviceShift });
  }

  handleBranchSelected(event) {
    const branch = event.target.name;
    const serviceShift = this.state.serviceShift;
    serviceShift[branch] = event.target.value;
    this.setState({ serviceShift });
  }

  saveServiceShift(addServiceShift) {
    this.handleClose("classicModal");
    console.log("this.state.serviceShift", this.state.serviceShift);
    let begindate = this.state.serviceShift.begindate.toString();
    let workspan = this.state.serviceShift.workspan.toString();
    console.log("begindate", begindate);
    console.log("workspan", workspan);
    let str2rmv = begindate.substring(16, 21);
    let str2put = workspan.substring(16, 21);
    console.log("str2rmv", str2rmv);
    console.log("str2put", str2put);
    workspan = begindate.replace(str2rmv, str2put);
    console.log("workspan", workspan);
    console.log("this.state.serviceShift", this.state.serviceShift)

    // addServiceShift({
    //   variables: {
    //     begindate: this.state.serviceShift.begindate.toIsoString(),
    //     workspan: this.state.serviceShift.workspan,
    //     active: this.state.serviceShift.active,
    //     branchId: this.state.serviceShift.branchId
    //   }
    // });
    // this.resetForm();
    // alert("Nuevo horario ha sido agregado");
    // window.location.reload();
    // this.props.history.push("/admin-page/serviceshifts");
  }

  render() {
    const { classes } = this.props;
    console.log("serviceShift", this.state.serviceShift);
    return (
      <div>
        <div onClick={() => this.handleClickOpen("classicModal")}>
          <Button color="info">+ Crear</Button>
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
                    <h4 className={classes.modalTitle}>Nuevo Horario</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <form>
                      {/* <CustomInput
                        labelText="Inicio"
                        name="begindate"
                        value={this.state.serviceShift.begindate}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleServiceShiftState}
                      /> */}
                      {/* <CustomInput
                        labelText="Fin"
                        name="workspan"
                        value={this.state.serviceShift.workspan}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleServiceShiftState}
                      /> */}
                      <CustomInput
                        labelText="Estado"
                        name="active"
                        value={this.state.serviceShift.active}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleServiceShiftState}
                      />

                      <InputLabel className={classes.label}>Inicio de turno</InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <Datetime
                          inputProps={{
                            placeholder: "Fecha y hora de incio"
                          }}
                          value={null || this.state.serviceShift.begindate}
                          onChange={this.handleStartDateState}
                          renderInput={false}
                        />
                      </FormControl>
                      <InputLabel className={classes.label}>
                        Fin de turno
                      </InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <Datetime
                          dateFormat={false}
                          inputProps={{
                            placeholder: "Tiempo de servicio"
                          }}
                          value={this.state.serviceShift.workspan}
                          onChange={this.handleWorkspanDateState}
                        />
                      </FormControl>

                      <Query query={GET_BRANCHES}>
                        {({ loading, error, data }) => {
                          if (loading) return <h4>Loading...</h4>;
                          if (error) console.log("errror: ", error);
                          return (
                            <select
                              name="branchId"
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
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation
                      mutation={NEW_SERVICESHIFT}
                      update={updateCacheNew}
                    >
                      {addServiceShift => (
                        <div>
                          <Button
                            color="transparent"
                            simple
                            onClick={() => {
                              this.saveServiceShift(addServiceShift);
                            }}
                          >
                            Guardar
                          </Button>
                        </div>
                      )}
                    </Mutation>

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

export default withRouter(withStyles(javascriptStyles)(Modal));
