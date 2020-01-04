import React from "react";
import { connect } from "react-redux";
import { updateSpark } from "../actions";
import { TextNote, LabelList } from "./";
import { H6, Section } from "../styledComponents";
import { highlighted } from "./spark";

const styles = {
  box: {
    margin: "10px 5px"
  },
  content: {
    marginLeft: "5px",
    fontSize: 14
  }
};
const ActiveSpark = ({
  id,
  container,
  content,
  concepts,
  labels,
  textnote,
  title,
  dispatch
}) => {
  return (
    <div style={styles.box}>
      <H6>{title || "Spark"}</H6>
      <LabelList
        id={id}
        labels={labels}
        handleSave={obj => dispatch(updateSpark(id, container, obj))}
      />
      <TextNote
        id={id}
        textnote={textnote}
        handleSave={obj => dispatch(updateSpark(id, container, obj))}
      />
      <Section>content:</Section>
      <div style={styles.content}>
        {highlighted(concepts, content, { textDecoration: "underline" })}
      </div>
    </div>
  );
};

export default connect()(ActiveSpark);
