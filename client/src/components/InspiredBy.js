import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, FormLabel } from "@material-ui/core";
import { InspiredByList, SparkInfo } from "./";
import { Button } from "../styledComponents";

class InspiredBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSpark: undefined,
      value: ""
    };
  }

  handleOnChange = ({ target: { value } }) => {
    const { sparks, inspiredBy } = this.props;
    var currentSpark = null;
    if (value.length > 0) {
      currentSpark = sparks.find(
        s => value === s.title.split(" ")[1] && !inspiredBy.includes(s["@id"])
      );
      this.setState({ currentSpark, value });
    } else {
      this.setState({ currentSpark, value: "" });
    }
  };

  handleRemoveSpark = sparkId => {
    var { inspiredBy } = this.props;
    var index = inspiredBy.findIndex(i => i.split("/").pop() === sparkId);
    if (index > -1) {
      this.props.onSave([
        ...inspiredBy.slice(0, index),
        ...inspiredBy.slice(index + 1)
      ]);
    }
  };

  handleAddSpark = () => {
    const { inspiredBy } = this.props;
    const { currentSpark } = this.state;
    if (currentSpark) this.props.onSave([currentSpark["@id"], ...inspiredBy]);
    this.setState(prevState => ({
      currentSpark: undefined,
      value: ""
    }));
  };

  render() {
    const { label, className, inspiredBy, sparks } = this.props;
    const savedSparks = inspiredBy.map(id =>
      sparks.find(s => s.id === id.split("/").pop())
    );
    //TODO set state based on array given in "inspiredBy" props

    const { currentSpark, value } = this.state;
    return (
      <div>
        <FormLabel>{label}</FormLabel>
        <div>
          <TextField
            id="inspiredBy"
            key={"inspiredBy"}
            label={"Spark Number:"}
            className={className}
            value={value}
            type="number"
            onChange={this.handleOnChange}
          />
          <Button disabled={!currentSpark} onClick={this.handleAddSpark}>
            Add
          </Button>
          {currentSpark ? <SparkInfo {...currentSpark} /> : null}
        </div>
        <InspiredByList
          sparks={savedSparks}
          removeSpark={this.handleRemoveSpark}
        />
      </div>
    );
  }
}

export default connect(
  state => getSparks(state),
  null
)(InspiredBy);

export const getSparks = state => {
  const { boardSparks, clusters, stackSparks } = state.clustering.present;
  return {
    sparks: [...boardSparks, ...stackSparks, ...clusters.flatMap(c => c.sparks)]
  };
};
