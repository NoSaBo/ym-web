import React, { Component } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

import { Link } from 'react-router-dom';

class AdminPage extends Component {
  render() {
    const { classes } = this.props;
    const imageClasses = classNames(classes.imgCenter);
    return (
      <div>
        <Header brand="yo-manejo.com" />
        <Parallax filter image={require("assets/img/bg/people.png")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <Card plain>
                  <CardBody>
                    <img
                      src={require("assets/img/logos/YoManejo_Logo_new.png")}
                      alt="..."
                      className={imageClasses}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <Link to="admin-page/employees"><Button> EMPLEADOS </Button></Link>
            <Button> SEDES </Button>
            <Button> HORARIOS </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(AdminPage);
