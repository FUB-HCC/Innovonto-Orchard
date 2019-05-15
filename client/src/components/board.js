import React, { Component } from "react";
import { connect } from "react-redux";
import { getSinkFromTarget } from "../utils";
import {
  renderSparks,
  renderClusters,
  SparkStack,
  ClusterList,
  ActiveSpark,
  UndoRedo
} from "./";
import { moveSpark, moveCluster, loadSparks } from "../actions";
import { boardColor } from "./../constants/color";
import { sparkSize } from "../constants/index.json";

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
  ...state.contest.currentContest.clustering.present,
  activeSpark: state.activeSpark
});
const mapDispatchToProps = dispatch => ({
  moveSpark: (...props) => dispatch(moveSpark(...props)),
  moveCluster: (...props) => dispatch(moveCluster(...props)),
  loadSparks: (...props) => dispatch(loadSparks(...props))
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
    if (type === "spark") {
      let sink = getSinkFromTarget(event.target);

      if (sink.type === "SPARK" && sink.id === id) {
        sink = { type: "BOARD" };
      }
      this.props.moveSpark(container, sink, id, position);
    } else if (type === "cluster") {
      this.props.moveCluster(id, position);
    }
  };

  render() {
    const { boardSparks, clusters, stackSparks, activeSpark } = this.props;
    return (
      <div className="d-flex flex-row">
        <UndoRedo />
        <div className="float-left" style={{ width: sparkSize.width + 60 }}>
          <SparkStack
            name={"Spark Stack"}
            stackSparks={stackSparks}
            type="STACK"
          />
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
              {renderSparks(boardSparks, { type: "BOARD" })}
              {renderClusters(clusters)}
            </div>
          </div>
        </div>

        <div className="float-right" style={{ width: 400 }}>
          {activeSpark ? (
            <ActiveSpark
              {...activeSpark}
              {...findSpark(activeSpark, this.props)}
            />
          ) : (
            <ClusterList clusters={clusters} />
          )}
        </div>
      </div>
    );
  }
}

const findSpark = ({ id, container }, props) => {
  switch (container.type) {
    case "BOARD":
      return props.boardSparks.find(i => i.id === id);
    case "STACK":
      return props.stackSparks.find(i => i.id === id);
    case "CLUSTER":
      if (props.clusters.length === 0) return {};
      return props.clusters
        .find(ci => ci.id === container.id)
        .sparks.find(i => i.id === id);
    default:
      return {};
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
