import React from "react";
import { connect } from "react-redux";
import { MenuButton } from "../styledComponents";
import { setCurrentContest } from "../actions";

const ContestSelector = ({ contests, dispatch }) => {
  return (
    <MenuButton
      setCurrentContest={contest => dispatch(setCurrentContest(contest))}
      contests={contests}
    >
      Select Contest
    </MenuButton>
  );
};

export default connect(
  state => ({ contests: state.contest.contests }),
  null
)(ContestSelector);
