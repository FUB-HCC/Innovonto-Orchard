import React from "react";
import { connect } from "react-redux";
import { App_Name } from "./../constants/index.json";
import { logoI2M } from "../logos";
import { header } from "../constants/color";
import { download, reset } from "../icons";
import { Button, H6, H2 } from "../styledComponents";
import { Link } from "@reach/router";
import { downloadState } from "../utils";
import { resetState } from "../actions";
import { ContestSelector } from "./";

const BASE = process.env.REACT_APP_BASE;
var styles = {
  header: {
    backgroundColor: header.color,
    color: header.textColor,
    borderBottom: `4px solid ${header.border}`
  },
  h: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)"
  }
};

const Header = ({ resetState, ...props }) => (
  <div className="row header" style={styles.header}>
    <div className="col-auto" style={styles.h}>
      <ContestSelector />
      <Button onClick={() => downloadState(props)}>
        {"Download"} <img alt="download" height={20} src={download} />
      </Button>
      <Button onClick={resetState}>
        {"Reset"} <img alt="reset" height={20} src={reset} />
      </Button>
    </div>
    <div className="col" style={styles.h}>
      <Link to={BASE + "/"}>
        <H2>{App_Name}</H2>
      </Link>
    </div>
    <div className="col-auto" style={styles.h}>
      <Link to={BASE + "/ideas/"}>
        <H6>{"Ideas"}</H6>
      </Link>
      <Link to={BASE + "/create-idea/"}>
        <H6>{"Create Idea"}</H6>
      </Link>
      <img alt="logo" height="80" src={logoI2M} />
    </div>
  </div>
);

const mapStateToProps = state => ({
  ...state.contest.currentContest.clustering.present,
  activeSpark: state.activeSpark
});

const mapDispatchToProps = dispatch => ({
  resetState: () => dispatch(resetState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
