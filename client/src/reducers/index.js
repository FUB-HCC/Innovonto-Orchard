import { combineReducers } from "redux";
import contestReducer from "./contestReducer";
import activeSpark from "./activeSpark";
import ideaReducer from "./ideaReducer";

const reducer = combineReducers({
  activeSpark: activeSpark,
  ideas: ideaReducer,
  contest: contestReducer
});

export default reducer;
