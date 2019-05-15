import React, { Component } from "react";
import { connect } from "react-redux";
import { Router } from "@reach/router";
import { apiEndpoint } from "./utils";
import { setContests, loadSparks } from "./actions";
import {
  Board,
  Header,
  CreateIdea,
  ViewCreatedIdeas,
  parseSparksFrom
} from "./components";
import { backgroundColor } from "./constants/color";
console.log(process.env);
class App extends Component {
  componentDidMount() {
    apiEndpoint.get("/ideaContests/").then(res => {
      console.log(res);
      this.props.dispatch(setContests(res.data));
      this.handleLoadSparks();
    });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.currentContestID !== prevProps.currentContestID ||
      !this.props.sparksLoaded
    ) {
      console.log("prps", prevProps);
      this.handleLoadSparks();
    }
  }

  handleLoadSparks = () => {
    if (!this.props.sparksLoaded && this.props.currentContestID) {
      apiEndpoint
        .get("/ideaContests/" + this.props.currentContestID + "/sparks/")
        .then((res, err) => {
          if (err) {
            return console.log(err);
          }
          this.props.dispatch(loadSparks(parseSparksFrom(res.data)));
        });
    }
  };
  render() {
    return (
      <div className="container-fluid" style={{ background: backgroundColor }}>
        <Header />
        <Router basepath={process.env.REACT_APP_BASE}>
          <Board path="/" />
          <CreateIdea path="/create-idea/:ideaId" />
          <CreateIdea path="/create-idea" />
          <ViewCreatedIdeas path="/ideas/:ideaId" />
          <ViewCreatedIdeas path="/ideas" />
          {/*<Idea path="/idea/:id" />*/}
        </Router>
      </div>
    );
  }
}

export default connect(state => ({
  sparksLoaded: state.contest.currentContest.clustering.present.sparksLoaded,
  currentContestID: state.contest.currentContest.id
}))(App);
