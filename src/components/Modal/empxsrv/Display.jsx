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
//react-router
import { withRouter } from "react-router-dom";

var moment = require("moment");

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class ParkingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false
    };
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

  render() {
    const { classes } = this.props;
    let begindate = this.props.empxsrv.begindate;
    begindate = moment(begindate)
      .add(5, "hours")
      .format("YYYY-MM-DD HH:mm");
    let start = this.props.empxsrv.start;
    start = moment(start)
      .add(5, "hours")
      .format("YYYY-MM-DD HH:mm");
    return (
      <div>
        <div onClick={() => this.handleClickOpen("classicModal")}>
          <Badge color="info">
            <i className="material-icons">view_headline</i>
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
                      Información de Parqueo
                    </h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <form>
                      <CustomInput
                        labelText="Empleado"
                        name="employee"
                        value={this.props.empxsrv.employeeName}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Foto"
                        name="photo"
                        value={this.props.empxsrv.photo ? this.props.empxsrv.photo : ""}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Sede"
                        name="branch"
                        value={this.props.empxsrv.branchName}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Horario"
                        name="begindate"
                        value={begindate}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Inicio"
                        name="start"
                        value={start}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Longitud"
                        name="longitude"
                        value={this.props.empxsrv.longitude ? this.props.empxsrv.longitude : ""}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Latitud"
                        name="latitude"
                        value={this.props.empxsrv.longitude ? this.props.empxsrv.longitude : ""}
                        formControlProps={{ fullWidth: true }}
                      />
                      <CustomInput
                        labelText="Comentario"
                        name="comment"
                        value={this.props.empxsrv.comment ? this.props.empxsrv.comment : ""}
                        formControlProps={{ fullWidth: true }}
                      />
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
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

export default withRouter(withStyles(javascriptStyles)(ParkingModal));
