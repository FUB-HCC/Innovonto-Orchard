import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { Spark } from "./";

class InspiredBy extends Component {
  state = {
    value: "",
    spark: null
  };

  handleOnChange = event => {
    const value = event.target.value.trim();
    const { sparks } = this.props;
    var spark;
    if (value.length > 0) {
      spark = sparks.filter(s =>
        value.split(" ").includes(s.title.split(" ")[1])
      );
      if (spark) {
        this.setState({ spark });
      }
    } else {
      this.setState({ spark: null });
    }
  };

  render() {
    const { inspiredBy, label, className, onSave } = this.props;
    //TODO set state based on array given in "inspiredBy" props
    const { value, spark } = this.state;
    return (
      <div>
        <TextField
          id="inspiredBy"
          key={"inspiredBy"}
          defaultValue={value}
          label={label}
          className={className}
          onChange={this.handleOnChange}
          onBlur={() => onSave({ target: { value: spark } })}
          fullWidth
        />
        {spark
          ? spark.map(s => (
              <Spark key={s.id} data={s} container={{ type: "CLUSTER" }} />
            ))
          : null}
      </div>
    );
  }
}

export default connect(
  state => ({ sparks: getSparks(state.clustering.present) }),
  null
)(InspiredBy);

const getSparks = ({ boardSparks, clusters, stackSparks }) => {
  return [...boardSparks, ...stackSparks, ...clusters.flatMap(c => c.sparks)];
};
