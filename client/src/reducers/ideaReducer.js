const ideaReducer = (state = [], { type, id, data }) => {
  switch (type) {
    case "ADD_IDEA":
      return [...state, { ...data, id }];
    case "REMOVE_IDEA":
      return null;
    default:
      return state;
  }
};

export default ideaReducer;
