import React from "react";
import { Link } from "@reach/router";
import { categories } from "../data/categories.json";
import { Section, Li, EditButton } from "../styledComponents";
import FormLabel from "@material-ui/core/FormLabel";
import { edit } from "../icons";

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
      <Link to={"/ideas/" + id}>
        <Section>{title}</Section>
      </Link>
      {viewFull ? (
        <Link to={"/create-idea/" + id}>
          <EditButton>
            <img alt="edit" height="10" src={edit} />
          </EditButton>
        </Link>
      ) : null}
      <time className={classes.time}>
        <small>{date.toDateString()}</small>
      </time>
      {iconPath ? (
        <img
          className={classes.image}
          height="120"
          src={"http://localhost:8080" + iconPath}
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

const FullContent = ({
  inspiredBy,
  ideaDetails,
  ideaProblem,
  applicationAreas,
  ideaUsers
}) => (
  <div>
    <FormLabel>{categories.inspiredBy}</FormLabel>
    <div>{inspiredBy}</div>
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

export default Idea;
