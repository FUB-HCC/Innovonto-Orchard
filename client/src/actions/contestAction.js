const setContests = contests => ({
  type: "SET_CONTESTS",
  contests
});

const setCurrentContest = currentContest => ({
  type: "SET_CURRENT_CONTEST",
  currentContest
});

export { setContests, setCurrentContest };
