import React from "react";
import { connect } from "react-redux";
import { InspiredByList, DeleteIdea } from "./";
import { getSparks } from "./InspiredBy";
import { Link } from "@reach/router";
import { categories } from "../data/categories.json";
import { Section, Li, EditButton } from "../styledComponents";
import FormLabel from "@material-ui/core/FormLabel";
import { edit } from "../icons";
import { withStyles } from "@material-ui/core/styles";
const BASE = process.env.REACT_APP_BASE;

const styles = {
  time: {
    float: "right",
    marginLeft: 5
  },
  image: {
    float: "left",
    marginRight: 10
  }
};
const Idea = ({
  title,
  content,
  iconPath,
  created,
  classes,
  id,
  viewFull,
  ...props
}) => {
  const date = new Date(created);
  return (
    <div className="clearfix" id={id}>
      <Link to={BASE + "/ideas/" + id}>
        <Section>{title}</Section>
      </Link>
      {viewFull ? (
        <div>
          <Link to={BASE + "/create-idea/" + id}>
            <EditButton>
              <img alt="edit" height="10" src={edit} />
            </EditButton>
          </Link>
          <DeleteIdea id={id} />
        </div>
      ) : null}
      <time className={classes.time}>
        <small>{date.toDateString()}</small>
      </time>
      {iconPath ? (
        <img
          className={classes.image}
          height="120"
          src={process.env.REACT_APP_DOMAIN + iconPath}
          alt="iconPicure"
        />
      ) : null}
      <div>
        <FormLabel>{categories.content}</FormLabel>
        <div>{content}</div>
      </div>
      {viewFull ? <FullContent {...props} /> : null}
    </div>
  );
};

var FullContent = ({
  inspiredBy,
  ideaDetails,
  ideaProblem,
  applicationAreas,
  ideaUsers,
  sparks
}) => (
  <div>
    <FormLabel>{categories.inspiredBy}</FormLabel>
    <InspiredByList
      sparks={sparks.filter(s =>
        inspiredBy.map(i => i.split("/").pop()).includes(s.id)
      )}
    />
    <FormLabel>{categories.ideaDetails}</FormLabel>
    <div>{ideaDetails}</div>
    <FormLabel>{categories.ideaProblem}</FormLabel>
    <div>{ideaProblem}</div>
    <FormLabel>{categories.applicationAreas.label}</FormLabel>
    <ul>
      {applicationAreas.map(label => (
        <Li key={label}>{label}</Li>
      ))}
    </ul>
    <FormLabel>{categories.ideaUsers.label}</FormLabel>
    <ul>
      {ideaUsers.map(label => (
        <Li key={label}>{label}</Li>
      ))}
    </ul>
  </div>
);

FullContent = connect(
  state => getSparks(state),
  null
)(FullContent);

export default withStyles(styles)(Idea);
