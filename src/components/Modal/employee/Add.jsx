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
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
// queries and mutations with react-apollo
import { Mutation } from "react-apollo";
import { NEW_EMPLOYEE } from "../../../mutations/employee.js";
import { GET_EMPLOYEES } from "../../../queries/employee";
//react-router
import { withRouter } from "react-router-dom";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const updateCacheAdd = (cache, { data: { addEmployee } }) => {
  const { employees } = cache.readQuery({ query: GET_EMPLOYEES });
  const index = addEmployee.id;
  employees[index] = addEmployee;
  cache.writeQuery({
    query: GET_EMPLOYEES,
    data: { employees: employees.concat([addEmployee]) }
  });
};

class EmployeeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      togglePassword: "password"
    };
    this.saveEmployee = this.saveEmployee.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
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
    this.props.resetForm();
  }
  togglePassword() {
    if (this.state.togglePassword === "password") {
      this.setState({ togglePassword: "text" });
    } else {
      this.setState({ togglePassword: "password" });
    }
  }
  saveEmployee(event) {
    this.handleClose("classicModal");
    this.props.resetForm();
    this.props.history.push("/admin-page/employees");
  }

  render() {
    const { classes } = this.props;
    const employee = this.props.employee;
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
                    <h4 className={classes.modalTitle}>Crear Empleado</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <form>
                      <CustomInput
                        labelText="Nombre"
                        name="firstname"
                        value={employee.firstname}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.props.onChange}
                      />
                      <CustomInput
                        labelText="Apellido"
                        name="lastname"
                        value={employee.lastname}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.props.onChange}
                      />
                      <CustomInput
                        labelText="Usuario"
                        name="user"
                        value={employee.user}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.props.onChange}
                      />
                      <CustomInput
                        labelText="Password"
                        name="password"
                        type={this.state.togglePassword}
                        value={employee.password}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.props.onChange}
                      />
                      <input type="checkbox" onClick={this.togglePassword} />
                      Mostrar password
                      <CustomInput
                        labelText="Teléfono"
                        name="phone"
                        value={employee.phone}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.props.onChange}
                      />
                      <CustomInput
                        labelText="D.N.I"
                        name="dni"
                        value={employee.dni}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.props.onChange}
                      />
                      <div>
                        <div>Estado</div>
                        <select onChange={this.props.onChange} name="active">
                          <option>Seleccionar Estado</option>
                          <option value={true}>Activo</option>
                          <option value={false}>Inactivo</option>
                        </select>
                      </div>
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation
                      mutation={NEW_EMPLOYEE}
                      update={updateCacheAdd}
                    >
                      {addEmployee => (
                        <div>
                          <Button
                            color="transparent"
                            simple
                            onClick={e => {
                              e.preventDefault();
                              addEmployee({
                                variables: {
                                  firstname: employee.firstname,
                                  lastname: employee.lastname,
                                  user: employee.user,
                                  password: employee.password,
                                  dni: employee.dni,
                                  phone: employee.phone,
                                  active: employee.active
                                }
                              });
                              alert(`${employee.user} have been added!`);
                              this.saveEmployee();
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

export default withRouter(withStyles(javascriptStyles)(EmployeeModal));
