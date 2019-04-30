import React from "react";

import { SparkInfo } from "./";

const InspiredByList = ({ sparks = [], ...props }) => {
  return (
    <div>
      {sparks.map(s => (
        <SparkInfo key={s.id} {...s} {...props} />
      ))}
    </div>
  );
};

export default InspiredByList;
