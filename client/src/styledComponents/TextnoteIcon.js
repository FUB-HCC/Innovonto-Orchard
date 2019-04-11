import React from "react";
import { sparkSize } from "../constants";
import { textnoteIcon } from "../icons";

const style = {
  float: "right",
  fontSize: sparkSize.fontSize
};

const LabelIcon = () => (
  <img
    draggable="false"
    style={style}
    alt="textnote"
    height="20"
    src={textnoteIcon}
  />
);

export default LabelIcon;
