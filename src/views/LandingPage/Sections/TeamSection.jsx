import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import teamStyle from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx";

import logoSeguridad from "assets/img/logos/Seguridad.png";
import logoEcoSpa from "assets/img/logos/EcoSpa.png";
import logoChofer24 from "assets/img/logos/Chofer24.png";
// import logoChoferReemplazo from "assets/img/logos/ChoferReemplazo.png";
import logoRecepcionista from "assets/img/logos/Recepcionista.png";
import logoAlTaller from "assets/img/logos/AlTaller.png";
import logoParKeo from "assets/img/logos/ParKeo.png";
import logoTGuio from "assets/img/logos/TGuio.png";
// import logoGestionP from "assets/img/logos/GestionP.png";

class TeamSection extends React.Component {
  render() {
    const { classes } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgSquare,
      classes.imgFluid
    );
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Servicios:</h2>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={logoSeguridad} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>Seguridad</h4>
                <CardBody>
                  <p className={classes.description}>
                    Seguridad y Protección personalizado para su evento social.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={logoEcoSpa} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>EcoSpa!</h4>
                <CardBody>
                  <p className={classes.description}>
                    Lavado y encerado del tu auto con total responsabilidad (Sin
                    agua).
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={logoChofer24} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>Chofer24</h4>
                <CardBody>
                  <p className={classes.description}>
                    Un conductor permanente para que aproveches el tiempo.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={logoParKeo} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>Chofer de Reemplazo</h4>
                <CardBody>
                  <p className={classes.description}>
                    Un chofer lo llevará seguro y podrá concluir su día con
                    total tranquilidad.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img
                    src={logoRecepcionista}
                    alt="..."
                    className={imageClasses}
                  />
                </GridItem>
                <h4 className={classes.cardTitle}>Recepcionista</h4>
                <CardBody>
                  <p className={classes.description}>
                    Proactivo, capacidad de comunicación y empatía hacia tus
                    clientes.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={logoAlTaller} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>Al Taller</h4>
                <CardBody>
                  <p className={classes.description}>
                    Nosotros recogemos y llevamos tu vehículo al taller de tu
                    confianza por tí.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={logoParKeo} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>ParKeo</h4>
                <CardBody>
                  <p className={classes.description}>
                    Disfruta sin preocupación al entregar tu vehículo.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={logoTGuio} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>TGuio</h4>
                <CardBody>
                  <p className={classes.description}>
                    Un conductor te acompañará hasta que logres la confianza
                    para manejar sólo.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img src={logoParKeo} alt="..." className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>GestiónP</h4>
                <CardBody>
                  <p className={classes.description}>
                    Gestionamos integralmente tu playa de estacionamiento, con
                    transparencia y eficacia.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(teamStyle)(TeamSection);
