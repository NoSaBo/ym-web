import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
//Customized components
import BranchSelector from "../../Selector/BranchSelector";
import ActiveSelector from "../../Selector/ActiveSelector";
// queries and mutations with react-apollo
import { Mutation, Query } from "react-apollo";
import { GET_BRANCHES } from "../../../queries/branch";
import { UPDATE_SERVICESHIFT } from "../../../mutations/serviceShift";
//react-router
import { withRouter } from "react-router-dom";
// Helper functions
// import { modalDateTimeToLocalTime } from "assets/helperFunctions/index.js";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class UpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      serviceshift: null
    };
    this.saveServiceshift = this.saveServiceshift.bind(this);
    this.resetServiceshift = this.resetServiceshift.bind(this);
    this.handleStartDateState = this.handleStartDateState.bind(this);
    this.handleWorkspanDateState = this.handleWorkspanDateState.bind(this);
    this.handleBranchSelected = this.handleBranchSelected.bind(this);
    this.handleActiveState = this.handleActiveState.bind(this);
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
    this.resetServiceshift();
  }

  handleStartDateState(event) {
    const field = "begindate";
    const serviceshift = this.state.serviceshift;
    let date = new Date(event);
    serviceshift[field] = date;
    this.setState({ serviceshift });
  }

  handleWorkspanDateState(event) {
    const field = "workspan";
    const serviceshift = this.state.serviceshift;
    let date = new Date(event);
    serviceshift[field] = date;
    this.setState({ serviceshift });
  }

  // handleBranchSelected(event, dataBranches) {
  handleBranchSelected(event) {
    const serviceshift = this.state.serviceshift;
    const branchId = event.target.value;
    // const branch = dataBranches.filter(e => e.id === branchId)[0];
    serviceshift["branchId"] = branchId;
    this.setState({ serviceshift });
  }

  handleActiveState(event) {
    let value = event.target.value;
    let serviceshift = this.state.serviceshift;
    serviceshift["active"] = value;
    this.setState({ serviceshift });
  }

  resetServiceshift() {
    let serviceshift = Object.assign({}, this.props.serviceshift);
    delete serviceshift.employees;
    ["active", "address", "contact", "latitude", "longitude", "phone"].forEach(
      key => {
        delete serviceshift.branch[key];
      }
    );
    this.setState({ serviceshift });
  }

  saveServiceshift(updateServiceshift) {
    this.handleClose("classicModal");
    let serviceshift = this.state.serviceshift;

    updateServiceshift({
      variables: {
        id: serviceshift.id,
        begindate: serviceshift.begindate,
        workspan: serviceshift.workspan,
        active: serviceshift.active,
        branchId: serviceshift.branchId
      }
    });
    alert(" Tu horario ha sido actualizado");
  }

  componentWillMount() {
    console.log("this.props.serviceshift", this.props.serviceshift);
    const serviceshift = Object.assign({}, this.props.serviceshift);
    delete serviceshift.employees;
    ["active", "address", "contact", "latitude", "longitude", "phone"].forEach(
      key => {
        delete serviceshift.branch[key];
      }
    );
    serviceshift["branchId"] = serviceshift.branch.id;
    delete serviceshift.branch;
    this.setState({ serviceshift });
  }

  render() {
    const { classes } = this.props;
    const serviceshift = this.state.serviceshift;
    const begindate = new Date(serviceshift.begindate);
    const workspan = new Date(serviceshift.workspan);
    const active = serviceshift.active;
    const branchId = serviceshift.branchId;
    let widthTmpFix = "lorem";
    widthTmpFix = widthTmpFix.repeat(8);
    return (
      <div>
        <Tooltip title="Editar">
          <IconButton
            aria-label="Editar"
            onClick={() => this.handleClickOpen("classicModal")}
          >
            <i className={"material-icons"}>edit</i>
          </IconButton>
        </Tooltip>
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
                      Actualización de Horario
                    </h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <span style={{ opacity: "0" }}>{widthTmpFix}</span>
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
                          value={begindate}
                          onChange={this.handleStartDateState}
                          renderInput={false}
                        />
                      </FormControl>
                      <br style={{ width: "250px" }} />
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
                          value={workspan}
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
                              <BranchSelector
                                branches={data.branches}
                                onChange={this.handleBranchSelected}
                                branchId={branchId}
                              />
                              /* <select
                                onChange={e =>
                                  this.handleBranchSelected(e, data.branches)
                                }
                                value={serviceshift.branch.id}
                              >
                                {data.branches.map((branch, index) => {
                                  return (
                                    <option key={index} value={branch.id}>
                                      {branch.branch}
                                    </option>
                                  );
                                })}
                              </select> */
                            );
                          }}
                        </Query>
                      </FormControl>
                      <br />
                      <br />
                      <InputLabel className={classes.label}>Estado</InputLabel>
                      <br />
                      <FormControl fullWidth>
                        <ActiveSelector
                          onChange={this.handleActiveState}
                          active={active}
                        />
                      </FormControl>
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation mutation={UPDATE_SERVICESHIFT}>
                      {updateServiceShift => (
                        <div>
                          <Button
                            color="transparent"
                            simple
                            onClick={() => {
                              this.saveServiceshift(updateServiceShift);
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

export default withRouter(withStyles(javascriptStyles)(UpdateModal));
