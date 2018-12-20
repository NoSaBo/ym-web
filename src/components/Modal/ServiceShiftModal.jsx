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
import CustomInput from "../CustomInput/CustomInput.jsx";
import Badge from "../Badge/Badge.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
// queries and mutations with react-apollo
import { Mutation, Query } from "react-apollo";
import { NEW_SERVICESHIFT } from "../../mutations/serviceShift";
import { GET_SERVICESHIFTS } from "../../queries/serviceShift";
import { GET_EMPLOYEES } from "../../queries/employee";
import { GET_BRANCHES } from "../../queries/branch";
//react-router
import { withRouter } from "react-router-dom";

const updateCacheNew = (cache, { data: { addServiceShift } }) => {
  const { serviceShifts } = cache.readQuery({ query: GET_SERVICESHIFTS });
  cache.writeQuery({
    query: GET_SERVICESHIFTS,
    data: {
      serviceShifts: serviceShifts.concat([addServiceShift])
    }
  });
};

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ServiceShiftModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      employeeSelected: "",
      branchSelected: "",
      serviceShift: this.props.serviceShift
        ? this.props.serviceShift
        : {
            begindate: "",
            workspan: "",
            active: "",
            branch:"",
            employee: "",
          }
    };
    this.updateServiceShiftState = this.updateServiceShiftState.bind(this);
    this.saveServiceShift = this.saveServiceShift.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.updateEmployeeSelected = this.updateEmployeeSelected.bind(this);
    this.updateBranchSelected = this.updateBranchSelected.bind(this);
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
    this.setState({
      serviceShift: {
        begindate: "",
        workspan: "",
        active: "",
        branch:"",
        employee: "",
      }
    });
  }

  updateServiceShiftState(event) {
    if (this.props.serviceShift === undefined) {
      const field = event.target.name;
      const serviceShift = this.state.serviceShift;
      serviceShift[field] = event.target.value;
      return this.setState({ serviceShift });
    }
  }

  updateEmployeeSelected(e) {
    this.setState({ employeeSelected: e.target.value });
  }

  updateBranchSelected(e) {
    this.setState({ branchSelected: e.target.value });
  }

  saveServiceShift(event) {
    this.handleClose("classicModal");
    this.resetForm();
    this.props.history.push("/admin-page/serviceshifts");
  }

  componentDidMount() {
    if (this.props.serviceShift) {
      this.setState({ serviceShift: this.props.serviceShift });
    }
    // this.updateEmployeeSelected();
    // this.updateBranchSelected();
  }

  render() {
    let title = "";
    let modalLayout = "";
    let serviceShift = "";
    let employees = "";
    let branches = "";
    if (this.props.modalType === "new") {
      title = "Nueva Horario";
      modalLayout = <Button color="info">+ Crear</Button>;
    } else if (this.props.modalType === "display") {
      title = "Mostrar Horario";
      modalLayout = (
        <Badge color="info">
          <i className="material-icons">person</i>
        </Badge>
      );
      serviceShift = this.props.serviceShift;
    } else if (this.props.modalType === "edit") {
      title = "Editar Sede";
      modalLayout = (
        <Badge color="success">
          <i className="material-icons">edit</i>
        </Badge>
      );
    }
    const { classes } = this.props;
    console.log("state.employeeSelected", this.state.employeeSelected);
    console.log("state.branchSelected", this.state.branchSelected);
    // console.log("this.props.serviceShift", this.props.serviceShift);
    // console.log("serviceShift", serviceShift);
    // console.log("this.state.serviceShift", this.state.serviceShift);
    return (
      <div>
        <Query query={GET_EMPLOYEES}>
          {({ loading, error, data }) => {
            if (error) console.log("error: ", error);
            employees = data.employees;
            return (
              <div>
                <Query query={GET_BRANCHES}>
                  {({ loading, error, data }) => {
                    if (error) console.log("error: ", error);
                    branches = data.branches;
                    return (
                      <div>
                        <div
                          onClick={() => this.handleClickOpen("classicModal")}
                        >
                          {modalLayout}
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
                                  onClose={() =>
                                    this.handleClose("classicModal")
                                  }
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
                                      onClick={() =>
                                        this.handleClose("classicModal")
                                      }
                                    >
                                      <Close className={classes.modalClose} />
                                    </IconButton>
                                    <h4 className={classes.modalTitle}>
                                      {title}
                                    </h4>
                                  </DialogTitle>
                                  <DialogContent
                                    id="classic-modal-slide-description"
                                    className={classes.modalBody}
                                  >
                                    <form>
                                      <CustomInput
                                        labelText="Inicio"
                                        name="begindate"
                                        value={
                                          serviceShift
                                            ? serviceShift.begindate
                                            : this.state.serviceShift.begindate
                                        }
                                        formControlProps={{ fullWidth: true }}
                                        onChange={this.updateServiceShiftState}
                                      />
                                      <CustomInput
                                        labelText="Fin"
                                        name="workspan"
                                        value={
                                          serviceShift
                                            ? serviceShift.workspan
                                            : this.state.serviceShift.workspan
                                        }
                                        formControlProps={{ fullWidth: true }}
                                        onChange={this.updateServiceShiftState}
                                      />

                                      {(this.props.modalType !== "display") 
                                        ? (<div>
                                        <div>Empleado asignado</div>
                                          <select
                                            onChange={ this.updateEmployeeSelected } 
                                          >
                                            <option>Elija a empleado</option>
                                            {typeof employees === "object"
                                              ? employees.map(employee => (
                                                  <option key={employee.user} value={employee.id}>
                                                    {employee.firstname}
                                                  </option>
                                                ))
                                              : null}
                                          </select>
                                          <div>Sede asignada</div>
                                          <select
                                            onChange={this.updateBranchSelected}
                                          >
                                            <option>Elija a la sede</option>
                                            {typeof branches === "object"
                                              ? branches.map(branch => (
                                                  <option key={branch.id} value={branch.id}>
                                                    {branch.branch}
                                                  </option>
                                                ))
                                              : null}
                                          </select>
                                        </div>)
                                        : (<div>
                                          <div>Empleado asignado</div>
                                          <select disabled={true}>
                                            <option>
                                              {serviceShift.employee ? serviceShift.employee.firstname : "null"}
                                            </option>
                                          </select>
                                          <div>Sede asignada</div>
                                          <select disabled={true}>
                                            <option>
                                              {serviceShift.branch ? serviceShift.branch.branch: "null"}
                                            </option>
                                          </select>
                                        </div>)
                                        }

                                      <CustomInput
                                        labelText="Estado"
                                        name="active"
                                        value={
                                          serviceShift
                                            ? serviceShift.active
                                            : this.state.serviceShift.active
                                        }
                                        formControlProps={{ fullWidth: true }}
                                        onChange={this.updateServiceShiftState}
                                      />
                                    </form>
                                  </DialogContent>
                                  <DialogActions
                                    className={classes.modalFooter}
                                  >
                                    <Mutation mutation={NEW_SERVICESHIFT} update={updateCacheNew} >
                                      {addServiceShift => (
                                        <div>
                                          {!(
                                            this.props.modalType === "display"
                                          ) && (
                                            <Button
                                              color="transparent"
                                              simple
                                              onClick={e => {
                                                e.preventDefault();
                                                addServiceShift({
                                                  variables: {
                                                    begindate: this.state.serviceShift.begindate,
                                                    workspan: this.state.serviceShift.workspan,
                                                    active: this.state.serviceShift.active,
                                                    branchId: this.state.branchSelected,
                                                    employeeId: this.state.employeeSelected
                                                  }
                                                });
                                                alert(
                                                  " Nuevo horario ha sido agregado!"
                                                );
                                                this.saveServiceShift();
                                              }}
                                            >
                                              Guardar
                                            </Button>
                                          )}
                                        </div>
                                      )}
                                    </Mutation>
                                    <Button
                                      onClick={() =>
                                        this.handleClose("classicModal")
                                      }
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
                  }}
                </Query>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withRouter(withStyles(javascriptStyles)(ServiceShiftModal));
