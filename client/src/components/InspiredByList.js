import React from "react";

import { SparkInfo } from "./";

const InspiredByList = ({ sparks = [], ...props }) => {
  return (
    <div>
      {sparks.map(s => (
        <SparkInfo
          key={s.id}
          {...s}
          container={{ type: "CLUSTER" }}
          {...props}
        />
      ))}
    </div>
  );
};

export default InspiredByList;
