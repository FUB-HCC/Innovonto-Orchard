import React, { Component } from "react";
import { connect } from "react-redux";
import { Router } from "@reach/router";
import { apiEndpoint } from "./utils";
import { setContestIDs } from "./actions";
import { Board, Header, CreateIdea, ViewCreatedIdeas } from "./components";
import { backgroundColor } from "./constants/color";
console.log(process.env);
class App extends Component {
  componentDidMount() {
    apiEndpoint.get("/ideaContests/").then(res => {
      console.log(res);
      this.props.dispatch(setContestIDs(res.data));
    });
  }
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

export default connect()(App);
