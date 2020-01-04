import React from "react";
import { connect } from "react-redux";
import { renderSparks } from ".";
import { turnOverStack, turnBackStack } from "../actions";
import { H6, Box, EditButton, Number } from "../styledComponents";

const SparkStack = ({ stackSparks = [], type, name, dispatch, children }) => {
  const DisplaySparks = renderSparks(stackSparks.slice(0, 50), { type });
  return (
    <div>
      <H6 bold={true}>
        {name} <Number>{stackSparks.length}</Number>
      </H6>
      {/*<p style={{ textAlign: "center" }}>
        <EditButton onClick={() => dispatch(turnBackStack())}>{"<"}</EditButton>
        <EditButton onClick={() => dispatch(turnOverStack())}>{">"}</EditButton>
  </p>*/}
      <Box style={{ padding: 10 }}>{DisplaySparks}</Box>
      {children}
    </div>
  );
};

export default connect()(SparkStack);
