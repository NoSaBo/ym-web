import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Notification from "components/Notifications/Notifications.jsx";
// style
import loginStyle from "assets/jss/material-kit-react/views/componentsSections/loginStyle.jsx";
// queries and mutations
import { Mutation } from "react-apollo";
import { LOGIN } from "../../../../mutations/login";

import decode from "jwt-decode";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  onSubmit = async (e, login, data) => {
    const { email, password } = this.state;
    const response = await login({
      variables: {
        email,
        password
      }
    });
    const { ok, token, refreshToken, errors } = response.data.login;
    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      this.props.history.push("/parkeo/admin-page");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState({ ["errors"] : err });
      this.state["errors"] = err;
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentWillMount() {
    let token = localStorage.getItem("token");
    if (token !== null) {
      token = decode(token);
      const { username } = token.user;
      if (username === "admin" || username === "superadmin") {
        this.props.history.push("/parkeo/admin-page");
      }
    }
  }

  render() {
    const { classes } = this.props;
    const {
      errors: { emailError, passwordError }
    } = this.state;
    const errorList = [];
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Acceso</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      error={!!emailError}
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                      onChange={this.onChange}
                      name="email"
                    />
                    <CustomInput
                      error={!!passwordError}
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                      onChange={this.onChange}
                      name="password"
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Mutation mutation={LOGIN}>
                      {(login, { data }) => (
                        <Button
                          simple
                          color="primary"
                          size="lg"
                          onClick={e => this.onSubmit(e, login, data)}
                        >
                          > Iniciar Sesión
                        </Button>
                      )}
                    </Mutation>
                  </CardFooter>
                  {!!emailError || !!passwordError ? (
                    <Notification errorList={errorList} />
                  ) : null}
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(loginStyle)(Login);
