import React from "react";
import { renderSparks } from ".";
import { H6, Box, Number } from "../styledComponents";

const SparkStack = ({ stackSparks = [], type, name, children }) => {
  const DisplaySparks = renderSparks(stackSparks.slice(0, 50), { type, name });
  return (
    <div>
      <H6 bold={true}>
        {name} <Number>{stackSparks.length}</Number>
      </H6>
      <Box style={{ padding: 10 }}>{DisplaySparks}</Box>
      {children}
    </div>
  );
};

export default SparkStack;
