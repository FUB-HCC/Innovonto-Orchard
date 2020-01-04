import React from "react";
import { loadSparks } from "../actions";
import { connect } from "react-redux";
import { Button } from "../styledComponents";
import Ajv from "ajv";
import importSchema from "../models/import.json";
var ajv = new Ajv();

export const parseSparksFrom = doc => {
  if (!ajv.validate(importSchema, doc)) {
    console.log(ajv.errors);
    return null;
  }
  return doc["@graph"].map((spark, i) => {
    return {
      content: spark.content,
      "@id": spark["@id"],
      id: spark["@id"]
        .split("/")
        .filter(v => v !== "")
        .pop(),
      title: `Spark ${i}`,
      position: { left: 0, top: 0 },
      concepts: Array.isArray(spark.hasAnnotation)
        ? spark.hasAnnotation.map(c => ({ text: c.text, id: c["@id"] }))
        : []
    };
  });
};

const mapDispatchToProps = dispatch => ({
  dispatchLoadSparks: (...props) => dispatch(loadSparks(...props))
});

class FileSelector extends React.Component {
  parseSparksFromFileInput = e => {
    const content = e.target.result;
    const sparks = parseSparksFrom(JSON.parse(content));

    if (sparks) {
      this.props.dispatchLoadSparks(sparks);
      console.log("Done loading sparks.");
    }
  };

  handleImport = event => {
    console.log(event.target.files[0]);
    const fileReader = new FileReader();
    fileReader.onloadend = this.parseSparksFromFileInput;
    fileReader.readAsText(event.target.files[0]);
  };

  render() {
    return (
      <div>
        <input
          onChange={this.handleImport}
          style={{ display: "none" }}
          id="contained-button-file"
          //multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button component="span">{"Import Sparks"}</Button>
        </label>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FileSelector);
