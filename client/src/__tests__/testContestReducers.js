import deepFreeze from "deep-freeze";
import contestReducer from "../reducers/contestReducer";
import { setContests, setCurrentContest } from "../actions";

const contests = [{ title: "one", id: "1" }, { title: "two", id: "2" }];
const state = { contests: [], currentContest: {} };

it("set Contests Contest", () => {
  expect(contestReducer(state, setContests(contests))).toEqual({
    ...state,
    contests
  });
});

it("change current Contest", () => {
  let preState = { ...state, contests };
  let { currentContest } = contestReduce(
    preState,
    setCurrentContest(contests[1])
  );
  expect(currentContest.id).toEqual(contests[1].id);
});

it("change current Contest 2", () => {
  let preState = { ...state, contests, currentContest: contests[1] };
  let { currentContest } = contestReducer(
    preState,
    setCurrentContest(contests[0])
  );
  expect(currentContest.id).toEqual(contests[0].id);
});
