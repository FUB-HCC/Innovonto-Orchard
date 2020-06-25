import React, { Component } from "react";
import { connect } from "react-redux";
import { setActiveSpark, setActiveConcept } from "../actions";
import Draggable from "./draggable";
import { sparkColor, borderColor } from "../constants/color";
import { sparkSize } from "./../constants/index.json";
import { H6, LabelIcon, TextnoteIcon, Button } from "../styledComponents";
import primary from "@material-ui/core/colors/amber";

export const renderSparks = (sparks, container, dropZone) => {
  if (!sparks) return null;
  const sparksRender = sparks.map(spark => {
    return (
      <Spark
        container={container}
        dropZone={dropZone ? dropZone : "SPARK" + spark.id}
        key={spark.id}
        data={spark}
      />
    );
  });
  return sparksRender;
};

function ellipsizeTextBox(id) {
  var el = document.getElementById(id);
  if (!el) return undefined;
  var text = el.innerHTML;
  var wordArray = el.innerHTML.split(" ");
  while (el.scrollHeight > el.offsetHeight) {
    wordArray.pop();
    text = wordArray.join(" ") + "...";
    el.innerHTML = text;
  }
  return text;
}

var styles = {
  sparkBox: {
    position: "absolute",
    width: sparkSize.width,
    height: sparkSize.height,
    cursor: "move",
    zIndex: 2,
    background: sparkColor
  },
  inCluster: {
    position: "relative",
    top: 0,
    left: 0,
    float: "left"
  },
  content: {
    padding: "0px 5px",
    fontSize: sparkSize.fontSize,
    maxHeight: sparkSize.contentHeight
  },
  hl: {
    backgroundColor: borderColor,
    padding: 0
  }
};

class Spark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ellipText: undefined
    };
    this.sparkRef = React.createRef();
  }

  componentDidMount() {
    const text = ellipsizeTextBox(
      this.props.container.name + this.props.data.id
    );
    this.setState({
      ellipText: text
    });
  }
  handleOnClick = ev => {
    const {
      concept2ideaSIM,
      boundSetActiveSpark,
      container,
      data: { id, index }
    } = this.props;

    let conceptSIM = concept2ideaSIM.map(con => con[index]);
    const simNorm = 1 / Math.max.apply(null, conceptSIM);
    conceptSIM = conceptSIM.map(sim => simNorm * sim);
    boundSetActiveSpark(id, container, index, conceptSIM);
  };

  render() {
    const {
      data: { position, id, index, content, labels, textnote, title, concepts },
      container,
      dropZone,
      activeSpark
    } = this.props;
    const { ellipText } = this.state;
    var style = {
      ...styles.sparkBox,
      ...position
    };
    if (container.type === "CLUSTER" || container.type === "STACK") {
      style = { ...style, ...styles.inCluster };
    }
    var text = ellipText ? ellipText : content;
    return (
      <Draggable
        id={id}
        dropZone={dropZone}
        type={"spark"}
        container={container}
        style={style}
        onClick={this.handleOnClick}
      >
        <div>
          <H6 bold={activeSpark === id}>
            {title || "Spark"}
            {labels && labels.length ? <LabelIcon /> : null}
            {textnote ? <TextnoteIcon /> : null}
          </H6>
          <p id={container.name + id} style={styles.content}>
            {activeSpark && ellipText ? (
              <Highlighted
                concepts={concepts}
                content={text}
                style={styles.hl}
                idea={{ id, container, index }}
              />
            ) : (
              text
            )}
          </p>
        </div>
      </Draggable>
    );
  }
}

const mapStateToProps = state => ({
  activeSpark: state.activeSpark && state.activeSpark.id,
  concept2ideaSIM: state.contest.currentContest.similarityData.concept2ideaSIM
});
const mapDispatchToProps = dispatch => ({
  boundSetActiveSpark: (...props) => dispatch(setActiveSpark(...props))
});

Spark = connect(
  mapStateToProps,
  mapDispatchToProps
)(Spark);

export const SparkInfo = ({
  id,
  title,
  labels,
  textnote,
  content,
  removeSpark
}) => {
  return (
    <div>
      <H6>
        {removeSpark ? (
          <Button className="float-left" onClick={() => removeSpark(id)}>
            X
          </Button>
        ) : null}
        {title || "Spark"}
        {labels && labels.length ? <LabelIcon /> : null}
        {textnote ? <TextnoteIcon /> : null}
      </H6>
      <div id={"content" + id}>{content}</div>
    </div>
  );
};

export const Highlighted = ({ concepts = [], content = "", style, idea }) => {
  const cWords = concepts.map(c => c.text);
  var displayContent = content.slice();
  for (var i = 0; i < cWords.length; i++) {
    displayContent = displayContent.replace(cWords[i], "*" + i + "*");
  }
  var a = displayContent.split("*");
  return a.map(v => {
    let j = parseInt(v, 10);
    if (j >= 0) {
      return (
        <Concept
          key={j + " "}
          concept={concepts[j]}
          style={style}
          words={cWords[j]}
          idea={idea}
        />
      );
    } else {
      return v;
    }
  });
};

const Concept = connect(
  state => ({
    active: state.activeSpark,
    similarityData: state.contest.currentContest.similarityData
  }),
  dispatch => ({
    boundSetActiveConcept: (...props) => dispatch(setActiveConcept(...props))
  })
)(
  ({
    concept,
    style,
    words,
    idea,
    active,
    similarityData,
    boundSetActiveConcept
  }) => {
    const sim =
      active.conceptSIM[similarityData.concepts.indexOf(concept.id.slice(3))];
    const activeConcept = active.concept && concept.id === active.concept.id;
    return sim ? (
      <span
        onClick={e =>
          handleOnClickConcept(
            e,
            boundSetActiveConcept,
            similarityData,
            concept,
            idea
          )
        }
        style={{
          ...style,
          fontWeight: activeConcept ? "bold" : "normal",
          backgroundColor: sim
            ? primary[100 + parseInt(sim * 7) * 100]
            : primary[300]
        }}
      >
        {words}
      </span>
    ) : (
      <span>{words}</span>
    );
  }
);

const handleOnClickConcept = (
  e,
  boundSetActiveConcept,
  similarityData,
  concept,
  idea
) => {
  e.stopPropagation();
  const cindex = similarityData.concepts.indexOf(concept.id.slice(3));
  let conceptSIM = similarityData.conceptSIM[cindex];
  const simNorm = 1 / Math.max.apply(null, conceptSIM);
  conceptSIM = conceptSIM.map(sim => simNorm * sim);
  boundSetActiveConcept(
    idea.id,
    idea.container,
    idea.index,
    concept,
    conceptSIM
  );
};

export default Spark;
