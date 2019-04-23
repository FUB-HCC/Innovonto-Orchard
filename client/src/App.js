import React, { Component } from "react";
import { connect } from "react-redux";
import { Router } from "@reach/router";
import { apiEndpoint } from "./utils";
import { setIdeas } from "./actions";
import {
  Board,
  Header,
  CreateIdea,
  ViewCreatedIdeas,
  Idea
} from "./components";
import { backgroundColor } from "./constants/color";
import { ServerResourceName } from "./constants";

class App extends Component {
  componentDidMount() {
    apiEndpoint
      .get(ServerResourceName + "/api/v2/ideas")
      .then(data => {
        console.log(data);
        this.props.dispatch(setIdeas(data.data._embedded.ideas));
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="container-fluid" style={{ background: backgroundColor }}>
        <Header />
        <Router>
          <Board path="/" />
          <CreateIdea path="/create-idea/:ideaId" />
          <CreateIdea path="/create-idea" />
          <ViewCreatedIdeas path="/ideas/:ideaId" />
          <ViewCreatedIdeas path="/ideas" />
          <Idea path="/idea/:id" />
        </Router>
      </div>
    );
  }
}

export default connect()(App);
