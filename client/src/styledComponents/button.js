/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { withStyles } from "@material-ui/core/styles";
import MUIButton from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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

class MenuButton extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = selectContest => () => {
    if (selectContest) this.props.setCurrentContest(selectContest);
    this.setState({ anchorEl: null });
  };
  render() {
    const { children, contests } = this.props;
    const { anchorEl } = this.state;
    return (
      <div>
        <MUIButton
          disabled={!Boolean(contests)}
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {children}
        </MUIButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose(null)}
        >
          {contests
            ? contests.map(({ title, id }) => (
                <MenuItem key={id} onClick={this.handleClose({ id, title })}>
                  {title}
                </MenuItem>
              ))
            : null}
        </Menu>
      </div>
    );
  }
}

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

export { MenuButton, Button, EditButton, ClusterButton };
