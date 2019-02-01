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
import { NEW_BRANCH } from "../../../mutations/branch";
import { GET_BRANCHES } from "../../../queries/branch";
//react-router
import { withRouter } from "react-router-dom";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const updateCacheAdd = (cache, { data: { addBranch } }) => {
  const { branches } = cache.readQuery({ query: GET_BRANCHES });
  const index = addBranch.id;
  branches[index] = addBranch;
  cache.writeQuery({
    query: GET_BRANCHES,
    data: { branches: branches.concat([addBranch]) }
  });
};

const newBranch = {
  branch: "",
  address: "",
  latitude: "",
  longitude: "",
  contact: "",
  phone: "",
  active: ""
};

class BranchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classicModal: false,
      branch: null
    };
    this.saveBranch = this.saveBranch.bind(this);
    this.resetBranchForm = this.resetBranchForm.bind(this);
    this.handleChangeBranch = this.handleChangeBranch.bind(this);
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
    this.resetBranchForm();
  }

  handleChangeBranch(event) {
    const field = event.target.name;
    let value = event.target.value;
    if (field === "active") {
      value = value === "true" ? true : false;
    }
    let branch = this.state.branch;
    branch[field] = value;
    this.setState({ branch });
  }

  saveBranch(event, addBranch, branch) {
    event.preventDefault();
    addBranch({
      variables: {
        branch: branch.branch,
        address: branch.address,
        latitude: branch.latitude,
        longitude: branch.longitude,
        contact: branch.contact,
        phone: branch.phone,
        active: branch.active
      }
    });
    alert(`${branch.branch} have been added!`);
    this.handleClose("classicModal");
    this.resetBranchForm();
    window.location.reload();
    this.props.history.push("/parkeo/admin-page");
  }

  resetBranchForm() {
    let branch = Object.assign({}, newBranch);
    this.setState({ branch });
  }

  componentWillMount() {
    this.resetBranchForm();
  }

  render() {
    const { classes } = this.props;
    const branch = this.state.branch;
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
                    <h4 className={classes.modalTitle}>Crear Sede</h4>
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
                      <div>
                        <div>Estado</div>
                        <select
                          onChange={this.handleChangeBranch}
                          name="active"
                          value={branch.active}
                        >
                          <option>Seleccionar Estado</option>
                          <option value={true}>Activo</option>
                          <option value={false}>Inactivo</option>
                        </select>
                      </div>
                    </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Mutation mutation={NEW_BRANCH} update={updateCacheAdd}>
                      {addBranch => (
                        <div>
                          <Button
                            color="transparent"
                            simple
                            onClick={(e) => {
                              this.saveBranch(e, addBranch, branch);
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

export default withRouter(withStyles(javascriptStyles)(BranchModal));
