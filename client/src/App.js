import React, { Component } from "react";
import { connect } from "react-redux";
import { Router } from "@reach/router";
import { setContests, setCurrentContest, loadSparks } from "./actions";
import { getContests, getContestIdeas } from "./middleware/requests";
import { Board, Header, CreateIdea, ViewCreatedIdeas } from "./components";
import { backgroundColor } from "./constants/color";
class App extends Component {
  componentDidMount() {
    getContests(data => this.props.dispatch(setContests(data))).then(res => {
      this.handleLoadSparks();
    });
  }
  componentDidUpdate(prevProps) {
    const numberOfContests = this.props.contests.length;
    if (numberOfContests > 0 && !this.props.currentContestID) {
      console.log(this.props.contests);
      this.props.dispatch(
        setCurrentContest(this.props.contests[numberOfContests - 1])
      );
    }
    if (
      this.props.currentContestID !== prevProps.currentContestID ||
      !this.props.sparksLoaded
    ) {
      this.handleLoadSparks();
    }
  }

  handleLoadSparks = () => {
    if (!this.props.sparksLoaded && this.props.currentContestID) {
      const dispatch = data => this.props.dispatch(loadSparks(data));
      getContestIdeas(dispatch, this.props.currentContestID);
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
  currentContestID: state.contest.currentContest.id,
  contests: state.contest.contests
}))(App);
