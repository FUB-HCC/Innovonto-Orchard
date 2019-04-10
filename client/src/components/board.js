import React, { Component } from "react";
import { connect } from "react-redux";
import { getSinkFromTarget } from "../utils";
import {
  renderIdeas,
  renderClusters,
  IdeaStack,
  ClusterList,
  ActiveIdea,
  UndoRedo
} from "./";
import { moveIdea, moveCluster } from "../actions";
import { boardColor } from "./../constants/color";
import { ideaSize } from "../constants/index.json";

var styles = {
  board: {
    width: 2000,
    height: 2000,
    background: boardColor,
    position: "relative",
    zIndex: 0
  },
  container: {
    overflow: "auto",
    height: "calc(100vh - 80px)"
  }
};
const mapStateToProps = state => ({
  ...state.clustering.present,
  activeIdea: state.activeIdea
});
const mapDispatchToProps = dispatch => ({
  moveIdea: (...props) => dispatch(moveIdea(...props)),
  moveCluster: (...props) => dispatch(moveCluster(...props))
});

class Board extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
  }

  allowDrop = ev => {
    ev.preventDefault();
  };

  handleDrop = event => {
    event.preventDefault();
    const { top, left } = this.boardRef.current.getBoundingClientRect();
    const unparsed = event.dataTransfer.getData("json");
    if (typeof unparsed !== "string" || unparsed.length === 0) return null;
    const data = JSON.parse(unparsed);
    const {
      id,
      type,
      container,
      offset: { x, y }
    } = data;
    let position = {
      left: event.clientX - x - left,
      top: event.clientY - y - top
    };
    if (type === "idea") {
      let sink = getSinkFromTarget(event.target);

      if (sink.type === "IDEA" && sink.id === id) {
        sink = { type: "BOARD" };
      }
      this.props.moveIdea(container, sink, id, position);
    } else if (type === "cluster") {
      this.props.moveCluster(id, position);
    }
  };

  render() {
    const { boardIdeas, clusters, stackIdeas, activeIdea } = this.props;
    return (
      <div className="d-flex flex-row">
        <UndoRedo />
        <div className="float-left" style={{ width: ideaSize.width + 60 }}>
          <IdeaStack name={"Idea Stack"} stackIdeas={stackIdeas} type="STACK" />
        </div>
        <div style={styles.container}>
          <div style={styles.board}>
            <div
              id="board"
              className="BOARD"
              ref={this.boardRef}
              style={styles.board}
              onDrop={this.handleDrop}
              onDragOver={this.allowDrop}
            >
              {renderIdeas(boardIdeas, { type: "BOARD" })}
              {renderClusters(clusters)}
            </div>
          </div>
        </div>

        <div className="float-right" style={{ width: 400 }}>
          {activeIdea ? (
            <ActiveIdea {...activeIdea} {...findIdea(activeIdea, this.props)} />
          ) : (
            <ClusterList clusters={clusters} />
          )}
        </div>
      </div>
    );
  }
}

const findIdea = ({ id, container }, props) => {
  switch (container.type) {
    case "BOARD":
      return props.boardIdeas.find(i => i.id === id);
    case "STACK":
      return props.stackIdeas.find(i => i.id === id);
    case "CLUSTER":
      return props.clusters
        .find(ci => ci.id === container.id)
        .ideas.find(i => i.id === id);
    default:
      return {};
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
