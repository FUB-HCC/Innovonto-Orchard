import React from "react";
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

const ViewCreatedIdeas = ({ ideas = [], classes, ideaId }) => {
  const displayIdeas = ideas
    .sort((a, b) => a.created < b.created)
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
};

export default withStyles(styles)(
  connect(
    state => ({ ideas: state.ideas }),
    null
  )(ViewCreatedIdeas)
);
