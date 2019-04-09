import React from "react";

//TODO styling! resize images so that they always have the same size. also: X button + styling is broken right now
export default props =>
  props.images.map((image, i) => (
    <div key={i} className="fadein">
      <div
        onClick={() => props.removeImage(image.resourceName)}
        className="delete"
      >
        X
      </div>
      <img src={image.qualifiedResourceName} alt="" />
    </div>
  ));
