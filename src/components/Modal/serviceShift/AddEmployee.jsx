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
import Badge from "../../Badge/Badge.jsx";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
// queries and mutations with react-apollo
import { Mutation } from "react-apollo";
import { ADD_EMPLOYEE_TO_SERVICESHIFT } from "../../../mutations/serviceShift";
import { GET_SERVICESHIFTS } from "../../../queries/serviceShift";
//react-router
import { withRouter } from "react-router-dom";

const updateCacheAdd = (cache, { data: { addEmployeeToServiceShift } }) => {
  console.log("addEmployeeToServiceShift", addEmployeeToServiceShift);
  const { serviceShifts } = cache.readQuery({ query: GET_SERVICESHIFTS });
  cache.writeQuery({
    query: GET_SERVICESHIFTS,
    data: {
      serviceShifts: serviceShifts.concat([addEmployeeToServiceShift])
    }
  });
};

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class AddEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      serviceShift: this.props.serviceShift,
      employees: this.props.employees,
      employee: ""
    };
    this.handleEmployeeSelected = this.handleEmployeeSelected.bind(this);
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
  handleEmployeeSelected(e) {
    e.preventDefault();
    let employee = this.state.employees.filter(employee => {
      return employee.id === e.target.value;
    });
    employee = employee[0];
    this.setState({ employee });
  }
  handleSave(addEmployeeToServiceShift, id) {
    if (this.state.employee === undefined) {
      alert("No ha seleccionado un empleado!");
    } else {
      addEmployeeToServiceShift({
        variables: { id: this.state.serviceShift.id, employeeId: id }
      });
      alert(`Empleado ${this.state.employee.user} agregado`);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div
          onClick={() => this.handleClickOpen("classicModal")}
          title="Selección de empleado"
        >
          <Badge color="info">
            <i className="material-icons">person_add</i>
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
                      Añadir empleado a horario seleccionado
                    </h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <div>
                      El horario seleccionado pertenece a la sede{" "}
                      {this.state.serviceShift.branch.branch.toUpperCase()},
                      tiene como inicio el {this.state.serviceShift.begindate} y
                      finaliza el {this.state.serviceShift.workspan}. Por favor
                      seleccione un empleado para el horario mencionado:
                    </div>
                    <form>
                      <div>Empleado asignado</div>
                      <select onChange={this.handleEmployeeSelected}>
                        <option>Seleccione un empleado</option>
                        {this.props.employees.map((employee, index) => {
                          return (
                            <option key={index} value={employee.id}>
                              {employee.firstname + " " + employee.lastname}
                            </option>
                          );
                        })}
                      </select>
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation
                      mutation={ADD_EMPLOYEE_TO_SERVICESHIFT}
                      update={updateCacheAdd}
                      refetchQueries={() => {
                        return [{query: GET_SERVICESHIFTS}]
                      }}
                    >
                      {addEmployeeToServiceShift => (
                        <Button
                          onClick={() =>
                            this.handleSave(
                              addEmployeeToServiceShift,
                              this.state.employee.id
                            )
                          }
                          color="transparent"
                          simple
                        >
                          Guardar
                        </Button>
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

export default withRouter(withStyles(javascriptStyles)(AddEmployee));
