import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Button, H6 } from "../styledComponents";
import { Idea } from "./";
import { exportIdeasAsJsonLd } from "../utils/exportIdeas";
import { navigate } from "@reach/router";
import { apiEndpoint } from "../utils";
import { setIdeas } from "../actions";

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
    const { ideaId, ideaContestId } = this.props;
    if (ideaContestId) this.updateIdeas();
    if (ideaId) {
      const ideaElem = document.getElementById(ideaId);
      if (ideaElem) ideaElem.scrollIntoView();
      else navigate("../ideas");
    }
  }
  updateIdeas = () => {
    apiEndpoint
      .get("/ideaContests/" + this.props.ideaContestId + "/ideas")
      .then(data => {
        if (data.data._embedded)
          this.props.dispatch(setIdeas(data.data._embedded.ideas));
        else this.props.dispatch(setIdeas([]));
      })
      .catch(error => console.log(error));
  };

  componentWillReceiveProps({ ideaId }) {
    if (ideaId !== this.props.ideaId) {
      this.updateIdeas();
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
    state => ({
      ideas: state.ideas,
      ideaContestId: state.contest.currentContest.id
    }),
    null
  )(ViewCreatedIdeas)
);
