import clusteringReducer from "./clusteringReducer";
import undoable from "redux-undo";
import { loadSimilarityData } from "../middleware/load_SIM_data";

const undoableReducer = undoable(clusteringReducer, {
  limit: 50
});

const initState = {
  contests: [],
  currentContest: { clustering: undoableReducer(undefined) }
};

export default (contest = initState, action) => {
  var { type, currentContest, contests } = action;
  switch (type) {
    case "SET_CONTESTS":
      if (contests.lenght === 0) {
        return contest; //if the update failed, don't update
      }
      /*if (!contest.currentContest.id) {
        contest.currentContest = {
          ...contests[0],
          clustering: undoableReducer(undefined, action)
        };
      }*/
      return { ...contest, contests: contests };
    case "SET_CURRENT_CONTEST":
      if (contest.currentContest.id) {
        var index = contest.contests.findIndex(
          c => c.id === contest.currentContest.id
        );
        if (index >= 0)
          contests = [
            ...contest.contests.slice(0, index),
            {
              ...contest.contests[index],
              clustering: {
                ...contest.currentContest.clustering,
                future: [],
                past: [],
                similarityData: null
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
          clustering: undoableReducer(newContest.clustering, action),
          similarityData: loadSimilarityData(currentContest.id.split("/").pop())
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
