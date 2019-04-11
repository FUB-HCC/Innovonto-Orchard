import React, { Component } from "react";
import { connect } from "react-redux";
import { removeAvtiveSpark } from "../actions";

class Draggable extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  handleDragStart = ev => {
    const { id, type, container, activespark } = this.props;
    const spark = this.node.current;
    var rect = spark.getBoundingClientRect();
    var x = ev.clientX - rect.x;
    var y = ev.clientY - rect.y;
    var data = {
      id: id,
      offset: { x: x, y: y },
      type: type,
      container: container
    };
    if (ev.target.classList[1] !== type) return null;
    ev.dataTransfer.setData("json", JSON.stringify(data));
    if (type === "spark" && activespark !== null)
      this.props.dispatch(removeAvtiveSpark());
  };

  // methods
  render() {
    const { style, dropZone, type, children, dispatch, ...props } = this.props;
    return (
      <div
        className={dropZone + " " + type}
        style={style}
        ref={this.node}
        draggable
        onDragStart={this.handleDragStart}
        {...props}
      >
        {children}
      </div>
    );
  }
}

export default connect(state => ({ activespark: state.activeSpark }))(
  Draggable
);
