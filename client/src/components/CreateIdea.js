import React, { Component } from "react";
import { connect } from "react-redux";
import { H6, Section, Button } from "../styledComponents";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { SectionControl } from "../styledComponents";
import { categories } from "../data/categories.json";
import { apiEndpoint } from "../utils";
import { addIdea } from "../actions";

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

class CreateIdea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      created: "",
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
  }

  handleUpdateState = fieldName => event => {
    const stateObject = {};
    stateObject[fieldName] = event.target.value;
    this.setState(stateObject);
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
    this.setState({ hasCategories: hasCategories });
  };

  //TODO handle backend in redux action? evaluate.
  handleFormSubmit = event => {
    apiEndpoint
      .post("/api/ideas", { ...this.state, created: Date.now() })
      .then(response => {
        console.log(response);
        this.props.dispatch(
          addIdea(
            response.data._links.idea.href.split("/").pop(),
            response.data
          )
        );
      })
      .catch(error => {
        console.log(error);
      });

    event.preventDefault();
    return 0;
  };

  render() {
    const { classes } = this.props;
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
            label="Title"
            className={classes.textField}
            onChange={this.handleUpdateState("title")}
            required
          />
          <TextField
            id="content"
            label="Description"
            className={classes.textField}
            onChange={this.handleUpdateState("content")}
            fullWidth
            multiline
            rowsMax="10"
            rows="4"
            required
          />
          <TextField
            id="inspiredBy"
            label="By which Sparks is the Idea inspired?"
            className={classes.textField}
            onChange={this.handleUpdateState("inspiredBy")}
            fullWidth
          />
          <TextField
            id="ideaDetails"
            label="Describe your idea in more detail (e.g., how is it used?)"
            className={classes.textField}
            onChange={this.handleUpdateState("ideaDetails")}
            fullWidth
            multiline
            rowsMax="10"
            rows="4"
            required
          />
          <TextField
            id="ideaProblem"
            label="Which problem does the idea solve?"
            className={classes.textField}
            onChange={this.handleUpdateState("ideaProblem")}
            fullWidth
            multiline
            rowsMax="10"
            rows="4"
            required
          />
          <SectionControl
            label="In which of the following areas can the idea be applied?"
            categories={categories.applicationAreas}
            hasCategories={this.state.applicationAreas}
            onChange={this.handleSelectCategory("applicationAreas")}
          />
          <SectionControl
            label="Who is using the idea?"
            categories={categories.ideaUsers}
            hasCategories={this.state.ideaUsers}
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

export default withStyles(styles)(connect()(CreateIdea));
