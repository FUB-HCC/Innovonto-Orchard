/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { withStyles } from "@material-ui/core/styles";
import MUIButton from "@material-ui/core/Button";
import { button, sparkColor, clusterColor, lightRed } from "../constants/color";

const styles = theme => ({
  button: {
    background: button.main,
    color: button.text
  }
});

let Button = ({ classes, children, ...props }) => {
  return (
    <MUIButton className={classes.button} size="small" {...props}>
      {children}
    </MUIButton>
  );
};
Button = withStyles(styles)(Button);

const editStyle = (type = "edit") => ({
  padding: "5px 5px",
  borderRadius: 5,
  color: button.text,
  "&:hover": {
    backgroundColor: type === "edit" ? sparkColor : lightRed
  },
  cursor: "pointer"
});
const EditButton = ({ children, type, ...props }) => (
  <span css={editStyle(type)} {...props}>
    {children}
  </span>
);

const ClusterButton = styled.div({
  background: clusterColor,
  borderRadius: 5,
  padding: "5px 0px 5px 0px",
  color: button.text,
  "&:hover": {
    backgroundColor: sparkColor
  }
});

export { Button, EditButton, ClusterButton };
