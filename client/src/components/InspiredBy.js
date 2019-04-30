import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, FormLabel } from "@material-ui/core";
import { InspiredByList, SparkInfo } from "./";
import { Button } from "../styledComponents";

class InspiredBy extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      currentSpark: null,
      value: "",
      savedSparks: props.inspiredBy
        ? props.inspiredBy.map(id =>
            props.sparks.find(s => s.id === id.split("/").pop())
          )
        : []
    };
  }

  handleOnChange = ({ target: { value } }) => {
    console.log(value);
    const { sparks } = this.props;
    const { savedSparks } = this.state;
    var currentSpark = null;
    if (value.length > 0) {
      currentSpark = sparks.find(
        s => value === s.title.split(" ")[1] && !savedSparks.includes(s)
      );
      this.setState({ currentSpark, value });
    } else {
      this.setState({ currentSpark, value: "" });
    }
  };

  handleRemoveSpark = sparkId => {
    var { savedSparks } = this.state;
    var index = savedSparks.findIndex(s => s.id === sparkId);
    if (index) savedSparks.splice(index, 1);
    this.setState({ savedSparks });
  };

  handleAddSpark = () => {
    const { inspiredBy } = this.props;
    const { currentSpark } = this.state;
    if (currentSpark) this.props.onSave([...inspiredBy, currentSpark["@id"]]);
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
          <SparkInfo {...currentSpark} />
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
