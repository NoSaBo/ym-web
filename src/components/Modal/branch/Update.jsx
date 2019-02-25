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
import CustomInput from "../../CustomInput/CustomInput.jsx";
import FormControl from "@material-ui/core/FormControl";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.jsx";
//Customized components
import ActiveSelector from "../../Selector/ActiveSelector";
// queries and mutations with react-apollo
import { Mutation } from "react-apollo";
import { UPDATE_BRANCH } from "../../../mutations/branch";
//react-router
import { withRouter } from "react-router-dom";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class UpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      branch: null
    };
    this.handleChangeBranch = this.handleChangeBranch.bind(this);
    this.saveBranch = this.saveBranch.bind(this);
    this.resetBranch = this.resetBranch.bind(this);
  }

  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
    this.resetBranch();
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
    this.resetBranch();
  }

  handleChangeBranch(event) {
    const field = event.target.name;
    let value = event.target.value;
    if (field === "active") {
      value = value === true ? true : false;
    }
    let branch = this.state.branch;
    branch[field] = value;
    this.setState({ branch });
  }

  resetBranch() {
    let branch = Object.assign({}, this.props.branch);
    this.setState({ branch });
  }

  saveBranch(updateBranch) {
    this.handleClose("classicModal");
    let branch = this.state.branch;
    updateBranch({ variables: branch });
    alert(`Sede ${branch.branch} ha sido actualizada`);
  }

  componentWillMount() {
    this.resetBranch();
  }

  render() {
    const { classes } = this.props;
    let branch = this.state.branch;
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
                      Actualización de datos
                    </h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                    <form>
                      <CustomInput
                        labelText="Sede"
                        name="branch"
                        value={branch.branch}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeBranch}
                      />
                      <CustomInput
                        labelText="Dirección"
                        name="address"
                        value={branch.address}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeBranch}
                      />
                      <CustomInput
                        labelText="Latitud"
                        name="latitude"
                        value={branch.latitude}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeBranch}
                      />
                      <CustomInput
                        labelText="Longitud"
                        name="longitude"
                        value={branch.longitude}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeBranch}
                      />
                      <CustomInput
                        labelText="Contacto"
                        name="contact"
                        value={branch.contact}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeBranch}
                      />
                      <CustomInput
                        labelText="Teléfono"
                        name="phone"
                        value={branch.phone}
                        formControlProps={{ fullWidth: true }}
                        onChange={this.handleChangeBranch}
                      />
                      <FormControl fullWidth style={{paddingTop:"10px"}}>
                        <ActiveSelector
                          active={branch.active}
                          onChange={this.handleChangeBranch}
                          modal="update"
                        />
                      </FormControl>
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation mutation={UPDATE_BRANCH}>
                      {updateBranch => (
                        <div>
                          <Button
                            color="transparent"
                            simple
                            onClick={() => {
                              this.saveBranch(updateBranch);
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
