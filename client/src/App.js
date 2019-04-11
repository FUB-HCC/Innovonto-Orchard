import React, { Component } from "react";
import { Router } from "@reach/router";
import {
  Board,
  Header,
  CreateIdea,
  ViewCreatedIdeas,
  Idea
} from "./components";
import { backgroundColor } from "./constants/color";

class App extends Component {
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

export default App;
