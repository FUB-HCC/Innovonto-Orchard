import React, { Component } from "react";
import { Router } from "@reach/router";
import { Board, Header, CreateIdea, ViewCreatedIdeas } from "./components";
import { backgroundColor } from "./constants/color";

class App extends Component {
  render() {
    return (
      <div className="container-fluid" style={{ background: backgroundColor }}>
        <Header />
        <Router>
          <Board path="/" />
          <CreateIdea path="/create-idea" />
          <ViewCreatedIdeas path="/ideas" />
        </Router>
      </div>
    );
  }
}

export default App;
