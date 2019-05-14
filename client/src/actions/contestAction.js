const setContestIDs = contests => ({
  type: "SET_CONTEST_IDS",
  contests
});

const setCurrentContest = id => ({
  type: "SET_CURRENT_CONTEST",
  id
});

export { setContestIDs, setCurrentContest };
