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
// queries and mutations with react-apollo
import { Mutation } from "react-apollo";
import { UPDATE_EMPLOYEE } from "../../../mutations/employee.js";
// import { GET_EMPLOYEES } from "../../../queries/employee";
//react-router
import { withRouter } from "react-router-dom";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class EmployeeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      employee: this.props.employee
    };
    this.updateEmployeeState = this.updateEmployeeState.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
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
  }

  updateEmployeeState(event) {
    const field = event.target.name;
    const employee = this.state.employee;
    employee[field] = event.target.value;
    return this.setState({ employee });
  }

  saveEmployee(updateEmployee) {
    this.handleClose("classicModal");
    let employee = this.state.employee;
    console.log("employee", employee);
    updateEmployee({ variables: employee});
    alert(employee.user + " have been updated!");
    this.props.history.push("/admin-page/employees");
  }

  // componentDidMount() {
  //   if (this.props.employee) {
  //     this.setState({ employee: this.props.employee });
  //   }
  // }

  render() {
    const { classes } = this.props;
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
                      <CustomInput
                        labelText="Nombre"
                        name="firstname"
                        value={this.state.employee.firstname}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.updateEmployeeState}
                      />
                      <CustomInput
                        labelText="Apellido"
                        name="lastname"
                        value={this.state.employee.lastname}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.updateEmployeeState}
                      />
                      <CustomInput
                        labelText="Usuario"
                        name="user"
                        value={this.state.employee.user}
                        formControlProps={{ fullWidth: true }}
                        disabled={true}
                      />
                      <CustomInput
                        labelText="Password"
                        name="password"
                        value={this.state.employee.password}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.updateEmployeeState}
                      />
                      <CustomInput
                        labelText="Teléfono"
                        name="phone"
                        value={this.state.employee.phone}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.updateEmployeeState}
                      />
                      <CustomInput
                        labelText="D.N.I"
                        name="dni"
                        value={this.state.employee.dni}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.updateEmployeeState}
                      />
                      <CustomInput
                        labelText="Estado"
                        name="active"
                        value={this.state.employee.active}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.updateEmployeeState}
                      />
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation
                      mutation={UPDATE_EMPLOYEE}
                      // update={(cache, { data: { updateEmployee } }) => {
                      //   const { employees } = cache.readQuery({
                      //     query: GET_EMPLOYEES
                      //   });
                      //   cache.writeQuery({
                      //     query: GET_EMPLOYEES,
                      //     data: { employees: employees.concat([updateEmployee]) }
                      //   });
                      // }}
                    >
                      {updateEmployee => (
                        <div>
                          <Button
                            color="transparent"
                            simple
                            onClick={() => { this.saveEmployee(updateEmployee)}}
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

export default withRouter(withStyles(javascriptStyles)(EmployeeModal));
