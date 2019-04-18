import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { H6, Button } from "../styledComponents";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { SectionControl } from "../styledComponents";
import { categories } from "../data/categories.json";
import { apiEndpoint } from "../utils";
import IconUploader from "./icons/IconUploader";
import { addIdea, updateIdea } from "../actions";

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
  inspiredBy: "",
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
    this.state = initState;
  }

  componentDidMount() {
    if (this.props.ideaId) {
      const idea = this.props.ideas.find(i => i.id === this.props.ideaId);
      if (idea) this.setState(idea);
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

  //TODO handle backend in redux action? evaluate.
  handleFormSubmit = event => {
    event.preventDefault();
    var method, uri, action;
    if (this.props.ideaId) {
      method = apiEndpoint.put;
      uri = "/api/ideas/" + this.props.ideaId;
      action = updateIdea;
    } else {
      method = apiEndpoint.post;
      uri = "/api/ideas";
      action = addIdea;
    }
    method(uri, {
      ...this.state,
      created: this.state.created ? this.state.created : Date.now(),
      iconPath: this.state.icon.resourceName
    })
      .then(response => {
        const { data } = response;
        const id = data._links.idea.href.split("/").pop();
        this.props.dispatch(action(id, data));
        return navigate("/ideas/" + id);
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  };

  handleImageUploadComplete = result => {
    this.setState({
      icon: result
    });
  };

  render() {
    console.log(this.state);
    const { classes } = this.props;
    var idea = {};
    if (this.props.ideaId) {
      idea = this.props.ideas.find(i => i.id === this.props.ideaId);
    }
    const {
      title,
      content,
      inspiredBy,
      ideaDetails,
      ideaProblem,
      iconPath
    } = idea;
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
          >
            {title}
          </TextField>
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
          <TextField
            id="inspiredBy"
            key={"inspiredBy" + inspiredBy}
            defaultValue={inspiredBy}
            label={categories.inspiredBy}
            className={classes.textField}
            onBlur={this.handleUpdateState("inspiredBy")}
            fullWidth
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
            required
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
            required
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
    state => ({ ideas: state.ideas }),
    null
  )(CreateIdea)
);
