import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { H6, Button, SectionControl } from "../styledComponents";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { InspiredBy } from "./";
import { categories } from "../data/categories.json";
import { apiEndpoint } from "../utils";
import IconUploader from "./icons/IconUploader";

const styles = theme => ({
  container: {
    display: "block",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  root: {
    maxWidth: 700,
    margin: "auto"
  }
});

const initState = {
  created: null,
  title: "",
  content: "",
  inspiredBy: [],
  icon: "",
  ideaDetails: "",
  ideaProblem: "",
  applicationAreas: [],
  ideaUsers: [],
  ideaUsersOther: ""
};

class CreateIdea extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initState, ideaContest: props.ideaContestId };
  }

  componentDidMount() {
    if (this.props.ideaId) {
      const idea = this.props.ideas.find(i => i.id === this.props.ideaId);
      if (idea) this.setState(idea);
      else navigate("../create-idea");
    }
  }

  componentWillReceiveProps(oldProps) {
    if (oldProps.ideaId !== this.props.ideaId) {
      return this.forceUpdate();
    }
    return null;
  }

  handleUpdateState = fieldName => event => {
    if (this.state[fieldName] !== event.target.value) {
      this.setState({ [fieldName]: event.target.value });
    }
  };

  handleUpdateInspiredBy = () => sparkIDs => {
    this.setState({ inspiredBy: sparkIDs });
  };

  handleSelectCategory = fieldName => event => {
    const checked = event.target.checked;
    const hasCategories = this.state[fieldName];
    const elementName = event.target.value;

    if (checked) {
      if (!hasCategories.includes(elementName)) {
        hasCategories.push(elementName);
      }
    } else {
      if (hasCategories.includes(elementName)) {
        hasCategories.splice(hasCategories.indexOf(elementName), 1);
      }
    }
    this.setState({ [fieldName]: hasCategories });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    const { ideaId } = this.props;
    var method, uri;
    if (ideaId) {
      method = apiEndpoint.put;
      uri = "/ideas/" + ideaId;
    } else {
      method = apiEndpoint.post;
      uri = "/ideas";
    }
    method(uri, {
      ...this.state,
      created: this.state.created ? this.state.created : Date.now()
    })
      .then(response => {
        const { data } = response;
        const id = data._links.idea.href.split("/").pop();

        return navigate(process.env.REACT_APP_BASE + "/ideas/" + id);
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  };

  handleImageUploadComplete = result => {
    this.setState({
      iconPath: result.resourceName
    });
  };

  render() {
    const { classes } = this.props;
    const {
      title,
      content,
      inspiredBy,
      ideaDetails,
      ideaProblem,
      iconPath
    } = this.state;
    const { applicationAreas, ideaUsers } = this.state;
    return (
      <div className={classes.root}>
        <H6>{"Create Idea"}</H6>
        {/*TODO error message*/}
        <form
          className={classes.container}
          autoComplete="off"
          onSubmit={this.handleFormSubmit}
        >
          <TextField
            id="title"
            key={"title" + title}
            defaultValue={title}
            label={categories.title}
            className={classes.textField}
            onBlur={this.handleUpdateState("title")}
            required
          />

          <TextField
            id="content"
            key={"content" + content}
            defaultValue={content}
            label={categories.content}
            className={classes.textField}
            onBlur={this.handleUpdateState("content")}
            fullWidth
            multiline
            rowsMax="10"
            rows="4"
            required
          />
          <IconUploader
            onUploadComplete={this.handleImageUploadComplete}
            images={iconPath ? [{ resourceName: iconPath }] : null}
          />

          <InspiredBy
            inspiredBy={inspiredBy}
            label={categories.inspiredBy}
            className={classes.textField}
            onSave={this.handleUpdateInspiredBy()}
          />
          <TextField
            id="ideaDetails"
            key={"ideaDetails" + ideaDetails}
            defaultValue={ideaDetails}
            label={categories.ideaDetails}
            className={classes.textField}
            onBlur={this.handleUpdateState("ideaDetails")}
            fullWidth
            multiline
            rowsMax="10"
            rows="4"
          />
          <TextField
            id="ideaProblem"
            key={"ideaProblem" + ideaProblem}
            defaultValue={ideaProblem}
            label={categories.ideaProblem}
            className={classes.textField}
            onBlur={this.handleUpdateState("ideaProblem")}
            fullWidth
            multiline
            rowsMax="10"
            rows="4"
          />
          <SectionControl
            label={categories.applicationAreas.label}
            categories={categories.applicationAreas.selection}
            hasCategories={applicationAreas}
            onChange={this.handleSelectCategory("applicationAreas")}
          />
          <SectionControl
            label={categories.ideaUsers.label}
            categories={categories.ideaUsers.selection}
            hasCategories={ideaUsers}
            onChange={this.handleSelectCategory("ideaUsers")}
          />
          <Button type="submit">
            <input type="submit" value="Submit" />
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(
  connect(
    state => ({
      ideas: state.ideas,
      ideaContestId: state.contest.currentContest.id
    }),
    null
  )(CreateIdea)
);
