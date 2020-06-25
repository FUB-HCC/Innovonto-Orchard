import React from "react";
import { connect } from "react-redux";
import { MenuButton } from "../styledComponents";
import { setCurrentContest } from "../actions";

const ContestSelector = ({ contests, currentContestID, dispatch }) => {
  return (
    <MenuButton
      setCurrentContest={contest => dispatch(setCurrentContest(contest))}
      contests={contests}
      currentContestID={currentContestID}
    >
      Select Contest
    </MenuButton>
  );
};

export default connect(
  state => ({
    contests: state.contest.contests,
    currentContestID: state.contest.currentContest.id
  }),
  null
)(ContestSelector);
