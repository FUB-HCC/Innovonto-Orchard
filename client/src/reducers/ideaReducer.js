const ideaReducer = (state = [], { type, id, data, ideas }) => {
  switch (type) {
    case "ADD_IDEA":
      return [...state, { ...data, id }];
    case "SET_IDEAS":
      return ideas.map(idea => ({
        ...idea,
        id: idea._links.self.href.split("/").pop()
      }));
    case "UPDATE_IDEA":
      var index = state.findIndex(idea => idea.id === id);
      if (index >= 0)
        return [
          ...state.slice(0, index),
          { ...data, id },
          ...state.slice(index + 1)
        ];
      return state;
    default:
      return state;
  }
};

export default ideaReducer;
