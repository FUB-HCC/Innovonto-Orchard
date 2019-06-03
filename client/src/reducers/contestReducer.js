import clusteringReducer from "./clusteringReducer";
import undoable from "redux-undo";

export default (contest = { contests: [], currentContest: {} }, action) => {
  var { type, currentContest, contests } = action;
  switch (type) {
    case "SET_CONTESTS":
      var newContests = contests.filter(con =>
        contest.contests.every(c => c.id !== con.id)
      );
      newContests = [...contest.contests, ...newContests];
      if (!contest.currentContest.id && newContests.length > 0) {
        contest.currentContest = {
          ...newContests[0],
          clustering: undoableReducer(undefined, action)
        };
      }
      return { ...contest, contests: newContests };
    case "SET_CURRENT_CONTEST":
      if (contest.currentContest.id) {
        var index = contest.contests.findIndex(c => c.id === currentContest.id);
        if (index >= 0)
          contests = [
            ...contest.contests.slice(0, index),
            {
              ...contest.contests[index],
              clustering: {
                ...contest.currentContest.clustering,
                future: [],
                past: []
              }
            },
            ...contest.contests.slice(index + 1)
          ];
        contest = { ...contest, contests };
      }
      const newContest = contest.contests.find(c => c.id === currentContest.id);
      return {
        ...contest,
        currentContest: {
          ...currentContest,
          clustering: undoableReducer(newContest.clustering, action)
        }
      };
    default:
      return {
        ...contest,
        currentContest: {
          ...contest.currentContest,
          clustering: undoableReducer(contest.currentContest.clustering, action)
        }
      };
  }
};

const undoableReducer = undoable(clusteringReducer, {
  limit: 50
});
