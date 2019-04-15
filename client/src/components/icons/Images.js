import React from "react";
import { withStyles } from "@material-ui/core";
import connect from "react-redux/es/connect/connect";

var styles = {
  iconPreview: {
    width: 200
  }
};

class Images extends React.Component {
  render() {
    const { classes } = this.props;
    return this.props.images.map((image, i) => (
      <div key={i} className={classes.iconPreview}>
        <div
          onClick={() => this.props.removeImage(image.resourceName)}
          className="delete"
        >
          X
        </div>
        <img
          style={{ maxWidth: 300 + "px" }}
          className="iconPreview"
          src={image.qualifiedResourceName}
          alt=""
        />
      </div>
    ));
  }
}

export default withStyles(styles)(Images);
