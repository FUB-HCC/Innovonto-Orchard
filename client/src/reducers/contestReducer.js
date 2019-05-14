export default (contest = {}, action) => {
  const { type } = action;
  switch (type) {
    case "SET_CONTEST_IDS":
      if (contest.id && action.contests.includes(contest.id))
        return { ...contest, id: null, contestIDs: action.contests };
      return { ...contest, contestIDs: action.contests };
    case "SET_CURRENT_CONTEST":
      return { ...contest, id: action.id };
    default:
      return contest;
  }
};
