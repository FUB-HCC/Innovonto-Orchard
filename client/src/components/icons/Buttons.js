import React from "react";
import { Button } from "../../styledComponents";
import { Input } from "@material-ui/core";

export default props => (
  <div>
    <input
      accept="image/*"
      style={{ display: "none" }}
      id="upload-icon-input"
      type="file"
      onChange={props.onChange}
    />
    <label htmlFor="upload-icon-input">
      <Button component="span">Upload Icon</Button>
    </label>
  </div>
);
