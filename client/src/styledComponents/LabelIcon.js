import React from "react";
import { sparkSize } from "../constants";
import { labelIcon } from "../icons";

const style = {
  float: "right",
  fontSize: sparkSize.fontSize
};

const LabelIcon = () => (
  <img
    draggable="false"
    style={style}
    alt="label"
    height="20"
    src={labelIcon}
  />
);

export default LabelIcon;
