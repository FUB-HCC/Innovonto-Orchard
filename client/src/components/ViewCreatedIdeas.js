import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { H6 } from "../styledComponents";
import { Idea } from "./";

var styles = {
  root: {
    maxWidth: 700,
    margin: "auto"
  },
  time: {
    float: "right",
    marginLeft: 5
  },
  image: {
    float: "left",
    marginRight: 10
  },
  content: {},
  idea: {}
};

class ViewCreatedIdeas extends Component {
  componentDidMount() {
    const { ideaId } = this.props;
    if (ideaId) {
      document.getElementById(ideaId).scrollIntoView();
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
          classes={classes}
          {...idea}
        />
      ));

    return (
      <div className={classes.root}>
        <H6>Created Ideas</H6>
        {displayIdeas}
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
