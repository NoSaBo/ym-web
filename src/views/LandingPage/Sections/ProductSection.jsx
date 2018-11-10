import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Grade from "@material-ui/icons/Grade";
import Person from "@material-ui/icons/Person";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ProductSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={16} sm={16} md={8}>
            <h2 className={classes.title}>Pasión por los detalles</h2>
            <h5 className={classes.description}>
              Dejamos huella que transmite confianza y fidelización.
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={16} sm={16} md={6}>
              <InfoArea
                title="Somos"
                description="Jóvenes emprendedores que valoramos y disfrutamos de lo que hacemos, brindando servicios de calidad que tu negocio y clientes necesitan, trabajando con pasión, innovación y tecnología."
                icon={Fingerprint}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={16} sm={16} md={6}>
              <InfoArea
                title="Valoramos"
                description="La buena atención, por ello nuestra propuesta es resaltar la imagen de tu marca, trabajando en fortalecer tu prestigio con detalles que maximizan la experiencia de los clientes."
                icon={Grade}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
