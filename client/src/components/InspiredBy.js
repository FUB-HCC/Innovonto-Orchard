import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { InspiredByList } from "./";

class InspiredBy extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      filteredSparks: [],
      savedSparks: props.inspiredBy.map(id =>
        props.sparks.find(s => s.id === id.split("/").pop())
      )
    };
  }

  handleOnChange = event => {
    const value = event.target.value.trim();
    const { sparks } = this.props;
    const { savedSparks } = this.state;
    var filteredSparks;
    if (value.length > 0) {
      filteredSparks = sparks.filter(
        s =>
          value.split(" ").includes(s.title.split(" ")[1]) &&
          !savedSparks.includes(s)
      );
      this.setState({ filteredSparks });
    } else {
      this.setState({ filteredSparks: [] });
    }
  };

  handleRemoveSpark = sparkId => {
    var { filteredSparks, savedSparks } = this.state;
    var index = filteredSparks.findIndex(s => s.id === sparkId);
    if (index) filteredSparks.splice(index, 1);
    var index = savedSparks.findIndex(s => s.id === sparkId);
    if (index) savedSparks.splice(index, 1);
    this.setState({ filteredSparks, savedSparks });
  };

  render() {
    const { label, className, onSave, sparks } = this.props;
    //TODO set state based on array given in "inspiredBy" props

    const { filteredSparks, savedSparks } = this.state;
    return (
      <div>
        <TextField
          id="inspiredBy"
          key={"inspiredBy"}
          label={label}
          className={className}
          onChange={this.handleOnChange}
          onBlur={() =>
            onSave({ target: { value: [...filteredSparks, ...savedSparks] } })
          }
          fullWidth
        />
        <InspiredByList
          sparks={[...filteredSparks, ...savedSparks]}
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
