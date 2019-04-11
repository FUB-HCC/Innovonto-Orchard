import React from "react";
import { DropZone } from "./";
import { button, sparkColor } from "../constants/color";
import { ClusterButton, Box, H6, Number } from "../styledComponents";

const Item = ({ id, name, numberOfSparks }) => {
  return (
    <a href={`#${id}`} style={{ textDecoration: "none" }}>
      <DropZone sink={{ type: "CLUSTER", id: id }} dropColor={sparkColor}>
        <ClusterButton>
          <H6 noCenter={true}>
            {name}
            <Number>{numberOfSparks}</Number>
          </H6>
        </ClusterButton>
      </DropZone>
    </a>
  );
};

const ClusterList = ({ clusters = [] }) => {
  var clusterList = clusters
    .sort((a, b) => {
      if (!a.name && !b.name) return a.sparks.length < b.sparks.length;
      if (!a.name) return true; //undefined at the end of the list
      if (!b.name) return false;
      else return a.name.toLowerCase() > b.name.toLowerCase();
    })
    .map(c => (
      <Item
        key={"list" + c.id}
        name={c.name || "CLUSTER"}
        id={c.id}
        numberOfSparks={c.sparks.length}
      />
    ));
  return (
    <Box color={button.text} backgroundColor={button.main}>
      <H6 bold={true}>Clusters</H6>
      {clusterList}
    </Box>
  );
};

export default ClusterList;
