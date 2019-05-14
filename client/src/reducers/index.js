import { combineReducers } from "redux";
import clusteringReducer from "./clusteringReducer";
import contestReducer from "./contestReducer";
import activeSpark from "./activeSpark";
import ideaReducer from "./ideaReducer";
import undoable from "redux-undo";

const undoableReducer = undoable(clusteringReducer, {
  limit: 50
});

const reducer = combineReducers({
  clustering: undoableReducer,
  activeSpark: activeSpark,
  ideas: ideaReducer,
  contest: contestReducer
});

export default reducer;
