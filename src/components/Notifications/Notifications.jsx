import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import notificationsStyles from "assets/jss/material-kit-react/views/componentsSections/notificationsStyles.jsx";

class SectionNotifications extends React.Component {
  render() {
    const { classes } = this.props;
    const { errorList, success } = this.props;
    return (
      <div className={classes.section} id="notifications">
        {success ? (
          <SnackbarContent
            message={
              <span>
                <b>SUCCESS ALERT:</b> You've got some friends nearby, stop
                looking at your phone and find them...
              </span>
            }
            close
            color="success"
            icon={Check}
          />
        ) : null}
        {errorList
          ? errorList.map((error, index) => {
            return(
              <SnackbarContent
                key={index}
                message={
                  <span>
                    <b>DANGER ALERT:</b> {error}
                  </span>
                }
                close
                color="danger"
                icon="info_outline"
              />
            )})
          : null}
        <Clearfix />
      </div>
    );
  }
}

export default withStyles(notificationsStyles)(SectionNotifications);
