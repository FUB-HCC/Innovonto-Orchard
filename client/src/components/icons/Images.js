import React from "react";
import { withStyles } from "@material-ui/core";

var styles = {
  iconPreview: {
    width: 200
  }
};

class Images extends React.Component {
  render() {
    const { classes, images } = this.props;
    return images.map((image, i) => (
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
          src={process.env.REACT_APP_DOMAIN + image.resourceName}
          alt=""
        />
      </div>
    ));
  }
}

export default withStyles(styles)(Images);
