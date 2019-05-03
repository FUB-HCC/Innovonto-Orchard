import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Button, H6 } from "../styledComponents";
import { Idea } from "./";
import { exportIdeasAsJsonLd } from "../utils/exportIdeas";
import { navigate } from "@reach/router";

var styles = {
  root: {
    maxWidth: 700,
    margin: "auto"
  },
  exportButton: {
    textAlign: "center"
  }
};

class ViewCreatedIdeas extends Component {
  componentDidMount() {
    const { ideaId } = this.props;
    if (ideaId) {
      const ideaElem = document.getElementById(ideaId);
      if (ideaElem) ideaElem.scrollIntoView();
      else navigate("../ideas");
    }
  }

  render() {
    const { ideas = [], classes, ideaId } = this.props;
    const displayIdeas = ideas
      .sort((a, b) => new Date(b.created) - new Date(a.created))
      .map(idea => (
        <Idea
          viewFull={ideaId === idea.id}
          id={idea.id}
          key={idea.id}
          {...idea}
        />
      ));

    return (
      <div className={classes.root}>
        <H6>Created Ideas</H6>
        {displayIdeas}
        <div className={classes.exportButton}>
          <Button onClick={() => exportIdeasAsJsonLd(ideas)}>{"Export"}</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(
  connect(
    state => ({ ideas: state.ideas }),
    null
  )(ViewCreatedIdeas)
);
