import React from "react";
import Draggable from "./draggable";
import RenameableH6 from "./renameableH6";
import { sparkSize } from "./../constants/index.json";
import { renderSparks } from "./";
import { clusterColor } from "./../constants/color";

export const renderClusters = clusters => {
  if (!clusters) return null;
  const clustersRender = clusters.map((cluster, i) => {
    return <Cluster key={cluster.id} {...cluster} />;
  });
  return clustersRender;
};
export const getShape = length => {
  let sqrtUp = Math.round(Math.sqrt(length) + 0.49);
  let diff = parseInt((sqrtUp ** 2 - length) / sqrtUp);
  return [sqrtUp, sqrtUp - diff];
};

var styles = {
  clusterBox: {
    position: "absolute",
    borderRadius: 10,
    padding: "2px 2px",
    background: clusterColor,
    touchAction: "none",
    cursor: "move",
    zIndex: 1,
    overflow: "hidden"
  },
  h6: {
    textAlign: "center",
    minHeight: "1em"
  }
};

const Cluster = ({ id, position, sparks, name }) => {
  const [width, height] = getShape(sparks.length);
  var style = {
    ...styles.clusterBox,
    ...position,
    ...{
      width: 4 + sparkSize.width * width,
      height: sparkSize.height * height + 50
    }
  };
  const dropZone = "CLUSTER" + id;
  const container = { type: "CLUSTER", id: id };
  var displaySparks = renderSparks(sparks, container, dropZone);
  return (
    <Draggable id={id} dropZone={dropZone} type={"cluster"} style={style}>
      <div id={id}>
        <RenameableH6
          container={container}
          style={styles.h6}
          name={name}
          defaultName={"CLUSTER"}
        />
        {displaySparks}
      </div>
    </Draggable>
  );
};

export default Cluster;
