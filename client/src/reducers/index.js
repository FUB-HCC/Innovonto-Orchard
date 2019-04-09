import { combineReducers } from "redux";
import clusteringReducer from "./clusteringReducer";
import activeIdea from "./activeIdea";
import ideaReducer from "./ideaReducer";
import undoable from "redux-undo";

const undoableReducer = undoable(clusteringReducer, {
  limit: 50
});

const reducer = combineReducers({
  clustering: undoableReducer,
  activeIdea: activeIdea,
  ideas: ideaReducer
});

export default reducer;
