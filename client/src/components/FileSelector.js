import * as React from "react";
import { loadSparks } from "../actions";
import connect from "react-redux/es/connect/connect";

const parseSparksFrom = doc => {
  return doc["@graph"].map((spark, i) => {
    return {
      content: spark.content,
      "@id": spark["@id"],
      id: spark["@id"]
        .split("/")
        .filter(v => v !== "")
        .pop(),
      title: `Spark ${i}`,
      position: { left: 0, top: 0 }
    };
  });
};

const mapDispatchToProps = dispatch => ({
  loadSparks: (...props) => dispatch(loadSparks(...props))
});

class FileSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.parseSparksFromFileInput = this.parseSparksFromFileInput.bind(this);
  }

  parseSparksFromFileInput(e) {
    const content = e.target.result;
    const sparks = parseSparksFrom(JSON.parse(content));
    console.log(sparks);

    this.props.dispatch(loadSparks(sparks));
    console.log("FOO");
  }

  handleChange(selectorFile) {
    console.log(selectorFile);
    const fileReader = new FileReader();
    fileReader.onloadend = this.parseSparksFromFileInput;
    fileReader.readAsText(selectorFile);
  }

  render() {
    return (
      <div>
        <input
          type="file"
          onChange={e => this.handleChange(e.target.files[0])}
        />
      </div>
    );
  }
}

export default connect(mapDispatchToProps)(FileSelector);
